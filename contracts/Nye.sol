//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IERC20.sol";

contract Nye {
  address public owner;
  address public toro = 0xff0dFAe9c45EeB5cA5d269BE47eea69eab99bf6C;

  struct Organization {
    string id;
    address owner;
    uint256 joined;
    uint256 totalRaised;
    bool isActive;
    bool isVerified;
  }

  struct Campaign {
    string org;
    string id;
    uint256 target;
    uint256 raised;
    uint256 deadline;
    bool isActive;
  }

  struct Donor {
    address donor;
    uint256 amount;
    uint256 date;
  }

  //stores organizations
  mapping(string => Organization) public orgs;

  //stores campaigns
  mapping(string => Campaign) public campaigns;

  //holds all campaign records belonging to an organization
  mapping(string => Campaign[]) public orgCampaigns;

  //holds all donors to a particular campaign
  mapping(string => Donor[]) public campaignDonors;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
  }

  function registerOrg(string calldata _id) external {
    orgs[_id] = Organization({
      id: _id,
      owner: msg.sender,
      joined: block.timestamp,
      totalRaised: 0,
      isActive: false,
      isVerified: false
    });
  }

  function approveOrg(string calldata _org) external onlyOwner {
    Organization storage organization = orgs[_org];
    organization.isActive = true;
  }

  function createCampaign(
    string calldata _orgId,
    string calldata _campaignId,
    uint256 _target,
    uint256 _deadline
  ) external {
    Organization memory org = orgs[_orgId];

    require(org.isActive == true, "Inactive organization");

    //create campaign
    campaigns[_campaignId] = Campaign({
      id: _campaignId,
      org: _orgId,
      target: _target,
      raised: 0,
      deadline: _deadline,
      isActive: true
    });

    //record in organization
    orgCampaigns[_orgId].push(
      Campaign({
        id: _campaignId,
        org: _orgId,
        target: _target,
        raised: 0,
        deadline: _deadline,
        isActive: true
      })
    );
  }

  //for users donation
  function donateToCampaign(string memory _campaignId, uint256 _amount) public {
    Campaign storage campaign = campaigns[_campaignId];

    require(campaign.isActive == true, "Invalid campaign");

    IERC20(toro).transferFrom(msg.sender, address(this), _amount);

    unchecked {
      campaign.raised = campaign.raised + _amount;
    }

    //update donor list
    campaignDonors[_campaignId].push(
      Donor({ donor: msg.sender, amount: _amount, date: block.timestamp })
    );
  }

  //get all campaigns for an organization
  function getOrgCampaigns(
    string calldata _orgId
  ) external view returns (Campaign[] memory) {
    Campaign[] memory camps = new Campaign[](orgCampaigns[_orgId].length);
    for (uint256 i = 0; i < orgCampaigns[_orgId].length; i++) {
      camps[i] = orgCampaigns[_orgId][i];
    }

    return camps;
  }

  //get all donors for a campaign
  function getCampaignDonors(
    string calldata _campaignId
  ) external view returns (Donor[] memory) {
    Donor[] memory donors = new Donor[](campaignDonors[_campaignId].length);
    for (uint256 i = 0; i < campaignDonors[_campaignId].length; i++) {
      donors[i] = campaignDonors[_campaignId][i];
    }

    return donors;
  }

  function verifyOrg(string calldata _orgId) external {
    Organization storage org = orgs[_orgId];
    require(org.isActive, "Not Active");
    require(!org.isVerified, "Already verified");
    require(org.owner == msg.sender, "Not permitted");

    //call verification contract to mint badge
    //verificationBadge.safeMint(org.owner);
    org.isVerified = true;
  }

  function withdrawDonation(string calldata _campaignId) external {
    Campaign storage campaign = campaigns[_campaignId];
    Organization storage org = orgs[campaign.org];

    require(campaign.isActive == true, "Organisation inactive");
    require(campaign.raised > 0, "Insufficient funds");
    require(org.owner == msg.sender, "Permission denied");

    //transfers donations
    IERC20(toro).transfer(msg.sender, campaign.raised);

    //deactivate campaign
    campaign.isActive = false;

    //update org total raised
    org.totalRaised = org.totalRaised + campaign.raised;
  }
}

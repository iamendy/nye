const connect = {
  //---- Nye ----//
  nye: {
    address: "0x949C4Fa76ec09d50c8b46fcD2CB518DB98506CEC",
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
        signature:
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_org",
            type: "string",
          },
        ],
        name: "approveOrg",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xe3028316",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "campaignDonors",
        outputs: [
          {
            internalType: "address",
            name: "donor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "date",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0xc6d515cf",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        name: "campaigns",
        outputs: [
          {
            internalType: "string",
            name: "org",
            type: "string",
          },
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "target",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "raised",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x1d39e509",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_orgId",
            type: "string",
          },
          {
            internalType: "string",
            name: "_campaignId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_target",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_deadline",
            type: "uint256",
          },
        ],
        name: "createCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xa318f269",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_campaignId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "donateToCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xdb7296cd",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_campaignId",
            type: "string",
          },
        ],
        name: "getCampaignDonors",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "donor",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "date",
                type: "uint256",
              },
            ],
            internalType: "struct Nye.Donor[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0xafc451d9",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_orgId",
            type: "string",
          },
        ],
        name: "getOrgCampaigns",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "org",
                type: "string",
              },
              {
                internalType: "string",
                name: "id",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "target",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "raised",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "isActive",
                type: "bool",
              },
            ],
            internalType: "struct Nye.Campaign[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x65400e26",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "orgCampaigns",
        outputs: [
          {
            internalType: "string",
            name: "org",
            type: "string",
          },
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "target",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "raised",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x5dee2b5a",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        name: "orgs",
        outputs: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "joined",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalRaised",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isVerified",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x067816ea",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x8da5cb5b",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_id",
            type: "string",
          },
        ],
        name: "registerOrg",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xc2312b84",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x715018a6",
      },
      {
        inputs: [],
        name: "toro",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x484a0031",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xf2fde38b",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_orgId",
            type: "string",
          },
        ],
        name: "verifyOrg",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xb5453cd6",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_campaignId",
            type: "string",
          },
        ],
        name: "withdrawDonation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xec8a4ac3",
      },
    ],
  },
  toro: {
    address: "0xff0dFAe9c45EeB5cA5d269BE47eea69eab99bf6C",
    abi: [
      {
        inputs: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "uint8", name: "decimals", type: "uint8" },
          { internalType: "uint256", name: "capacity", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      { inputs: [], name: "CapExceeded", type: "error" },
      { inputs: [], name: "InvalidAccount", type: "error" },
      { inputs: [], name: "InvalidOwner", type: "error" },
      { inputs: [], name: "InvalidS", type: "error" },
      { inputs: [], name: "InvalidSignature", type: "error" },
      { inputs: [], name: "InvalidV", type: "error" },
      { inputs: [], name: "NotOwner", type: "error" },
      { inputs: [], name: "PermitExpired", type: "error" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes32", name: "salt", type: "bytes32" }],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "burnFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "cap",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes32", name: "salt", type: "bytes32" }],
        name: "depositAddress",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "nonces",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "issuer", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};

export default connect;

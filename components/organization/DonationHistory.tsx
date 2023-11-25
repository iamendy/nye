//@ts-nocheck
import { useAccount, useContractRead } from "wagmi";
import connect from "../../constants/connect";
import { ethers } from "ethers";
import formatDate from "../../helpers/formatDate";
import Campaign from "../../types/campaign";
import Donation from "../../types/Donation";
import { Spinner } from "../icons";

const DonationHistory = ({ campaign }: { campaign: Campaign }) => {
  const { address } = useAccount();

  const { data: donors, isLoading: isLoadingD } = useContractRead({
    address: connect?.nye?.address,

    abi: connect?.nye?.abi,
    account: address,
    functionName: "getCampaignDonors",
    args: [campaign?.id],
    watch: true,
  });

  const sumDonations = (donations: Donation[]) => {
    const total = donations.reduce((acc, donation) => {
      return acc + BigInt(donation.amount);
    }, 0n);

    return parseFloat(ethers?.utils?.formatEther(total)).toFixed(2);
  };

  return (
    <div className="mt-5 max-w-2xl">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium">Recent Donations</p>
        <p className="font-medium">
          {" "}
          Raised: {donors && sumDonations(donors)} / {campaign?.target}
        </p>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 rounded-md overflow-hidden">
          <tr className="">
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-900"
            >
              <span>Donor</span>
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-900"
            >
              Amount
            </th>

            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-900"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {isLoadingD && <Spinner />}
          {donors?.map((donor, i: number) => (
            <tr key={i} className="">
              <td className="whitespace-nowrap px-4 py-4">
                <div className="text-sm text-gray-900 ">
                  {donor?.donor?.substring(0, 8)}
                </div>
              </td>
              <td className="whitespace-nowrap text-sm px-4 py-4">
                {parseFloat(
                  ethers?.utils?.formatEther(donor?.amount || "0")
                ).toFixed(2)}{" "}
                TORO
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                {formatDate(donor?.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DonationHistory;

import axios from "axios";
import BigCampaignCard from "../../../components/donor/BigCampaignCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import connect from "../../../constants/connect";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { Raised, Spinner } from "../../../components/icons";
import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

const Donate = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [hasDonated, setHasDonated] = useState(false);

  const debouncedAmount = useDebounce<string>(amount, 500);

  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/donor/get-campaign?campaignId=${router?.query?.id}`
    );

    return data;
  };

  const { data: campaign } = useQuery({
    queryKey: ["campaignS", router],
    queryFn: fetchCampaigns,
  });

  const recordDonationdb = async () => {
    const { data } = await axios.post("/api/donor/donate-campaign", {
      campaignId: router?.query?.id,
      amount: debouncedAmount,
      donor: address,
    });

    return data;
  };

  debouncedAmount && console.log(ethers.utils?.parseEther(debouncedAmount));

  const { mutate, isLoading } = useMutation({
    mutationFn: recordDonationdb,
    onSuccess(d) {
      setAmount("");
      setHasDonated(true);
    },
  });

  const { data: toroBal, isLoading: isLoadingBal } = useContractRead({
    //@ts-ignore
    address: connect?.toro?.address,
    //@ts-ignore
    abi: connect?.toro?.abi,
    account: address,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  //---- approve ----//
  const { config: approveConfig, refetch: refetchAp } = usePrepareContractWrite(
    {
      //@ts-ignore
      address: connect?.toro?.address,
      //@ts-ignore
      abi: connect?.toro?.abi,
      functionName: "approve",
      args: [
        //@ts-ignore
        connect?.nye?.address,
        "1000000000000000000",
        //ethers.utils?.parseEther(debouncedAmount || "0"),
      ],
    }
  );

  const {
    write: approve,
    isLoading: isApproving,
    data: approveData,
    isSuccess: isApprovedL,
  } = useContractWrite(approveConfig);

  const { isLoading: isApprovingTx } = useWaitForTransaction({
    hash: approveData?.hash,
    confirmations: 2,
    async onSuccess(tx) {
      await refetch();
      donate?.();
    },
  });

  //---- donate ----//
  const {
    config: saveConfig,
    refetch,
    isSuccess,
  } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.nye?.address,
    //@ts-ignore
    abi: connect?.nye?.abi,
    account: address,
    functionName: "donateToCampaign",
    enabled: false,
    //args: [campaign?.id, ethers.utils?.parseEther(debouncedAmount || "0")],
    args: [campaign?.id, "100000000000000000"],
  });

  const {
    write: donate,
    data: saveData,
    isLoading: isSaving,
  } = useContractWrite(saveConfig);

  const { isLoading: isWaitingSaveTx } = useWaitForTransaction({
    hash: saveData?.hash,
    onSuccess() {
      console.log("Donation tx Confirmed!");
      mutate();
    },
  });

  return (
    <div>
      <h3 className="mb-4 font-medium text-lg">Donate Now </h3>
      <div className="flex gap-x-8">
        <BigCampaignCard campaign={campaign} />

        <div className="mt-1 mb-1 w-full">
          <div className="flex justify-between">
            <div className="w-[80%]">
              <div className="flex gap-x-1">
                <Raised />

                <b>
                  {
                    //@ts-ignore
                    parseFloat(
                      ethers?.utils?.formatEther(toroBal || "0")
                    ).toFixed(2)
                  }{" "}
                  TORO
                </b>
              </div>

              <div className="mt-5 flex flex-col gap-y-5">
                {hasDonated && (
                  <div className=" animate-bounce bg-green-100 text-green-600 px-2 p-2 text-center">
                    <b>Thanks for your donation 🎉</b>
                  </div>
                )}
                <div>
                  <label htmlFor="amount" className="text-base  text-gray-900">
                    Amount
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={
                        isWaitingSaveTx ||
                        isLoading ||
                        isApproving ||
                        isApprovingTx ||
                        isSaving
                      }
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="5"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    ></input>
                  </div>
                </div>

                <button
                  disabled={
                    isWaitingSaveTx ||
                    isLoading ||
                    isApproving ||
                    isSaving ||
                    isApprovingTx
                  }
                  onClick={() => approve?.()}
                  type="button"
                  className=" w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:bg-black/80"
                >
                  {isWaitingSaveTx ||
                  isLoading ||
                  isApproving ||
                  isSaving ||
                  isApprovingTx ? (
                    <Spinner load />
                  ) : (
                    "Donate"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;

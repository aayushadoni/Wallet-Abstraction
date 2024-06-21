import { useEffect } from "react";
import React from "react";
import { useRecoilValue } from "recoil";
import { smartWalletAddressAtom } from "@/app/lib/states";
import { useFetchTokenBalances } from "@/app/hooks/getTokenBalance";
import { useSession } from "next-auth/react";

interface Token {
  id: number;
  name: string;
  quantity: string;
  value: string;
  image: string;
}

export function HoldingsCard({ tokens }: { tokens: Token[] }): JSX.Element {

  const SmartWalletAddress = useRecoilValue(smartWalletAddressAtom);
  const fetchTokenBalance = useFetchTokenBalances(SmartWalletAddress);
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      await fetchTokenBalance();
    };

    fetchData();
  },[status]);

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md w-full">
      <h1 className="text-lg font-semibold text-gray-200 mb-4">Holdings</h1>
      <div className="grid gap-3">
        {tokens.map((token) => (
          <div key={token.id} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="flex items-center gap-3">
              <img src={token.image} alt={`${token.name} logo`} className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium text-gray-200">{token.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-200">{token.quantity}</span>
              <span className="text-xs font-light text-gray-400">${token.value.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

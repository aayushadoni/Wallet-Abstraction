"use client"
import React, { useState, useEffect } from "react";
import { WalletCard } from "@/components/WalletCard";
import { TrendingCard } from "@/components/TrendingCard";
import { MarketCard } from "@/components/MarketCard";
import { HoldingsCard } from "@/components/HoldingsCard";
import { useRecoilValue } from "recoil";
import { smartWalletAddressAtom,tokenBalanceAtomFamily } from "@/app/lib/states";
import SupportedCoins from "@/components/SupportedCoins";
import { useFetchTokenBalances } from "@/app/hooks/getTokenBalance";

export default function Dashboard() {

  const [marketData, setMarketData] = useState([]);
  const [top3Data, settop3Data] = useState([]);

  const smartWalletAddressValue = useRecoilValue(smartWalletAddressAtom);
  const fetchTokenBalance = useFetchTokenBalances(smartWalletAddressValue);
                    
  

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/wallet');
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        const data = await response.json();
        const top15Coins = data.coins.slice(0, 15);
        const top3Coins = data.coins.slice(0, 3);
        setMarketData(top15Coins);
        settop3Data(top3Coins);
        if(smartWalletAddressValue != '')
          await fetchTokenBalance();
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarketData();
  }, []);

  const ethBalance = useRecoilValue(tokenBalanceAtomFamily('ETH'));
  const bscBalance = useRecoilValue(tokenBalanceAtomFamily('BSC'));
  const maticBalance = useRecoilValue(tokenBalanceAtomFamily('MATIC'));
  const avalancheBalance = useRecoilValue(tokenBalanceAtomFamily('AVALANCHE'));
  const tetherBalance = useRecoilValue(tokenBalanceAtomFamily('TETHER'));
  const optimismBalance = useRecoilValue(tokenBalanceAtomFamily('OPTIMISM'));
  const arbitrumBalance = useRecoilValue(tokenBalanceAtomFamily('ARBITRUM'));
  const baseBalance = useRecoilValue(tokenBalanceAtomFamily('BASE'));

  const walletBalance = 1000;
  const holdingsData = [
    { id: 1, name: "ETH", quantity: ethBalance || "0", value: ethBalance || "0", image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" },
    { id: 2, name: "BSC", quantity: bscBalance || "0", value: bscBalance || "0", image: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032" },
    { id: 3, name: "Matic", quantity: maticBalance || "0", value: maticBalance || "0", image: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" },
    { id: 7, name: "Avalanche", quantity: avalancheBalance || "0", value: avalancheBalance || "0", image: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032" },
    { id: 8, name: "Tether", quantity: tetherBalance|| "0", value: tetherBalance || "0", image: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=032" },
    { id: 9, name: "Optimism", quantity: optimismBalance || "0", value: optimismBalance || "0", image: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032" },
    { id: 10, name: "Arbitrum", quantity: arbitrumBalance || "0", value: arbitrumBalance || "0", image: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032" },
    { id: 11, name: "Base", quantity: baseBalance || "0", value: baseBalance || "0", image: "https://tokenlogo.xyz/assets/chain/base.svg" },
  ];

  return (
    <div className="flex flex-col p-6 gap-6 min-h-screen">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-4 w-1/2">
          <WalletCard balance={walletBalance} walletAddress={smartWalletAddressValue} />
          <TrendingCard coins={top3Data} />
        </div>
        <div className="flex w-1/2">
          <HoldingsCard tokens={holdingsData} />
        </div>
      </div>
      <div>
        <SupportedCoins />
      </div>
      <div className="flex">
        <div className="w-full">
          <MarketCard coins={marketData} />
        </div>
      </div>
    </div>
  );
}

"use client"
import React, { useState, useEffect } from "react";
import { WalletCard } from "@/components/WalletCard";
import { TrendingCard } from "@/components/TrendingCard";
import { MarketCard } from "@/components/MarketCard";
import { HoldingsCard } from "@/components/HoldingsCard";
import { useRecoilValue } from "recoil";
import { smartWalletAddressAtom,ethBalanceAtom } from "@/app/lib/states";
import SupportedCoins from "@/components/SupportedCoins";

export default function Dashboard() {

  const [marketData, setMarketData] = useState([]);
  const [top3Data, settop3Data] = useState([]);
  const smartWalletAddressValue = useRecoilValue(smartWalletAddressAtom);
  const ethBalanceValue = useRecoilValue(ethBalanceAtom);

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarketData();
  }, []);

  const walletBalance = 1000;
  const holdingsData = [
    { id: 1, name: "ETH", quantity: ethBalanceValue?.displayValue||"0", value: ethBalanceValue?.value||"0", image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" },
    { id: 2, name: "BSC", quantity: "0", value: "0", image: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032" },
    { id: 3, name: "Matic", quantity: "0", value: "0", image: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" },
    // { id: 4, name: "Cronos", quantity: 100, value: 150, image: "https://cryptologos.cc/logos/cronos-cro-logo.svg?v=032" },
    // { id: 5, name: "Fantom", quantity: 300, value: 400, image: "https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=032" },
    // { id: 6, name: "Harmony", quantity: 250, value: 350, image: "https://cryptologos.cc/logos/harmony-one-logo.svg?v=032" },
    { id: 7, name: "Avalanche", quantity: "0", value: "0", image: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032" },
    { id: 8, name: "Tether", quantity: "0", value: "0", image: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=032" },
    { id: 9, name: "Optimism", quantity: "0", value: "0", image: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032" },
    { id: 10, name: "Arbitrum", quantity: "0", value: "0", image: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032" },
    { id: 11, name: "Base", quantity: "0", value: "0", image: "https://tokenlogo.xyz/assets/chain/base.svg" },
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

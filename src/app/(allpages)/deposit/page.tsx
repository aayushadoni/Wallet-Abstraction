"use client"
import React, { useState, useEffect } from "react";
import { DepositCard } from '@/components/DepositCard'
import { TrendingCard } from '@/components/TrendingCard'
import { PaymentCard } from "@/components/PaymentsCard";
import { useRecoilValue } from 'recoil';
import { smartWalletAddressAtom } from "@/app/lib/states";
import SupportedCoins from "@/components/SupportedCoins";

const supportedChains = [
  { id: 1, name: "ETH", quantity: 200, value: 300, image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" },
  { id: 2, name: "BSC", quantity: 50, value: 100, image: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032" },
  { id: 3, name: "Matic", quantity: 500, value: 1000, image: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" },
  { id: 4, name: "Cronos", quantity: 100, value: 150, image: "https://cryptologos.cc/logos/cronos-cro-logo.svg?v=032" },
  { id: 5, name: "Fantom", quantity: 300, value: 400, image: "https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=032" },
  { id: 6, name: "Harmony", quantity: 250, value: 350, image: "https://cryptologos.cc/logos/harmony-one-logo.svg?v=032" },
  { id: 7, name: "Avalanche", quantity: 400, value: 600, image: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032" },
  { id: 8, name: "Tether", quantity: 1000, value: 1000, image: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=032" },
  { id: 9, name: "Optimism", quantity: 150, value: 200, image: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032" },
  { id: 10, name: "Arbitrum", quantity: 120, value: 180, image: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032" },
];


export default function Deposit () {
    
    const [marketData, setMarketData] = useState([]);
    const smartWalletAddressValue = useRecoilValue(smartWalletAddressAtom);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/wallet');
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        const data = await response.json();
        const top3Coins = data.coins.slice(0, 3);
        setMarketData(top3Coins);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-row gap-6'>
          <div className='w-1/2'>
            <DepositCard balance={1000} walletAddress={smartWalletAddressValue}/>
          </div>
          <div className="w-1/2">
              <TrendingCard coins={marketData}/>
          </div>
        </div>
        
        <div className="">
        <SupportedCoins />
        </div>
        <div className="h-full w-full bg-gray-800 rounded-xl mt-2">
          <PaymentCard />
        </div>
    </div>
  )
}
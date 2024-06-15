"use client"
import React, { useState, useEffect } from "react";
import { PayGasBank } from "@/components/PayGasBank";
import { PayGasCrypto } from "@/components/PayGasCrypto";

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

const GasTopUp = () => {
    
  return (
    <div className='flex flex-col gap-2 p-4'>
        <PayGasCrypto />
        <div className="flex flex-row bg-gray-800 rounded-xl w-full mt-2 p-2">
          {
            supportedChains.map((chain)=>(
              <div className="flex flex-row items-center gap-2 hover:bg-gray-900 rounded-full h-full">
              <img src={chain.image} alt={`${chain.name} logo`} className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium text-gray-200 pr-3">{chain.name}</span>
            </div>
            ))
          }
        </div>
        <div className="h-full w-full bg-gray-800 rounded-xl mt-2">
          <PayGasBank />
        </div>
    </div>
  )
}

export default GasTopUp
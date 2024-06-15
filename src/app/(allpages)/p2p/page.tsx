"use client";

import { P2pCard } from "@/components/P2pCard";

const supportedChains = [
    { id: 1, name: "ETH", quantity: 200, value: 300, image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" },
    { id: 2, name: "BSC", quantity: 50, value: 100, image: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032" },
    { id: 3, name: "Matic", quantity: 500, value: 1000, image: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" },
];

const P2P = () => {
    return (
        <div className='flex flex-col gap-4 p-4'>
            <P2pCard />
            <div className="flex flex-row bg-gray-800 rounded-xl w-full mt-4 p-2">
                {supportedChains.map((chain) => (
                    <div
                        key={chain.id}
                        className="flex flex-row items-center gap-2 hover:bg-gray-900 rounded-full h-full p-2 cursor-pointer transition-all duration-200 ease-in-out"
                    >
                        <img src={chain.image} alt={`${chain.name} logo`} className="w-6 h-6 rounded-full" />
                        <span className="text-sm font-medium text-gray-200">{chain.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default P2P;

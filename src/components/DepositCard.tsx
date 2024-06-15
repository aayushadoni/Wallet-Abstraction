import React, { useState } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";

export function DepositCard({ balance, walletAddress }: { balance: number; walletAddress: string }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="p-8 rounded-2xl shadow-xl bg-gray-800 text-white h-full">
      <h1 className="text-2xl font-bold mb-6">Add tokens to your Wallet</h1>
      <div className="flex gap-6 items-center">
        <div className="flex-shrink-0 mt-4 rounded-sm">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${walletAddress}&amp;size=135x135;margin=10`} alt="QR Code" className="w-40 h-40 rounded-lg border-2 border-gray-400" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between bg-gray-900 p-2 rounded-lg mb-4 shadow-inner">
            <p className="text-gray-300 font-mono text-xs">{walletAddress}</p>
            <button
              className="ml-2 text-gray-400 hover:text-gray-200 focus:outline-none text-md"
              onClick={copyToClipboard}
              aria-label="Copy wallet address"
            >
              {copied ? (
                <AiOutlineCheck className="w-6 h-6 text-green-500" />
              ) : (
                <HiOutlineClipboardCopy className="w-6 h-6" />
              )}
            </button>
          </div>
          <p className="text-base mb-4">Send tokens on any supported chain to your Wallet</p>
          <div className="flex gap-2">
            <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032" alt="Chain 1" className="w-8 h-8 rounded-full" />
            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" alt="Chain 2" className="w-8 h-8 rounded-full" />
            <img src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" alt="Chain 3" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

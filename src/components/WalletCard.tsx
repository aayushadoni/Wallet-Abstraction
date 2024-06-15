import React, { useState } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";

export function WalletCard({ balance, walletAddress }: { balance: number; walletAddress: string }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const truncatedAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

  return (
    <div className="p-6 rounded-xl shadow-md bg-gray-800">
      <h1 className="text-lg font-semibold text-gray-100 mb-4">Wallet</h1>
      <div className="text-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium">Current Balance</p>
            <p className="text-lg font-bold">${balance.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Transactions</p>
            <p className="text-lg font-bold">12</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium">Wallet Address</p>
          <div className="flex items-center">
            <p className="text-gray-300 truncate text-sm">{truncatedAddress}</p>
            <button
              className="ml-2 text-gray-400 hover:text-gray-200 focus:outline-none"
              onClick={copyToClipboard}
              aria-label="Copy wallet address"
            >
              {copied ? (
               <HiOutlineClipboardCopy className="w-5 h-5 text-white" />
              ) : (
                <HiOutlineClipboardCopy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            Deposit
          </button>
          <button className="flex-1 bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

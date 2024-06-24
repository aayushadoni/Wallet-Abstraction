import React, { useState } from "react";
import { HiOutlineClipboardCopy, HiCheckCircle } from "react-icons/hi";

export function WalletCard({ balance, walletAddress }: { balance: number; walletAddress: string }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const truncatedAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

  return (
    <div className="w-full p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 transform transition-transform duration-300 hover:scale-105">
      <h1 className="text-xl font-semibold mb-4">Wallet</h1>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-gray-400">Current Balance</p>
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Transactions</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-400">Wallet Address</p>
          <div className="flex items-center mt-2">
            <p className="text-gray-300 truncate text-sm">{truncatedAddress}</p>
            <button
              className="ml-2 text-gray-400 hover:text-gray-200 focus:outline-none"
              onClick={copyToClipboard}
              aria-label="Copy wallet address"
            >
              {copied ? (
                <HiCheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <HiOutlineClipboardCopy className="w-5 h-5" />
              )}
            </button>
          </div>
          {copied && <p className="text-green-500 text-xs mt-1">Copied to clipboard!</p>}
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            Deposit
          </button>
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

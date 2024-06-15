import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const supportedCoins = [
  { id: "1", name: 'BNB',img: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032" },
  { id: '2', name: 'Ethereum ',img:"https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" },
  { id: '3', name: 'Matic',img:"https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" },
];

export const P2pCard = (): JSX.Element => {
  const [selectedCoin, setSelectedCoin] = useState(supportedCoins[0]);
  const [selectedChain, setSelectedChain] = useState(supportedCoins[0]);
  const [amount, setAmount] = useState('');
  const [dropdownChainOpen, setDropdownChainOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCoinChange = (coin: { id: string, name: string, img: string }) => {
    setSelectedCoin(coin);
    setDropdownOpen(false);
  };
  const handleChainChange = (chain: { id: string, name: string, img: string }) => {
    setSelectedChain(chain);
    setDropdownChainOpen(false);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-gray-800 text-white h-full w-full mx-auto flex flex-col">
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        P2P Transfer
      </h1>

      <div className="mb-4 relative">
        <label htmlFor="coin" className="block text-sm font-medium text-gray-300 mb-2">
          Select Coin
        </label>
        <button
          id="coin"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full bg-gray-700 text-white p-2 rounded-xl flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <img src={selectedCoin.img} alt={`${selectedCoin.name} logo`} className="w-8 h-8 rounded-full" />
            <span>{selectedCoin.name}</span>
          </div>
          <HiOutlineChevronDown className="text-gray-400" />
        </button>
        {dropdownOpen && (
          <div className="absolute z-20 w-full bg-gray-700 rounded-xl mt-1">
            {supportedCoins.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-900 rounded-xl"
                onClick={() => handleCoinChange(coin)}
              >
                <img src={coin.img} alt={`${coin.name} logo`} className="w-8 h-8 rounded-full" />
                <span>{coin.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4 relative">
        <label htmlFor="coin" className="block text-sm font-medium text-gray-300 mb-2">
          Select Chain
        </label>
        <button
          id="coin"
          onClick={() => setDropdownChainOpen(!dropdownChainOpen)}
          className="w-full bg-gray-700 text-white p-2 rounded-xl flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <img src={selectedChain.img} alt={`${selectedChain.name} logo`} className="w-8 h-8 rounded-full" />
            <span>{selectedChain.name}</span>
          </div>
          <HiOutlineChevronDown className="text-gray-400" />
        </button>
        {dropdownChainOpen && (
          <div className="absolute z-10 w-full bg-gray-700 rounded-xl mt-1">
            {supportedCoins.map((chain) => (
              <div
                key={chain.id}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-900 rounded-xl"
                onClick={() => handleChainChange(chain)}
              >
                <img src={chain.img} alt={`${chain.name} logo`} className="w-8 h-8 rounded-full" />
                <span>{chain.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
          Quantity
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="w-full bg-gray-700 text-white p-3 rounded"
          placeholder="Enter the quantity"
        />
      </div>
      <button
        onClick={() => {console.log("gaspayment")}}
        className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded mt-2"
      >
        Send
      </button>
    </div>
  );
};

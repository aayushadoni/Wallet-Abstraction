import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useBuyWithFiatQuote } from "thirdweb/react";
import { ethereum, bsc, polygon, avalanche, optimism, arbitrum, base } from 'thirdweb/chains';
import { smartWalletAddressAtom } from '@/app/lib/states';
import { useRecoilValue } from 'recoil';
import { createThirdwebClient } from "thirdweb";
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";

import { sepolia, bscTestnet, avalancheFuji, optimismSepolia, arbitrumSepolia, baseSepolia, polygonAmoy } from "thirdweb/chains";

const supportedCoins = [
  { id: ethereum.id, name: "ETH", img: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" },
  { id: bsc.id, name: "BSC", img: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032" },
  { id: polygon.id, name: "Matic", img: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" },
  { id: avalanche.id, name: "Avalanche", img: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032" },
  { id: polygonAmoy.id, name: "Tether", img: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=032" },
  { id: optimism.id, name: "Optimism", img: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032" },
  { id: arbitrum.id, name: "Arbitrum", img: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032" },
  { id: base.id, name: "Base", img: "https://tokenlogo.xyz/assets/chain/base.svg" },
];

export const PaymentCard = (): JSX.Element => {
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_ThirdWebClientId as string,
  });

  const smartWalletAddress = useRecoilValue(smartWalletAddressAtom);
  const [selectedCoin, setSelectedCoin] = useState(supportedCoins[0]);
  const [amount, setAmount] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCoinChange = (coin: { id: number, name: string, img: string }) => {
    setSelectedCoin(coin);
    setDropdownOpen(false);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { data: quote, error, isLoading } = useBuyWithFiatQuote({
    client: client,
    fromCurrencySymbol: 'USD',
    toChainId: selectedCoin.id,
    toAmount: amount,
    toTokenAddress: NATIVE_TOKEN_ADDRESS,
    toAddress: smartWalletAddress,
  });

  const handleGetQuote = () => {
    setQuoteData(quote);
    console.log(quote);
    setIsModalOpen(true);
  };
  const router = useRouter()

  return (
    <div className="p-6 rounded-xl shadow-md bg-gray-800 text-white h-full w-full mx-auto flex flex-col">
      <h1 className="text-lg font-semibold mb-4 flex items-center">
        Buy Crypto With Fiat <span className="text-blue-500 ml-2">On Ramp Payments</span>
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
            <img src={selectedCoin.img} alt={selectedCoin.name} className="w-6 h-6 rounded-full" />
            <span className='text-md'>{selectedCoin.name}</span>
          </div>
          <HiOutlineChevronDown className="text-gray-400" />
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 w-full max-h-40 overflow-y-auto bg-gray-700 rounded-xl mt-1">
            {supportedCoins.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center gap-2 p-2 cursor-pointer hover
rounded-xl"
                onClick={() => handleCoinChange(coin)}
              >
                <img src={coin.img} alt={coin.name} className="w-6 h-6 rounded-full" />
                <span className='text-md font-md '>{coin.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
          Amount (USD)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="w-full bg-gray-700 text-white p-2 rounded-lg"
          placeholder="Enter amount in USD"
        />
      </div>
      <button
        onClick={() => { handleGetQuote() }}
        className="w-full bg-blue-600 hover
text-white text-md font-semibold py-2 px-2 rounded-lg mt-2"
      >
        Get Quote
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-400">Quote Information</h2>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-gray-400">
              <div>
                <label className="block mb-1 text-sm font-medium">Intent ID</label>
                <div className="bg-gray-800 p-2 rounded-md">{quoteData?.intentId}</div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Token</label>
                <div className="bg-gray-800 p-2 rounded-md">{quoteData?.onRampToken.token.name}</div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Amount</label>
                <div className="bg-gray-800 p-2 rounded-md">{quoteData?.onRampToken.amount}</div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">USD Spend</label>
                <div className="bg-gray-800 p-2 rounded-md">{quoteData?.fromCurrency.amount}</div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => router.push(quoteData?.onRampLink)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default PaymentCard;;

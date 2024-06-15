import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineChevronDown } from 'react-icons/hi';

export const PayGasBank = (): JSX.Element => {
  const [amount, setAmount] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();


  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handlePayment = () => {
    router.push('https://buy.stripe.com/test_dR6bLF8Ll7MT3286oo');
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-gray-800 text-white h-full w-full mx-auto flex flex-col">
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        Buy USDC with Bank Payment via <span className="text-blue-500 ml-2">Stripe</span>
      </h1>
      <div className="mb-4 relative">
          <div className="flex items-center gap-2">
            <img src={"https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=032"} alt={`USDC logo`} className="w-8 h-8 rounded-full" />
            <span className='text-md font-semibold'>USDC</span>
          </div>
          <div className='flex gap-2 items-center py-2 text-sm font-medium rounded-xl w-40 bg-gray-700 px-2 my-2 text-sky-300 border-2 border-gray-500'>
             <img src={"https://tokenlogo.xyz/assets/chain/base.svg"} alt={`USDC logo`} className="w-6 h-6 rounded-full" /> 
             Base Chain 
             <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-100 mb-9 ml-[140px]"></span>
             <span className="absolute inline-flex h-3 w-3 rounded-full bg-sky-500 opacity-100 mb-9 ml-[140px]"></span>
          </div>
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
        Fill Gas
      </button>
    </div>
  );
};

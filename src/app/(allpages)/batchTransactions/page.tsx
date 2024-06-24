"use client"
import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import SupportedCoins from "@/components/SupportedCoins";
import { sepolia, bscTestnet, avalancheFuji, optimismSepolia, arbitrumSepolia, baseSepolia, polygonAmoy, Chain } from "thirdweb/chains";
import { HiOutlineChevronDown } from 'react-icons/hi'
import { BsFiletypeJson } from "react-icons/bs";
import { prepareContractCall } from "thirdweb";
import { verifyTransactions } from "@/app/hooks/verifyJsonInput";
import { createThirdwebClient } from "thirdweb";
import { getContract } from "thirdweb";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-pastel_on_dark';

const BatchTransactions = () => {

  interface AbiItem {
    type: string;
    name?: string;
    inputs?: { type: string }[];
  }

  interface Transaction {
    method: `function ${string}`;
    params: string[];
  }

  const clientId = process.env.NEXT_PUBLIC_ThirdWebClientId as string
        const client = createThirdwebClient({
          clientId: clientId,
        });

  const [jsonData, setJsonData] = useState<Transaction[]>(
    [
      {
        "method": "function mintTo(address to, uint256 amount)",
        "params": ["0x1234567890abcdef1234567890abcdef12345678", "100"]
      },
      {
        "method": "function transfer(address to, uint256 amount)",
        "params": ["0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", "500"]
      },
      {
        "method": "function approve(address spender, uint256 amount)",
        "params": ["0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef", "200"]
      }
    ]
  );

  const handleJsonChange = (content: any) => {
    try {
      const parsedJson = JSON.parse(content);
      setJsonData(parsedJson);
    } catch (error) {
      console.error("JSON Input Error:", error);
    }
  };


  const suportedChains = [
    { id: 1, name: "Ethereum", image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032", chain: sepolia },
    { id: 2, name: "Binance Smart Chain", image: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032", chain: bscTestnet },
    { id: 3, name: "Matic", image: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032", chain: polygonAmoy },
    { id: 7, name: "Avalanche", image: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032", chain: avalancheFuji },
    { id: 9, name: "Optimism", image: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032", chain: optimismSepolia },
    { id: 10, name: "Arbitrum", image: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032", chain: arbitrumSepolia },
    { id: 11, name: "Base", image: "https://tokenlogo.xyz/assets/chain/base.svg", chain: baseSepolia },
  ];

  const [selectedChain, setSelectedChain] = useState(suportedChains[0]);
  const [dropdownOpenChain, setDropdownOpenChain] = useState(false);
  const [toggleJsonEditor, setToggleJsonEditor] = useState(false);
  const [ABI, setABI] = useState<AbiItem[]>([]);
  const [contractAddress, setContractAddress] = useState<string>("");

  

  const handleChainChange = (chain: { id: number, name: string, image: string, chain: Chain }) => {
    setSelectedChain(chain);
    setDropdownOpenChain(false);
  };

  const handleTogleJsonEdior = () => {
    setToggleJsonEditor(!toggleJsonEditor);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
    const file = files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = JSON.parse(e.target?.result as string);
          setJsonData(result);
        } catch (err) {
          console.log("Failed to parse JSON file");
        }
      };
      reader.readAsText(file);
    } else {
      console.log("Please upload a valid JSON file");
    }
  };
}

const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setContractAddress(event.target.value);
};

const handleAbiChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const abi = event.target.value;
  try {
    const parsedAbi:AbiItem[]  = JSON.parse(abi);
    if (Array.isArray(parsedAbi)) {
      setABI(parsedAbi);
    } else {
      console.log("Invalid ABI format. ABI should be a JSON array.");
    }
  } catch (err) {
    console.log("Failed to parse ABI JSON");
  }
};

const handleSubmit = async (event: React.FormEvent) => {

  const res = verifyTransactions(ABI,jsonData);

  if(res)
    {

      const contract = getContract({
        client,
        chain: selectedChain.chain,
        address: contractAddress,
      });

      /// @ts-expect-error
      const transactions = jsonData.map(tx => prepareContractCall({
        contract:contract,
        method: tx.method,
        params: tx.params,
      }));
    }


}

  return (
    <div className="p-2">
      <SupportedCoins />

      <div className="bg-gray-800 rounded-xl mt-4 p-4 shadow-lg">
        <div className="flex justify-between">
        <label className="block mb-2 text-lg font-medium text-white"></label>
          <div className="flex gap-x-2 items-center">
            <div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input onChange={() => handleTogleJsonEdior()} id="switch-2" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch-2" className="hidden"></label>
                <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-400 peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
              </label>
            </div>

            <button
              onClick={() => { }}
              className="focus:outline-none"
              aria-label="Add contact"
            >
              <IoAdd size={30} className="text-gray-200" />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-2 rounded-lg p-2">
          {
            toggleJsonEditor ?
              <AceEditor
                mode="json"
                theme="pastel_on_dark"
                value={JSON.stringify(jsonData, null, 2)}
                onChange={(newValue) => handleJsonChange(newValue)}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: false }}
                style={{ width: '100%', minHeight: '200px', borderRadius: '10px' }}
              />
              :
              <div className="flex items-center justify-center w-full h-ful">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-00 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 border-blue-500 hover:border-blue-400">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <BsFiletypeJson size={44} className="mb-2" />
                    <p className="text-sm text-gray-400">Drag and drop a JSON file or</p>
                    <p className="text-sm text-blue-500 hover:underline cursor-pointer">Choose a file</p>
                  </div>
                  <input onChange={handleFileUpload} id="dropzone-file" type="file" className="hidden" accept=".json" />
                </label>
              </div>
          }


          <div className="flex flex-col gap-4 w-full px-4">

            <div>
              <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white">Contract Address</label>
              <input onChange={handleAddressChange} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div>
              <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white">Network</label>
              <button
                id="coin"
                onClick={() => setDropdownOpenChain(!dropdownOpenChain)}
                className="w-full bg-gray-700 text-white p-2 rounded-xl flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <img src={selectedChain.image} alt={selectedChain.name} className="w-6 h-6 rounded-full" />
                  <span className='text-md'>{selectedChain.name}</span>
                </div>
                <HiOutlineChevronDown className="text-gray-400 mx-2" />
              </button>
              {dropdownOpenChain && (
                <div className="absolute z-10 w-[525px] max-h-40 overflow-y-auto bg-gray-700 rounded-xl mt-1 no-scrollbar">
                  {suportedChains.map((chain) => (
                    <div
                      key={chain.id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-900 rounded-xl"
                      onClick={() => handleChainChange(chain)}
                    >
                      <img src={chain.image} alt={chain.name} className="w-6 h-6 rounded-full" />
                      <span className='text-md font-md '>{chain.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract ABI</label>
              <textarea onChange={handleAbiChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABI []"></textarea>
            </div>

            <div>
              <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white">To Address</label>
              <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div>
              <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white">ETH Value</label>
              <input type="number" step="any" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </div>
      </div>

    </div>
  )
}

export default BatchTransactions
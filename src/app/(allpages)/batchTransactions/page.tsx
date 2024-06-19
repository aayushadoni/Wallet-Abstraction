"use client"
import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import SupportedCoins from "@/components/SupportedCoins";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github_dark';

const BatchTransactions = () => {

  const [jsonData, setJsonData] = useState({
    "transactions": [
      {
        "chainId": 1, // Ethereum mainnet
        "from": "0x1234567890123456789012345678901234567890",
        "to": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        "value": "1000000000000000000", // Value in wei
        "gasLimit": "21000", // Gas limit
        "gasPrice": "50000000000" // Gas price in wei
      },
      {
        "chainId": 56, // Binance Smart Chain mainnet
        "from": "0xaabbccddeeffaabbccddeeffaabbccddeeffaabb",
        "to": "0x1122334455667788990011223344556677889900",
        "value": "500000000000000000", // Value in wei
        "gasLimit": "21000", // Gas limit
        "gasPrice": "10000000000" // Gas price in wei
      }
      // Add more transactions as needed
    ]
  });

  const handleJsonChange = (content: any) => {
    try {
      const parsedJson = JSON.parse(content);
      setJsonData(parsedJson);
    } catch (error) {
      console.error("JSON Input Error:", error);
    }
  };

  return (
    <div className="p-2">
      <SupportedCoins />

      <div className="bg-gray-800 rounded-xl mt-4 p-4 shadow-lg">
        <div className="flex justify-between">
        <div className="flex gap-4 items-center">
            <button className="font-semibold text-md text-blue-300 hover:bg-gray-700 px-4 py-2 rounded-lg">
              JSON Editor
            </button>
            <button className="font-semibold text-md text-blue-300 hover:bg-gray-700 px-4 py-2 rounded-lg">
              Transaction History
            </button>
          </div>
          <div className="flex gap-x-2 items-center">
            <div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch-2" type="checkbox" className="peer sr-only" />
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
        <div className="rounded-xl mt-2">
          <AceEditor
            mode="json"
            theme="github_dark"
            value={JSON.stringify(jsonData, null, 2)}
            onChange={(newValue) => handleJsonChange(newValue)}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: false }}
            style={{ width: '100%', minHeight: '200px', borderRadius: '10px' }}
          />
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
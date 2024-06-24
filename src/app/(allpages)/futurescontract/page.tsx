"use client";
import TransactionReceiptCard from "@/components/TransactionHistoryCard";
import { useEffect, useState } from "react";
import axios from "axios";

type TransactionReceipt= {
  blockNumber: string;
  from: string;
  gasUsed: string;
  status: "success" | "reverted";
  to: string | null;
  transactionHash: string;
  type: string;
};

const TransactionHistory = () => {

  const [transactionData, setTransactionData] = useState<TransactionReceipt[]>([]);

const fetchData = async () => {
  try {
      const response = await axios.get('/api/transactions');
      setTransactionData(response.data.transactionsData);
      console.log(response.data)
  } catch (error) {
      console.error('Error fetching data:', error);
      setTransactionData([]);
  }
};

useEffect(() => {
  fetchData();
}, []);


    return (
        <div className="w-full h-[630px] overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-lg shadow-md no-scrollbar">
        {transactionData?.map((receipt, index) => (
          <TransactionReceiptCard key={index} receipt={receipt} />
        ))}
      </div>
    );
};

export default TransactionHistory;

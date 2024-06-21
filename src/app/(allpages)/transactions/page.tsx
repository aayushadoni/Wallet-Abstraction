"use client";
import TransactionReceiptCard from "@/components/TransactionHistoryCard";

type Address = string;
type Hash = string;
type Hex = string;

type Log<quantity = bigint, index = number, removed = boolean> = {
  address: Address;
  data: Hex;
  topics: Hex[];
  blockHash: Hash;
  blockNumber: quantity;
  logIndex: index;
  removed: removed;
  transactionHash: Hash;
  transactionIndex: index;
};

type TransactionType = string;

type TransactionReceipt<quantity = bigint, index = number, status = "success" | "reverted", type = TransactionType> = {
  blobGasPrice?: quantity;
  blobGasUsed?: quantity;
  blockHash: Hash;
  blockNumber: quantity;
  contractAddress: Address | null | undefined;
  cumulativeGasUsed: quantity;
  effectiveGasPrice: quantity;
  from: Address;
  gasUsed: quantity;
  logs: Array<Log<quantity, index, false>>;
  logsBloom: Hex;
  root?: Hash;
  status: status;
  to: Address | null;
  transactionHash: Hash;
  transactionIndex: index;
  type: type;
};

const sampleReceipts:TransactionReceipt[] = [
    {
      blockHash: '0x123abc...',
      blockNumber: BigInt(123456),
      contractAddress: null,
      cumulativeGasUsed: BigInt(21000),
      effectiveGasPrice: BigInt(20000000000),
      from: '0xabc123...',
      gasUsed: BigInt(21000),
      logs: [],
      logsBloom: '0x...',
      status: 'success',
      to: '0xdef456...',
      transactionHash: '0x456def...',
      transactionIndex: 1,
      type: '0x0',
    },
    {
      blockHash: '0x456def...',
      blockNumber: BigInt(654321),
      contractAddress: '0xcontract123...',
      cumulativeGasUsed: BigInt(30000),
      effectiveGasPrice: BigInt(25000000000),
      from: '0x123abc...',
      gasUsed: BigInt(30000),
      logs: [],
      logsBloom: '0x...',
      status: 'reverted',
      to: '0x789ghi...',
      transactionHash: '0x789ghi...',
      transactionIndex: 2,
      type: '0x0',
    },
    {
      blockHash: '0x789ghi...',
      blockNumber: BigInt(987654),
      contractAddress: null,
      cumulativeGasUsed: BigInt(50000),
      effectiveGasPrice: BigInt(30000000000),
      from: '0xdef456...',
      gasUsed: BigInt(50000),
      logs: [],
      logsBloom: '0x...',
      status: 'success',
      to: '0xabc123...',
      transactionHash: '0xabc123...',
      transactionIndex: 3,
      type: '0x0',
    },
    {
      blockHash: '0xabc123...',
      blockNumber: BigInt(111222),
      contractAddress: null,
      cumulativeGasUsed: BigInt(15000),
      effectiveGasPrice: BigInt(15000000000),
      from: '0x789ghi...',
      gasUsed: BigInt(15000),
      logs: [],
      logsBloom: '0x...',
      status: 'success',
      to: '0xdef456...',
      transactionHash: '0xdef456...',
      transactionIndex: 4,
      type: '0x0',
    }
  ];

const TransactionHistory = () => {
    return (
        <div className="w-full h-[630px] overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-lg shadow-md no-scrollbar">
        {sampleReceipts.map((receipt, index) => (
          <TransactionReceiptCard key={index} receipt={receipt} />
        ))}
      </div>
    );
};

export default TransactionHistory;

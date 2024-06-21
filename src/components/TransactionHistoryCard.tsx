import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExternalLinkAlt } from 'react-icons/fa';

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

interface TransactionReceiptCardProps {
  receipt: TransactionReceipt;
}

const TransactionReceiptCard: React.FC<TransactionReceiptCardProps> = ({ receipt }) => {
  const getStatusIcon = (status: string) => {
    return status === 'success' ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaTimesCircle className="text-red-500" />
    );
  };

  return (
    <div className="w-full mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden p-4 my-4">
      <div className="flex items-center space-x-4">
        <div>{getStatusIcon(receipt.status)}</div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">Transaction Receipt</h2>
          <p className="text-gray-400">Hash: {receipt.transactionHash}</p>
        </div>
        <a
          href={`https://etherscan.io/tx/${receipt.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-300"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
      <div className="mt-4">
        <div className="text-gray-400">
          <p>
            <span className="font-semibold text-white">From:</span> {receipt.from}
          </p>
          <p>
            <span className="font-semibold text-white">To:</span> {receipt.to || 'Contract Creation'}
          </p>
          <p>
            <span className="font-semibold text-white">Block Number:</span> {receipt.blockNumber.toString()}
          </p>
          <p>
            <span className="font-semibold text-white">Gas Used:</span> {receipt.gasUsed.toString()}
          </p>
          <p>
            <span className="font-semibold text-white">Status:</span> {receipt.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionReceiptCard;

import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExternalLinkAlt } from 'react-icons/fa';

type TransactionReceipt = {
  blockNumber: string;
  from: string;
  gasUsed: string;
  status: 'success' | 'reverted';
  to: string | null;
  transactionHash: string;
  type: string;
};

interface TransactionReceiptCardProps {
  receipt: TransactionReceipt;
}

const TransactionReceiptCard: React.FC<TransactionReceiptCardProps> = ({ receipt }) => {
  const getStatusIcon = (status: 'success' | 'reverted') => {
    return status === 'success' ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaTimesCircle className="text-red-500" />
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon(receipt.status)}
          <div>
            <h2 className="text-lg font-semibold text-white">Transaction Receipt</h2>
            <p className="text-sm font-medium text-gray-400">{receipt.transactionHash.substring(0, 28)}...{receipt.transactionHash.substring(receipt.transactionHash.length - 4)}</p>
          </div>
        </div>
        <a
          href={`https://etherscan.io/tx/${receipt.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-300"
        >
          <FaExternalLinkAlt className="text-lg" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-2 pl-6">
        <div>
          <p className="text-sm font-medium text-gray-400">From</p>
          <p className="text-white">{receipt.from}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">To</p>
          <p className="text-white">{receipt.to || 'Contract Creation'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Block Number</p>
          <p className="text-white">{receipt.blockNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Gas Used</p>
          <p className="text-white">{receipt.gasUsed}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Status</p>
          <p className={`text-white ${receipt.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {receipt.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionReceiptCard;

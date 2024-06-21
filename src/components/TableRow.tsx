import React from 'react';
import Image from 'next/image';
import CoinNameRow from './CoinNameRow';
import Rate from './Rate';

interface TableRowProps {
  starNum: number;
  coinName: string;
  coinIcon?: string;
  coinSymbol: string;
  price?: number;
  hRate?: number;
  dRate?: number;
  hRateIsIncrement?: boolean;
  dRateIsIncrement?: boolean;
  marketCapValue?: number;
  volumeValue?: number;
  volumeCrypto?: number;
  circulatingSupply?: number;
}

const TableRow: React.FC<TableRowProps> = ({
  starNum,
  coinName,
  coinIcon,
  coinSymbol = '---',
  price = '----',
  hRate = '---',
  dRate = '---',
  hRateIsIncrement,
  dRateIsIncrement,
  marketCapValue = '---',
  volumeValue = '---',
  volumeCrypto = '---',
}) => {
  

  const graphImages = [
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7129.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3957.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/328.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2416.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1765.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2099.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7653.svg',
  ];

  const getRandomGraph = () => {
    const rndInt = Math.floor(Math.random() * 10) + 1;
    return graphImages[rndInt];
  };

  const formatNum = (num: any) => {
    return Number(num.toFixed(2)).toLocaleString();
  };

  return (
    <tbody>
      <tr className="bg-gray-800 hover:bg-gray-900 transition-colors text-white border-b border-gray-800 text-sm rounded-xl">
        <td className="py-3 px-4">{starNum}</td>
        <td className="py-3 px-4 cursor-pointer">
          {coinIcon && (
            <CoinNameRow name={coinName} icon={coinIcon} />
          )}
        </td>
        <td className="py-3 px-4 cursor-pointer">
          <p>${formatNum(price)}</p>
        </td>
        <td className="py-3 px-4">
          <Rate isIncrement={hRateIsIncrement} rate={`${formatNum(hRate)}%`} />
        </td>
        <td className="py-3 px-4">
          <Rate isIncrement={dRateIsIncrement} rate={`${formatNum(dRate)}%`} />
        </td>
        <td className="py-3 px-4">
          <div>
            <p>${formatNum(marketCapValue)}</p>
          </div>
        </td>
        <td className="py-3 px-4">
          <div>
            <p>{formatNum(volumeValue)}</p>
            <div className="text-gray-400 flex flex-row gap-2">
              <span>{formatNum(volumeCrypto)}</span>
              <span>{coinSymbol}</span>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <Image src={getRandomGraph()} width={200} height={80} alt="" />
        </td>
      </tr>
    </tbody>
  );
};

export default TableRow;

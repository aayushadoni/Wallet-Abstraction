import React from "react";
import Image from 'next/image';
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

type Coin = {
  id: number;
  name: string;
  symbol:string;
  graph: string;
  change: string;
  price: number;
  volume: number;
  image: string;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  total_supply: number;
  circulating_supply: number;
  cmc_rank: number;
};

export function MarketCard({ coins }: { coins: Coin[] }): JSX.Element {
  return (
    <div className="p-6 rounded-xl shadow-md bg-gray-800">
      <h1 className="font-bold text-xl border-b pb-2 mb-4 text-gray-100">Market</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <TableHeader />
          {coins.map((coin, index) => (
            <TableRow
              key={coin.id}
              starNum={index + 1}
              coinName={coin.name}
              coinIcon={coin.image}
              coinSymbol={coin.symbol}
              price={coin.price}
              hRate={coin.percent_change_24h}
              dRate={coin.percent_change_7d}
              hRateIsIncrement={coin.percent_change_24h >= 0}
              dRateIsIncrement={coin.percent_change_7d >= 0}
              marketCapValue={coin.market_cap}
              volumeValue={coin.volume}
              volumeCrypto={coin.volume/coin.price}
            />
          ))}
        </table>
      </div>
    </div>
  )
}

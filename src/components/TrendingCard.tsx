import React from "react";

type Coin = {
  id: number;
  name: string;
  symbol: string;
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

export function TrendingCard({ coins }: { coins: Coin[] }): JSX.Element {
  return (
    <div className="p-6 rounded-xl shadow-md bg-blue-500 text-white transform transition-transform duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Prices of Trending Coins 🔥</h1>
      </div>
      <div className="flex flex-col gap-4">
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between p-2 bg-blue-500 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={`${coin.name} logo`} className="w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <span className="text-base font-medium">{coin.name} ({coin.symbol})</span>
                <span className={`text-sm ${coin.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.percent_change_24h.toFixed(2)}% (24h)
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-bold">{coin.price.toLocaleString()} USD</span>
              <span className="text-sm text-gray-200">{coin.market_cap.toLocaleString()} MCap</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

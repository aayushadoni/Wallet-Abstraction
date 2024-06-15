import {NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

type CoinData = {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
    };
  };
  total_supply: number;
  circulating_supply: number;
  cmc_rank: number;
};

type Coin = {
  id: number;
  name: string;
  graph: string;
  change: string;
  price: number;
  volume: number;
  image: string;
  symbol: string;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  total_supply: number;
  circulating_supply: number;
  cmc_rank: number;
};
export async function GET() {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.API_KEY}`,
      {
        headers: {
          Accept: '*/*',
        },
      }
    );

    const data = response.data;

    const coins: Coin[] = data.data.map((coin: CoinData) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      graph: `https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${coin.id}.svg`,
      change: `${coin.quote.USD.percent_change_24h}%`,
      price: coin.quote.USD.price,
      volume: coin.quote.USD.volume_24h,
      image: `https://cryptologos.cc/logos/${coin.name.toLowerCase()}-${coin.symbol.toLowerCase()}-logo.svg?v=032`,
      percent_change_24h: coin.quote.USD.percent_change_24h,
      percent_change_7d: coin.quote.USD.percent_change_7d,
      market_cap: coin.quote.USD.market_cap,
      total_supply: coin.total_supply,
      circulating_supply: coin.circulating_supply,
      cmc_rank: coin.cmc_rank,

    }));

    return NextResponse.json({ coins });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
}

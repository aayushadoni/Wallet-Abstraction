import { useSetRecoilState } from "recoil";
import { tokenBalanceAtomFamily } from "../lib/states";
import { getWalletTokens } from "./getWalletTokens";
import { sepolia, bscTestnet, avalancheFuji, optimismSepolia, arbitrumSepolia, baseSepolia, polygonAmoy } from "thirdweb/chains";

const chains = [
  { name: 'Ethereum', chain: sepolia, atomName: "ETH" },
  { name: 'Binance Smart Chain', chain: bscTestnet, atomName: "BSC" },
  { name: 'Polygon', chain: polygonAmoy, atomName: "MATIC" },
  { name: 'Avalanche', chain: avalancheFuji, atomName: "AVALANCHE" },
  { name: 'Optimism', chain: optimismSepolia, atomName: "OPTIMISM" },
  { name: 'Arbitrum', chain: arbitrumSepolia, atomName: "ARBITRUM" },
  { name: 'Base', chain: baseSepolia, atomName: "BASE" },
];

export const useFetchTokenBalances = (address: string) => {
  const setTokenBalances = chains.map(({ atomName }) => useSetRecoilState(tokenBalanceAtomFamily(atomName)));

  const fetchBalances = async () => {
    await Promise.all(
      chains.map(async ({ atomName,chain }, index) => {
        const balance = await getWalletTokens(address, chain);
        const displayValue = balance?.displayValue;
        setTokenBalances[index](displayValue || "0");
      })
    );
  };

  return fetchBalances;
};

import { useSetRecoilState } from "recoil";
import { tokenBalanceAtomFamily } from "../lib/states";
import { getWalletTokens } from "./getWalletTokens";
import { sepolia, bscTestnet, avalancheFuji, optimismSepolia, arbitrumSepolia, baseSepolia, polygonAmoy } from "thirdweb/chains";

  export const getTokenBalance = async (address: string) => {

    const chains = [
        { name: 'Ethereum', chain: sepolia, atomName:"ETH" },
        { name: 'Binance Smart Chain', chain: bscTestnet, atomName:"BSC" },
        { name: 'Polygon', chain: polygonAmoy, atomName:"MATIC" },
        { name: 'Avalanche', chain: avalancheFuji, atomName:"AVALANCHE" },
        { name: 'Optimism', chain: optimismSepolia, atomName:"OPTIMISM" },
        { name: 'Arbitrum', chain: arbitrumSepolia, atomName:"ARBITRUM" },
        { name: 'Base', chain: baseSepolia, atomName:"BASE" },
      ]; 

    await Promise.all(
      chains.map(async ({ name, chain, atomName }) => {
        const setBalanceAtom = useSetRecoilState(tokenBalanceAtomFamily(atomName)); 
        const balance = await getWalletTokens(address, chain);
        const displayValue = balance?.displayValue;
        setBalanceAtom(displayValue||"0")
      })
    );
  };
    
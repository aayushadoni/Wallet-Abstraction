import { useSetRecoilState } from "recoil";
import { tokenBalanceAtomFamily } from "../lib/states";
import { getWalletTokens } from "./getWalletTokens";
import { ethereum, bsc, avalanche, optimism, arbitrum, base, polygon } from "thirdweb/chains";

  export const getTokenBalance = async (address: string) => {

    const chains = [
        { name: 'Ethereum', chain: ethereum, atomName:"ETH" },
        { name: 'Binance Smart Chain', chain: bsc, atomName:"BSC" },
        { name: 'Polygon', chain: polygon, atomName:"MATIC" },
        { name: 'Avalanche', chain: avalanche, atomName:"AVALANCHE" },
        { name: 'Optimism', chain: optimism, atomName:"OPTIMISM" },
        { name: 'Arbitrum', chain: arbitrum, atomName:"ARBITRUM" },
        { name: 'Base', chain: base, atomName:"BASE" },
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
    
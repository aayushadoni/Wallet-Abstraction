import { getWalletBalance } from "thirdweb/wallets"
import { baseSepolia,bscTestnet,optimismSepolia,arbitrumSepolia,sepolia,polygonAmoy,avalancheFuji } from "thirdweb/chains"
import { Chain } from "thirdweb";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  secretKey: process.env.NEXT_PUBLIC_ThirdWebAPISceret as string,
});

export const getWalletTokens = async (address: string, chain: Chain) => {
  try {
    const balance = await getWalletBalance({
      address: address,
      client: client,
      chain: chain,
    });

    return balance;
  } catch (error) {
    console.error(`Error fetching balance for chain ${chain.name}:`, error);
    return null;
  }
  
};
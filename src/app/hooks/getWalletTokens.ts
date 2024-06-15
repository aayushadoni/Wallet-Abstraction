import { getWalletBalance } from "thirdweb/wallets"
import { baseSepolia,bscTestnet,optimismSepolia,arbitrumSepolia,sepolia,polygonAmoy,avalancheFuji } from "thirdweb/chains"
import { Chain } from "thirdweb";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  secretKey: process.env.NEXT_PUBLIC_ThirdWebAPISceret as string,
});

export const getWalletTokens = async (address:string,chain:Chain)=>{

    const balanceEth = await getWalletBalance({
        address:address,
        client:client,
        chain:chain,
      });

      return balanceEth;

}
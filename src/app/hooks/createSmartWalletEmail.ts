import axios from "axios";
import { createThirdwebClient } from "thirdweb";
import { smartWallet,Account } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";

export const createSmartWalletEmail = async (account:Account)=>{
  
  const client = createThirdwebClient({
    secretKey: process.env.NEXT_PUBLIC_ThirdWebAPISceret as string,
  });

  const wallet = smartWallet({
    chain: baseSepolia,
    gasless: true,
  });
   
  const smartAccount = await wallet.connect({
    client,
    personalAccount: account,
  });

  const response = await axios.post('/api/user', {type:"email", eoaAddress:account.address,smartWalletAddress:smartAccount.address});   

}
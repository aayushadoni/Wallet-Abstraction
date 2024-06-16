import { createThirdwebClient } from "thirdweb";
import { Account } from "thirdweb/wallets";
import axios from "axios";
import { smartWallet } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";

export const createSmartWalletEOA = async (account:Account)=>{


  const client = createThirdwebClient({
    secretKey: process.env.NEXT_PUBLIC_ThirdWebAPISceret as string,
  });

  const personalWalletAddress = account.address

  const wallet = smartWallet({
    chain: baseSepolia,
    gasless: true,
  });
   
  const smartAccount = await wallet.connect({
    client,
    personalAccount: account,
  });

  console.log(smartAccount);

  const response = await axios.post('/api/user', {type:"eoa", eoaAddress:personalWalletAddress,smartWalletAddress:smartAccount.address});

}
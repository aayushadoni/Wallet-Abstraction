import { getContract, createThirdwebClient, prepareContractCall, sendTransaction,resolveMethod, defineChain  } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
import { Account } from "thirdweb/wallets";
import axios from "axios";
import { smartWallet } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";

export const createSmartWalletEOA = async (account:Account)=>{


  const client = createThirdwebClient({
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY as string,
  });

  const personalWalletAddress = account.address
  
  const dappOwenrWallet = privateKeyToAccount({
    client,
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
  });

  const contract = getContract({ 
    client, 
    chain: defineChain(84532), 
    address: "0x612f4FF699ca187589149a51B0cbc332d86f1AFA"
  });

  const transaction = await prepareContractCall({ 
    contract, 
    method: resolveMethod("createAccount"), 
    params: [personalWalletAddress, "0x"] 
  });
  const { transactionHash } = await sendTransaction({ 
    transaction:transaction, 
    account :dappOwenrWallet,
  })

  const wallet = smartWallet({
    chain: baseSepolia,
    gasless: true,
    factoryAddress: process.env.NEXT_PUBLIC_FactoryAddress
  });
   
  const smartAccount = await wallet.connect({
    client,
    personalAccount: account,
  });

  const response = await axios.post('/api/user', {eoaAddress:personalWalletAddress,smartWalletAddress:smartAccount.address});

}
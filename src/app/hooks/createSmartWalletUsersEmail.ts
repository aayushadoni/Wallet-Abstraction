import axios from "axios";
import { getContract, createThirdwebClient, prepareContractCall, sendTransaction,resolveMethod, defineChain  } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
import { LocalWallet } from "@thirdweb-dev/wallets";
import { MyPrismaStorage } from "./localAsyncStorage";

export const createSmartWallet = async (email:string)=>{
  
  const client = createThirdwebClient({
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY as string,
  });

  const personalWallet = new LocalWallet({storage: new MyPrismaStorage(email),secretKey:process.env.NEXT_PUBLIC_SECRET_KEY,clientId:process.env.NEXT_PUBLIC_CLIENT_ID});

  await personalWallet.generate();

  const savedWallet = await personalWallet.save({
    strategy: "privateKey",
    encryption:{password: "password"},
    });
  
  const personalWalletAddress = await personalWallet.getAddress()

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

}
import axios from "axios";
import { createThirdwebClient } from "thirdweb";
import { smartWallet,Account } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";

export const createSmartWalletEmail = async (eoaAccount:Account,smartWallet:Account)=>{

  const response = await axios.post('/api/user', {type:"email", eoaAddress:eoaAccount.address,smartWalletAddress:smartWallet.address});   

}
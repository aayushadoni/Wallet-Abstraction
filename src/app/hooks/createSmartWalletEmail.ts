import axios from "axios";
import { Account } from "thirdweb/wallets";

export const createSmartWalletEmail = async (eoaAccount:Account,smartWallet:Account)=>{

  const response = await axios.post('/api/user', {type:"email", eoaAddress:eoaAccount.address,smartWalletAddress:smartWallet.address});   

}
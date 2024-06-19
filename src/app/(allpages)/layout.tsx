"use client"
import { IoLogoBuffer } from "react-icons/io";
import { FaWallet } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { PiHandDepositFill } from "react-icons/pi";
import { FaGasPump } from "react-icons/fa";
import { MdPowerSettingsNew } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { smartWallet,createWallet, injectedProvider } from "thirdweb/wallets";
import { useEffect,useState } from "react";
import { baseSepolia,sepolia} from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeAccountAtom,smartWalletAddressAtom} from "../lib/states";
import { useFetchTokenBalances } from "@/app/hooks/getTokenBalance";


export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {

    const { data: session, status } = useSession()

    if(status === "unauthenticated")
        redirect("/login")

    const activeAccountValue = useRecoilValue(activeAccountAtom);
    const setSmartWalletAddress = useSetRecoilState(smartWalletAddressAtom);
    const setActiveAccount = useSetRecoilState(activeAccountAtom);
    const [activeNetwork, setActiveNetwork] = useState(baseSepolia.name);
    
   

    useEffect(() => {
      const fetchData = async () => {
        try {
          const clientId = process.env.NEXT_PUBLIC_ThirdWebClientId as string
          const client = createThirdwebClient({
              clientId: clientId,
            });
          
          if(session?.user.email && status=="authenticated")
            {
              
            }
            else if(session?.user.eoaAddress && status=="authenticated")
              {
                if(activeAccountValue != null)
                  {
                    const wallet = smartWallet({
                      chain: baseSepolia,
                      gasless: true,
                    });
                     
                    const account = await wallet.connect({
                      client,
                      personalAccount: activeAccountValue,
                    });
                    
                    setSmartWalletAddress(account.address);
                  }
                else
                {
                  if (injectedProvider("io.metamask")) {
                    const metamask = createWallet("io.metamask");
                    const metamaskWallet = await metamask.connect({ client });
                    setActiveAccount(metamaskWallet)
                    const wallet = smartWallet({
                      chain: baseSepolia,
                      gasless: true,
                    });
                     
                    const account = await wallet.connect({
                      client,
                      personalAccount: metamaskWallet,
                    });
                    setSmartWalletAddress(account.address);
                  }
                  else if (injectedProvider("com.coinbase.wallet")) {
                    const coinbase = createWallet("com.coinbase.wallet");
                    const val = await coinbase.connect({ client });
                    setActiveAccount(val)
                    const wallet = smartWallet({
                      chain: baseSepolia,
                      gasless: true,
                    });
                     
                    const account = await wallet.connect({
                      client,
                      personalAccount: val,
                    });
                    setSmartWalletAddress(account.address);
                  }
                  else {
                    const walletconnect = createWallet("walletConnect");
                    const val = await walletconnect.connect({ client });
                    setActiveAccount(val)
                    const wallet = smartWallet({
                      chain: baseSepolia,
                      gasless: true,
                    });
                     
                    const account = await wallet.connect({
                      client,
                      personalAccount: val,
                    });
                    setSmartWalletAddress(account.address);
                  }
                }  

              }
              const smartWalletValue = useRecoilValue(smartWalletAddressAtom);
              const fetchTokenBalance = useFetchTokenBalances(smartWalletValue);
              await fetchTokenBalance();

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [status]);

    const router = useRouter()

    const handleNetworkSwitch = (network: string) => {
      setActiveNetwork(network);
      // Additional logic for switching networks
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="w-72 bg-gray-800 shadow-md pt-10 rounded-lg">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-row items-center gap-2">
            <IoLogoBuffer size={40} className="text-orange-600" />
            <p className="text-2xl font-semibold text-gray-100 pr-4">Wallet Abstraction</p>
          </div>
          <div className="flex flex-col w-full px-4">
            <p className="text-lg font-medium text-gray-300 mb-4">Payments</p>
            <div className="flex flex-col gap-2">
              <div onClick={() => router.push('/wallet')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaWallet size={22} />
                <div className="text-md font-medium text-gray-100">Wallet</div>
              </div>
              <div onClick={() => router.push('/deposit')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <PiHandDepositFill size={22}/>
                <div className="text-md font-medium text-gray-100">Deposit</div>
              </div>
              <div onClick={() => router.push('/p2p')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaMoneyBillTransfer size={22}/>
                <div className="text-md font-medium text-gray-100">P2P Transfer</div>
              </div>
              <div onClick={() => router.push('/contacts')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaUserFriends size={22}/>
                <div className="text-md font-medium text-gray-100">Contacts</div>
              </div>
              <div onClick={() => router.push('/gastopup')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaGasPump size={22}/>
                <div className="text-md font-medium text-gray-100">Gas Fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="flex-1 p-6">
    <div className="flex justify-end">
      <div className="flex flex-row gap-1">
        <div className="flex flex-row rounded-full bg-gray-700 text-gray-200 border-2 border-sky-600 items-center cursor-pointer p-2">
          <div className="flex-grow text-sm font-sm text-gray-200 px-1">{baseSepolia.name}</div>
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-100 mb-[34px] ml-[90px]"></span>
          <span className="absolute inline-flex h-3 w-3 rounded-full bg-sky-500 opacity-100 mb-[34px] ml-[90px]"></span>
        </div>
        <div className="flex flex-row rounded-full bg-gray-700 text-gray-200 items-center cursor-pointer p-2">
          <FaGasPump size={20} className="mr-2 text-sm font-medium text-gray-200" />
          <div className="flex-grow text-sm font-medium text-gray-200 px-1">124 USDC</div>
        </div>
        <button onClick={()=>signOut()} className="ml-2 p-2 rounded-full bg-gray-700">
          <MdPowerSettingsNew size={20} className="text-gray-200 hover:text-red-500" />
        </button>
      </div>
    </div>
        {children}
    </div>
    </div>
  );
}

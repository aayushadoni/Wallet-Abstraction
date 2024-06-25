"use client"
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { TbTransactionBitcoin } from "react-icons/tb";
import { PiHandDepositFill } from "react-icons/pi";
import { FaLayerGroup } from "react-icons/fa";
import { MdPowerSettingsNew } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { smartWallet, createWallet, injectedProvider } from "thirdweb/wallets";
import { useEffect, useState } from "react";
import { baseSepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeAccountAtom, smartWalletAddressAtom } from "../lib/states";
import { inAppWallet } from "thirdweb/wallets/in-app";
import { createSmartWalletEmail } from "@/app/hooks/createSmartWalletEmail";
import { GiWallet } from "react-icons/gi";


export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {

  const { data: session, status } = useSession()

  if (status === "unauthenticated")
    redirect("/login")

  const activeAccountValue = useRecoilValue(activeAccountAtom);
  const setSmartWalletAddress = useSetRecoilState(smartWalletAddressAtom);
  const setActiveAccount = useSetRecoilState(activeAccountAtom);
  const [activeNetwork, setActiveNetwork] = useState(baseSepolia.name)
  console.log("activeAccountValue",activeAccountValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_ThirdWebClientId as string
        const client = createThirdwebClient({
          clientId: clientId,
        });

        if (session?.user.email && status == "authenticated" && activeAccountValue != null) {
          const eoaWallet = activeAccountValue;

          const wallet = smartWallet({
            chain: baseSepolia,
            gasless: true,
          });

          const account = await wallet.connect({
            client,
            personalAccount: eoaWallet,
          });

          setSmartWalletAddress(account.address);
          await createSmartWalletEmail(eoaWallet, account);

        }
        else if (session?.user.eoaAddress && status == "authenticated") {
          if (activeAccountValue != null) {
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
          else {
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
            <GiWallet
              size={40}
              className="text-orange-600 transform transition-transform duration-300 hover:scale-110"
            />
            <p className="text-2xl font-semibold text-gray-100 pr-4 animate-fade-in">
              Wallet Bridge
            </p>
          </div>
          <div className="flex flex-col w-full px-4">
            <div className="flex flex-col gap-2">
              <div onClick={() => router.push('/wallet')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaWallet size={22} />
                <div className="text-md font-medium text-gray-100">Wallet</div>
              </div>
              <div onClick={() => router.push('/deposit')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <PiHandDepositFill size={22} />
                <div className="text-md font-medium text-gray-100">Deposit</div>
              </div>
              <div onClick={() => router.push('/transactions')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <TbTransactionBitcoin size={22} />
                <div className="text-md font-medium text-gray-100">Transaction History</div>
              </div>
              <div onClick={() => router.push('/contacts')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaUserFriends size={22} />
                <div className="text-md font-medium text-gray-100">Contacts</div>
              </div>
              <div onClick={() => router.push('/batchTransactions')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaLayerGroup size={22} />
                <div className="text-md font-medium text-gray-100">Batch Transactions</div>
              </div>
              <div onClick={() => router.push('/futurescontract')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:text-white hover:bg-orange-600 transition-colors duration-200">
                <FaMoneyBillTrendUp size={22} />
                <div className="text-md font-medium text-gray-100">Futures Contract</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-end">
          <div className="flex flex-row gap-1">
            <button onClick={() => signOut()} className="ml-2 p-2 rounded-full bg-gray-700">
              <MdPowerSettingsNew size={20} className="text-gray-200 hover:text-red-500" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

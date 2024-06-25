"use client"
import { useRef, useState } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { createSmartWalletEOA } from '@/app/hooks/createSmartWalletEOA';
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { Account } from 'thirdweb/wallets';
import { useSetRecoilState } from 'recoil';
import { activeAccountAtom } from '@/app/lib/states';
import { preAuthenticate } from "thirdweb/wallets/in-app";
import { inAppWallet } from "thirdweb/wallets/in-app";



export default function Home() {

    
    const clientId = process.env.NEXT_PUBLIC_ThirdWebClientId as string
    const client = createThirdwebClient({
        clientId: clientId,
      });

    const setActiveAccountAtom = useSetRecoilState(activeAccountAtom);

    const { data: session, status } = useSession()

    const email = useRef("");
    const verificationCode = useRef("");

    const onSubmit = async (e:any)=>{
        e.preventDefault();

        const eoaWallet = inAppWallet();

        const eoaAccount = await eoaWallet.connect({
        client,
        strategy: "email",
        email: email.current,
        verificationCode: verificationCode.current,
        });
        setActiveAccountAtom(eoaAccount);
        console.log(eoaAccount);

        await signIn("email-login", {
        email:email.current,
        redirect:true,
        callbackUrl:"/wallet"
        });
    }

    const sendCode = async ()=>{
      await preAuthenticate({
        client,
        strategy: "email",
        email:email.current,
      });
      setCodeSent(true);
    }

    const [account, setAccount] = useState<Account>();
    const [codeSent, setCodeSent] = useState<Boolean>(false);

    const metamask = createWallet("io.metamask");
    const coinbase = createWallet("com.coinbase.wallet");
    const walletconnect = createWallet("walletConnect");
    const address = account?.address

    const loginWithWallet = async (walletType:string) => {

        if(walletType=="metamask" && account==undefined)
            {
                const account = await metamask.connect({ client });
                setAccount(account);
                const signature = await account.signMessage({message:"Enter The Wallet Abstraction App"})
                await signIn("wallet-login", {
                    walletAddress:account.address,
                    signature:signature,
                    redirect:true,
                    callbackUrl:"/wallet"
                });
                setActiveAccountAtom(account);
                await createSmartWalletEOA(account);
            }
        else if(walletType=="coinbase" && account==undefined)
            {
                const account = await coinbase.connect({ client });
                setAccount(account);
                const signature = await account.signMessage({message:"Enter The Wallet Abstraction App"})
                await signIn("wallet-login", {
                    walletAddress:account.address,
                    signature:signature,
                    redirect:true,
                    callbackUrl:"/wallet"
                });
                setActiveAccountAtom(account);
                await createSmartWalletEOA(account);
            }
        else if(walletType=="walletconnect" && account==undefined)
            {
                const account = await walletconnect.connect({ client });
                setAccount(account);
                const signature = await account.signMessage({message:"Enter The Wallet Abstraction App"})
                await signIn("wallet-login", {
                    walletAddress:account.address,
                    signature:signature,
                    redirect:true,
                    callbackUrl:"/wallet"
                });
                setActiveAccountAtom(account);
                await createSmartWalletEOA(account);
            }
    }    

    return (
            <div className="h-screen bg-gray-800 text-gray-900 flex justify-center rounded-xl">
                <div className="max-w-screen-xl sm:m-10 bg-gray-900 shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-3 sm:p-12">
                        <div className="mt-1 flex flex-col items-center">
                            <h1 className="text-xl xl:text-2xl font-bold text-white">
                                Sign up
                            </h1>
                            <div className="w-full flex-1 mt-2">
                                <div className="flex flex-col items-center">
                                <button
                                        onClick={async () => {
                                          loginWithWallet("metamask");
                                        }}
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-gray-100 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 50 48" id="metamask">
                                              <path fill="#E2761B" stroke="#E2761B" stroke-linecap="round" stroke-linejoin="round" d="M46.6094 2L27.88 15.9106L31.3435 7.70353L46.6094 2Z"></path>
                                              <path fill="#E4761B" stroke="#E4761B" stroke-linecap="round" stroke-linejoin="round" d="M3.37177 2L21.9506 16.0424 18.6565 7.70353 3.37177 2zM39.8706 34.2447L34.8824 41.887 45.5553 44.8235 48.6235 34.4141 39.8706 34.2447zM1.39529 34.4141L4.44471 44.8235 15.1176 41.887 10.1294 34.2447 1.39529 34.4141z"></path>
                                              <path fill="#E4761B" stroke="#E4761B" stroke-linecap="round" stroke-linejoin="round" d="M14.5153 21.3318L11.5412 25.8306 22.1388 26.3012 21.7624 14.913 14.5153 21.3318zM35.4659 21.3317L28.1247 14.7812 27.88 26.3012 38.4588 25.8306 35.4659 21.3317zM15.1176 41.8871L21.48 38.7812 15.9835 34.4894 15.1176 41.8871zM28.5012 38.7812L34.8824 41.8871 33.9976 34.4894 28.5012 38.7812z"></path>
                                              <path fill="#D7C1B3" stroke="#D7C1B3" stroke-linecap="round" stroke-linejoin="round" d="M34.8823 41.8871L28.5012 38.7812 29.0094 42.9412 28.9529 44.6918 34.8823 41.8871zM15.1176 41.887L21.0471 44.6917 21.0094 42.9412 21.48 38.7812 15.1176 41.887z"></path>
                                              <path fill="#233447" stroke="#233447" stroke-linecap="round" stroke-linejoin="round" d="M21.1412 31.7412L15.8329 30.1788 19.5788 28.4659 21.1412 31.7412zM28.84 31.7412L30.4024 28.4659 34.1671 30.1788 28.84 31.7412z"></path>
                                              <path fill="#CD6116" stroke="#CD6116" stroke-linecap="round" stroke-linejoin="round" d="M15.1176 41.8872L16.0212 34.2448 10.1294 34.4143 15.1176 41.8872zM33.9788 34.2448L34.8824 41.8872 39.8706 34.4143 33.9788 34.2448zM38.4588 25.8307L27.88 26.3013 28.8588 31.7413 30.4212 28.466 34.1859 30.1789 38.4588 25.8307zM15.8329 30.1789L19.5977 28.466 21.1412 31.7413 22.1388 26.3013 11.5412 25.8307 15.8329 30.1789z"></path>
                                              <path fill="#E4751F" stroke="#E4751F" stroke-linecap="round" stroke-linejoin="round" d="M11.5412 25.8306L15.9835 34.4895 15.8329 30.1789 11.5412 25.8306zM34.1859 30.1789L33.9976 34.4895 38.4588 25.8307 34.1859 30.1789zM22.1388 26.3013L21.1412 31.7413 22.3835 38.1601 22.6659 29.7083 22.1388 26.3013zM27.88 26.3013L27.3717 29.6895 27.5976 38.1601 28.8588 31.7413 27.88 26.3013z"></path>
                                              <path fill="#F6851B" stroke="#F6851B" stroke-linecap="round" stroke-linejoin="round" d="M28.8588 31.7412L27.5976 38.16 28.5012 38.7812 33.9976 34.4895 34.1859 30.1789 28.8588 31.7412zM15.8329 30.1789L15.9835 34.4895 21.48 38.7812 22.3835 38.16 21.1412 31.7412 15.8329 30.1789z"></path>
                                              <path fill="#C0AD9E" stroke="#C0AD9E" stroke-linecap="round" stroke-linejoin="round" d="M28.9529 44.6918L29.0094 42.9412L28.5388 42.5271H21.4424L21.0094 42.9412L21.0471 44.6918L15.1176 41.8871L17.1882 43.5812L21.3859 46.4988H28.5953L32.8118 43.5812L34.8824 41.8871L28.9529 44.6918Z"></path>
                                              <path fill="#161616" stroke="#161616" stroke-linecap="round" stroke-linejoin="round" d="M28.5012 38.7812L27.5977 38.16H22.3835L21.48 38.7812L21.0094 42.9412L21.4424 42.5271H28.5388L29.0094 42.9412L28.5012 38.7812Z"></path>
                                              <path fill="#763D16" stroke="#763D16" stroke-linecap="round" stroke-linejoin="round" d="M47.4 16.8141L49 9.13412 46.6094 2 28.5012 15.44 35.4659 21.3318 45.3106 24.2118 47.4941 21.6706 46.5529 20.9929 48.0588 19.6188 46.8918 18.7153 48.3976 17.5671 47.4 16.8141zM1 9.13412L2.6 16.8141 1.58353 17.5671 3.08941 18.7153 1.94118 19.6188 3.44706 20.9929 2.50588 21.6706 4.67059 24.2118 14.5153 21.3318 21.48 15.44 3.37177 2 1 9.13412z"></path>
                                              <path fill="#F6851B" stroke="#F6851B" stroke-linecap="round" stroke-linejoin="round" d="M45.3106 24.2118L35.4659 21.3318 38.4588 25.8306 33.9977 34.4894 39.8706 34.4141H48.6235L45.3106 24.2118zM14.5153 21.3318L4.6706 24.2118 1.39531 34.4141H10.1294L15.9835 34.4894 11.5412 25.8306 14.5153 21.3318zM27.88 26.3011L28.5012 15.44 31.3623 7.70349H18.6565L21.48 15.44 22.1388 26.3011 22.3647 29.727 22.3835 38.16H27.5976L27.6353 29.727 27.88 26.3011z"></path>
                                            </svg>
                                        </div>
                                        <span className="ml-4">
                                            {address ? 'Sign In': 'Connect' }
                                        </span>
                                    </button>
                                    
                                 <button
                                         onClick={async () => {
                                          loginWithWallet("coinbase");
                                        }} 
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-gray-100 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                        <div className="mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 48 48" id="coinbase"><path fill="#0052FF" d="M0 11.0769C0 4.95931 4.95931 0 11.0769 0H36.9231C43.0407 0 48 4.95931 48 11.0769V36.9231C48 43.0407 43.0407 48 36.9231 48H11.0769C4.95931 48 0 43.0407 0 36.9231V11.0769Z"></path>
                                          <path fill="#fff" d="M23.9548 33C22.2558 32.9657 20.601 32.4534 19.181 31.5223C17.761 30.5911 16.6335 29.2788 15.9283 27.7365C15.2232 26.1943 14.969 24.4847 15.195 22.8047C15.4211 21.1246 16.1182 19.5424 17.2061 18.2402C18.294 16.938 19.7285 15.9687 21.3444 15.444C22.9602 14.9192 24.6918 14.8603 26.3398 15.2741C27.9878 15.6879 29.4851 16.5574 30.6594 17.7827C31.8337 19.008 32.6372 20.5392 32.9774 22.2H42C41.5371 17.6053 39.3215 13.3637 35.8114 10.3527C32.3014 7.34165 27.7655 5.79141 23.1418 6.02259C18.5181 6.25377 14.1604 8.2487 10.9698 11.5948C7.77927 14.9409 6 19.3821 6 24C6 28.6179 7.77927 33.0591 10.9698 36.4052C14.1604 39.7513 18.5181 41.7462 23.1418 41.9774C27.7655 42.2086 32.3014 40.6584 35.8114 37.6473C39.3215 34.6363 41.5371 30.3947 42 25.8H32.9774C32.9774 29.4 27.5638 33 23.9548 33Z"></path>
                                        </svg>
                                        </div>
                                        <span className="ml-1">
                                        {address ? 'Sign In': 'Connect' }
                                        </span>
                                    </button>  
                                    <button
                                        onClick={async () => {
                                            loginWithWallet("walletconnect");
                                        }}  
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-4 bg-gray-100 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                        <div className="mr-2">
                                          <Image src="/WalletConnect-icon.svg" alt="Wallet connect Icon" width={40} height={40} className=''/>
                                        </div>
                                        <span className="">
                                        {address ? 'Sign In': 'Connect' }
                                        </span>
                                    </button>
        
                                </div>
        
                                <div className="my-3 border-b text-center">
                                    <div
                                        className="leading-none px-2 mb-3 inline-block text-sm text-gray-300 tracking-wide font-medium transform translate-y-1/2">
                                        Or sign up with e-mail
                                    </div>
                                </div>

                                {
                                !codeSent ? 
                                    <div className="mx-auto max-w-xs">
                                        <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email" placeholder="Email" 
                                    onChange={(e) => (email.current = e.target.value)} />
                            
                                    <button
                                    onClick={()=>sendCode()}
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        {"Send Code"}
                                    </span>
                                    </button>

                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        {"I agree to abide by "} 
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            {"Terms of Service "} 
                                        </a>
                                        {"and its "}
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            {"Privacy Policy "}
                                        </a>
                                    </p>

                                </div>
                               :
                               <form onSubmit={onSubmit} className="mx-auto max-w-xs">
                                   
                                        <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" placeholder="Password" 
                                        onChange={(e) => (verificationCode.current = e.target.value)} />
                                    <button
                                        type="submit"
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            {"Sign Up / Sign In"}
                                        </span>
                                    </button>
                                         
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        {"I agree to abide by "} 
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            {"Terms of Service "} 
                                        </a>
                                        {"and its "}
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            {"Privacy Policy "}
                                        </a>
                                    </p>
                                </form>

                                }
        
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-lg">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat rounded-lg">
                          <Image src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg" alt="Wallet connect Icon" width={40} height={40} className='h-full w-full'/>
                        </div>
                    </div>
                </div>
            </div>
          );


}
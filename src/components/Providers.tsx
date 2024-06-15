"use client";
import React from 'react';
import { ThirdwebProvider} from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';


const Providers = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  return (
    <RecoilRoot>
    <ThirdwebProvider
        authConfig={{domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string}}
        activeChain={84532} 
        clientId={process.env.NEXT_PUBLIC_ThirdWebClientId}
        secretKey={process.env.NEXT_PUBLIC_ThirdWebAPISceret}>
      <SessionProvider>
        {children}
      </SessionProvider>
  </ThirdwebProvider>
  </RecoilRoot>
  )
}

export default Providers


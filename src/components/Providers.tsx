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
        authConfig={{domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN}}
        activeChain={84532} 
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        secretKey={process.env.NEXT_PUBLIC_SECRET_KEY}>
      <SessionProvider>
        {children}
      </SessionProvider>
  </ThirdwebProvider>
  </RecoilRoot>
  )
}

export default Providers


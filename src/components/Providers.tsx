"use client";
import React from 'react';
import { ThirdwebProvider } from "thirdweb/react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';


const Providers = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  return (
    <RecoilRoot>
    <ThirdwebProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
  </ThirdwebProvider>
  </RecoilRoot>
  )
}

export default Providers


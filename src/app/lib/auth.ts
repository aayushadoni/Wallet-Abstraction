import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials"
import z from "zod";
import { createSmartWalletEmail } from "@/app/hooks/createSmartWalletEmail";
import {
    inAppWallet
  } from "thirdweb/wallets/in-app";

import { createThirdwebClient } from "thirdweb";

const emailCredentialsInput = z.object({
    email: z.string().email(),
    verificationCode: z.string()
})

const walletCredentialsInput = z.object({
    walletAddress: z.string(),
});

const client = createThirdwebClient({
    secretKey: process.env.NEXT_PUBLIC_ThirdWebAPISceret as string,
  });


export const authOptions = {
    providers: [
      CredentialsProvider({
          id: "email-login",
          name: 'email-login',
          credentials: {
            email: { label: "email", type: "email", placeholder: "a@b.com", required: false },
            verificationCode: { label: "verificationCode", type: "string", required: false }
          },
          async authorize(credentials: any) {

            const { success } = emailCredentialsInput.safeParse({email:credentials.email,verificationCode:credentials.verificationCode});
            if(!success)
                {return null;}
            
            const existingUser = await db.userEmail.findFirst({
                where: {
                    email: credentials.email
                }
            });

            if (existingUser) {

                    return {
                        id: existingUser.id.toString(),
                        email: existingUser.email,
                        smartWalletAddress: existingUser.smartWalletAddress,
                    }
            }

            try {

                const wallet = inAppWallet();
                console.log(wallet);

                const account = await wallet.connect({
                client,
                strategy: "email",
                email:credentials.email,
                verificationCode:credentials.verificationCode,
                });
              
                const user = await db.userEmail.create({
                    data: {
                        email: credentials.email,
                        transaction_no:0
                    }
                });

                console.log(account);

                console.log(user);

                await createSmartWalletEmail(account)
                

                return {
                    id: user.id.toString(),
                    eoaAddress:null,
                    email: user.email,
                    smartWalletAddress:user.smartWalletAddress
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        }),

        CredentialsProvider({
            id: "wallet-login",
            name: 'wallet-login',
            credentials: {
                walletAddress: { label: "address", type: "text", placeholder: "0x4FD12b822937efc335793bDc8717b436A49a8F78", required: false },
            },
            async authorize(credentials: any) {
                const { success } = walletCredentialsInput.safeParse({
                    walletAddress: credentials.walletAddress
                });
                if (!success) { return null; }

                const existingUser = await db.userEOA.findFirst({
                    where: {
                        eoaAddress: credentials.walletAddress,
                    }
                });

                if (existingUser) {
                    return {
                        id: existingUser.id.toString(),
                        eoaAddress: existingUser.eoaAddress,
                        transaction_no: existingUser.transaction_no,
                    }
                }

                try {
                    const user = await db.userEOA.create({
                        data: {
                            eoaAddress: credentials.walletAddress,
                            transaction_no: 0,
                        }
                    });

                    return {
                        id:user.id.toString(),
                        eoaAddress: user.eoaAddress,
                        transaction_no: user.transaction_no,
                    }
                } catch (e) {
                    console.error(e);
                }

                return null;
            },
        }),

        
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXT_PUBLIC_JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ token, session }: any) {
      session.user = token.user;
      return session;
    },
  },
};
  
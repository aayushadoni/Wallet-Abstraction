import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import z from "zod";
import { createSmartWallet } from "@/app/hooks/createSmartWalletUsersEmail";

import {
  ThirdwebAuthProvider,
  authSession,
} from "@thirdweb-dev/auth/next-auth";

const credentialsInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const authOptions = {
    providers: [
      CredentialsProvider({
          id: "email-login",
          name: 'email-login',
          credentials: {
            email: { label: "email", type: "email", placeholder: "a@b.com", required: false },
            password: { label: "Password", type: "password", required: false }
          },
          async authorize(credentials: any) {

            const { success } = credentialsInput.safeParse({email:credentials.email,password:credentials.password});
            if(!success)
                {return null;}

            const hashedPassword =  await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.userEmail.findFirst({
                where: {
                    email: credentials.email
                }
            });

            if (existingUser && existingUser.password) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {

                    return {
                        id: existingUser.id.toString(),
                        email: existingUser.email,
                        smartWalletAddress: existingUser.smartWalletAddress,
                    }
                }
                return null;
            }

            try {
              
                const user = await db.userEmail.create({
                    data: {
                        email: credentials.email,
                        password: hashedPassword,
                        transaction_no:0
                    }
                });

                await createSmartWallet(credentials.email)
                

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

        ThirdwebAuthProvider({
          domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
        }),
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {

     async jwt({ token, user }:any) {
        if (user) {
            token.user = user
        }
        return token
        },

      session: authSession,
    },
  }
  
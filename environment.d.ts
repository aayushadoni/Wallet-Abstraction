import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_KEY:string,
      NEXT_PUBLIC_STRIPE_SECRET:string,
      NEXT_PUBLIC_EndPointSecret:string,
      NEXT_PUBLIC_ThirdWebAPISceret:string,
      NEXT_PUBLIC_ThirdWebClientId:string,
      NEXT_PUBLIC_FactoryAddress:string,
      NEXT_PUBLIC_NEXTAUTH_SECRET:string,
      NEXT_PUBLIC_NEXTAUTH_URL:string,
      NEXT_PUBLIC_JWT_SECRET:string,
      NEXT_PUBLIC_ProjectIdWalletConnect:string,
      NEXT_PUBLIC_PRIVATE_KEY:string,
      NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN:string,
      DATABASE_URL:string,
    }
  }
}
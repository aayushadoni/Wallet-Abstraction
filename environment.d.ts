import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        API_KEY:string,
        STRIPE_SECRET:string,
        EndPointSecret:string,
        ThirdWebAPISceret:string,
        ThirdWebClientId:string,
        FactoryAddress:string,
        NEXTAUTH_SECRET:string,
        NEXTAUTH_URL:string,
        JWT_SECRET:string,
        ProjectIdWalletConnect:string,
        PRIVATE_KEY:string,
        NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN:string,
        DATABASE_URL:string,
    }
  }
}
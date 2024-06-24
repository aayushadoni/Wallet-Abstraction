/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cryptologos.cc',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 's3.coinmarketcap.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
          pathname: '**',
        },
      ],
    },
};

export default nextConfig;

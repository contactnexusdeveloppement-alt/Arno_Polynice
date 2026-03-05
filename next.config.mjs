/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return {
      // beforeFiles rewrites are checked before pages/public files
      // This ensures checkout paths go to Shopify before hitting Next.js 404
      beforeFiles: [
        {
          source: '/cart/c/:path*',
          destination: 'https://arno-polynice.myshopify.com/cart/c/:path*',
        },
        {
          source: '/checkouts/:path*',
          destination: 'https://arno-polynice.myshopify.com/checkouts/:path*',
        },
      ],
    };
  },
};

export default nextConfig;

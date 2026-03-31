import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'troops-boom-samuel-matches.trycloudflare.com',
      },
    ],
  },
}

export default nextConfig

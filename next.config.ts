import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fda-outlined-tries-circus.trycloudflare.com',
      },
    ],
  },
}

export default nextConfig

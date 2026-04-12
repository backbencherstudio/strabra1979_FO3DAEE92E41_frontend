import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'increases-occasions-lucas-man.trycloudflare.com',
      },
      {
        protocol: 'https',
        hostname: 'backend.roofwellnesshub.com',
      },
      {
        protocol: 'https',
        hostname: '*.trycloudflare.com',
      },
    ],
  },
}

export default nextConfig

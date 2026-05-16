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
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',
        hostname: '192.168.7.68',
        port: '9005',
        // pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig

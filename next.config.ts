import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  env: {},
}

module.exports = nextConfig
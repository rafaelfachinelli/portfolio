import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  env: {},
  images: {
    domains: ['flagcdn.com'],
  },
}

module.exports = nextConfig

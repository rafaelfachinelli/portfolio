import path from 'node:path'

import { NextConfig } from 'next'

// The app lives in apps/site of an npm workspaces monorepo; Next must resolve
// modules from the repository root (hoisted node_modules, workspace packages).
const monorepoRoot = path.resolve(process.cwd(), '../..')

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Workspace packages ship TypeScript source.
  transpilePackages: ['@datum/tokens'],
  turbopack: {
    root: monorepoRoot,
  },
  outputFileTracingRoot: monorepoRoot,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
}

export default nextConfig

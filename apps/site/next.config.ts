import path from 'node:path'

import { NextConfig } from 'next'

// The app lives in apps/site of an npm workspaces monorepo; Next must resolve
// modules from the repository root (hoisted node_modules, workspace packages).
const monorepoRoot = path.resolve(process.cwd(), '../..')

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Workspace packages ship TypeScript source.
  transpilePackages: ['@datum/tokens', '@datum/ui'],
  turbopack: {
    root: monorepoRoot,
  },
  outputFileTracingRoot: monorepoRoot,
  experimental: {
    // The Tailwind CSS (~14 KiB gzip) goes inline in <head>, so the first
    // paint no longer waits for a second request (HTML → CSS chain).
    inlineCss: true,
    // `import { Button } from '@datum/ui'` resolves to the Button module only,
    // so a page does not ship the client code of components it does not use.
    optimizePackageImports: ['@datum/ui'],
  },
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

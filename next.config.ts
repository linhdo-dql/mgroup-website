/**
 * Next.js configuration for the M.Group corporate website.
 * Configured with strict React mode, standalone output for Docker deployment,
 * explicit file tracing root, and security headers.
 */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  outputFileTracingRoot: import.meta.dirname,
  eslint: {
    // ESLint v9 flat config is executed explicitly via `npm run lint --max-warnings=0` in `npm run verify`
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig

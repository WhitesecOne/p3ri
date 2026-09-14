import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// docs/SECURITY.md §6. ponytail: CSP penuh ditunda — admin Payload butuh inline script; tambah nonce-based CSP kalau ada audit.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
]

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/*.png' }],
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  // docs/ARCHITECTURE.md §6 — URL lama WordPress. Post lama (/{slug}/) ditangani src/app/(frontend)/[slug]/page.tsx.
  async redirects() {
    return [
      { source: '/services', destination: '/membership', permanent: true },
      { source: '/security.txt', destination: '/.well-known/security.txt', permanent: true },
      { source: '/category/:slug', destination: '/blog?kategori=:slug', permanent: true },
      { source: '/feed', destination: '/blog', permanent: true },
      { source: '/wp-admin/:path*', destination: '/admin', permanent: true },
      // Media lama tidak dimigrasi 1:1 (docs/PRD.md §5) — jangan 404, arahkan ke daftar artikel.
      { source: '/wp-content/uploads/:path*', destination: '/blog', permanent: false },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: { root: path.resolve(dirname) },
  agentRules: false,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

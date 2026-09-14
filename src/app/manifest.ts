import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'P3RI — Perkumpulan Profesi Pengelola Rekod Indonesia',
    short_name: 'P3RI',
    description: 'Organisasi profesi resmi pengelola rekod dan arsip di Indonesia.',
    lang: 'id',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#b80016',
    icons: [
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}

import type { CollectionConfig } from 'payload'
import { randomUUID } from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone, isLoggedIn } from '@/access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  admin: { group: 'Konten', defaultColumns: ['filename', 'alt', 'uploadedBy', 'updatedAt'] },
  access: {
    read: anyone,
    create: isLoggedIn,
    // Author hanya boleh ubah/hapus unggahannya sendiri; Editor/Admin semua.
    update: ({ req: { user } }) =>
      !user ? false : user.role === 'author' ? { uploadedBy: { equals: user.id } } : true,
    delete: ({ req: { user } }) =>
      !user ? false : user.role === 'author' ? { uploadedBy: { equals: user.id } } : true,
  },
  hooks: {
    beforeOperation: [
      ({ operation, req }) => {
        // docs/SECURITY.md §3: nama file diacak, bukan nama asli dari client.
        if (operation === 'create' && req.file) {
          const ext = path.extname(req.file.name).toLowerCase()
          req.file.name = `${randomUUID()}${ext}`
        }
      },
    ],
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user) data.uploadedBy = req.user.id
        return data
      },
    ],
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    // docs/SECURITY.md §3: validasi MIME server-side; re-encode ke WebP lewat sharp otomatis membuang EXIF/GPS.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true },
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320, position: 'centre', formatOptions: { format: 'webp' } },
      { name: 'card', width: 900, height: 600, position: 'centre', formatOptions: { format: 'webp' } },
      { name: 'og', width: 1200, height: 630, position: 'centre', formatOptions: { format: 'webp' } },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      label: 'Teks alternatif (alt)',
      type: 'text',
      required: true,
      admin: { description: 'Wajib. Deskripsi singkat gambar untuk aksesibilitas & SEO.' },
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}

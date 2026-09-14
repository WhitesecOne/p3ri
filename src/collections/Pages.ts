import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin } from '@/access'
import { revalidatePage } from '@/hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Halaman', plural: 'Halaman' },
  admin: { useAsTitle: 'title', group: 'Konten', defaultColumns: ['title', 'slug', '_status', 'updatedAt'] },
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: ({ req: { user } }) => (user ? true : { _status: { equals: 'published' } }),
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  hooks: { afterChange: [revalidatePage] },
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      index: true,
      options: [
        { label: 'Tentang P3RI (/about)', value: 'about' },
        { label: 'Keanggotaan (/membership)', value: 'membership' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'content', label: 'Isi halaman', type: 'richText', required: true },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        { name: 'title', label: 'Meta title', type: 'text', maxLength: 70 },
        { name: 'description', label: 'Meta description', type: 'textarea', maxLength: 160 },
      ],
    },
  ],
}

import type { CollectionConfig, Where } from 'payload'
import { Forbidden } from 'payload'
import { isEditorOrAdmin, isEditorOrAdminField, isLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidatePost, revalidatePostDelete } from '@/hooks/revalidate'

// Status draft/published memakai fitur drafts bawaan Payload (field `_status`) — sekaligus memenuhi
// versioning/audit trail docs/SECURITY.md §10. Lihat docs/DATABASE.md §5.
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikel', plural: 'Artikel' },
  admin: {
    useAsTitle: 'title',
    group: 'Konten',
    defaultColumns: ['title', 'category', 'author', '_status', 'publishedAt'],
    preview: (doc) =>
      `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/preview?path=${encodeURIComponent(`/blog/${doc.slug}`)}`,
  },
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 20 },
  access: {
    read: ({ req: { user } }) => {
      const published: Where = { _status: { equals: 'published' } }
      if (!user) return published
      if (user.role === 'author') return { or: [published, { author: { equals: user.id } }] } satisfies Where
      return true
    },
    create: isLoggedIn,
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'author')
        return { author: { equals: user.id }, _status: { equals: 'draft' } } satisfies Where
      return true
    },
    delete: isEditorOrAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        const user = req.user
        if (user?.role === 'author') {
          if (data._status === 'published') throw new Forbidden(req.t)
          if (operation === 'create') data.author = user.id
        }
        if (data._status === 'published' && !data.publishedAt) data.publishedAt = new Date().toISOString()
        return data
      },
    ],
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostDelete],
  },
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true },
    slugField('title'),
    {
      name: 'excerpt',
      label: 'Ringkasan',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: { description: 'Tampil di kartu artikel dan jadi meta description default.' },
    },
    { name: 'content', label: 'Isi artikel', type: 'richText', required: true },
    {
      name: 'coverImage',
      label: 'Gambar sampul',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      label: 'Tag',
      type: 'array',
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'author',
      label: 'Penulis',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id,
      access: { update: isEditorOrAdminField },
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      label: 'Tanggal publish',
      type: 'date',
      index: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
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

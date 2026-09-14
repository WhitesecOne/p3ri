import type { CollectionConfig } from 'payload'
import { anyone, isEditorOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Kategori', plural: 'Kategori' },
  admin: { useAsTitle: 'name', group: 'Konten' },
  access: { read: anyone, create: isEditorOrAdmin, update: isEditorOrAdmin, delete: isEditorOrAdmin },
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    slugField('name'),
    { name: 'description', label: 'Deskripsi', type: 'textarea' },
  ],
}

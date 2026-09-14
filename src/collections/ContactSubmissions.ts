import type { CollectionConfig } from 'payload'
import { anyone, isEditorOrAdmin } from '@/access'
import { antiSpam, honeypotField } from '@/hooks/anti-spam'
import { notifyPengurus } from '@/hooks/notify-email'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Pesan kontak', plural: 'Pesan kontak' },
  admin: { useAsTitle: 'name', group: 'Masuk', defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'] },
  access: { create: anyone, read: isEditorOrAdmin, update: isEditorOrAdmin, delete: isEditorOrAdmin },
  hooks: { beforeValidate: [antiSpam], afterChange: [notifyPengurus('Pesan kontak')] },
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true, maxLength: 120 },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'subject', label: 'Subjek', type: 'text', maxLength: 200 },
    { name: 'message', label: 'Pesan', type: 'textarea', required: true, maxLength: 3000 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Baru', value: 'new' },
        { label: 'Sudah dibaca', value: 'read' },
        { label: 'Sudah dibalas', value: 'replied' },
      ],
      access: { create: () => false, update: ({ req: { user } }) => Boolean(user) },
      admin: { position: 'sidebar' },
    },
    honeypotField,
  ],
}

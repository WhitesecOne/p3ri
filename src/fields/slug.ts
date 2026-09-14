import type { Field } from 'payload'

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'Dibuat otomatis dari judul. Boleh diedit sebelum publish.' },
  hooks: {
    beforeValidate: [({ value, data }) => slugify(value || String(data?.[from] ?? ''))],
  },
})

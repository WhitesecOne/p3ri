import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateEvent } from '@/hooks/revalidate'

// Agenda kegiatan (Coffee Talk, Klinik, Workshop, Seminar). Ditambahkan atas permintaan owner 6 Sep 2026 — lihat docs/DATABASE.md §12.
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Agenda kegiatan', plural: 'Agenda kegiatan' },
  admin: {
    useAsTitle: 'title',
    group: 'Konten',
    defaultColumns: ['title', 'program', 'startDate', 'mode', '_status'],
    description: 'Kegiatan mendatang tampil di beranda dan halaman Program. Kegiatan yang sudah lewat otomatis pindah ke "Kegiatan sebelumnya".',
  },
  versions: { drafts: true, maxPerDoc: 10 },
  access: {
    read: ({ req: { user } }) => (user ? true : { _status: { equals: 'published' } }),
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  hooks: { afterChange: [revalidateEvent], afterDelete: [revalidateEvent] },
  fields: [
    { name: 'title', label: 'Judul kegiatan', type: 'text', required: true },
    slugField('title'),
    {
      name: 'program',
      label: 'Program',
      type: 'select',
      required: true,
      options: [
        { label: 'Coffee Talk', value: 'coffee-talk' },
        { label: 'Klinik', value: 'klinik' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Seminar', value: 'seminar' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'startDate', label: 'Mulai', type: 'date', required: true, index: true, admin: { date: { pickerAppearance: 'dayAndTime' }, width: '50%' } },
        { name: 'endDate', label: 'Selesai', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' }, width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mode',
          label: 'Format',
          type: 'select',
          required: true,
          defaultValue: 'daring',
          options: [
            { label: 'Daring', value: 'daring' },
            { label: 'Luring', value: 'luring' },
            { label: 'Hibrid', value: 'hibrid' },
          ],
          admin: { width: '50%' },
        },
        { name: 'location', label: 'Lokasi / platform', type: 'text', admin: { width: '50%', placeholder: 'mis. Zoom, atau nama gedung & kota' } },
      ],
    },
    { name: 'description', label: 'Deskripsi singkat', type: 'textarea', required: true, maxLength: 600 },
    { name: 'speakers', label: 'Narasumber', type: 'array', fields: [{ name: 'name', label: 'Nama & afiliasi', type: 'text', required: true }] },
    { name: 'registrationUrl', label: 'Tautan pendaftaran', type: 'text', admin: { placeholder: 'https://…' } },
    { name: 'coverImage', label: 'Poster / gambar', type: 'upload', relationTo: 'media', admin: { position: 'sidebar' } },
  ],
}

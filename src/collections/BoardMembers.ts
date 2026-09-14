import type { CollectionConfig } from 'payload'
import { anyone, isEditorOrAdmin } from '@/access'
import { revalidateBoard } from '@/hooks/revalidate'

// Struktur pengurus — tampil di halaman Tentang bila sudah ada data (docs/PRD.md §4.1).
export const BoardMembers: CollectionConfig = {
  slug: 'board-members',
  labels: { singular: 'Pengurus', plural: 'Pengurus' },
  admin: { useAsTitle: 'name', group: 'Konten', defaultColumns: ['name', 'position', 'organization', 'order'] },
  defaultSort: 'order',
  access: { read: anyone, create: isEditorOrAdmin, update: isEditorOrAdmin, delete: isEditorOrAdmin },
  hooks: { afterChange: [revalidateBoard], afterDelete: [revalidateBoard] },
  fields: [
    { name: 'name', label: 'Nama lengkap', type: 'text', required: true },
    { name: 'position', label: 'Jabatan', type: 'text', required: true, admin: { placeholder: 'mis. Ketua Umum' } },
    { name: 'organization', label: 'Instansi / afiliasi', type: 'text' },
    { name: 'period', label: 'Periode', type: 'text', admin: { placeholder: 'mis. 2024–2027', position: 'sidebar' } },
    { name: 'photo', label: 'Foto', type: 'upload', relationTo: 'media', admin: { position: 'sidebar' } },
    { name: 'order', label: 'Urutan tampil', type: 'number', defaultValue: 100, admin: { position: 'sidebar', description: 'Angka kecil tampil lebih dulu.' } },
  ],
}

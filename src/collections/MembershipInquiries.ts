import type { CollectionConfig } from 'payload'
import { anyone, isEditorOrAdmin } from '@/access'
import { antiSpam, honeypotField } from '@/hooks/anti-spam'
import { notifyPengurus } from '@/hooks/notify-email'

export const MEMBER_TYPES = ['Praktisi', 'Akademisi', 'Pemerhati', 'Anggota Kehormatan'] as const

export const MembershipInquiries: CollectionConfig = {
  slug: 'membership-inquiries',
  labels: { singular: 'Pendaftaran anggota', plural: 'Pendaftaran anggota' },
  admin: {
    useAsTitle: 'name',
    group: 'Masuk',
    defaultColumns: ['name', 'email', 'memberType', 'organization', 'status', 'createdAt'],
  },
  access: { create: anyone, read: isEditorOrAdmin, update: isEditorOrAdmin, delete: isEditorOrAdmin },
  hooks: { beforeValidate: [antiSpam], afterChange: [notifyPengurus('Pendaftaran anggota')] },
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true, maxLength: 120 },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'organization', label: 'Instansi / organisasi', type: 'text', maxLength: 200 },
    {
      name: 'memberType',
      label: 'Jenis keanggotaan',
      type: 'select',
      required: true,
      options: MEMBER_TYPES.map((t) => ({ label: t, value: t })),
    },
    { name: 'message', label: 'Pesan', type: 'textarea', maxLength: 3000 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Baru', value: 'new' },
        { label: 'Sudah dihubungi', value: 'contacted' },
        { label: 'Diterima', value: 'approved' },
        { label: 'Ditolak', value: 'rejected' },
      ],
      access: { create: () => false, update: ({ req: { user } }) => Boolean(user) },
      admin: { position: 'sidebar' },
    },
    honeypotField,
  ],
}

import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import { isAdmin, isAdminField } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Pengguna', plural: 'Pengguna' },
  admin: { useAsTitle: 'name', group: 'Pengaturan', defaultColumns: ['name', 'email', 'role'] },
  auth: {
    // docs/SECURITY.md §2
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
  },
  access: {
    // Self-registration publik dimatikan: hanya Admin yang membuat user (first-user flow Payload tetap jalan saat DB kosong).
    create: isAdmin,
    read: ({ req: { user } }) => (user?.role === 'admin' ? true : user ? { id: { equals: user.id } } : false),
    update: ({ req: { user } }) => (user?.role === 'admin' ? true : user ? { id: { equals: user.id } } : false),
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const pw = data?.password
        if (typeof pw === 'string') {
          if (pw.length < 10) throw new APIError('Password minimal 10 karakter.', 400, undefined, true)
          if (data?.email && pw.toLowerCase() === String(data.email).toLowerCase())
            throw new APIError('Password tidak boleh sama dengan email.', 400, undefined, true)
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    {
      name: 'role',
      label: 'Peran',
      type: 'select',
      required: true,
      defaultValue: 'author',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author (penulis)', value: 'author' },
      ],
      access: { create: isAdminField, update: isAdminField },
      admin: { description: 'Admin: semua akses. Editor: publish & kelola konten. Author: hanya draft sendiri.' },
    },
    { name: 'avatar', label: 'Foto', type: 'upload', relationTo: 'media' },
  ],
}

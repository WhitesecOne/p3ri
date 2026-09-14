import type { GlobalConfig } from 'payload'
import { anyone, isAdmin } from '@/access'
import { revalidateSettings } from '@/hooks/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Pengaturan situs',
  admin: { group: 'Pengaturan' },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateSettings] },
  fields: [
    { name: 'siteName', label: 'Nama situs', type: 'text', required: true, defaultValue: 'P3RI' },
    { name: 'tagline', label: 'Tagline', type: 'text', defaultValue: 'Perkumpulan Profesi Pengelola Rekod Indonesia' },
    { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media' },
    {
      name: 'contactInfo',
      label: 'Kontak',
      type: 'group',
      fields: [
        { name: 'address', label: 'Alamat', type: 'textarea' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Telepon', type: 'text' },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Media sosial',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    { name: 'footerText', label: 'Teks footer', type: 'textarea' },
  ],
}

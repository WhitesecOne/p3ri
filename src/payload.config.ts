import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { en } from '@payloadcms/translations/languages/en'
import { id } from '@payloadcms/translations/languages/id'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { BoardMembers } from './collections/BoardMembers'
import { Categories } from './collections/Categories'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { MembershipInquiries } from './collections/MembershipInquiries'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Settings } from './globals/Settings'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Admin P3RI' },
  },
  // Panel admin berbahasa Indonesia untuk pengelola non-teknis (docs/PRD.md §2); user bisa ganti ke English di profilnya.
  i18n: { supportedLanguages: { id, en }, fallbackLanguage: 'id' },
  collections: [Posts, Events, Categories, Media, Pages, BoardMembers, ContactSubmissions, MembershipInquiries, Users],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  // docs/API.md §7: GraphQL opsional — dimatikan untuk memperkecil permukaan serangan.
  graphQL: { disable: true },
  upload: { limits: { fileSize: 5 * 1024 * 1024 } },
  sharp,
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM ?? 'noreply@p3ri.or.id',
        defaultFromName: 'Website P3RI',
      })
    : undefined,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
  ],
})

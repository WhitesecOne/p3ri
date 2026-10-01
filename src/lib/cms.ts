// Omit DATABASE_URI for a public website without CMS, or explicitly disable it.
export const isCmsEnabled = () => process.env.CMS_ENABLED !== 'false' && Boolean(process.env.DATABASE_URI?.trim())

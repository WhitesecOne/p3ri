import config from '@payload-config'
import { getPayload } from 'payload'

// Local API untuk server components (docs/ARCHITECTURE.md §4). getPayload sudah di-cache secara internal oleh Payload.
export const getPayloadClient = () => getPayload({ config })

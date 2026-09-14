import type { Access, FieldAccess } from 'payload'

// Matrix lengkap: docs/SECURITY.md §1. Backend yang menegakkan, frontend hanya menyembunyikan UI.
export const anyone: Access = () => true
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)
export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'
export const isEditorOrAdmin: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'editor'
export const isAdminField: FieldAccess = ({ req: { user } }) => user?.role === 'admin'
export const isEditorOrAdminField: FieldAccess = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'editor'

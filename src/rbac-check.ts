/**
 * Verifikasi end-to-end matrix RBAC docs/SECURITY.md §1 lewat REST API (server dev harus jalan di :3000).
 * Jalankan: `pnpm check:rbac`. Membuat user uji editor@p3ri.test & author@p3ri.test bila belum ada.
 */
import assert from 'node:assert/strict'
import config from '@payload-config'
import { getPayload } from 'payload'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const PW = 'UjiCobaRBAC-2026!'

async function api(path: string, opts: RequestInit & { token?: string } = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(opts.token ? { Authorization: `JWT ${opts.token}` } : {}), ...opts.headers },
  })
  return { status: res.status, body: (await res.json().catch(() => ({}))) as Record<string, unknown> }
}

async function login(email: string) {
  const { status, body } = await api('/users/login', { method: 'POST', body: JSON.stringify({ email, password: PW }) })
  assert.equal(status, 200, `login ${email}`)
  return body.token as string
}

async function main() {
  const payload = await getPayload({ config })
  for (const [email, role, name] of [['editor@p3ri.test', 'editor', 'Editor Uji'], ['author@p3ri.test', 'author', 'Author Uji']] as const) {
    const found = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
    if (!found.docs[0]) await payload.create({ collection: 'users', data: { email, password: PW, role, name } })
  }
  const category = (await payload.find({ collection: 'categories', limit: 1 })).docs[0]
  const media = (await payload.find({ collection: 'media', limit: 1 })).docs[0]
  assert.ok(category && media, 'butuh data seed (pnpm seed) dulu')

  const author = await login('author@p3ri.test')
  const editor = await login('editor@p3ri.test')
  const base = { title: 'RBAC uji', excerpt: 'uji', category: category.id, coverImage: media.id, content: { root: { type: 'root', children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', text: 'uji', version: 1 }] }], direction: null, format: '', indent: 0, version: 1 } } }

  // Author: boleh draft, tidak boleh publish
  let r = await api('/posts', { method: 'POST', token: author, body: JSON.stringify({ ...base, _status: 'published', slug: 'rbac-uji-publish' }) })
  assert.equal(r.status, 403, 'author publish saat create harus 403')
  r = await api('/posts', { method: 'POST', token: author, body: JSON.stringify({ ...base, slug: 'rbac-uji-draft' }) })
  assert.equal(r.status, 201, 'author create draft harus 201')
  const doc = r.body.doc as { id: number; _status: string; author: number | { id: number } }
  assert.equal(doc._status, 'draft')
  const authorId = typeof doc.author === 'object' ? doc.author.id : doc.author
  r = await api('/users/me', { token: author })
  assert.equal(authorId, (r.body.user as { id: number }).id, 'author dipaksa dari sesi, bukan dari body')

  r = await api(`/posts/${doc.id}`, { method: 'PATCH', token: author, body: JSON.stringify({ title: 'RBAC uji (edit)' }) })
  assert.equal(r.status, 200, 'author edit draft sendiri harus 200')
  r = await api(`/posts/${doc.id}`, { method: 'PATCH', token: author, body: JSON.stringify({ _status: 'published' }) })
  assert.equal(r.status, 403, 'author publish saat update harus 403')
  r = await api(`/posts/${doc.id}`, { method: 'DELETE', token: author })
  assert.equal(r.status, 403, 'author hapus harus 403')
  r = await api('/categories', { method: 'POST', token: author, body: JSON.stringify({ name: 'Kategori ilegal' }) })
  assert.equal(r.status, 403, 'author kelola kategori harus 403')

  // Publik: draft tidak terlihat
  r = await api(`/posts/${doc.id}`)
  assert.notEqual(r.status, 200, 'publik baca draft harus ditolak')

  // Editor: bisa lihat & publish draft author, author lalu tidak bisa edit lagi
  r = await api(`/posts/${doc.id}`, { token: editor })
  assert.equal(r.status, 200, 'editor baca draft author harus 200')
  r = await api(`/posts/${doc.id}`, { method: 'PATCH', token: editor, body: JSON.stringify({ _status: 'published' }) })
  assert.equal(r.status, 200, 'editor publish harus 200')
  assert.ok((r.body.doc as { publishedAt?: string }).publishedAt, 'publishedAt terisi otomatis')
  r = await api(`/posts/${doc.id}`)
  assert.equal(r.status, 200, 'publik baca published harus 200')
  r = await api(`/posts/${doc.id}`, { method: 'PATCH', token: author, body: JSON.stringify({ title: 'coba edit setelah publish' }) })
  assert.equal(r.status, 403, 'author edit post published harus 403')

  // Editor: tidak boleh kelola user / settings
  r = await api('/users', { method: 'POST', token: editor, body: JSON.stringify({ name: 'X', email: 'x@p3ri.test', password: PW, role: 'admin' }) })
  assert.equal(r.status, 403, 'editor buat user harus 403')
  r = await api('/globals/settings', { method: 'POST', token: editor, body: JSON.stringify({ siteName: 'Diubah' }) })
  assert.equal(r.status, 403, 'editor ubah settings harus 403')
  r = await api('/contact-submissions?limit=1', { token: editor })
  assert.equal(r.status, 200, 'editor baca submission harus 200')

  r = await api(`/posts/${doc.id}`, { method: 'DELETE', token: editor })
  assert.equal(r.status, 200, 'editor hapus harus 200')
  console.log('RBAC OK — semua aturan docs/SECURITY.md §1 terverifikasi.')
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })

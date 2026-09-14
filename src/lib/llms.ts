import { ADDRESS, CAREER_PATHS, CERTIFICATIONS, LSP_TYPES, COLLAB_TYPES, KEY_DATES, MILESTONES, MYTHS, SELF_CHECK, SOCIAL_CHANNELS, FAQ_HOME, FAQ_MEMBERSHIP, FIELDS, GLOSSARY, INSIGHTS, JOIN_STEPS, LEGAL, LIFECYCLE, MEMBER_BENEFITS, MEMBER_DUTIES, MEMBER_RIGHTS, MEMBER_TYPES, MISSION, ORGANIZATIONS, PARTNERS, PROGRAM_DETAILS, PROGRAM_LABEL, REGULATIONS, SECURITY_PRACTICES, STANDARDS, TIMELINE, VALUES, VISION } from '@/lib/content'
import { ORG_NAME, SITE_DESCRIPTION } from '@/lib/seo'
import { formatDate, SITE_URL } from '@/lib/utils'
import type { Event, Post, Setting } from '@/payload-types'

const url = (p: string) => `${SITE_URL}${p}`
const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join('\n')
const COLOR_ID: Record<string, string> = { red: 'merah', green: 'hijau', silver: 'perak', amber: 'kuning' }

/** llms.txt ringkas (spesifikasi llmstxt.org): judul, ringkasan, tautan halaman penting. */
export function llmsIndex(settings: Setting, posts: Post[]) {
  const c = settings.contactInfo
  return `# ${ORG_NAME} (P3RI)

> ${SITE_DESCRIPTION}

P3RI disahkan sebagai badan hukum perkumpulan oleh ${LEGAL.authority} pada ${LEGAL.date} (${LEGAL.number}). Sekretariat: ${ADDRESS.lines.join(', ')}.${c?.email ? ` Email: ${c.email}.` : ''} Bahasa situs: Indonesia.

## Halaman utama

- [Beranda](${url('/')}): profil singkat, program, agenda, wawasan kearsipan, FAQ
- [Tentang P3RI](${url('/about')}): sejarah, visi, misi, nilai, filosofi logo, pengurus
- [Program](${url('/program')}): Coffee Talk, Klinik, Workshop, Seminar, agenda kegiatan, kerja sama
- [Keanggotaan](${url('/membership')}): jenis anggota, manfaat, hak & kewajiban, langkah daftar, FAQ
- [Artikel & Berita](${url('/blog')}): tulisan dan rekap kegiatan
- [Sumber Daya](${url('/sumber-daya')}): regulasi Indonesia, standar ISO, keamanan informasi arsip, glosarium
- [Kontak](${url('/contact')}): sekretariat dan formulir pesan
- [Kebijakan Privasi](${url('/privasi')})

## Fakta kunci

- Visi: ${VISION}
- Jenis keanggotaan: ${MEMBER_TYPES.map((m) => m.name).join(', ')}; periode 2 tahun; terbuka untuk seluruh WNI
- Program rutin: ${PROGRAM_DETAILS.map((p) => p.name).join(', ')}
- Tiga bidang keilmuan pada logo: ${FIELDS.map((f) => f.name).join(', ')}

${posts.length ? `## Artikel terbaru\n\n${posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`).join('\n')}\n\n` : ''}## Opsional

- [Versi lengkap untuk LLM](${url('/llms-full.txt')})
- [Sitemap](${url('/sitemap.xml')})
`
}

/** llms-full.txt: seluruh konten informatif situs dalam Markdown. */
export function llmsFull(settings: Setting, posts: Post[], events: Event[]) {
  const c = settings.contactInfo
  const sections: string[] = [llmsIndex(settings, posts)]
  sections.push(`# Tentang P3RI\n\n## Visi\n\n${VISION}\n\n## Misi\n\n${MISSION.map((m, i) => `${i + 1}. ${m}`).join('\n')}\n\n## Sejarah\n\n${TIMELINE.map((t) => `- **${t.date} — ${t.title}.** ${t.description}`).join('\n')}\n\n## Nilai\n\n${VALUES.map((v) => `- **${v.title}.** ${v.description}`).join('\n')}\n\n## Filosofi logo\n\n${FIELDS.map((f) => `- **${f.name}** (${COLOR_ID[f.color]}): ${f.description}`).join('\n')}\n\nGradasi kuning dan biru melambangkan optimisme, semangat, dan dinamika; huruf yang tegas mencerminkan disiplin, kejujuran, dan tanggung jawab.\n\n## Legalitas\n\nDisahkan ${LEGAL.authority}, ${LEGAL.date}, Nomor ${LEGAL.number}.\n\n## Mitra yang pernah berkolaborasi\n\n${list(PARTNERS)}`)
  sections.push(`# Program\n\n${PROGRAM_DETAILS.map((p) => `## ${p.name}\n\nFormat: ${p.format}\n\n${p.description}\n\n**Untuk siapa:** ${p.audience}\n\n**Contoh topik:** ${p.topics.join('; ')}\n\n**Cara mengikuti:** ${p.how}`).join('\n\n')}\n\n## Bentuk kerja sama\n\n${COLLAB_TYPES.map((t) => `- **${t.title}.** ${t.description}`).join('\n')}`)
  if (events.length) sections.push(`# Agenda kegiatan mendatang\n\n${events.map((e) => `- **${e.title}** (${PROGRAM_LABEL[e.program] ?? e.program}, ${e.mode}) — ${formatDate(e.startDate)}${e.location ? `, ${e.location}` : ''}. ${e.description}${e.registrationUrl ? ` Pendaftaran: ${e.registrationUrl}` : ''}`).join('\n')}`)
  sections.push(`# Keanggotaan\n\n## Jenis keanggotaan\n\n${MEMBER_TYPES.map((m) => `- **${m.name}.** ${m.description}`).join('\n')}\n\n## Manfaat\n\n${MEMBER_BENEFITS.map((b) => `- **${b.title}.** ${b.description}`).join('\n')}\n\n## Hak anggota\n\n${list(MEMBER_RIGHTS)}\n\n## Kewajiban anggota\n\n${list(MEMBER_DUTIES)}\n\n## Langkah pendaftaran\n\n${JOIN_STEPS.map((s, i) => `${i + 1}. **${s.title}.** ${s.description}`).join('\n')}\n\nFormulir pendaftaran: ${url('/membership#daftar')}`)
  sections.push(`# Wawasan kearsipan\n\n${INSIGHTS.map((col) => `## ${col.title}\n\n${col.lead}\n\n${col.items.map((it) => `- **${it.label}:** ${it.text}`).join('\n')}`).join('\n\n')}\n\n## Daur hidup rekod\n\n${LIFECYCLE.map((s) => `${s.n}. **${s.name}.** ${s.description} Praktik: ${s.practice}`).join('\n')}`)
  sections.push(`# Sumber daya\n\n## Regulasi Indonesia\n\n${REGULATIONS.map((r) => `- **${r.label} — ${r.title}.** ${r.summary} (${r.href})`).join('\n')}\n\n## Standar internasional\n\n${STANDARDS.map((r) => `- **${r.label} — ${r.title}.** ${r.summary} (${r.href})`).join('\n')}\n\n## Keamanan informasi arsip\n\n### Arsip fisik\n\n${list(SECURITY_PRACTICES.fisik)}\n\n### Arsip digital\n\n${list(SECURITY_PRACTICES.digital)}\n\n## Glosarium\n\n${GLOSSARY.map((g) => `- **${g.term}:** ${g.definition}`).join('\n')}\n\n## Lembaga rujukan\n\n${ORGANIZATIONS.map((o) => `- **${o.name}.** ${o.role} (${o.href})`).join('\n')}`)
  sections.push(`# Tonggak sejarah kearsipan Indonesia\n\n${MILESTONES.map((m) => `- **${m.year} — ${m.title}.** ${m.description}`).join('\n')}\n\n# Mitos & fakta pengelolaan rekod\n\n${MYTHS.map((m) => `- **Mitos:** ${m.myth} **Fakta:** ${m.fact}`).join('\n')}\n\n# Cek cepat tata kelola rekod (8 pernyataan)\n\n${SELF_CHECK.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\n# Jalur karier pengelola rekod\n\n${CAREER_PATHS.map((c) => `- **${c.title}** (${c.sector}): ${c.description}`).join('\n')}\n\nSertifikasi yang dikenal luas: ${CERTIFICATIONS.map((c) => `${c.name} (${c.by})`).join('; ')}.\n\nJenis Lembaga Sertifikasi Profesi (BNSP):\n\n${LSP_TYPES.map((l) => `- **${l.code} (${l.name}):** ${l.description}`).join('\n')}\n\n# Hari-hari penting kearsipan\n\n${KEY_DATES.map((d) => `- **${d.date} — ${d.name}.** ${d.note}`).join('\n')}`)
  sections.push(`# Pertanyaan yang sering diajukan\n\n${[...FAQ_HOME, ...FAQ_MEMBERSHIP].map((f) => `**T: ${f.q}**\n\nJ: ${f.a}`).join('\n\n')}`)
  if (posts.length) sections.push(`# Artikel\n\n${posts.map((p) => `## ${p.title}\n\n${formatDate(p.publishedAt)} — ${url(`/blog/${p.slug}`)}\n\n${p.excerpt}`).join('\n\n')}`)
  const socials = SOCIAL_CHANNELS.map((ch) => ({ ...ch, href: settings.socialLinks?.[ch.key] })).filter((ch) => ch.href)
  sections.push(`# Kontak\n\n${ADDRESS.lines.join(', ')}${c?.email ? `\nEmail: ${c.email}` : ''}${c?.phone ? `\nTelepon: ${c.phone}` : ''}\nFormulir: ${url('/contact')}${socials.length ? `\n\nKanal resmi: ${socials.map((ch) => `${ch.name} ${ch.handle} (${ch.href})`).join('; ')}` : ''}`)
  return sections.join('\n\n---\n\n') + '\n'
}

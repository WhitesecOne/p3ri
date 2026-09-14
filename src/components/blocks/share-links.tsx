'use client'

import { CheckIcon, LinkIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent
  const targets = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { label: 'Telegram', href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}` },
  ]
  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard tidak tersedia */
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Bagikan artikel">
      <span className="mr-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Bagikan</span>
      {targets.map((t) => (
        <Button key={t.label} asChild variant="outline" size="sm">
          <a href={t.href} target="_blank" rel="noreferrer noopener">{t.label}</a>
        </Button>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={copy} aria-live="polite">
        {copied ? <CheckIcon data-icon="inline-start" /> : <LinkIcon data-icon="inline-start" />}
        {copied ? 'Tersalin' : 'Salin tautan'}
      </Button>
    </div>
  )
}

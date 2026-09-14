'use client'

import { ArrowRightIcon, RotateCcwIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SELF_CHECK } from '@/lib/content'
import { cn } from '@/lib/utils'

const RESULT = (score: number) => {
  if (score >= 7) return { label: 'Tata kelola matang', tone: 'text-brand-green', text: 'Fondasi Anda kuat. Pertahankan dengan audit berkala dan jadikan praktik ini standar tertulis organisasi.' }
  if (score >= 4) return { label: 'Sedang berkembang', tone: 'text-brand-amber', text: 'Sebagian praktik sudah berjalan. Prioritaskan butir yang belum terpenuhi — biasanya jadwal retensi dan pengujian cadangan.' }
  return { label: 'Perlu perhatian', tone: 'text-brand-red', text: 'Risiko kehilangan bukti dan ketidakpatuhan cukup tinggi. Mulai dari menunjuk penanggung jawab dan menyusun klasifikasi rekod.' }
}

export function SelfCheck() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => SELF_CHECK.map(() => null))
  const answered = answers.filter((a) => a !== null).length
  const score = answers.filter(Boolean).length
  const done = answered === SELF_CHECK.length
  const result = RESULT(score)

  const set = (i: number, v: boolean) => setAnswers((prev) => prev.map((a, idx) => (idx === i ? v : a)))

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <ol className="flex flex-col divide-y rounded-lg border bg-card lg:col-span-8">
        {SELF_CHECK.map((q, i) => (
          <li key={q} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex gap-4 text-sm leading-relaxed">
              <span className="font-heading text-lg text-muted-foreground font-medium tabular-nums">0{i + 1}</span>
              {q}
            </p>
            <div className="flex shrink-0 gap-2" role="group" aria-label={`Jawaban pernyataan ${i + 1}`}>
              {([['Ya', true], ['Belum', false]] as const).map(([label, v]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => set(i, v)}
                  aria-pressed={answers[i] === v}
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                    answers[i] === v ? (v ? 'border-brand-green bg-brand-green text-white' : 'border-brand-red bg-brand-red text-white') : 'bg-background hover:border-foreground/40',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="lg:col-span-4">
        <div className="sticky top-24 rounded-lg border bg-muted p-6" aria-live="polite">
          <p className="eyebrow">Hasil</p>
          <p className="mt-3 font-heading text-6xl font-semibold">
            {score}<span className="text-2xl text-muted-foreground">/{SELF_CHECK.length}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{done ? 'Semua pernyataan terjawab' : `${answered} dari ${SELF_CHECK.length} terjawab`}</p>
          {done && (
            <>
              <p className={cn('mt-5 font-heading text-2xl font-semibold', result.tone)}>{result.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.text}</p>
              <div className="mt-5 flex flex-col gap-2">
                <Button asChild>
                  <Link href="/program#klinik">
                    Konsultasikan di Klinik
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setAnswers(SELF_CHECK.map(() => null))}>
                  <RotateCcwIcon data-icon="inline-start" />
                  Ulangi
                </Button>
              </div>
            </>
          )}
          {!done && <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Jawab jujur sesuai kondisi saat ini. Hasil tidak disimpan dan tidak dikirim ke mana pun.</p>}
        </div>
      </div>
    </div>
  )
}

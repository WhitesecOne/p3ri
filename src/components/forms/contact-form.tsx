'use client'

import { SendIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Honeypot, PdpNotice } from '@/components/forms/pdp-notice'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { submitForm } from '@/lib/submit'

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setPending(true)
    try {
      await submitForm('contact-submissions', form)
      toast.success('Pesan terkirim. Terima kasih, pengurus akan membalas melalui email.')
      form.reset()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal mengirim pesan.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <Honeypot />
      <FieldGroup>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="c-name">Nama *</FieldLabel>
            <Input id="c-name" name="name" required maxLength={120} autoComplete="name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="c-email">Email *</FieldLabel>
            <Input id="c-email" name="email" type="email" required autoComplete="email" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="c-subject">Subjek</FieldLabel>
          <Input id="c-subject" name="subject" maxLength={200} defaultValue={defaultSubject} key={defaultSubject} />
        </Field>
        <Field>
          <FieldLabel htmlFor="c-message">Pesan *</FieldLabel>
          <Textarea id="c-message" name="message" required rows={6} maxLength={3000} />
        </Field>
        <PdpNotice />
        <Button type="submit" disabled={pending} className="w-fit">
          {pending ? <Spinner data-icon="inline-start" /> : <SendIcon data-icon="inline-start" />}
          {pending ? 'Mengirim…' : 'Kirim pesan'}
        </Button>
      </FieldGroup>
    </form>
  )
}

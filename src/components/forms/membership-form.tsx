'use client'

import { SendIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Honeypot, PdpNotice } from '@/components/forms/pdp-notice'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { MEMBER_TYPES } from '@/lib/content'
import { submitForm } from '@/lib/submit'

export function MembershipForm() {
  const [pending, setPending] = useState(false)
  const [memberType, setMemberType] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!memberType) {
      toast.error('Pilih jenis keanggotaan terlebih dahulu.')
      return
    }
    setPending(true)
    try {
      await submitForm('membership-inquiries', form)
      toast.success('Pendaftaran terkirim. Pengurus akan menghubungi Anda melalui email.')
      form.reset()
      setMemberType('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal mengirim pendaftaran.')
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
            <FieldLabel htmlFor="m-name">Nama lengkap *</FieldLabel>
            <Input id="m-name" name="name" required maxLength={120} autoComplete="name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="m-email">Email *</FieldLabel>
            <Input id="m-email" name="email" type="email" required autoComplete="email" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="m-org">Instansi / organisasi</FieldLabel>
          <Input id="m-org" name="organization" maxLength={200} autoComplete="organization" />
        </Field>
        <Field>
          <FieldLabel htmlFor="m-type">Jenis keanggotaan *</FieldLabel>
          <Select name="memberType" value={memberType} onValueChange={setMemberType} required>
            <SelectTrigger id="m-type" className="w-full">
              <SelectValue placeholder="Pilih jenis keanggotaan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {MEMBER_TYPES.map((m) => (
                  <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>Anggota Kehormatan ditetapkan oleh pengurus; pilih ini hanya jika Anda diundang.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="m-message">Ceritakan singkat peran Anda di bidang rekod</FieldLabel>
          <Textarea id="m-message" name="message" rows={4} maxLength={3000} />
        </Field>
        <PdpNotice />
        <Button type="submit" disabled={pending} className="w-fit">
          {pending ? <Spinner data-icon="inline-start" /> : <SendIcon data-icon="inline-start" />}
          {pending ? 'Mengirim…' : 'Kirim pendaftaran'}
        </Button>
      </FieldGroup>
    </form>
  )
}

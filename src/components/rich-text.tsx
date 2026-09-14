import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Data = ComponentProps<typeof LexicalRichText>['data']

export function RichText({ data, className }: { data: Data | Record<string, unknown>; className?: string }) {
  return <LexicalRichText data={data as Data} className={cn('prose-site', className)} />
}

import { cn } from '@/lib/utils'

/** Tiga titik warna cincin logo — penanda eyebrow/label. */
export function BrandDots({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)} aria-hidden>
      <span className="size-1.5 rounded-full bg-brand-red" />
      <span className="size-1.5 rounded-full bg-brand-green" />
      <span className="size-1.5 rounded-full bg-brand-silver" />
    </span>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', className)}>
      <BrandDots />
      {children}
    </p>
  )
}

export function BrandStripe({ className }: { className?: string }) {
  return <div className={cn('brand-stripe h-1 w-full', className)} aria-hidden />
}

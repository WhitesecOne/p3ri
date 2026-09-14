'use client'

import { ArrowUpRightIcon, MenuIcon } from 'lucide-react'
import { motion, stagger, type Variants } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BrandStripe } from '@/components/blocks/brand'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NAV_LINKS } from '@/lib/content'
import { cn } from '@/lib/utils'

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

const list: Variants = { hidden: {}, show: { transition: { delayChildren: stagger(0.04) } } }
const item: Variants = { hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } } }

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="hidden xl:block" aria-label="Navigasi utama">
        <ul className="flex items-center gap-7">
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href)
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative block py-2 text-[13px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-200 ease-out',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Button asChild size="sm" className="hidden md:inline-flex">
          <Link href="/membership#daftar">
            Daftar anggota
            <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="xl:hidden" aria-label="Buka menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm gap-0 p-0">
            <BrandStripe />
            <SheetHeader className="border-b">
              <SheetTitle className="font-heading text-2xl font-semibold">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col p-4" aria-label="Navigasi mobile">
              <motion.ul variants={list} initial="hidden" animate="show" className="flex flex-col">
                {NAV_LINKS.map((l, i) => {
                  const active = isActive(pathname, l.href)
                  return (
                    <motion.li key={l.href} variants={item}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-baseline gap-4 border-b py-4 font-heading text-2xl font-semibold transition-colors hover:text-primary',
                          active ? 'text-primary' : 'text-foreground',
                        )}
                      >
                        <span className="w-6 font-sans text-xs tracking-widest text-muted-foreground">0{i + 1}</span>
                        {l.label}
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>
              <Button asChild size="lg" className="mt-6">
                <Link href="/membership#daftar" onClick={() => setOpen(false)}>
                  Daftar anggota
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

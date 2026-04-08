'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            FreelanceFlow
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-2 py-1 transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/client-form">
            <Button variant="default" className="rounded-full shadow-lg shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

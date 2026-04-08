import Link from 'next/link'
import { Mail, Globe, Navigation } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl tracking-tight">FreelanceFlow</span>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap max-w-xs">
            Crafting high-end digital experiences for forward-thinking brands.
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="#" className="hover:text-white transition-colors"><Globe className="w-5 h-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Navigation className="w-5 h-5" /></Link>
          <Link href="/client-form" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></Link>
        </div>
      </div>
    </footer>
  )
}

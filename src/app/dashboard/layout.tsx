import Link from 'next/link'
import { LayoutDashboard, FolderKanban, MessageSquare, Settings, LogOut } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-black/50 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold">F</div>
          <span className="font-bold text-lg tracking-tight">Admin Flow</span>
        </div>
        
        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <FolderKanban className="w-5 h-5" />
            Projects
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <MessageSquare className="w-5 h-5" />
            Inquiries
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors mt-8">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        
        <div className="absolute bottom-6 left-6">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

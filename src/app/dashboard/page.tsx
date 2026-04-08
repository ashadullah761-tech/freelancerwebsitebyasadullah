import { createClient } from '@/lib/supabaseServer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Mail, Activity, CheckCircle } from 'lucide-react'

// Prevent caching for real-time admin view
export const revalidate = 0

export default async function Dashboard() {
  const supabase = await createClient()

  const { data: projects } = await supabase.from('projects').select('*')
  const { data: inquiries } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })

  const totalProjects = projects?.length || 0
  const totalInquiries = inquiries?.length || 0
  const newInquiries = inquiries?.filter(i => i.status === 'New').length || 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Manage your freelance business at a glance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInquiries}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{newInquiries}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inquiries */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle>Recent Client Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries && inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{inquiry.name}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.email} • {inquiry.project_type}</p>
                  </div>
                  <Badge variant={inquiry.status === 'New' ? 'default' : 'secondary'}>
                    {inquiry.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No inquiries received yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

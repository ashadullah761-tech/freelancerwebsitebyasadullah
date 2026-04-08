import { createClient } from '@/lib/supabaseServer'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import * as motion from 'framer-motion/client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const revalidate = 0

export default async function Portfolio() {
  const supabase = await createClient()
  
  // Fetch projects
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-screen py-32 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg"
          >
            A collection of my recent work across web development, UI/UX design, and mobile applications.
          </motion.p>
        </div>

        {error && (
          <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <p>Error loading projects: Please check if Supabase is connected correctly.</p>
          </div>
        )}

        {projects && projects.length === 0 ? (
          <div className="text-center p-16 border border-white/5 bg-white/5 rounded-2xl">
            <p className="text-neutral-400 text-lg">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-white/5 border-white/10 overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="relative aspect-video overflow-hidden">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-neutral-500">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 backdrop-blur-md text-white border-none">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-neutral-400 text-sm mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack?.map((tech: string) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-md bg-white/10 text-neutral-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                      {project.live_url && (
                        <Link href={project.live_url} target="_blank" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                          <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

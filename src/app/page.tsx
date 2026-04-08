import Link from 'next/link'
import * as motion from 'framer-motion/client'
import { ArrowRight, Code, Layout, Smartphone, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  { icon: Globe, title: 'Web Development', desc: 'Fast, secure, and scalable web applications built with modern tools.' },
  { icon: Layout, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that delight users and drive conversions.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform mobile applications for iOS and Android.' },
  { icon: Code, title: 'API Integration', desc: 'Seamless connections between your systems and third-party services.' },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute h-[500px] w-[500px] bg-primary/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Available for new projects
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            I Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">Digital Experiences</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-neutral-400 mb-10"
          >
            Freelance web developer and designer turning complex problems into elegant, modern, and high-performance solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link href="/portfolio">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8">
                View My Work
              </Button>
            </Link>
            <Link href="/client-form">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 bg-black/20 hover:bg-black/40 border-neutral-800">
                Start a Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black/50 px-4 border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Expertise</h2>
            <p className="text-neutral-400 max-w-xl">Comprehensive digital services tailored for startups and forward-thinking brands.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/20 text-primary mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-neutral-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to bring your idea to life?</h2>
          <p className="text-xl text-neutral-400 mb-10">Let's collaborate to build something extraordinary.</p>
          <Link href="/client-form">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-shadow">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

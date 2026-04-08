'use client'

import { useState, useRef } from 'react'
import { submitInquiry } from '@/app/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import * as motion from 'framer-motion/client'
import { Send, Loader2 } from 'lucide-react'

export default function ClientForm() {
  const [isPending, setIsPending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    const result = await submitInquiry(null, formData)
    setIsPending(false)
    
    if (result.success) {
      toast.success(result.message)
      // Throw some confetti natively via css or simple emoji burst if library too heavy
      // Simplification: the success toast itself is highly prominent.
      formRef.current?.reset()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="flex flex-col min-h-screen py-24 md:py-32 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Start a <span className="text-primary">Project</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400"
          >
            Fill out the form below to discuss your project requirements. 
            I typically respond within 24-48 hours.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-8">
              <CardTitle className="text-2xl">Project Details</CardTitle>
              <CardDescription>All fields are important to understand your scope.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <form ref={formRef} action={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input id="name" name="name" placeholder="John Doe" required className="bg-white/5 border-white/10 focus:border-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                    <Input id="email" name="email" type="email" placeholder="john@company.com" required className="bg-white/5 border-white/10 focus:border-primary" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project_type">Project Type <span className="text-red-500">*</span></Label>
                    <Select name="project_type" required>
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web_development">Full-stack Web App</SelectItem>
                        <SelectItem value="landing_page">Landing Page</SelectItem>
                        <SelectItem value="ui_ux_design">UI/UX Design</SelectItem>
                        <SelectItem value="mobile_app">Mobile Application</SelectItem>
                        <SelectItem value="branding">Branding & Logo</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget</Label>
                    <Select name="budget">
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less_than_1k">&lt; $1,000</SelectItem>
                        <SelectItem value="1k_to_5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5k_to_10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k_plus">$10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Please describe your project, goals, and any specific requirements..." 
                    className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-12 text-base font-semibold"
                >
                  {isPending ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="mr-2 h-5 w-5" /> Submit Inquiry</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

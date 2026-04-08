'use server'

import { createClient } from '@/lib/supabaseServer'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  project_type: z.string().min(1, 'Project type is required'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10, 'Please provide more details about your project'),
})

export async function submitInquiry(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      project_type: formData.get('project_type') || '',
      budget: formData.get('budget') || undefined,
      timeline: formData.get('timeline') || undefined,
      description: formData.get('description') || '',
    }
    
    // Validate the data
    const validatedData = inquirySchema.parse(rawData)
    
    const supabase = await createClient()
    
    // Insert into Supabase
    const { error } = await supabase
      .from('inquiries')
      .insert([validatedData])
      
    if (error) {
      console.error('Supabase error:', error)
      return { success: false, message: `Database error: ${error.message}. Please check if you have run the supabase-schema.sql in your Supabase SQL Editor.` }
    }
    
    return { success: true, message: 'Message sent successfully! I will get back to you soon.' }
    
  } catch (error: any) {
    if (error instanceof z.ZodError && error.issues && error.issues.length > 0) {
      return { success: false, message: error.issues[0].message }
    }
    return { success: false, message: error.message || 'An unexpected error occurred.' }
  }
}

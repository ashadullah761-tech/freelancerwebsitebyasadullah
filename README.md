# FreelanceFlow

A production-ready full-stack portfolio and freelance management system built with Next.js 15 (App Router), Tailwind CSS, Framer Motion, and Supabase.

## Setup Instructions

### 1. Supabase Setup
- Create a new project on [Supabase](https://supabase.com).
- Go to the SQL Editor and run the entire SQL code from `supabase-schema.sql`.
- Remember to get your Project URL and Anon Key.

### 2. Environment Variables
Ensure you have `.env.local` at the root of your project containing:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Local Development
Run the following commands:
```bash
npm install
npm run dev
```

### 4. Deployment (Netlify/Vercel)
This Next.js 15 application is ready to be deployed. 
- Push the repository to GitHub.
- Connect your GitHub repository to Netlify or Vercel.
- **IMPORTANT:** Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` variables to the Environment Variables configuration in the dashboard of Netlify/Vercel before building.
- Deploy!

## Core Features
- **Stunning Landing Page** with dark theme and Framer Motion effects.
- **Dynamic Portfolio** which fetches projects directly from the Supabase database.
- **Client Inquiry Form** which securely connects to Supabase using Server Actions.
- **Admin Dashboard** allowing you to view statistics and recent inquiries.

import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Summer School 2026 — IIT Campus | Project-Based Tech Internships',
  description: 'Project-based summer internships in AI, Data Science, Full-Stack, Cybersecurity, IoT & more. Learn from IIT faculty & industry mentors. Limited seats. Register today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}

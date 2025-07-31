// RootLayout.tsx or _app.tsx
"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Sidebar } from '@/components/Sidebar' // Import the Sidebar component
import '../globals.css'
import React from 'react'
import Header from '@/components/Header'
import { useRouter, usePathname } from 'next/navigation'
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

// export const metadata: Metadata = {
//   title: 'GDP Admin Dashboard',
//   description: 'Comprehensive ecommerce admin dashboard with staff management, job management, and contractor listing',
//   keywords: ['admin dashboard', 'ecommerce', 'staff management', 'job management', 'contractor listing'],
//   authors: [{ name: 'JDP Admin Corporation' }],
//   viewport: 'width=device-width, initial-scale=1',
//   robots: 'index, follow',
//   openGraph: {
//     title: 'JDP Admin Dashboard',
//     description: 'Comprehensive ecommerce admin dashboard with staff management, job management, and contractor listing',
//     type: 'website',
//     locale: 'en_US',
//   },
// }

export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {
  // Add a state to track the current page
  const [currentPage, setCurrentPage] = React.useState<string>('dashboard');
  const router = useRouter()
  const pathname = usePathname()
  // Define a function to handle page change
  const handleLogout = () => {
   
    router.push('/')
  }

  const handleNotificationViewAll = () => {
    router.push('/notifications')
  }

  const handleProfileClick = () => {
    router.push('/profile')
  }
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex h-screen bg-background transition-colors duration-300ex">
          {/* Sidebar Component */}
          <Sidebar currentPath={currentPage}  />
          <div className='flex-1 flex flex-col'>
             <Header
          currentPath={pathname}
          onLogout={handleLogout}
          onNotificationViewAll={handleNotificationViewAll}
          onProfileClick={handleProfileClick}
        />



  {/* Main content area */}
  <div className='flex-1 overflow-auto'>
<div className="flex-1 p-6">
            {/* Render the children (i.e., the content of the page) */}
            {children}
          </div>
  </div>
          
          </div>
        
        </div>

        <Toaster />
      </body>
    </html>
  )
}

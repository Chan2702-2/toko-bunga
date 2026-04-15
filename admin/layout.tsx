'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { checkAuth, useAuthStore, signOut } from '@/lib/auth'
import { Button } from '@/components/ui/Button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, isInitialized } = useAuthStore()

  useEffect(() => {
    if (!isInitialized) {
      checkAuth()
    }
  }, [isInitialized])

  useEffect(() => {
    if (isInitialized && !user && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [isInitialized, user, pathname, router])

  // Skip auth check for login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/admin/login')
  }

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-text">Jasmine Florist - Admin</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin/dashboard" className="text-text-light hover:text-accent transition-colors">
                Dashboard
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

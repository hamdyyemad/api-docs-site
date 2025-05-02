import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Breadcrumbs = () => {
  const router = useRouter()
  const path = router.state.location.pathname
  const segments = path.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <a href="/" className="text-gray-400 hover:text-white">
        Home
      </a>
      {segments.map((segment, index) => (
        <div key={segment} className="flex items-center gap-2">
          <svg
            className="w-3 h-3 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span
            className={
              index === segments.length - 1
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }
          >
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </span>
        </div>
      ))}
    </div>
  )
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isOpen={isMobileMenuOpen || isSidebarOpen}
        isMobile={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main
        className={`relative transition-[margin] duration-300 ease-in-out pt-16
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}
        `}
      >
        <div className="container mx-auto px-4 md:px-8 py-8">
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout

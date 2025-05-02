import { Link, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SearchModal } from './SearchModal'

interface NavbarProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  const router = useRouter()
  const isActive = (path: string) =>
    router.state.location.pathname.startsWith(path)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Add keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-white/10 z-50">
        <div className="mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onToggleSidebar}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-layout-sidebar"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-layout-sidebar-inset"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
                  <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                </svg>
              )}
            </button>
            <Link to="/" className="text-xl font-bold text-white">
              Docs
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center w-64 px-4 py-1.5 text-sm text-gray-400 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search documentation...
                <span className="ml-auto text-xs text-gray-500">⌘K</span>
              </button>
            </div>

            <div className="hidden md:flex gap-6">
              <Link
                to={'/docs/$pageId'}
                params={{ pageId: 'introduction' }}
                className={`transition-colors ${
                  isActive('/docs')
                    ? 'text-white font-medium'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Documentation
              </Link>
              <Link
                to="/examples"
                className={`transition-colors ${
                  isActive('/examples')
                    ? 'text-white font-medium'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Examples
              </Link>
            </div>

            <div className="flex md:hidden gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}

export default Navbar

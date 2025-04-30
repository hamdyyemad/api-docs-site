import { useState, useEffect } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import docsData from '../../data/docs.json'

interface SidebarProps {
  isOpen: boolean
  isMobile: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, isMobile, onClose }: SidebarProps) => {
  const [openSections, setOpenSections] = useState<string[]>(['gettingStarted'])
  const router = useRouter()
  const currentPath = router.state.location.pathname

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobile) {
      onClose()
    }
  }, [currentPath, isMobile, onClose])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
            ${isMobile && isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 h-[calc(100vh-4rem)] w-64 bg-[#121212] border-r border-white/10 overflow-y-auto z-50
          transition-transform duration-300 ease-in-out
          ${isMobile 
            ? isOpen ? 'translate-x-0' : '-translate-x-full'
            : isOpen ? 'md:translate-x-0' : 'md:-translate-x-full md:block hidden'
          }
        `}
      >
        <nav className="p-4">
          {Object.entries(docsData.sidebar).map(([key, section]) => (
            <div key={key} className="mb-6">
              <button
                onClick={() => toggleSection(key)}
                className={`flex items-center justify-between w-full text-left mb-2 transition-colors cursor-pointer ${
                  openSections.includes(key)
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-sm">{section.title}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openSections.includes(key) ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              {openSections.includes(key) && (
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      to={'/docs/$pageId'}
                      params={{ pageId: item.id }}
                      className={`block pl-4 py-2 text-sm rounded-lg transition-colors ${
                        currentPath === item.path
                          ? 'bg-white/5 text-white font-medium'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import docsData from '../../data/docs.json'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  id: string
  title: string
  path: string
  section: string
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Array<SearchResult>>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  // Create a flat list of all searchable items
  const allItems = Object.entries(docsData.sidebar).flatMap(
    ([, { title: sectionTitle, items }]) =>
      items.map((item) => ({
        id: item.id,
        title: item.title,
        path: `/docs/${item.id}`,
        section: sectionTitle,
      })),
  )

  // Filter items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const filtered = allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setResults(filtered)
    setSelectedIndex(0)
  }, [searchQuery])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
        break
      case 'Enter':
        if (results[selectedIndex]) {
          navigate({ to: results[selectedIndex].path })
          onClose()
          setSearchQuery('')
        }
        break
      case 'Escape':
        onClose()
        setSearchQuery('')
        break
    }
  }

  // Handle click on result
  const handleResultClick = (result: SearchResult) => {
    navigate({ to: result.path })
    onClose()
    setSearchQuery('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-24">
      <div className="bg-[#1a1a1a] w-full max-w-2xl mx-4 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center">
          <svg
            className="w-5 h-5 text-gray-400 mr-3"
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
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent border-0 outline-none text-white"
          />
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-white cursor-pointer"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full px-4 py-2 text-left flex flex-col ${
                    index === selectedIndex
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className="font-medium">{result.title}</span>
                  <span className="text-sm text-gray-500">
                    {result.section}
                  </span>
                </button>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-4 text-gray-400 text-center">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="p-4 text-gray-400 text-center">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

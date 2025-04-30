import type { ReactNode } from 'react'
import ApiEndpoint from './ApiEndpoint'
import ResponseTable from './ResponseTable'
import { useEffect } from 'react'
import Prism from 'prismjs'
import { Link } from '@tanstack/react-router'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-json'

interface PageProps {
  title?: string
  content: {
    type: string
    content?: string
    language?: string
    method?: string
    path?: string
    description?: string
    parameters?: any[]
    response?: any
    title?: string
    headers?: string[]
    rows?: string[][]
  }[]
}

const Page = ({ title, content }: PageProps) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  const renderContent = (item: PageProps['content'][0]): ReactNode => {
    switch (item.type) {
      case 'text':
        const parts = item.content?.split(/(<Link.*?<\/Link>)/) || []
        return (
          <div className="prose prose-invert max-w-none mb-8">
            {parts.map((part, index) => {
              if (part.startsWith('<Link')) {
                const pageIdMatch = part.match(/params={{ pageId: '([^']+)' }}/)
                const pageId = pageIdMatch ? pageIdMatch[1] : ''
                const textMatch = part.match(/>([^<]+)</)
                const text = textMatch ? textMatch[1] : ''
                
                return (
                  <Link 
                    key={index}
                    to="/docs/$pageId"
                    params={{ pageId }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {text}
                  </Link>
                )
              }
              return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
            })}
          </div>
        )
      
      case 'code':
        return (
          <div className="mb-8">
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="flex items-center px-4 py-2 bg-[#2a2a2a] border-b border-white/10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400">{item.language}</div>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className={`language-${item.language}`}>{item.content}</code>
              </pre>
            </div>
          </div>
        )
      
      case 'api-endpoint':
        return (
          <ApiEndpoint
            method={item.method || ''}
            path={item.path || ''}
            description={item.description || ''}
            parameters={item.parameters || []}
            response={item.response || { type: '', example: {} }}
          />
        )
      
      case 'table':
        if (!item.headers || !item.rows) return null
        return (
          <ResponseTable
            title={item.title || ''}
            headers={item.headers}
            rows={item.rows}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {title && <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>}
      {content.map((item, index) => (
        <div key={index}>{renderContent(item)}</div>
      ))}
    </div>
  )
}

export default Page 
import type { ReactNode } from 'react'
import ApiEndpoint from './ApiEndpoint'
import ResponseTable from './ResponseTable'

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
  const renderContent = (item: PageProps['content'][0]): ReactNode => {
    switch (item.type) {
      case 'text':
        return (
          <div 
            className="prose prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: item.content || '' }}
          />
        )
      
      case 'code':
        return (
          <div className="mb-8">
            <pre className="bg-[#1a1a1a] rounded-lg p-4 overflow-x-auto">
              <code className={`language-${item.language}`}>{item.content}</code>
            </pre>
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
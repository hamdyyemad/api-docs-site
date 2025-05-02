import { createFileRoute } from '@tanstack/react-router'
import Layout from '../components/Layout/Layout'
import DocContent from '../components/Doc/DocContent'
import docsData from '../data/docs.json'
import { useEffect } from 'react'

export const Route = createFileRoute('/docs/$pageId')({
  component: DocPage,
  loader: ({ params }) => {
    const pageData = docsData.pages[params.pageId as keyof typeof docsData.pages]
    return {
      title: pageData 
        ? `${pageData.title} - MVC .NET Documentation`
        : 'Page Not Found - MVC .NET Documentation'
    }
  }
})

function DocPage() {
  const { pageId } = Route.useParams()
  const pageData = docsData.pages[pageId as keyof typeof docsData.pages]
  useEffect(() => {
    document.title = pageData.title
  }, [pageData])
  
  if (!pageData) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-400">
            The documentation page you're looking for doesn't exist.
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{pageData.title}</h1>
        <DocContent content={pageData.content} />
      </div>
    </Layout>
  )
}

export default DocPage 
import { createFileRoute } from '@tanstack/react-router'
import Layout from '../components/Layout/Layout'
import DocContent from '../components/Doc/DocContent'
import docsData from '../data/docs.json'

export const Route = createFileRoute('/docs/$pageId')({
  component: DocPage,
})

function DocPage() {
  const { pageId } = Route.useParams()
  const pageData = docsData.pages[pageId as keyof typeof docsData.pages]

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
        <h1 className="text-3xl font-bold mb-8">{pageData.title}</h1>
        <DocContent content={pageData.content} />
      </div>
    </Layout>
  )
}

export default DocPage 
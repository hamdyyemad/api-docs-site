import { createFileRoute } from '@tanstack/react-router'
import Layout from '../components/Layout/Layout'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <h1 className="text-4xl font-bold mb-6">MVC .NET Web Application</h1>
        <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl">
          Welcome to the comprehensive documentation for our MVC .NET Web Application.
          Get started by exploring our guides and examples.
        </p>
        <div className="flex gap-6">
          <a
            href="/docs/introduction"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/examples"
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
          >
            View Examples
          </a>
        </div>
      </div>
    </Layout>
  )
}

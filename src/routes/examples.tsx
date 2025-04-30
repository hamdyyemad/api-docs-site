import { createFileRoute } from '@tanstack/react-router'
import Layout from '../components/Layout/Layout'

export const Route = createFileRoute('/examples')({
  component: Examples,
})

function Examples() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Examples</h1>
        <p className="text-gray-300 mb-8">
          Explore practical examples of implementing various features in your MVC .NET Web Application.
          More examples coming soon.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Basic CRUD Operations</h2>
            <p className="text-gray-400 mb-4">
              Learn how to implement Create, Read, Update, and Delete operations.
            </p>
            <span className="text-blue-400">Coming soon...</span>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Authentication</h2>
            <p className="text-gray-400 mb-4">
              Implement user authentication and authorization.
            </p>
            <span className="text-blue-400">Coming soon...</span>
          </div>
        </div>
      </div>
    </Layout>
  )
} 
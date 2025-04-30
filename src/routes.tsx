import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import DocPage from './pages/DocPage'
import Layout from './components/Layout/Layout'

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-bold">Welcome to the Documentation</h1>
      </div>
    </Layout>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
})

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/$pageId',
  component: DocPage,
})

const examplesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/examples',
  component: () => (
    <Layout>
      <h1 className="text-3xl font-bold">Examples</h1>
      <p className="mt-4">Coming soon...</p>
    </Layout>
  ),
})

const routeTree = rootRoute.addChildren([indexRoute, docsRoute, examplesRoute])

export const router = createRouter({ routeTree }) 
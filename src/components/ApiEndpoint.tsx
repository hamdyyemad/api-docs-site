import { useState } from 'react'

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
}

interface ApiEndpointProps {
  method: string
  path: string
  description: string
  parameters: Parameter[]
  response: {
    type: string
    example: any
  }
}

const ApiEndpoint = ({ method, path, description, parameters, response }: ApiEndpointProps) => {
  const [activeTab, setActiveTab] = useState<'example' | 'schema'>('example')

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-green-500'
      case 'POST':
        return 'bg-blue-500'
      case 'PUT':
        return 'bg-yellow-500'
      case 'DELETE':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="mb-8">
      {/* Method and Path */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`${getMethodColor(method)} text-white px-3 py-1 rounded-lg font-mono text-sm`}>
          {method.toUpperCase()}
        </span>
        <code className="text-gray-300 font-mono">{path}</code>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6">{description}</p>

      {/* Parameters */}
      {parameters.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Parameters</h3>
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Required</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param) => (
                  <tr key={param.name} className="border-b border-white/10 last:border-0">
                    <td className="px-4 py-2 font-mono text-sm text-white">{param.name}</td>
                    <td className="px-4 py-2 font-mono text-sm text-blue-400">{param.type}</td>
                    <td className="px-4 py-2 text-sm">
                      {param.required ? (
                        <span className="text-red-400">Required</span>
                      ) : (
                        <span className="text-gray-400">Optional</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-300">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Response */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Response</h3>
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-1">
            <button
              onClick={() => setActiveTab('example')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === 'example'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Example
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === 'schema'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Schema
            </button>
          </div>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">{response.type}</span>
            <button className="text-sm text-gray-400 hover:text-white">Copy</button>
          </div>
          <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
            {JSON.stringify(response.example, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default ApiEndpoint 
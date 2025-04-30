import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  content: string
}

const CodeBlock = ({ language, content }: CodeBlockProps) => {
  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: '#1e1e1e',
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock 
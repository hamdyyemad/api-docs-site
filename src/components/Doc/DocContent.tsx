import Page from '../Page'

interface ContentBlock {
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
}

interface DocContentProps {
  content: ContentBlock[]
}

const DocContent = ({ content }: DocContentProps) => {
  return <Page content={content} />
}

export default DocContent 
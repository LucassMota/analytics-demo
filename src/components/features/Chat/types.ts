export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatMessage = {
  id: string
  content: string
  role?: ChatRole
  createdAt?: number
}

export type UseChatMessagesProps = {
  messages?: ChatMessage[]
  defaultMessages?: ChatMessage[]
  onMessagesChangeAction?: (next: ChatMessage[]) => void
}

export type ChatPayload = {
  message: string
  session_id?: string
  agent_version?: string
  model?: string
  api_url?: string
  modality?: string
  enable_filter?: boolean
  persona?: string
  bm25_count?: number
  rerank_count?: number
  mcp_sse_url?: string
  stream_thinking?: boolean
}

export type ChatResponse = {
  session_id?: string
  message_id?: string
  content?: string
  thinking?: string | null
  chart_html_path?: string | null
  sql_query?: string | null
  sources?: Array<{
    text: string
    source: string
    relevance_score: number
  }>
  modality_used?: string
  tool_uses?: unknown | null
}

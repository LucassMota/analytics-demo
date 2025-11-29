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
  onMessagesChange?: (next: ChatMessage[]) => void
}

'use client'

import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { ChatResponse } from './types'

type ChatContextValue = {
  userMessage: string | null
  agentMessage: ChatResponse | null
  setUserMessage: (value: string | null) => void
  setAgentMessage: (value: ChatResponse | null) => void
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [userMessage, setUserMessage] = useState<string | null>(null)
  const [agentMessage, setAgentMessage] = useState<ChatResponse | null>(null)

  const value = useMemo(
    () => ({
      userMessage,
      agentMessage,
      setUserMessage,
      setAgentMessage
    }),
    [userMessage, agentMessage]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return ctx
}

'use client'

import { useCallback, useState } from 'react'
import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { ChatMessage } from './types'

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const handleSend = useCallback((content: string) => {
    const msg: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      content,
      role: 'user',
      createdAt: Date.now()
    }
    setMessages((prev) => [...prev, msg])
  }, [])

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  )
}

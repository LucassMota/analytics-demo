'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { ChatMessage } from './types'
import { sendSynchrounousMessage } from './ChatInput/actions'

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  const handleSend = useCallback(async (content: string) => {
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    const assistantId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

    const user: ChatMessage = {
      id: userId,
      content,
      role: 'user',
      createdAt: Date.now()
    }

    const assistantThinking: ChatMessage = {
      id: assistantId,
      content: 'Thinking...',
      role: 'assistant',
      createdAt: Date.now()
    }

    setMessages((prev) => [...prev, user, assistantThinking])

    try {
      const agentResponse = await sendSynchrounousMessage(content)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: agentResponse.content } : m
        )
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: 'Something went wrong' } : m
        )
      )
    }
  }, [])

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex-1 w-[800px] overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>
      <div className="pt-4 px-4 w-[800px]">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}

export default Chat

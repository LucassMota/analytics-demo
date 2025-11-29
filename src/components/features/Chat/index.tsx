'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { ChatMessage } from './types'
import { returnLoremIpsum } from './utils'

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  const handleSend = useCallback((content: string) => {
    const user: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      content,
      role: 'user',
      createdAt: Date.now()
    }

    const assistant: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      content: 'Thinking...',
      role: 'assistant',
      createdAt: Date.now()
    }

    setMessages((prev) => [...prev, user, assistant])
    const timeoutId = setTimeout(() => {
      const updated = returnLoremIpsum()
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistant.id ? { ...m, content: updated } : m
        )
      )
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== timeoutId)
    }, 3000)

    timeoutsRef.current.push(timeoutId)
  }, [])

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>
      <div className="pt-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}

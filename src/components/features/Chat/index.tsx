'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { ChatMessage } from './types'
import { returnLoremIpsum } from './utils'
import { ChatProvider } from './controller'

export const Chat = () => {
  // const [messages, setMessages] = useState<ChatMessage[]>([])
  // const [userMessage, setUserMessage] = useState<string>('')
  // const [agentMessage, setAgentMessage] = useState<string>('')

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  // const handleUserInput = useCallback((value: string) => {
  //   setUserMessage(value)
  // }, [])

  // const handleAgentInput = useCallback((value: string) => {
  //   setAgentMessage(value)
  // }, [])

  // const handleSend = useCallback((content: string) => {
  //   const user: ChatMessage = {
  //     id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  //     content,
  //     role: 'user',
  //     createdAt: Date.now()
  //   }

  //   const assistant: ChatMessage = {
  //     id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  //     content: 'Thinking...',
  //     role: 'assistant',
  //     createdAt: Date.now()
  //   }

  //   setMessages((prev) => [...prev, user, assistant])
  //   const timeoutId = setTimeout(() => {
  //     const updated = returnLoremIpsum()
  //     setMessages((prev) =>
  //       prev.map((m) =>
  //         m.id === assistant.id ? { ...m, content: updated } : m
  //       )
  //     )
  //     timeoutsRef.current = timeoutsRef.current.filter((t) => t !== timeoutId)
  //   }, 3000)

  //   timeoutsRef.current.push(timeoutId)
  // }, [])

  return (
    <ChatProvider>
      <div className="h-full w-full flex flex-col items-center">
        <div className="flex-1 w-[800px] overflow-y-auto">
          {/*<ChatMessages messages={messages} />*/}
          <ChatMessages />
        </div>
        <div className="pt-4 px-4 w-[800px]">
          {/*<ChatInput onSend={handleSend} />*/}
          <ChatInput />
        </div>
      </div>
    </ChatProvider>
  )
}

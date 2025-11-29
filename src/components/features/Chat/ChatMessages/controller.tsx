'use client'

import { useCallback, useMemo, useState } from 'react'
import { ChatMessage, ChatRole, UseChatMessagesProps } from '../types'

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

export const useChatMessages = ({
  messages: controlledMessages,
  defaultMessages = [],
  onMessagesChange
}: UseChatMessagesProps = {}) => {
  const [uncontrolledMessages, setUncontrolledMessages] =
    useState<ChatMessage[]>(defaultMessages)

  const isControlled = controlledMessages !== undefined
  const messages = isControlled
    ? (controlledMessages as ChatMessage[])
    : uncontrolledMessages

  const setMessages = useCallback(
    (next: ChatMessage[]) => {
      if (!isControlled) setUncontrolledMessages(next)
      onMessagesChange?.(next)
    },
    [isControlled, onMessagesChange]
  )

  const addMessage = useCallback(
    (
      content: string,
      options?: { role?: ChatRole; id?: string; createdAt?: number }
    ) => {
      const msg: ChatMessage = {
        id: options?.id ?? genId(),
        content,
        role: options?.role ?? 'user',
        createdAt: options?.createdAt ?? Date.now()
      }
      setMessages([...messages, msg])
    },
    [messages, setMessages]
  )

  const clearMessages = useCallback(() => setMessages([]), [setMessages])

  const hasMessages = messages.length > 0

  const list = useMemo(() => messages, [messages])

  return {
    messages,
    list,
    hasMessages,
    setMessages,
    addMessage,
    clearMessages
  }
}

export default useChatMessages

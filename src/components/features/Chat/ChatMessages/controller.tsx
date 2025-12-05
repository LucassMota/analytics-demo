'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  ChatMessage,
  ChatRole,
  UseChatMessagesProps,
  ChatPayload
} from '../types'
import { useChat } from '../controller'

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

export const useChatMessages = ({
  messages: controlledMessages,
  defaultMessages = [],
  onMessagesChangeAction
}: UseChatMessagesProps = {}) => {
  const [uncontrolledMessages, setUncontrolledMessages] =
    useState<ChatMessage[]>(defaultMessages)

  const isControlled = controlledMessages !== undefined
  const messages = isControlled
    ? (controlledMessages as ChatMessage[])
    : uncontrolledMessages

  const { userMessage, agentMessage } = useChat()

  const chatDerivedMessages: ChatMessage[] = useMemo(() => {
    const list: ChatMessage[] = []
    if (userMessage && userMessage.trim().length > 0) {
      list.push({
        id: 'user:current',
        content: userMessage,
        role: 'user'
      })
    }
    if (agentMessage) {
      console.log({ agentMessage })
      list.push({
        id: 'assistant:current',
        content: agentMessage.content,
        role: 'assistant'
      })
      // if (typeof agentMessage === 'string') {
      //   const content =
      //     agentMessage.toLowerCase() === 'thinking...'
      //       ? 'Thinking...'
      //       : agentMessage
      //   list.push({
      //     id: 'assistant:current',
      //     content,
      //     role: 'assistant'
      //   })
      // } else if (
      //   typeof agentMessage === 'object' &&
      //   'message' in agentMessage
      // ) {
      //   const content = (agentMessage as ChatPayload).message ?? ''
      //   if (content) {
      //     list.push({
      //       id: 'assistant:current',
      //       content,
      //       role: 'assistant'
      //     })
      //   }
      // }
    }
    return list
  }, [userMessage, agentMessage])

  const setMessages = useCallback(
    (next: ChatMessage[]) => {
      if (!isControlled) setUncontrolledMessages(next)
      onMessagesChangeAction?.(next)
    },
    [isControlled, onMessagesChangeAction]
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

  const list = useMemo(() => {
    return chatDerivedMessages.length > 0 ? chatDerivedMessages : messages
  }, [chatDerivedMessages, messages])

  const hasMessages = list.length > 0

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

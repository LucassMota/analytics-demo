import { useCallback, useEffect, useRef, useState } from 'react'
import { AgentSourcesAndSQLData, ChatMessage, EChatModality } from './types'
import { sendSynchrounousMessage } from './ChatInput/actions'
import { useTranslations } from 'next-intl'

export const useChat = () => {
  const t = useTranslations('chat')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [lastMessageResourceAndSQLData, setLastMessageResourceAndSQLData] =
    useState<AgentSourcesAndSQLData | null>(null)

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  const handleSend = useCallback(
    async (content: string) => {
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
        content: t('thinking'),
        role: 'assistant',
        createdAt: Date.now()
      }

      setMessages((prev) => [...prev, user, assistantThinking])

      try {
        const selectedChatModality = localStorage.getItem(
          'chatModality'
        ) as EChatModality
        const agentResponse = await sendSynchrounousMessage(
          content,
          selectedChatModality ?? EChatModality.NORMAL
        )
        setLastMessageResourceAndSQLData({
          sources: agentResponse.sources,
          sqlQuery: agentResponse.sql_query
        })
        console.log(agentResponse)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: agentResponse.content,
                  chartHTMLPath: agentResponse.chart_html_path
                }
              : m
          )
        )
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: t('somethingWentWrong') }
              : m
          )
        )
      }
    },
    [t]
  )

  return {
    handleSend,
    messages,
    lastMessageResourceAndSQLData
  }
}

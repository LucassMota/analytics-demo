import { useMemo, useEffect, useRef } from 'react'
import { useChatMessages } from './controller'

export const ChatMessages = () => {
  const { list, hasMessages } = useChatMessages()
  console.log({ list })

  const items = useMemo(() => list, [list])

  const lastItemKey = items.length
    ? `${items[items.length - 1].id}:${items[items.length - 1].content}`
    : ''

  const listEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [lastItemKey])

  return (
    <div
      className={[
        'w-full h-full flex flex-col gap-3 p-4',
        'bg-[var(--gray-light-mode-25)] dark:bg-[var(--gray-dark-mode-950)]'
        // className
      ].join(' ')}
    >
      {!hasMessages ? (
        <div className="mx-auto text-sm text-[var(--gray-neutral-400)]">
          No messages yet
        </div>
      ) : (
        <>
          {items.map((m) => {
            const role = m.role ?? 'user'
            const isUser = role === 'user'
            const alignment = isUser ? 'justify-end' : 'justify-start'

            const bubble = isUser
              ? [
                  'bg-[var(--gray-light-mode-200)] text-[var(--gray-light-mode-800)]',
                  'dark:bg-[var(--gray-dark-mode-800)] dark:text-[var(--gray-dark-mode-25)]'
                ].join(' ')
              : ''

            return (
              <div key={m.id} className={['flex w-full', alignment].join(' ')}>
                <div
                  className={[
                    'inline-block w-max max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 whitespace-pre-line break-words',
                    bubble
                  ].join(' ')}
                >
                  {m.content}
                </div>
              </div>
            )
          })}
          <div ref={listEndRef} />
        </>
      )}
    </div>
  )
}

export default ChatMessages

'use client'

import { SendHorizontal } from 'lucide-react'
import { ChatActions } from '../ChatActions'
import { useChatInput } from './controller'

export const ChatInput = ({
  onSend,
  value,
  disabled
}: {
  onSend?: (message: string) => void
  value?: string
  disabled?: boolean
}) => {
  const { textareaProps, sendButtonProps } = useChatInput({
    onSend,
    value,
    disabled
  })

  return (
    <div className="w-full rounded-3xl border border-[var(--gray-light-mode-300)] dark:border-[var(--gray-dark-mode-800)] ">
      <div className="rounded-lg sm:px-4 sm:py-3">
        <ChatActions />
      </div>
      <textarea
        className="sm:px-4 sm:py-3 w-full min-h-28 resize-none rounded-md outline-none placeholder:text-[var(--gray-neutral-400)] bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-950)] dark:text-[var(--gray-dark-mode-25)]"
        placeholder="Type your message..."
        {...textareaProps}
      />
      <div className="p-2 flex rounded-lg flex-row items-center justify-end">
        <button
          type="button"
          aria-label="Send message"
          className="bottom-4 cursor-pointer border-none right-4 rounded-md px-3 py-2 text-sm font-medium shadow-sm"
          {...sendButtonProps}
        >
          {<SendHorizontal className="w-4 h-4 text-[var(--brand-600)]" />}
        </button>
      </div>
    </div>
  )
}

export default ChatInput

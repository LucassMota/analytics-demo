import { Send } from 'lucide-react'
import { ChatActions } from '../ChatActions'

export const ChatInput = () => {
  return (
    <div className="w-full rounded-lg border border-[var(--gray-light-mode-300)] dark:border-[var(--gray-dark-mode-800)] ">
      <div className="rounded-lg sm:px-4 sm:py-3">
        <ChatActions />
      </div>
      <textarea
        className="p-2 w-full min-h-28 resize-y rounded-md outline-none placeholder:text-[var(--gray-neutral-400)] bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-950)] dark:text-[var(--gray-dark-mode-25)]"
        placeholder="Type your message..."
      />
      <div className="p-2 flex rounded-lg flex-row items-center justify-end">
        <button
          type="button"
          aria-label="Send message"
          className="bottom-4 right-4 rounded-md px-3 py-2 bg text-sm font-medium shadow-sm"
        >
          {<Send className="w-4 h-4 text-[var(--gray-neutral-400)]" />}
        </button>
      </div>
    </div>
  )
}

export default ChatInput

'use client'

import { useState } from 'react'
import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { useChat } from './controller'
import SourcesSidebar from './SourcesSidebar'

export const Chat = () => {
  const { handleSend, messages } = useChat()
  const [openSources, setOpenSources] = useState<boolean>(false)

  return (
    <div className="h-full w-full flex flex-row">
      <div className="flex flex-col items-center w-full">
        <div className="flex-1 w-[800px] overflow-y-auto">
          <ChatMessages messages={messages} />
        </div>
        <div className="pt-4 px-4 w-[800px]">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
      <div
        className="w-[84px] dark:border-[var(--gray-dark-mode-800)] bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)]
        dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]"
      >
        <button onClick={() => setOpenSources(!openSources)}>Toggle</button>
      </div>
      <SourcesSidebar
        title="Sources"
        open={openSources}
        onOpenChangeAction={setOpenSources}
        showFloatingToggle={false}
      />
    </div>
  )
}

export default Chat

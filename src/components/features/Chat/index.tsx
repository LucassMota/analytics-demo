'use client'

import { useState } from 'react'
import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { useChat } from './controller'
import SourcesAndSQLSidebar from './SourcesAndSQLSidebar'
import { ArrowLeftToLine } from 'lucide-react'
import SQLViewer from './SourcesAndSQLSidebar/SQLViewer'
import { SourcesList } from './SourcesAndSQLSidebar/SourcesViewer/SourcesList'

export const Chat = () => {
  const { handleSend, messages, lastMessageResourceAndSQLData } = useChat()
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
        className="items-center justify-center
        p-4 w-[84px] bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)]
        dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]
        border-l border-[var(--gray-light-mode-300)] dark:border-transparent"
      >
        <div
          className="flex w-fit items-center justify-center p-2
          dark:bg-[var(--gray-dark-mode-700)]
          bg-[var(--gray-dark-mode-400)]
          dark:text-[var(--gray-dark-mode-25)]
          rounded-full
          "
        >
          <ArrowLeftToLine
            onClick={() => setOpenSources(!openSources)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
      <SourcesAndSQLSidebar
        title={
          lastMessageResourceAndSQLData?.sqlQuery
            ? 'Generated SQL Query'
            : 'Ranked Results'
        }
        open={openSources}
        onOpenChangeAction={setOpenSources}
        showFloatingToggle={false}
      >
        {lastMessageResourceAndSQLData?.sqlQuery && (
          <SQLViewer sql={lastMessageResourceAndSQLData.sqlQuery} />
        )}
        {lastMessageResourceAndSQLData?.sources && (
          <SourcesList sources={lastMessageResourceAndSQLData.sources} />
        )}
      </SourcesAndSQLSidebar>
    </div>
  )
}

export default Chat

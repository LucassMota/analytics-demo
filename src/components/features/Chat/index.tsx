'use client'

import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { useChat } from './controller'

export const Chat = () => {
  const { handleSend, messages } = useChat()

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex-1 w-[800px] overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>
      <div className="pt-4 px-4 w-[800px]">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}

export default Chat

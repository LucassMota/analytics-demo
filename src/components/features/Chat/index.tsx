import ChatInput from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

export const Chat = () => (
  <div className="h-full w-full flex flex-col">
    <div className="flex-1 overflow-y-auto">
      <ChatMessages />
    </div>
    <ChatInput />
  </div>
);

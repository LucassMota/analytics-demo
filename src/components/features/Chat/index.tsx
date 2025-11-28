import ChatInput from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

export const Chat = () => (
  <div className="h-full w-full">
    <ChatMessages />
    <ChatInput />
  </div>
);

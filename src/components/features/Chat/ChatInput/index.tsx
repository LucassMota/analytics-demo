import { ChatActions } from "../ChatActions";

export const ChatInput = () => {
  return (
    <div className="w-full rounded-lg border border-[var(--gray-neutral-200)] bg-white">
      {/* Top: Actions bar */}
      <div className="border-b border-[var(--gray-neutral-200)] px-3 py-2 sm:px-4 sm:py-3">
        <ChatActions />
      </div>

      {/* Middle + Bottom: Textarea and Send button */}
      <div className="relative p-3 sm:p-4">
        <textarea
          className="w-full min-h-28 resize-y rounded-md border border-[var(--gray-neutral-200)] bg-white px-3 py-2 pr-16 text-sm leading-6 text-[var(--gray-neutral-900)] outline-none placeholder:text-[var(--gray-neutral-400)] focus:ring-2 focus:ring-[var(--gray-neutral-300)]"
          placeholder="Type your message..."
        />
        <button
          type="button"
          aria-label="Send message"
          className="absolute bottom-4 right-4 inline-flex items-center rounded-md bg-[var(--gray-neutral-900)] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--gray-neutral-800)] active:bg-[var(--gray-neutral-700)]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

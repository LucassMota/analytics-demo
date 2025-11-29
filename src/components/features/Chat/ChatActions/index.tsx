export const ChatActions = () => (
  <div className="py-2 flex rounded-lg flex-row gap-2 items-center">
    <button
      type="button"
      aria-label="Send message"
      className="bottom-4 right-4 rounded-md px-3 py-2 text-sm font-medium shadow-sm bg-[var(--gray-light-mode-200)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]"
    >
      Messages
    </button>
    <button
      type="button"
      aria-label="Send message"
      className="bottom-4 right-4 rounded-md px-3 py-2 text-sm font-medium shadow-sm bg-[var(--gray-light-mode-200)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]"
    >
      Charts
    </button>
    <button
      type="button"
      aria-label="Send message"
      className="bottom-4 right-4 rounded-md px-3 py-2 text-sm font-medium shadow-sm bg-[var(--gray-light-mode-200)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]"
    >
      SQL
    </button>
  </div>
)

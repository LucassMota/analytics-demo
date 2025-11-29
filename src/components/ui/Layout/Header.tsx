import React from 'react'
import UserActions from './UserActions'
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'

type HeaderProps = {
  children?: React.ReactNode
  className?: string
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({
  className,
  isSidebarOpen,
  setIsSidebarOpen
}: HeaderProps) => {
  return (
    <header
      role="banner"
      className={[
        'bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]',
        'sticky top-0 z-50 w-full shadow-sm',
        'border-b border-[var(--gray-light-mode-300)] dark:border-[var(--gray-dark-mode-800)]',
        className ?? ''
      ].join(' ')}
    >
      <div className="h-20 px-4 sm:px-6 flex items-center justify-between gap-3">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <PanelLeftOpen className="w-5 h-5 text-[var(--gray-neutral-400)]" />
          ) : (
            <PanelRightOpen className="w-5 h-5 text-[var(--gray-neutral-400)]" />
          )}
        </button>
        <UserActions />
      </div>
    </header>
  )
}

export default Header

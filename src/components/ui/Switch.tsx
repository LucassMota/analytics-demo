'use client'

import { useTheme } from '@/src/providers/ThemeProvider'
import React from 'react'
import { Moon, Sun } from 'lucide-react'

type SwitchProps = {
  className?: string
  id?: string
  title?: string
}

export default function Switch({
  className,
  id,
  title = 'Toggle theme'
}: SwitchProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleClick = () => toggleTheme()

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggleTheme()
    }
  }

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={isDark}
      aria-label={title}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        'relative inline-flex h-6 w-10 items-center rounded-full transition-colors',
        'border border-[var(--gray-neutral-200)]',
        className ?? ''
      ].join(' ')}
    >
      <span className="sr-only">{title}</span>
      <span
        className={[
          'absolute top-0.5 left-0.5 h-4 w-4 rounded-full shadow transform transition-transform flex items-center justify-center',
          isDark ? 'translate-x-4' : 'translate-x-0'
        ].join(' ')}
      >
        {isDark ? <Sun size={12} /> : <Moon size={12} />}
      </span>
    </button>
  )
}

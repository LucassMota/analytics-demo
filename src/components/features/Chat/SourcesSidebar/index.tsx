'use client'

import { cn } from '@/src/utils/cn'
import React, { useEffect, useRef, useState } from 'react'

/* width is controlled via Tailwind classes */

type SourcesSidebarProps = {
  title?: string
  // Optional initial state for the sidebar (default: closed)
  defaultOpen?: boolean
  // Control the open state from a parent (if provided, component is controlled)
  open?: boolean
  // Called whenever the open state changes (both controlled and uncontrolled)
  onOpenChangeAction?: (open: boolean) => void
  // Show or hide the floating toggle button at top-left
  showFloatingToggle?: boolean
  // Optional: render custom contents inside the sidebar
  children?: React.ReactNode
}

/* z-index handled via Tailwind arbitrary values in classNames */

const FLOAT_TOGGLE_CLASSES =
  'fixed top-4 left-4 z-[10002] px-3 py-2 rounded-lg border border-black/15 bg-white text-gray-900 text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition'

export default function SourcesSidebar({
  title = 'Sources',
  defaultOpen = false,
  open: openProp,
  onOpenChangeAction,
  showFloatingToggle = false,
  children
}: SourcesSidebarProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen)
  const isControlled = typeof openProp === 'boolean'
  const isOpen = isControlled ? (openProp as boolean) : internalOpen

  const setOpen = (next: boolean) => {
    onOpenChangeAction?.(next)
    if (!isControlled) {
      setInternalOpen(next)
    }
  }
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const prevActiveElementRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  // Dynamic classNames using Tailwind + cn
  const overlayClass = cn(
    'fixed inset-0 bg-black/40',
    mounted
      ? 'transition-opacity duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]'
      : 'duration-0',
    isOpen
      ? 'opacity-100 pointer-events-auto'
      : 'opacity-0 pointer-events-none',
    'z-[10000]'
  )

  const sidebarClass = cn(
    'fixed top-0 right-0 h-screen w-[529px] max-w-screen bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)] text-gray-900',
    'shadow-xl border-l border-black/10 flex flex-col overflow-hidden',
    'will-change-transform transition-all',
    mounted ? 'duration-300 ease-[cubic-bezier(.22,.61,.36,1)]' : 'duration-0',
    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
    'z-[10001]'
  )

  const headerClass = cn(
    'flex items-center justify-between p-4 border-b border-black/10'
  )

  const titleClass = cn('m-0 text-[18px] font-bold text-gray-900')

  const closeBtnClass = cn(
    'inline-flex items-center justify-center rounded-md',
    'border border-black/10 px-2 py-1 font-bold',
    'text-[var(--gray-light-mode-400)] shadow-sm active:scale-95 transition'
  )

  const contentClass = cn('flex-1 overflow-y-auto p-4')

  // Toggle handler
  const toggle = () => setOpen(!isOpen)

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Enable transitions after first paint
  useEffect(() => {
    setMounted(true)
  }, [])

  // Manage focus and body scroll when the sidebar opens/closes
  useEffect(() => {
    if (isOpen) {
      prevActiveElementRef.current =
        document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      // Focus close button for accessibility
      const t = setTimeout(() => closeBtnRef.current?.focus(), 0)
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
        if (prevActiveElementRef.current) {
          prevActiveElementRef.current.focus?.()
        }
      }
    }
    return
  }, [isOpen])

  return (
    <>
      {showFloatingToggle && (
        <>
          {/* Fixed toggle button at the top-left of the screen */}
          <button
            type="button"
            aria-label={
              isOpen ? 'Close sources sidebar' : 'Open sources sidebar'
            }
            aria-expanded={isOpen}
            aria-controls="sources-sidebar"
            onClick={toggle}
            className={FLOAT_TOGGLE_CLASSES}
          >
            {isOpen ? 'Close Sources' : 'Open Sources'}
          </button>
        </>
      )}

      {/* Overlay */}
      <div
        className={overlayClass}
        aria-hidden={!isOpen}
        onClick={() => setOpen(false)}
        data-testid="sources-sidebar-overlay"
      />

      {/* Right-side sliding sidebar */}
      <aside
        id="sources-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Sources sidebar"
        className={sidebarClass}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={headerClass}>
          <h2 className={titleClass}>{title}</h2>
          <button
            type="button"
            ref={closeBtnRef}
            className={closeBtnClass}
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <div className={contentClass}>
          {children ?? (
            <div className="text-gray-500 text-sm">
              Add your content to the Sources sidebar.
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

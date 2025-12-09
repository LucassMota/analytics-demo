'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { AgentSourceData } from '../types'
import { formatSourceText } from './SourcesViewer/utils'

type SourcesModalProps = {
  open: boolean
  onClose: () => void
  source: AgentSourceData | null
}

export const SourcesModal = ({ open, onClose, source }: SourcesModalProps) => {
  const t = useTranslations('chat')
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  // Close on Escape and lock body scroll when open
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        ;(e as any).stopImmediatePropagation?.()
        e.preventDefault()
        onClose()
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Focus the dialog when it opens
    dialogRef.current?.focus()
    window.addEventListener('keydown', onKeyDown, { capture: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown, true)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!open || !source) return null

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[10000]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Source details"
        ref={dialogRef}
        tabIndex={-1}
        className="fixed left-1/2 top-1/2 z-[10001] -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vh] rounded-lg shadow-xl flex flex-col overflow-hidden
          bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)]
          dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          <div className="p-4 flex items-center justify-between">
            <span className="font-bold">{t('chunk_details')}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="self-end items-center justify-center h-8 w-8 rounded-md
                        text-[var(--gray-light-mode-400)] hover:bg-[var(--gray-light-mode-100)]
                        dark:text-[var(--gray-dark-mode-25)] dark:border-[var(--gray-dark-mode-700)]
                        dark:hover:bg-[var(--gray-dark-mode-800)]"
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-4 border-b border-black/10">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold">{t('source')}:</span>
            <span className="underline text-[var(--gray-light-mode-400)] truncate">
              {source.source}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{t('relevance_score')}:</span>
              <span className="text-[var(--brand-500)]">
                {source.relevance_score}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-scroll">
          <div
            className="p-4 rounded-md bg-[var(--gray-light-mode-400)]
            text-[var(--gray-light-mode-900)]
            dark:bg-[var(--gray-dark-mode-800)] dark:text-[var(--gray-dark-mode-25)]"
          >
            {formatSourceText(source.text)}
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export default SourcesModal

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { AgentSourceData } from '../../types'
import { formatSourceText } from './utils'
import { SourcesModal } from '../SourcesModal'

export const SourcesList = ({ sources }: { sources: AgentSourceData[] }) => {
  const t = useTranslations('chat')
  const [activeSource, setActiveSource] = useState<AgentSourceData | null>(null)

  return (
    <>
      <div className="flex flex-col gap-12">
        {sources.map((source, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div
              className="border w-fit rounded-md border-[var(--gray-light-mode-300)] dark:border-[var(--gray-light-mode-300)]
            p-1 text-[var(--gray-light-mode-800)] dark:text-[var(--gray-light-mode-200)] font-bold"
            >
              Chunk {index + 1}
            </div>
            <div className="w-full flex justify-between">
              <span>{t('source')}:</span>
              <div className="underline text-[var(--gray-light-mode-400)]">
                {source.source}
              </div>
            </div>
            <div className="w-full flex justify-between">
              <span>{t('relevance_score')}:</span>
              <div className="text-[var(--brand-500)]">
                {source.relevance_score}
              </div>
            </div>
            <div
              onClick={() => setActiveSource(source)}
              className="relative p-2 rounded-md transition-colors cursor-pointer max-h-[180px] overflow-hidden group
              bg-[var(--gray-light-mode-50)] hover:bg-[var(--gray-light-mode-100)]
              dark:bg-[var(--gray-dark-mode-800)] dark:hover:bg-[var(--gray-dark-mode-700)]
              dark:text-[var(--gray-dark-mode-25)]"
            >
              <div className="flex-1">{formatSourceText(source.text)}</div>
              <span
                className="absolute bottom-1 right-1 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity
              bg-[var(--gray-light-mode-400)] text-[var(--gray-light-mode-900)]
              dark:bg-[var(--gray-dark-mode-600)] dark:text-[var(--gray-dark-mode-25)]"
              >
                {t('view_more')}
              </span>
            </div>
          </div>
        ))}
      </div>
      <SourcesModal
        open={!!activeSource}
        onClose={() => setActiveSource(null)}
        source={activeSource}
      />
    </>
  )
}

import { cn } from '@/src/utils/cn'
import { EChatModality } from '../types'
import { useChatActions } from './controller'
import { useTranslations } from 'next-intl'

export const ChatActions = () => {
  const t = useTranslations('chat')
  const { modality, handleModalityChange } = useChatActions()

  return (
    <div className="py-2 flex rounded-lg flex-row gap-2 items-center">
      <button
        type="button"
        aria-label={t('messages')}
        onClick={() => handleModalityChange(EChatModality.NORMAL)}
        className={cn(
          'bottom-4 right-4 rounded-md px-3 py-2 text-sm font-medium shadow-sm',
          'text-[var(--gray-light-mode-900)] dark:text-[var(--gray-dark-mode-25)]',
          modality === EChatModality.NORMAL
            ? 'bg-[var(--brand-500)]'
            : 'bg-[var(--gray-light-mode-200)] dark:bg-[var(--gray-dark-mode-900)]'
        )}
      >
        {t('messages')}
      </button>

      <button
        type="button"
        aria-label={t('charts')}
        onClick={() => handleModalityChange(EChatModality.TEXT2SQL)}
        className={cn(
          'bottom-4 right-4 rounded-md px-3 py-2 text-sm font-medium shadow-sm',
          'text-[var(--gray-light-mode-900)] dark:text-[var(--gray-dark-mode-25)]',
          modality === EChatModality.TEXT2SQL
            ? 'bg-[var(--brand-500)]'
            : 'bg-[var(--gray-light-mode-200)] dark:bg-[var(--gray-dark-mode-900)]'
        )}
      >
        {t('charts')}
      </button>
    </div>
  )
}

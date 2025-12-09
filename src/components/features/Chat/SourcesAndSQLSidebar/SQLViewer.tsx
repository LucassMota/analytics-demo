'use client'

import { cn } from '@/src/utils/cn'
import { CopyBlock, github, obsidian } from 'react-code-blocks'
import { useTheme } from '@/src/providers/ThemeProvider'

type SQLViewerProps = {
  sql: string
  language?: string
  showLineNumbers?: boolean
  wrapLines?: boolean
  className?: string
  codeBlock?: boolean
}

export default function SQLViewer({
  sql,
  language = 'sql',
  showLineNumbers = true,
  wrapLines = true,
  className,
  codeBlock = true
}: SQLViewerProps) {
  const { theme } = useTheme()
  const codeTheme = theme === 'dark' ? obsidian : github
  return (
    <div
      className={cn(
        'relative rounded-md border border-black/10 shadow-sm overflow-hidden',
        'bg-white dark:bg-neutral-900',
        'max-h-full overflow-auto',
        className
      )}
    >
      <CopyBlock
        text={sql.replace(/`/g, '')}
        language={language}
        theme={codeTheme}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
        codeBlock={codeBlock}
      />
    </div>
  )
}

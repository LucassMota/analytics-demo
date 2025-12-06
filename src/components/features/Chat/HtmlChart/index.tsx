'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchHtmlChart } from './actions'

type HtmlViewerProps = {
  chartHTMLPath: string
  title?: string
  className?: string
  iframeClassName?: string
  height?: number | string
  autoHeight?: boolean
}

export default function HtmlViewer({
  chartHTMLPath,
  title = 'html-chart',
  iframeClassName = '',
  height,
  autoHeight = true
}: HtmlViewerProps) {
  const [html, setHtml] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const fixedHeight = useMemo(() => {
    if (height === undefined) return null
    return typeof height === 'number' ? `${height}px` : height
  }, [height])

  const loadHtml = useCallback(async () => {
    if (!chartHTMLPath) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetchHtmlChart(chartHTMLPath)
      const content = typeof response?.html === 'string' ? response.html : ''
      setHtml(content)
    } catch (e: any) {
      setError('Failed to load HTML content.')
      setHtml('')
    } finally {
      setLoading(false)
    }
  }, [chartHTMLPath])

  useEffect(() => {
    loadHtml()
  }, [loadHtml])

  const adjustIframeHeight = useCallback(() => {
    if (!autoHeight || fixedHeight || !iframeRef.current) return
    try {
      const doc =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow?.document
      if (!doc) return
      const htmlEl = doc.documentElement
      const bodyEl = doc.body
      const h1 = htmlEl ? htmlEl.scrollHeight : 0
      const h2 = bodyEl ? bodyEl.scrollHeight : 0
      const newHeight = Math.max(h1, h2, 0)
      if (newHeight > 0) {
        iframeRef.current.style.height = `${newHeight}px`
      }
    } catch {}
  }, [autoHeight, fixedHeight])

  useEffect(() => {
    if (!autoHeight || fixedHeight) return
    const t = setTimeout(adjustIframeHeight, 300)
    return () => clearTimeout(t)
  }, [html, autoHeight, fixedHeight, adjustIframeHeight])

  return (
    <div className="w-full">
      {error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : loading ? (
        <div className="text-sm text-[var(--gray-neutral-500)]">
          Loading chart…
        </div>
      ) : html ? (
        <iframe
          ref={iframeRef}
          title={title}
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className={[
            'w-full rounded border border-[var(--gray-light-mode-200)] dark:border-[var(--gray-dark-mode-800)] bg-white',
            iframeClassName
          ].join(' ')}
          style={{
            width: '100%',
            height: fixedHeight ?? '360px'
          }}
          onLoad={adjustIframeHeight}
        />
      ) : (
        <div className="text-sm text-[var(--gray-neutral-500)]">
          No HTML to display.
        </div>
      )}
    </div>
  )
}

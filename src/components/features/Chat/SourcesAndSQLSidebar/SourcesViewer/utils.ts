import React from 'react'

export function formatSourceText(text: string): React.ReactNode {
  if (typeof text !== 'string') return ''
  // Normalize Windows and old Mac line endings to '\n'
  const normalized = text.replace(/\r\n?/g, '\n')
  // Convert literal '\n' sequences into actual newlines
  const withRealNewlines = normalized.replace(/\\n/g, '\n')
  // Split on newlines and insert a <br/> after each line.
  // If the line contains a [Page ...] tag, insert one extra <br/> to create a blank line.
  const segments = withRealNewlines.split('\n')
  const nodes: React.ReactNode[] = []
  const pageTag = /\[Page [^\]]+\]/
  segments.forEach((seg, i) => {
    nodes.push(seg)
    if (i < segments.length - 1) {
      nodes.push(React.createElement('br', { key: `br1-${i}` }))
      if (pageTag.test(seg)) {
        nodes.push(React.createElement('br', { key: `br2-${i}` }))
      }
    }
  })
  return nodes
}

// @path: src/lib/linkifyKeywords.tsx
import type { ReactNode } from 'react'

const KEYWORD_LINKS: Record<string, string> = {
  Instagram: 'https://www.instagram.com/jay_doesitall',
  TikTok: 'https://tiktok.com/@jaydoesitall',
  YouTube: 'https://youtube.com/@jaydoesitall',
  On: 'https://www.on.com',
  Powerbar: 'https://www.powerbar.com',
}

export function linkifyKeywords(content: ReactNode): ReactNode {
  if (typeof content !== 'string') {
    return content
  }

  const text = content

  const keywords = Object.keys(KEYWORD_LINKS)
  if (keywords.length === 0) {
    return text
  }

  const escaped = keywords
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')

  const pattern = new RegExp(`(${escaped})`, 'g')
  const parts = text.split(pattern)

  return parts.map((part, index) => {
    const href = KEYWORD_LINKS[part]
    if (!href) {
      return <span key={index}>{part}</span>
    }

    return (
      <a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow inline-block font-bold hover:opacity-80"
      >
        {part}
      </a>
    )
  })
}

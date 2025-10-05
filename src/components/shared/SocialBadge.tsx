// @path: src/components/shared/SocialBadge.tsx
// src/components/shared/SocialBadge.tsx
'use client'

import { Instagram, Youtube } from 'lucide-react'
import type { SVGProps } from 'react'
import type { SocialIcon } from '@/content/types/globals'

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M14.5 3v3.2c0 2 1.6 3.6 3.6 3.6h1.4v2.5c-1.6-.1-3.1-.6-4.5-1.5v4.8a5.5 5.5 0 1 1-5.5-5.5c.4 0 .8 0 .1.1v2.6a2.9 2.9 0 1 0 2.9 2.9V3h.9Z"
        fill="currentColor"
      />
    </svg>
  )
}

type SocialBadgeProps = {
  href: string
  label: string
  icon: SocialIcon
  className?: string
}

export default function SocialBadge({
  href,
  label,
  icon,
  className = '',
}: SocialBadgeProps) {
  const base =
    'inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-yellow text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow/70'

  const Icon =
    icon === 'instagram' ? Instagram : icon === 'youtube' ? Youtube : undefined

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${base} ${className}`}
      title={label}
    >
      {icon === 'tiktok' ? (
        <TikTokIcon className="h-5 w-5" />
      ) : (
        Icon && <Icon className="h-5 w-5" />
      )}
    </a>
  )
}

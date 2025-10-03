// @path: src/components/shared/FeatureLine.tsx
import type { ReactNode } from 'react'

export default function FeatureLine({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <li
      className={[
        'border-yellow text-body-s-reg border-l-2 pl-4',
        className,
      ].join(' ')}
    >
      {children}
    </li>
  )
}

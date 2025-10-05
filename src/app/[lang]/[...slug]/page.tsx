// @path: src/app/[lang]/[...slug]/page.tsx
import { notFound } from 'next/navigation'

export default function LangCatchAll() {
  notFound()
}

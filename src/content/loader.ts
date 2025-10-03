// @path: src/content/loader.ts
import 'server-only'
import type { Metadata } from 'next'

import homeFR from '@/content/home.fr.json'
import servicesIndexFR from '@/content/services.fr.json'
import aboutFR from '@/content/about.fr.json'
import contactFR from '@/content/contact.fr.json'
import coachingFR from '@/content/coaching.fr.json'
import runningFR from '@/content/running.fr.json'
import navigationFR from '@/content/navigation.fr.json'

const PAGES = {
  home: homeFR,
  services: servicesIndexFR,
  contact: contactFR,
  about: aboutFR,
} as const

const SERVICES = {
  coaching: coachingFR,
  running: runningFR,
} as const

const toArray = (v?: any | any[]) => (Array.isArray(v) ? v : v ? [v] : [])

export function loadGlobals(locale: 'fr' | 'en' = 'fr'): any {
  switch (locale) {
    case 'fr':
    default:
      return navigationFR as unknown as any
  }
}

export function loadPage(page: 'home' | 'services' | 'contact' | 'about') {
  return (PAGES as any)[page]
}

export function getPageMeta(page: 'home' | 'services' | 'contact'): Metadata {
  return ((PAGES as any)[page]?.meta ?? {}) as Metadata
}

export function getPageJsonLd(page: 'home' | 'services' | 'contact') {
  return toArray((PAGES as any)[page]?.jsonLd)
}

export async function listServiceSlugs() {
  return Object.keys(SERVICES)
}

export async function loadService(slug: string) {
  const service = (SERVICES as any)[slug]
  if (!service) return null
  return { service } as const
}

export async function getStaticParamsServices() {
  const slugs = await listServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

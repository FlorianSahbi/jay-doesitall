// @path: src/content/ids.ts

export const PAGES = {
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact',
  SERVICES: 'services',
} as const
export type PageId = (typeof PAGES)[keyof typeof PAGES]

export const SERVICE_SLUGS = {
  COACHING: 'coaching',
  RUNNING: 'running',
} as const
export type ServiceSlug = (typeof SERVICE_SLUGS)[keyof typeof SERVICE_SLUGS]

export const SERVICE_SLUG_LIST: ServiceSlug[] = Object.values(SERVICE_SLUGS)

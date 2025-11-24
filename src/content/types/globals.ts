// @path: src/content/types/globals.ts

export type SocialIcon = 'instagram' | 'youtube' | 'tiktok'

export type NavMenuItem = {
  href: string
  label: string
}

export type SocialLink = {
  href: string
  label: string
  icon: SocialIcon
}

export type GlobalsContent = {
  menu: NavMenuItem[]
  socials: SocialLink[]
  followLabel: string
  copyright: string
  openLabel: string
  closeLabel: string
  brand: string
}

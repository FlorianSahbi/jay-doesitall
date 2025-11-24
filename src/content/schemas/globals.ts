// @path: src/content/schemas/globals.ts

import { z } from 'zod'

export const SocialIconSchema = z.enum(['instagram', 'youtube', 'tiktok'])

export const NavMenuItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
})

export const SocialLinkSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
  icon: SocialIconSchema,
})

export const GlobalsContentSchema = z.object({
  menu: z.array(NavMenuItemSchema).min(1),
  socials: z.array(SocialLinkSchema).min(1),
  followLabel: z.string().min(1),
  copyright: z.string().min(1),
  openLabel: z.string().min(1),
  closeLabel: z.string().min(1),
  brand: z.string().min(1),
})

export type GlobalsContent = z.infer<typeof GlobalsContentSchema>
export type NavMenuItem = z.infer<typeof NavMenuItemSchema>
export type SocialLink = z.infer<typeof SocialLinkSchema>
export type SocialIcon = z.infer<typeof SocialIconSchema>

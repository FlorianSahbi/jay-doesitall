// @path: src/content/schemas/contact.ts
import { z } from 'zod'

const ImageSrc = z.string().min(1)

export const ContactHeroSchema = z.object({
  cover: ImageSrc,
  alt: z.string().min(1),
})

export const ContactCTASchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

export const ContactPageContentSchema = z.object({
  hero: ContactHeroSchema,
  kicker: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(1),
  cta: ContactCTASchema,
})

export type ContactPageContent = z.infer<typeof ContactPageContentSchema>

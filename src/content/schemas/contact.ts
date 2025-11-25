// @path: src/content/schemas/contact.ts
import { z } from 'zod'
import { ServicesIndexHeroSchema } from '@/content/schemas/services' // on réutilise le même type de hero

export const ContactCtaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

export const ContactPageContentSchema = z.object({
  hero: ServicesIndexHeroSchema,
  kicker: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(1),
  cta: ContactCtaSchema,
})

export type ContactPageContent = z.infer<typeof ContactPageContentSchema>

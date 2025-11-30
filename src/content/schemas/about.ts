// @path: src/content/schemas/about.ts
import { z } from 'zod'

const ImageSrc = z.string().min(1)

export const AboutHeroSchema = z.object({
  cover: ImageSrc,
  coverMobile: ImageSrc,
  kicker: z.string().min(1),
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  credo: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    text: z.string().min(1),
  }),
  overlap: z.union([z.string().min(1), z.number()]),
})

export const AboutReasonsSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
  gallery: z.array(z.object({ src: ImageSrc, alt: z.string().min(1) })).min(1),
  ctaLabel: z.string().min(1),
})

export const AboutLocationSectionSchema = z.object({
  title: z.string().min(1),
  subtitle: z.object({
    text: z.string().min(1),
    href: z.string().min(1),
  }),
})

export const AboutPlaceSchema = z.object({
  name: z.string().min(1),
  src: ImageSrc,
  sections: z.array(AboutLocationSectionSchema).min(1),
  siteUrl: z.string().min(1),
})

export const AboutLocationsSchema = z.object({
  wrapperTitle: z.string().min(1),
  places: z.array(AboutPlaceSchema).min(1),
})

export const AboutPartnerItemSchema = z.object({
  imgSrc: ImageSrc,
  alt: z.string().min(1),
  description: z.string().min(1),
})

export const AboutPartnersSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  items: z.array(AboutPartnerItemSchema).min(1),
})

export const AboutPageContentSchema = z.object({
  hero: AboutHeroSchema,
  reasons: AboutReasonsSchema,
  locations: AboutLocationsSchema,
  partners: AboutPartnersSchema,
})

export type AboutPageContent = z.infer<typeof AboutPageContentSchema>

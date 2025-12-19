// @path: src/content/schemas/services.ts
import { z } from 'zod'

const ImageSrc = z.string().min(1)

const HeroCoverSchema = z.object({
  desktop: ImageSrc,
  mobile: ImageSrc,
})

export const ServicesIndexHeroSchema = z.object({
  cover: HeroCoverSchema,
  alt: z.string().min(1),
})

export const ServicesIndexCardSchema = z.object({
  href: z.string().min(1),
  title: z.string().min(1),
  cover: ImageSrc,
  ctaLabel: z.string().min(1),
})

export const ServicesIndexContentSchema = z.object({
  hero: ServicesIndexHeroSchema,
  kicker: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(1),
  cards: z.array(ServicesIndexCardSchema).min(1),
})

export const ServicePlanSchema = z.object({
  type: z.string().min(1),
  title: z.string().min(1),
  features: z.array(z.string()).default([]),
  price: z.array(z.string()).default([]),
})

export const ServiceHeroSchema = z.object({
  cover: HeroCoverSchema,
  alt: z.string().min(1),
})

export const ServiceContentSchema = z.object({
  slug: z.string().min(1),
  kicker: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  hero: ServiceHeroSchema,
  plans: z.array(ServicePlanSchema).min(1),
})

export type ServicesIndexContent = z.infer<typeof ServicesIndexContentSchema>
export type ServiceContent = z.infer<typeof ServiceContentSchema>

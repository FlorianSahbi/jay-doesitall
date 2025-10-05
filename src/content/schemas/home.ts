// @path: src/content/schemas/home.ts
import { z } from 'zod'

const ImageSrc = z.string().min(1, 'image src required')

export const HomeHeroSchema = z.object({
  backgroundImage: ImageSrc,
  imageAlt: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  ctaLabel: z.string().min(1),
  about: z.object({
    kicker: z.string().min(1),
    text: z.string().min(1),
    ctaLabel: z.string().min(1),
  }),
})

export const HomeServiceCardSchema = z.object({
  href: z.string().min(1),
  title: z.string().min(1),
  cover: ImageSrc,
  ctaLabel: z.string().min(1),
})

export const HomeServicesSchema = z.object({
  title: z.string().min(1),
  ctaLabel: z.string().min(1),
  ctaHref: z.string().min(1),
  cards: z.array(HomeServiceCardSchema).min(1, 'at least one service card'),
})

export const HomeTestimonialItemSchema = z.object({
  text: z.string().min(1),
  author: z.string().min(1),
})

export const HomeTestimonialsSchema = z.object({
  title: z.string().min(1),
  items: z.array(HomeTestimonialItemSchema).min(1, 'at least one testimonial'),
})

export const HomeWhyMeItemSchema = z.object({
  num: z.string().min(1),
  title: z.string().min(1),
  desc: z.string().min(1),
})

export const HomeWhyMeSchema = z.object({
  title: z.string().min(1),
  backgroundImage: ImageSrc,
  backgroundAlt: z.string().min(1),
  ctaLabel: z.string().min(1),
  items: z.array(HomeWhyMeItemSchema).min(1, 'at least one reason'),
})

export const HomePageContentSchema = z.object({
  hero: HomeHeroSchema,
  services: HomeServicesSchema,
  testimonials: HomeTestimonialsSchema,
  whyMe: HomeWhyMeSchema,
})

export type HomePageContent = z.infer<typeof HomePageContentSchema>

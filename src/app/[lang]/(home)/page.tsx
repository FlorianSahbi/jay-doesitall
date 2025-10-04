// @path: src/app/[lang]/(home)/page.tsx
import { loadPage } from '@/content/loader'
import HomeHero from '@/components/home/HomeHero'
import HomeServices from '@/components/home/HomeServices'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import HomeWhyMe from '@/components/home/HomeWhyMe'

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: 'fr' | 'en' }
}) {
  const DATA = (await loadPage('home', lang)) as any
  const { hero, services, testimonials, whyMe } = DATA

  return (
    <>
      <HomeHero data={hero} />
      <HomeServices data={services} />
      <HomeTestimonials data={testimonials} />
      <HomeWhyMe data={whyMe} />
    </>
  )
}

// @path: src/app/[lang]/about/page.tsx
import { loadPage } from '@/content/loader'
import AboutHero from '@/components/about/AboutHero'
import AboutLocations from '@/components/about/AboutLocations'
import AboutPartners from '@/components/about/AboutPartners'
import AboutReasons from '@/components/about/AboutReasons'

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: 'fr' | 'en' }
}) {
  const DATA = (await loadPage('about', lang)) as any
  const { hero, reasons, locations, partners } = DATA

  return (
    <>
      <AboutHero data={hero} />
      <AboutReasons data={reasons} />
      <AboutLocations data={locations} />
      <AboutPartners data={partners} />
    </>
  )
}

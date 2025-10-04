// @path: src/app/[lang]/about/page.tsx
import { loadPage } from '@/content/loader'
import AboutHero from '@/components/about/AboutHero'
import AboutLocations from '@/components/about/AboutLocations'
import AboutPartners from '@/components/about/AboutPartners'
import AboutReasons from '@/components/about/AboutReasons'
import { PAGES } from '@/content/ids'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const DATA = (await loadPage(PAGES.ABOUT, lang)) as any
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

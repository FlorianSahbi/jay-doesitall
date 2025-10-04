// @path: src/app/[lang]/layout.tsx
import { Poppins, Mohave } from 'next/font/google'
import './globals.css'
import Footer from '@/components/globals/Footer'
import Navigation from '@/components/globals/Navigation'
import type { Metadata } from 'next'
import { loadGlobals } from '@/content/loader'
import { Suspense } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
})
const mohave = Mohave({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-mohave',
})

export const metadata: Metadata = {
  title: 'Jay Doesitall - Coaching sportif & Préparation mentale',
  description:
    'Jay Doesitall vous accompagne dans votre transformation physique et mentale grâce à des programmes de coaching sportif et de préparation mentale personnalisés.',
}

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export default async function RootLayout(props: LayoutProps<'/[lang]'>) {
  const { lang } = await props.params
  const locale = (lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const { menu, socials, followLabel, copyright } = await loadGlobals(locale)

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} ${mohave.variable} antialiased`}>
        <div className="grid-layout min-h-screen">
          <Suspense fallback={null}>
            <Navigation menu={menu} hideOnScroll={false} />
          </Suspense>

          <main className="contents">{props.children}</main>

          <Footer
            menu={menu}
            socials={socials}
            followLabel={followLabel}
            copyright={copyright}
          />
        </div>
      </body>
    </html>
  )
}

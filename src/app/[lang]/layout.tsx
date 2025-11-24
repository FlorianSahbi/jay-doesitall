// @path: src/app/[lang]/layout.tsx

import { Poppins, Mohave } from 'next/font/google'
import './globals.css'
import Footer from '@/components/globals/Footer'
import Navigation from '@/components/globals/Navigation'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { getGlobalsContent } from '@/content/mappers/globals'
import { normalizeLocale, type Locale, LOCALES } from '@/i18n/locales'

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

export const metadata = {
  verification: {
    google: 'f1cAwSj1MGMn5rJoMf_cylnu3-3kKGfiNvegCYh4H8Y',
  },
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang: Locale = normalizeLocale(rawLang)

  const {
    menu,
    socials,
    followLabel,
    copyright,
    openLabel,
    closeLabel,
    brand,
  } = await getGlobalsContent(lang)

  return (
    <html lang={lang}>
      <body className={`${poppins.variable} ${mohave.variable} antialiased`}>
        <NextIntlClientProvider locale={lang}>
          <div className="grid-layout min-h-screen">
            <Navigation
              menu={menu}
              openLabel={openLabel}
              closeLabel={closeLabel}
              brand={brand}
              hideOnScroll={false}
            />
            <main className="contents">{children}</main>
            <Footer
              menu={menu}
              socials={socials}
              followLabel={followLabel}
              copyright={copyright}
            />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

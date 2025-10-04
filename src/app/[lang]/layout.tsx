// @path: src/app/[lang]/layout.tsx
import { Poppins, Mohave } from 'next/font/google'
import './globals.css'
import Footer from '@/components/globals/Footer'
import Navigation from '@/components/globals/Navigation'
import type { Metadata } from 'next'
import { loadGlobals } from '@/content/loader'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'

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
  description: 'Jay Doesitall vous accompagne…',
}

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const { menu, socials, followLabel, copyright } = await loadGlobals(lang)

  return (
    <html lang={lang}>
      <body className={`${poppins.variable} ${mohave.variable} antialiased`}>
        <NextIntlClientProvider locale={lang}>
          <div className="grid-layout min-h-screen">
            <Navigation menu={menu} hideOnScroll={false} />
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

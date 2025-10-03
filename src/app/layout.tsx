// @path: src/app/layout.tsx
import { Poppins, Mohave } from 'next/font/google'
import './globals.css'
import Footer from '@/components/globals/Footer'
import Navigation from '@/components/globals/Navigation'
import { Metadata } from 'next'
import { loadGlobals } from '@/content/loader'

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
  keywords:
    'coaching sportif, préparation mentale, transformation physique, bien-être, performance, motivation, santé, fitness, développement personnel',
  authors: [{ name: 'Florian Sahbi', url: 'floriansahbi.dev' }],
  openGraph: {
    title: 'Jay Doesitall - Coaching sportif & Préparation mentale',
    description:
      'Jay Doesitall vous accompagne dans votre transformation physique et mentale grâce à des programmes de coaching sportif et de préparation mentale personnalisés.',
    url: 'https://jaydoesitall.com',
    siteName: 'Jay Doesitall',
    images: [
      {
        url: 'https://jaydoesitall.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jay Doesitall',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jay Doesitall - Coaching sportif & Préparation mentale',
    description:
      'Jay Doesitall vous accompagne dans votre transformation physique et mentale grâce à des programmes de coaching sportif et de préparation mentale personnalisés.',
    images: ['https://jaydoesitall.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const globals = loadGlobals('fr')

  const { menu, socials, followLabel, copyright } = globals

  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${mohave.variable} antialiased`}>
        <div className="grid-layout min-h-screen">
          <Navigation menu={menu} />
          <main className="contents">{children}</main>
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

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-context'
import { themeScript } from '@/lib/theme-script'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'weware - Tvoříme digitální produkty na míru',
  description: 'Weby, aplikace, design a marketing. Vše pod jednou střechou, bez kompromisů.',
  keywords: ['webové stránky', 'aplikace', 'e-shop', 'design', 'marketing', 'SEO', 'Zlín'],
  authors: [{ name: 'weware' }],
  metadataBase: new URL('https://weware.cz'),
  openGraph: {
    title: 'weware - Tvoříme digitální produkty na míru',
    description: 'Weby, aplikace, design a marketing. Vše pod jednou střechou, bez kompromisů.',
    url: 'https://weware.cz',
    siteName: 'weware',
    type: 'website',
    locale: 'cs_CZ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'weware - Tvoříme digitální produkty na míru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'weware - Tvoříme digitální produkty na míru',
    description: 'Weby, aplikace, design a marketing. Vše pod jednou střechou, bez kompromisů.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'weware',
  url: 'https://weware.cz',
  logo: 'https://weware.cz/icon.svg',
  description: 'Tvoříme weby, aplikace a e-shopy na míru. Vše pod jednou střechou, bez kompromisů.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Zlín',
    addressCountry: 'CZ',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Czech', 'English'],
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

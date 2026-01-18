import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'DevStudio - Tvoříme digitální produkty na míru',
  description: 'Weby, aplikace, design a marketing. Vše pod jednou střechou, bez kompromisů.',
  keywords: ['webové stránky', 'aplikace', 'e-shop', 'design', 'marketing', 'SEO', 'Ostrava'],
  authors: [{ name: 'DevStudio' }],
  metadataBase: new URL('https://devstudio-next.vercel.app'),
  openGraph: {
    title: 'DevStudio - Tvoříme digitální produkty na míru',
    description: 'Weby, aplikace, design a marketing. Vše pod jednou střechou, bez kompromisů.',
    url: 'https://devstudio-next.vercel.app',
    siteName: 'DevStudio',
    type: 'website',
    locale: 'cs_CZ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevStudio - Tvoříme digitální produkty na míru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevStudio - Tvoříme digitální produkty na míru',
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
  name: 'DevStudio',
  url: 'https://devstudio-next.vercel.app',
  logo: 'https://devstudio-next.vercel.app/icon.svg',
  description: 'Tvoříme weby, aplikace a e-shopy na míru. Vše pod jednou střechou, bez kompromisů.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ostrava',
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
    <html lang="cs" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

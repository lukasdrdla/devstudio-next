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
  openGraph: {
    title: 'DevStudio - Tvoříme digitální produkty na míru',
    description: 'Weby, aplikace, design a marketing. Vše pod jednou střechou, bez kompromisů.',
    type: 'website',
    locale: 'cs_CZ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

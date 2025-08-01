import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Email Marketing Spy - CommerceInk',
  description: 'See every email your competitors send. Competitive email intelligence for e-commerce brands.',
  keywords: 'email marketing, competitor analysis, email spy, campaign intelligence, CommerceInk',
  authors: [{ name: 'CommerceInk' }],
  openGraph: {
    title: 'Email Marketing Spy - Competitive Intelligence',
    description: 'Discover winning email campaigns, subject lines, and strategies. Get competitive intelligence that drives revenue.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Marketing Spy - CommerceInk',
    description: 'See every email your competitors send. Get competitive intelligence that drives revenue.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}
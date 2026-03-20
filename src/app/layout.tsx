import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'IEP Pilot - AI-Powered IEP Writing Tool',
  description: 'Write Individualized Education Programs in 10 minutes with Claude AI. Save time, improve quality, and empower special education teachers.',
  keywords: ['IEP', 'special education', 'AI', 'education technology'],
  authors: [{ name: 'IEP Pilot' }],
  creator: 'IEP Pilot',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://ieppilot.com',
    siteName: 'IEP Pilot',
    title: 'IEP Pilot - AI-Powered IEP Writing Tool',
    description: 'Write Individualized Education Programs in 10 minutes with Claude AI.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'IEP Pilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IEP Pilot - AI-Powered IEP Writing Tool',
    description: 'Write Individualized Education Programs in 10 minutes with Claude AI.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'BPSC Teacher - Bihar Govt Teacher Guide',
    template: '%s | BPSC Teacher'
  },
  description: 'Complete guide for Bihar government teacher recruitment: STET (BSEB) + BPSC Teacher Recruitment. Check eligibility, syllabus, cut-off marks, and take mock tests.',
  keywords: ['BPSC Teacher', 'STET', 'Bihar Teacher', 'Government Teacher', 'Teacher Recruitment', 'BSEB', 'Bihar Education'],
  authors: [{ name: 'BPSC Teacher Team' }],
  creator: 'BPSC Teacher',
  publisher: 'BPSC Teacher',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bpscteacher.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'hi': '/hi',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bpscteacher.com',
    title: 'BPSC Teacher - Bihar Govt Teacher Guide',
    description: 'Complete guide for Bihar government teacher recruitment: STET (BSEB) + BPSC Teacher Recruitment.',
    siteName: 'BPSC Teacher',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BPSC Teacher - Bihar Govt Teacher Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BPSC Teacher - Bihar Govt Teacher Guide',
    description: 'Complete guide for Bihar government teacher recruitment: STET (BSEB) + BPSC Teacher Recruitment.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

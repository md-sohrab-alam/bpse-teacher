import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import ErrorBoundary from '@/components/error-boundary'
import GoogleAnalytics from '@/components/google-analytics'
import StructuredData from '@/components/structured-data'
import { constructMetadata, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = constructMetadata({
  title: 'BPSC Teacher - Bihar Govt Teacher Guide',
  description: 'Complete guide for Bihar government teacher recruitment: STET (BSEB) + BPSC Teacher Recruitment. Check eligibility, syllabus, cut-off marks, and take mock tests.',
  image: 'https://bpseteacher.com/og-image.jpg',
})

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
      <head>
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebsiteSchema()} />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ErrorBoundary>
        <GoogleAnalytics />
      </body>
    </html>
  )
}

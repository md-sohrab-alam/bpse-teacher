import { Metadata } from 'next'

export const siteConfig = {
  name: 'BPSC Teacher',
  description: 'Complete guide for Bihar government teacher recruitment: STET (BSEB) + BPSC Teacher Recruitment. Check eligibility, syllabus, cut-off marks, and take mock tests.',
  url: 'https://bpseteacher.com',
  ogImage: 'https://bpseteacher.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/bpscteacher',
    github: 'https://github.com/bpscteacher',
  },
}

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: {
      default: title || siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: description || siteConfig.description,
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
      creator: '@bpscteacher',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: siteConfig.url,
    },
  }
}

// Structured Data for Organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BPSC Teacher',
    url: 'https://bpseteacher.com',
    logo: 'https://bpseteacher.com/logo.png',
    description: 'Complete guide for Bihar government teacher recruitment',
    sameAs: [
      'https://twitter.com/bpscteacher',
      'https://facebook.com/bpscteacher',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  }
}

// Structured Data for WebSite
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BPSC Teacher',
    url: 'https://bpseteacher.com',
    description: 'Complete guide for Bihar government teacher recruitment',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bpseteacher.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Structured Data for Course/Exam
export function generateExamSchema(examData: {
  name: string
  description: string
  url: string
  provider: string
  educationalLevel: string
  inLanguage: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: examData.name,
    description: examData.description,
    url: examData.url,
    provider: {
      '@type': 'Organization',
      name: examData.provider,
    },
    educationalLevel: examData.educationalLevel,
    inLanguage: examData.inLanguage,
    courseMode: 'online',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }
}

// Structured Data for FAQ
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

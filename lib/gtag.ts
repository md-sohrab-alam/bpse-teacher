export const GA_TRACKING_ID = 'G-1TV023FZJC'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track custom events for your application
export const trackSearch = (query: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
  })
}

export const trackMockTestStart = (testName: string) => {
  event({
    action: 'start_test',
    category: 'engagement',
    label: testName,
  })
}

export const trackMockTestComplete = (testName: string, score: number) => {
  event({
    action: 'complete_test',
    category: 'engagement',
    label: testName,
    value: score,
  })
}

export const trackEligibilityCheck = (examType: string) => {
  event({
    action: 'check_eligibility',
    category: 'engagement',
    label: examType,
  })
}

export const trackLanguageSwitch = (language: string) => {
  event({
    action: 'switch_language',
    category: 'engagement',
    label: language,
  })
}

export const trackContactForm = (category: string) => {
  event({
    action: 'contact_form_submit',
    category: 'engagement',
    label: category,
  })
}

// Declare gtag on window object
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

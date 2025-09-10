import newsData from '@/data/news.json'

export interface NewsArticle {
  id: string
  title: string
  titleHi: string
  content: string
  contentHi: string
  date: string
  source: string
  url: string
  type: 'notification' | 'news' | 'update'
  priority: 'high' | 'medium' | 'low'
  isActive: boolean
}

export interface NewsFilters {
  type?: string
  priority?: string
  isActive?: boolean
  limit?: number
}

/**
 * Get all news articles
 */
export function getAllNews(filters: NewsFilters = {}): NewsArticle[] {
  let news = newsData.news as NewsArticle[]
  
  // Apply filters
  if (filters.type) {
    news = news.filter(article => article.type === filters.type)
  }
  
  if (filters.priority) {
    news = news.filter(article => article.priority === filters.priority)
  }
  
  if (filters.isActive !== undefined) {
    news = news.filter(article => article.isActive === filters.isActive)
  }
  
  // Sort by date (newest first)
  news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  // Apply limit
  if (filters.limit) {
    news = news.slice(0, filters.limit)
  }
  
  return news
}

/**
 * Get news by ID
 */
export function getNewsById(id: string): NewsArticle | null {
  const news = newsData.news as NewsArticle[]
  return news.find(article => article.id === id) || null
}

/**
 * Get latest news (for homepage)
 */
export function getLatestNews(limit: number = 3): NewsArticle[] {
  return getAllNews({ isActive: true, limit })
}

/**
 * Get high priority news
 */
export function getHighPriorityNews(): NewsArticle[] {
  return getAllNews({ priority: 'high', isActive: true })
}

/**
 * Get news by type
 */
export function getNewsByType(type: 'notification' | 'news' | 'update'): NewsArticle[] {
  return getAllNews({ type, isActive: true })
}

/**
 * Format date for display
 */
export function formatNewsDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return locale === 'hi' ? 'आज' : 'Today'
  } else if (diffDays === 1) {
    return locale === 'hi' ? 'कल' : 'Yesterday'
  } else if (diffDays < 7) {
    return locale === 'hi' ? `${diffDays} दिन पहले` : `${diffDays} days ago`
  } else {
    return date.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

/**
 * Get news type color
 */
export function getNewsTypeColor(type: string): string {
  switch (type) {
    case 'notification':
      return 'bg-red-100 text-red-800'
    case 'news':
      return 'bg-blue-100 text-blue-800'
    case 'update':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}


export interface SearchQuery {
  query: string
  language?: string
  filters?: {
    examType?: string[]
    type?: string[]
    topic?: string[]
  }
  limit?: number
}

export interface SearchResult {
  id: string
  type: 'question' | 'news' | 'exam' | 'syllabus' | 'eligibility'
  title: string
  titleHi: string
  content: string
  contentHi: string
  relevance: number
  metadata: {
    topic?: string
    difficulty?: string
    examType?: string
    date?: string
    category?: string
  }
  url?: string
}

export interface SearchResponse {
  results: SearchResult[]
  suggestions: string[]
  totalResults: number
  query: string
  processingTime: number
  keyInfo: {
    summary: string
    keyTopics: string[]
    recommendations: string[]
  }
}

/**
 * Detect if text contains Hindi characters
 */
function isHindiText(text: string): boolean {
  const hindiRegex = /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF]/
  return hindiRegex.test(text)
}

/**
 * Enhanced search function that combines semantic and keyword matching with bilingual support
 */
export async function enhancedSearch(
  searchQuery: SearchQuery,
  searchableContent: Array<{
    id: string
    type: string
    title: string
    titleHi: string
    content: string
    contentHi: string
    metadata: any
  }>
): Promise<SearchResponse> {
  const startTime = Date.now()
  const { query, language = 'en', filters, limit = 10 } = searchQuery

  // Auto-detect language if not specified
  const detectedLanguage = language || (isHindiText(query) ? 'hi' : 'en')
  const isHindi = detectedLanguage === 'hi'

  // Filter content based on search query with bilingual support
  let filteredContent = searchableContent.filter(item => {
    // Use appropriate language content for search
    const searchTitle = isHindi ? item.titleHi : item.title
    const searchContent = isHindi ? item.contentHi : item.content
    const searchText = `${searchTitle} ${searchContent}`.toLowerCase()
    const queryLower = query.toLowerCase()
    
    // Enhanced keyword matching for both languages
    const queryWords = queryLower.split(' ').filter(word => word.length > 1)
    
    // Check for exact matches first
    const hasExactMatch = searchText.includes(queryLower)
    
    // Check for word matches
    const hasWordMatches = queryWords.some(word => 
      searchText.includes(word) && word.length > 1
    )
    
    // For Hindi queries, also check English content as fallback
    let hasEnglishFallback = false
    if (isHindi) {
      const englishSearchText = `${item.title} ${item.content}`.toLowerCase()
      hasEnglishFallback = queryWords.some(word => 
        englishSearchText.includes(word) && word.length > 1
      )
    }
    
    // Apply filters if provided
    if (filters) {
      if (filters.examType && filters.examType.length > 0) {
        const hasExamType = filters.examType.some(type => 
          item.metadata?.examType === type
        )
        if (!hasExamType) return false
      }
      
      if (filters.type && filters.type.length > 0) {
        const hasType = filters.type.includes(item.type)
        if (!hasType) return false
      }
      
      if (filters.topic && filters.topic.length > 0) {
        const hasTopic = filters.topic.some(topic => 
          item.metadata?.topic === topic
        )
        if (!hasTopic) return false
      }
    }
    
    return hasExactMatch || hasWordMatches || hasEnglishFallback
  })

  // Calculate relevance scores with bilingual support
  const scoredResults = filteredContent.map(item => {
    const searchTitle = isHindi ? item.titleHi : item.title
    const searchContent = isHindi ? item.contentHi : item.content
    const searchText = `${searchTitle} ${searchContent}`.toLowerCase()
    const queryLower = query.toLowerCase()
    
    let relevance = 0
    
    // Title match gets higher weight
    if (searchTitle.toLowerCase().includes(queryLower)) {
      relevance += 10
    }
    
    // Content match
    if (searchContent.toLowerCase().includes(queryLower)) {
      relevance += 5
    }
    
    // Exact phrase match
    if (searchText.includes(queryLower)) {
      relevance += 15
    }
    
    // Word-by-word matching
    const queryWords = queryLower.split(' ').filter(word => word.length > 1)
    queryWords.forEach(word => {
      if (searchText.includes(word)) {
        relevance += 2
      }
    })
    
    // Language preference bonus
    if (isHindi && item.titleHi && item.contentHi) {
      relevance += 20 // Bonus for Hindi content when searching in Hindi
    } else if (!isHindi && item.title && item.content) {
      relevance += 20 // Bonus for English content when searching in English
    }
    
    // Fallback scoring for Hindi queries in English content
    if (isHindi) {
      const englishSearchText = `${item.title} ${item.content}`.toLowerCase()
      queryWords.forEach(word => {
        if (englishSearchText.includes(word)) {
          relevance += 1 // Lower score for English fallback
        }
      })
    }
    
    // Type-specific scoring
    if (item.type === 'exam') relevance += 3
    if (item.type === 'news') relevance += 2
    if (item.type === 'eligibility') relevance += 4
    
    return {
      id: item.id,
      type: item.type as SearchResult['type'],
      title: isHindi ? item.titleHi : item.title,
      titleHi: item.titleHi,
      content: isHindi ? item.contentHi : item.content,
      contentHi: item.contentHi,
      relevance,
      metadata: item.metadata,
      url: `/${detectedLanguage}/${item.type}/${item.id}`
    }
  })

  // Sort by relevance and limit results
  const sortedResults = scoredResults
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)

  // Generate suggestions
  const suggestions = generateSuggestions(query, searchableContent)

  const processingTime = Date.now() - startTime

  return {
    results: sortedResults,
    suggestions,
    totalResults: filteredContent.length,
    query,
    processingTime,
    keyInfo: {
      summary: `Found ${sortedResults.length} relevant results for "${query}"`,
      keyTopics: extractKeyTopics(sortedResults),
      recommendations: generateRecommendations(sortedResults, query)
    }
  }
}

/**
 * Extract key information from search results
 */
export async function extractKeyInfo(results: SearchResult[]) {
  const topics = extractKeyTopics(results)
  const examTypes = Array.from(new Set(results.map(r => r.metadata?.examType).filter(Boolean)))
  
  return {
    summary: `Found ${results.length} results covering ${topics.length} topics`,
    keyTopics: topics,
    examTypes,
    recommendations: generateRecommendations(results, '')
  }
}

/**
 * Generate search suggestions with bilingual support
 */
function generateSuggestions(query: string, content: any[]): string[] {
  const suggestions = new Set<string>()
  const isHindi = isHindiText(query)
  
  content.forEach(item => {
    // Use appropriate language content for suggestions
    const searchTitle = isHindi ? item.titleHi : item.title
    const searchContent = isHindi ? item.contentHi : item.content
    const searchText = `${searchTitle} ${searchContent}`.toLowerCase()
    const queryLower = query.toLowerCase()
    
    if (searchText.includes(queryLower) && queryLower.length > 1) {
      // Extract phrases that contain the query
      const words = searchText.split(' ')
      for (let i = 0; i < words.length - 2; i++) {
        const phrase = words.slice(i, i + 3).join(' ')
        if (phrase.includes(queryLower)) {
          suggestions.add(phrase)
        }
      }
    }
  })
  
  // Add language-specific suggestions
  if (isHindi) {
    suggestions.add('एसटीईटी परीक्षा की तैयारी')
    suggestions.add('बीपीएससी शिक्षक भर्ती')
    suggestions.add('पात्रता मापदंड')
    suggestions.add('परीक्षा पैटर्न')
  } else {
    suggestions.add('STET exam preparation')
    suggestions.add('BPSC teacher recruitment')
    suggestions.add('eligibility criteria')
    suggestions.add('exam pattern')
  }
  
  return Array.from(suggestions).slice(0, 8)
}

/**
 * Extract key topics from search results
 */
function extractKeyTopics(results: SearchResult[]): string[] {
  const topics = new Set<string>()
  
  results.forEach(result => {
    if (result.metadata?.topic) {
      topics.add(result.metadata.topic)
    }
    if (result.metadata?.category) {
      topics.add(result.metadata.category)
    }
  })
  
  return Array.from(topics)
}

/**
 * Generate recommendations based on search results
 */
function generateRecommendations(results: SearchResult[], query: string): string[] {
  const recommendations: string[] = []
  
  if (results.length === 0) {
    recommendations.push('Try using different keywords')
    recommendations.push('Check spelling of your search terms')
    recommendations.push('Use broader search terms')
  } else {
    const examTypes = Array.from(new Set(results.map(r => r.metadata?.examType).filter(Boolean)))
    if (examTypes.length > 0) {
      recommendations.push(`Explore ${examTypes.join(', ')} related content`)
    }
    
    const topics = extractKeyTopics(results)
    if (topics.length > 0) {
      recommendations.push(`Learn more about ${topics.slice(0, 2).join(', ')}`)
    }
    
    recommendations.push('Take mock tests to practice')
    recommendations.push('Check eligibility criteria')
  }
  
  return recommendations
}

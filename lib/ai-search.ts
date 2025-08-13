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
 * Enhanced search function that combines semantic and keyword matching
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

  // Filter content based on search query
  let filteredContent = searchableContent.filter(item => {
    const searchText = `${item.title} ${item.content}`.toLowerCase()
    const queryLower = query.toLowerCase()
    
    // Basic keyword matching
    const hasKeyword = queryLower.split(' ').some(word => 
      searchText.includes(word) && word.length > 2
    )
    
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
    
    return hasKeyword
  })

  // Calculate relevance scores
  const scoredResults = filteredContent.map(item => {
    const searchText = `${item.title} ${item.content}`.toLowerCase()
    const queryLower = query.toLowerCase()
    
    let relevance = 0
    
    // Title match gets higher weight
    if (item.title.toLowerCase().includes(queryLower)) {
      relevance += 10
    }
    
    // Content match
    if (item.content.toLowerCase().includes(queryLower)) {
      relevance += 5
    }
    
    // Exact phrase match
    if (searchText.includes(queryLower)) {
      relevance += 15
    }
    
    // Word-by-word matching
    const queryWords = queryLower.split(' ').filter(word => word.length > 2)
    queryWords.forEach(word => {
      if (searchText.includes(word)) {
        relevance += 2
      }
    })
    
    // Type-specific scoring
    if (item.type === 'exam') relevance += 3
    if (item.type === 'news') relevance += 2
    if (item.type === 'eligibility') relevance += 4
    
    return {
      id: item.id,
      type: item.type as SearchResult['type'],
      title: item.title,
      titleHi: item.titleHi,
      content: item.content,
      contentHi: item.contentHi,
      relevance,
      metadata: item.metadata,
      url: `/${language}/${item.type}/${item.id}`
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
 * Generate search suggestions
 */
function generateSuggestions(query: string, content: any[]): string[] {
  const suggestions = new Set<string>()
  
  content.forEach(item => {
    const searchText = `${item.title} ${item.content}`.toLowerCase()
    const queryLower = query.toLowerCase()
    
    if (searchText.includes(queryLower) && queryLower.length > 2) {
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
  
  return Array.from(suggestions).slice(0, 5)
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

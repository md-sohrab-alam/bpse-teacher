import OpenAI from 'openai'

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

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

export interface SearchQuery {
  query: string
  language?: 'en' | 'hi'
  filters?: {
    examType?: string[]
    type?: string[]
    topic?: string[]
  }
  limit?: number
}

export interface SearchResponse {
  results: SearchResult[]
  suggestions: string[]
  totalResults: number
  query: string
  processingTime: number
}

/**
 * Generate embeddings for text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!openai) {
    // Return a simple hash-based embedding when OpenAI is not available
    const hash = text.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return Array.from({length: 1536}, (_, i) => Math.sin(hash + i) * 0.1)
  }
  
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw new Error('Failed to generate embedding')
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length')
  }
  
  let dotProduct = 0
  let normA = 0
  let normB = 0
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

/**
 * Search through content using semantic similarity and exact keyword matching
 */
export async function semanticSearch(
  query: string,
  content: Array<{
    id: string
    type: string
    title: string
    titleHi: string
    content: string
    contentHi: string
    metadata: any
  }>,
  limit: number = 10
): Promise<SearchResult[]> {
  try {
    const queryLower = query.toLowerCase()
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2)
    
    // Calculate relevance scores with exact keyword matching
    const scoredContent = await Promise.all(
      content.map(async (item) => {
        const contentText = `${item.title} ${item.content} ${item.titleHi} ${item.contentHi} ${item.metadata?.examType || ''} ${item.metadata?.topic || ''}`
        const contentLower = contentText.toLowerCase()
        
        // Exact keyword matching score
        let exactMatchScore = 0
        queryWords.forEach(word => {
          if (contentLower.includes(word)) {
            exactMatchScore += 1
            // Bonus for title matches
            if (item.title.toLowerCase().includes(word)) {
              exactMatchScore += 0.5
            }
            // Bonus for exam type matches
            if (item.metadata?.examType?.toLowerCase().includes(word)) {
              exactMatchScore += 0.3
            }
          }
        })
        
        // Normalize exact match score
        exactMatchScore = exactMatchScore / queryWords.length
        
        // Generate embedding for semantic similarity
        const queryEmbedding = await generateEmbedding(query)
        const itemEmbedding = await generateEmbedding(contentText)
        const semanticSimilarity = cosineSimilarity(queryEmbedding, itemEmbedding)
        
        // Combine exact matching and semantic similarity
        const combinedRelevance = (exactMatchScore * 0.7) + (semanticSimilarity * 0.3)
        
        return {
          ...item,
          relevance: combinedRelevance,
          exactMatchScore,
          semanticSimilarity
        }
      })
    )
    
    // Sort by combined relevance and return top results
    return scoredContent
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit)
      .map(item => ({
        id: item.id,
        type: item.type as SearchResult['type'],
        title: item.title,
        titleHi: item.titleHi,
        content: item.content,
        contentHi: item.contentHi,
        relevance: item.relevance,
        metadata: item.metadata
      }))
  } catch (error) {
    console.error('Error in semantic search:', error)
    throw new Error('Failed to perform semantic search')
  }
}

/**
 * Generate search suggestions using OpenAI
 */
export async function generateSearchSuggestions(
  query: string,
  context: string = 'BPSE exam preparation'
): Promise<string[]> {
  if (!openai) {
    // Return simple suggestions when OpenAI is not available
    return [
      `${query} eligibility`,
      `${query} syllabus`,
      `${query} mock test`,
      `${query} cut off marks`,
      `${query} exam pattern`
    ]
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for BPSE (Bihar Public Service Commission) exam preparation. Generate 5 relevant search suggestions based on the user's query. Focus on exam-related topics like eligibility, syllabus, mock tests, cut-off marks, and exam patterns. Return only the suggestions as a JSON array.`
        },
        {
          role: 'user',
          content: `Generate search suggestions for: "${query}" in the context of ${context}`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })
    
    const suggestions = response.choices[0]?.message?.content
    if (suggestions) {
      try {
        return JSON.parse(suggestions)
      } catch {
        // Fallback: return simple suggestions
        return [
          `${query} eligibility`,
          `${query} syllabus`,
          `${query} mock test`,
          `${query} cut off marks`,
          `${query} exam pattern`
        ]
      }
    }
    
    return []
  } catch (error) {
    console.error('Error generating suggestions:', error)
    return []
  }
}

/**
 * Enhanced search with both semantic and keyword matching
 */
export async function enhancedSearch(
  searchQuery: SearchQuery,
  content: Array<{
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
  
  try {
    // 1. Semantic search
    const semanticResults = await semanticSearch(
      searchQuery.query,
      content,
      searchQuery.limit || 10
    )
    
    // 2. Keyword search (exact matches)
    const keywordResults = content
      .filter(item => {
        const searchText = `${item.title} ${item.content} ${item.titleHi} ${item.contentHi}`.toLowerCase()
        const query = searchQuery.query.toLowerCase()
        return searchText.includes(query)
      })
      .map(item => ({
        id: item.id,
        type: item.type as SearchResult['type'],
        title: item.title,
        titleHi: item.titleHi,
        content: item.content,
        contentHi: item.contentHi,
        relevance: 1.0, // Exact match gets highest relevance
        metadata: item.metadata
      }))
    
    // 3. Combine and deduplicate results
    const allResults = [...keywordResults, ...semanticResults]
    const uniqueResults = allResults.filter((result, index, self) => 
      index === self.findIndex(r => r.id === result.id)
    )
    
    // 4. Sort by relevance
    const sortedResults = uniqueResults.sort((a, b) => b.relevance - a.relevance)
    
    // 5. Apply filters
    let filteredResults = sortedResults
    if (searchQuery.filters) {
      if (searchQuery.filters.examType) {
        filteredResults = filteredResults.filter(result => 
          searchQuery.filters!.examType!.includes(result.metadata.examType)
        )
      }
      if (searchQuery.filters.type) {
        filteredResults = filteredResults.filter(result => 
          searchQuery.filters!.type!.includes(result.type)
        )
      }
      if (searchQuery.filters.topic) {
        filteredResults = filteredResults.filter(result => 
          searchQuery.filters!.topic!.includes(result.metadata.topic)
        )
      }
    }
    
    // 6. Generate suggestions
    const suggestions = await generateSearchSuggestions(searchQuery.query)
    
    const processingTime = Date.now() - startTime
    
    return {
      results: filteredResults.slice(0, searchQuery.limit || 10),
      suggestions,
      totalResults: filteredResults.length,
      query: searchQuery.query,
      processingTime
    }
  } catch (error) {
    console.error('Error in enhanced search:', error)
    throw new Error('Search failed')
  }
}

/**
 * Extract key information from search results using AI
 */
export async function extractKeyInfo(searchResults: SearchResult[]): Promise<{
  summary: string
  keyTopics: string[]
  recommendations: string[]
}> {
  if (!openai) {
    return {
      summary: 'Found relevant information for your search query.',
      keyTopics: ['Exam preparation', 'Study materials', 'Important dates'],
      recommendations: ['Review the syllabus thoroughly', 'Practice with mock tests']
    }
  }
  
  try {
    const content = searchResults.map(r => `${r.title}: ${r.content}`).join('\n\n')
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert BPSE exam preparation assistant. Analyze the search results and provide:
1. A brief summary of the key information
2. 3-5 key topics covered
3. 2-3 actionable recommendations for exam preparation
Return the response as JSON with keys: summary, keyTopics, recommendations`
        },
        {
          role: 'user',
          content: `Analyze these search results: ${content}`
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    })
    
    const analysis = response.choices[0]?.message?.content
    if (analysis) {
      try {
        return JSON.parse(analysis)
      } catch {
        return {
          summary: 'Found relevant information for your search query.',
          keyTopics: ['Exam preparation', 'Study materials', 'Important dates'],
          recommendations: ['Review the syllabus thoroughly', 'Practice with mock tests']
        }
      }
    }
    
    return {
      summary: 'Found relevant information for your search query.',
      keyTopics: ['Exam preparation', 'Study materials', 'Important dates'],
      recommendations: ['Review the syllabus thoroughly', 'Practice with mock tests']
    }
  } catch (error) {
    console.error('Error extracting key info:', error)
    return {
      summary: 'Found relevant information for your search query.',
      keyTopics: ['Exam preparation', 'Study materials', 'Important dates'],
      recommendations: ['Review the syllabus thoroughly', 'Practice with mock tests']
    }
  }
}

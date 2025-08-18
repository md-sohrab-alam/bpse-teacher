'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Search as SearchComponent } from '@/components/search'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  FileText, 
  Users, 
  Calendar,
  Filter,
  Clock,
  Star
} from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
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

interface SearchResponse {
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

interface SearchPageProps {
  params: { locale: string }
  searchParams: { q?: string }
}

export default function SearchPage({ params: { locale }, searchParams }: SearchPageProps) {
  const t = useTranslations('common')
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)
  const [searchLanguage, setSearchLanguage] = useState<string>('en')

  // Handle initial search from URL params
  useEffect(() => {
    if (searchParams.q) {
      performSearch(searchParams.q)
    }
  }, [searchParams.q])

  const performSearch = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchResponse(null)

    try {
      // Auto-detect language from query
      const isHindiQuery = /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF]/.test(query)
      const detectedLanguage = isHindiQuery ? 'hi' : locale
      setSearchLanguage(detectedLanguage)

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query.trim(),
          language: detectedLanguage
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setSearchResponse(data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchResult = (result: SearchResult) => {
    setSelectedResult(result)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question':
        return <BookOpen className="w-4 h-4" />
      case 'news':
        return <FileText className="w-4 h-4" />
      case 'exam':
        return <Calendar className="w-4 h-4" />
      case 'eligibility':
        return <Users className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-800'
      case 'news':
        return 'bg-green-100 text-green-800'
      case 'exam':
        return 'bg-purple-100 text-purple-800'
      case 'eligibility':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getExamTypeColor = (examType: string) => {
    return examType === 'STET' ? 'bg-stet-100 text-stet-800' : 'bg-bpsc-100 text-bpsc-800'
  }

  const filteredResults = searchResponse?.results.filter(result => {
    if (activeTab === 'all') return true
    return result.type === activeTab
  }) || []

  const getResultCount = (type: string) => {
    return searchResponse?.results.filter(r => r.type === type).length || 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Search className="w-8 h-8 mr-3 text-bpsc-600" />
            AI-Powered Search
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exactly what you need for BPSE exam preparation with intelligent search powered by AI
          </p>
        </div>

        {/* Search Component */}
        <div className="max-w-4xl mx-auto mb-8">
          <SearchComponent
            locale={locale}
            placeholder="Search for questions, exam info, eligibility, news, and more..."
            className="w-full"
            showFilters={true}
            onResultClick={handleSearchResult}
          />
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-bpsc-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg text-gray-600">Searching with AI...</p>
            <p className="text-sm text-gray-500 mt-2">Analyzing content and finding the most relevant results</p>
          </div>
        )}

        {searchResponse && !isSearching && (
          <div className="space-y-8">
            {/* Search Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-blue-900">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Analysis Summary
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {searchLanguage === 'hi' ? 'हिंदी में खोज' : 'Search in English'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 mb-4">{searchResponse.keyInfo.summary}</p>
                
                {searchResponse.keyInfo.keyTopics.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Topics Found:</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchResponse.keyInfo.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {searchResponse.keyInfo.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">AI Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      {searchResponse.keyInfo.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-blue-200 flex items-center justify-between text-sm text-blue-700">
                  <span>Found {searchResponse.totalResults} results in {searchResponse.processingTime}ms</span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    AI-Powered Search
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Results Tabs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Search Results</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{searchResponse.processingTime}ms</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all" className="flex items-center space-x-2">
                      <span>All</span>
                      <Badge variant="secondary" className="ml-1">
                        {searchResponse.results.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="question" className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Questions</span>
                      <Badge variant="secondary" className="ml-1">
                        {getResultCount('question')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="exam" className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Exam Info</span>
                      <Badge variant="secondary" className="ml-1">
                        {getResultCount('exam')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="news" className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>News</span>
                      <Badge variant="secondary" className="ml-1">
                        {getResultCount('news')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="eligibility" className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Eligibility</span>
                      <Badge variant="secondary" className="ml-1">
                        {getResultCount('eligibility')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="syllabus" className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Syllabus</span>
                      <Badge variant="secondary" className="ml-1">
                        {getResultCount('syllabus')}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="mt-6">
                    <div className="space-y-4">
                      {filteredResults.map((result) => (
                        <div
                          key={result.id}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleSearchResult(result)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(result.type)}
                              <Badge className={getTypeColor(result.type)}>
                                {result.type}
                              </Badge>
                              {result.metadata.examType && (
                                <Badge className={getExamTypeColor(result.metadata.examType)}>
                                  {result.metadata.examType}
                                </Badge>
                              )}
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <TrendingUp className="w-3 h-3" />
                                <span>{(result.relevance * 100).toFixed(1)}% match</span>
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2">
                            {searchLanguage === 'hi' ? result.titleHi : result.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3 line-clamp-3">
                            {searchLanguage === 'hi' ? result.contentHi : result.content}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {result.metadata.topic && (
                                <Badge variant="outline" className="text-xs">
                                  {result.metadata.topic}
                                </Badge>
                              )}
                              {result.metadata.difficulty && (
                                <Badge variant="outline" className="text-xs">
                                  {result.metadata.difficulty}
                                </Badge>
                              )}
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Search Suggestions */}
            {searchResponse.suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try These Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {searchResponse.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => performSearch(suggestion)}
                        className="text-sm"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* No Results */}
        {searchResponse && !isSearching && searchResponse.results.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any results for "{searchResponse.query}"
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Try:</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Using different keywords</li>
                  <li>• Checking your spelling</li>
                  <li>• Using more general terms</li>
                  <li>• Removing filters</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

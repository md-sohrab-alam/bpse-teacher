'use client'

import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, X, Filter, Sparkles, Clock, BookOpen, FileText, Users, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { trackSearch } from '@/lib/gtag'

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

interface SearchProps {
  locale: string
  placeholder?: string
  className?: string
  showFilters?: boolean
  onResultClick?: (result: SearchResult) => void
}

export function Search({ 
  locale, 
  placeholder = "Find anything about Bihar Teacher exams...",
  className = "",
  showFilters: showFiltersProp = true,
  onResultClick 
}: SearchProps) {
  const t = useTranslations('common')
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [filters, setFilters] = useState({
    examType: [] as string[],
    type: [] as string[],
    topic: [] as string[]
  })
  const [showFilters, setShowFilters] = useState(showFiltersProp)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search suggestions
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (query.length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(query)
      }, 300)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [query])

  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.success) {
        setSuggestions(data.suggestions)
        setShowSuggestions(true)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const performSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setShowResults(true)
    setShowSuggestions(false)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          language: locale === 'hi' ? 'hi' : 'en',
          filters: Object.keys(filters).some(key => filters[key as keyof typeof filters].length > 0) ? filters : undefined,
          limit: 20
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setResults(data.results)
        setSearchResponse(data)
      } else {
        setResults([])
        setSearchResponse(null)
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setSearchResponse(null)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to AI agent results page
    if (query.trim()) {
      // Track search event
      trackSearch(query.trim())
      setIsRedirecting(true)
      const agentUrl = `/${locale}/agent-results?q=${encodeURIComponent(query.trim())}`
      window.location.href = agentUrl
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    // Track search event
    trackSearch(suggestion)
    setIsRedirecting(true)
    // Redirect to AI agent results page
    const agentUrl = `/${locale}/agent-results?q=${encodeURIComponent(suggestion)}`
    window.location.href = agentUrl
  }

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result)
    }
    setShowResults(false)
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

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Loading Progress Bar */}
      {isRedirecting && (
        <>
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div className="h-full bg-bpsc-600 animate-pulse" style={{ width: '100%' }}></div>
          </div>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-bpsc-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 font-medium">Searching for "{query}"...</p>
              <p className="text-gray-500 text-sm mt-1">Redirecting to results page</p>
            </div>
          </div>
        </>
      )}
      
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
                          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-20 text-gray-900 placeholder:text-gray-500"
            disabled={isSearching}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {showFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="h-8 w-8 p-0"
              >
                <Filter className="w-4 h-4" />
              </Button>
            )}
                         <Button
               type="submit"
               size="sm"
               disabled={isSearching || isRedirecting || !query.trim()}
               className="h-8 px-3"
             >
               {isSearching || isRedirecting ? (
                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
               ) : (
                 <Sparkles className="w-4 h-4" />
               )}
             </Button>
          </div>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
            >
                              <SearchIcon className="w-4 h-4 text-gray-400" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search Suggestions Only */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
            >
              <SearchIcon className="w-4 h-4 text-gray-400" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select
              value={filters.examType.join(',')}
              onValueChange={(value) => setFilters(prev => ({
                ...prev,
                examType: value ? value.split(',') : []
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STET,BPSC_TEACHER">All Exams</SelectItem>
                <SelectItem value="STET">STET</SelectItem>
                <SelectItem value="BPSC_TEACHER">BPSC Teacher</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.type.join(',')}
              onValueChange={(value) => setFilters(prev => ({
                ...prev,
                type: value ? value.split(',') : []
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="question,news,exam,syllabus,eligibility">All Types</SelectItem>
                <SelectItem value="question">Questions</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="exam">Exam Info</SelectItem>
                <SelectItem value="syllabus">Syllabus</SelectItem>
                <SelectItem value="eligibility">Eligibility</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.topic.join(',')}
              onValueChange={(value) => setFilters(prev => ({
                ...prev,
                topic: value ? value.split(',') : []
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science,General Studies,Exam Information,Important Dates,Cut-off Marks,News & Updates,Mock Tests,Eligibility">All Topics</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="General Studies">General Studies</SelectItem>
                <SelectItem value="Exam Information">Exam Information</SelectItem>
                <SelectItem value="Important Dates">Important Dates</SelectItem>
                <SelectItem value="Cut-off Marks">Cut-off Marks</SelectItem>
                <SelectItem value="News & Updates">News & Updates</SelectItem>
                <SelectItem value="Mock Tests">Mock Tests</SelectItem>
                <SelectItem value="Eligibility">Eligibility</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}

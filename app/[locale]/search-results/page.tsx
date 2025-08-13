'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Calendar, Users, FileText, Sparkles, Clock, Search as SearchIcon } from 'lucide-react'
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
    marks?: string
    percentage?: string
    year?: string
  }
}

interface SearchResponse {
  results: SearchResult[]
  totalResults: number
  query: string
  processingTime: number
  keyInfo: {
    summary: string
    keyTopics: string[]
    recommendations: string[]
  }
}

export default function SearchResultsPage() {
  const t = useTranslations('common')
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery.trim(),
          language: 'en',
          limit: 50
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setSearchResponse(data)
      } else {
        setError('Search failed. Please try again.')
      }
    } catch (error) {
      console.error('Search error:', error)
      setError('An error occurred while searching.')
    } finally {
      setIsLoading(false)
    }
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

  const formatContent = (content: string) => {
    // Split content into paragraphs and format
    return content.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
      <p key={index} className="mb-3 text-gray-700 leading-relaxed">
        {sentence.trim()}.
      </p>
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Search
                </Button>
              </Link>
            </div>
            
                         <div className="text-center py-20">
               <div className="w-12 h-12 border-4 border-bpsc-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
               <h2 className="text-xl font-semibold text-gray-700 mb-2">Searching for "{query}"</h2>
               <p className="text-gray-500">Analyzing BPSE exam data and gathering relevant information...</p>
               <div className="mt-4 flex justify-center space-x-2">
                 <div className="w-2 h-2 bg-bpsc-600 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-bpsc-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                 <div className="w-2 h-2 bg-bpsc-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Search
                </Button>
              </Link>
            </div>
            
            <div className="text-center py-20">
              <div className="text-red-500 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Search Error</h2>
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={() => performSearch(query)}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!searchResponse) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Search
                </Button>
              </Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                {searchResponse.processingTime}ms
              </p>
              <p className="text-sm text-gray-500">
                {searchResponse.totalResults} results found
              </p>
            </div>
          </div>

                     {/* Search Query Display */}
           <div className="mb-8 p-6 bg-gradient-to-r from-bpsc-50 to-blue-50 rounded-lg border border-bpsc-200">
             <div className="flex items-center space-x-3 mb-3">
               <SearchIcon className="w-6 h-6 text-bpsc-600" />
               <h1 className="text-2xl font-bold text-gray-900">
                 "{query}"
               </h1>
             </div>
             <p className="text-gray-600 text-lg">
               Here's what I found about {query.toLowerCase()} in the context of BPSE teacher exams:
             </p>
           </div>

          

                     {/* Grouped Results */}
           <div className="space-y-8">
             {/* Group by type */}
             {(() => {
               const groupedResults = searchResponse.results.reduce((groups, result) => {
                 const type = result.type
                 if (!groups[type]) {
                   groups[type] = []
                 }
                 groups[type].push(result)
                 return groups
               }, {} as Record<string, typeof searchResponse.results>)

               return Object.entries(groupedResults).map(([type, results]) => (
                 <div key={type} className="space-y-4">
                   {/* Group Header */}
                   <div className="flex items-center space-x-3 pb-2 border-b border-gray-200">
                     {getTypeIcon(type)}
                     <h2 className="text-xl font-semibold text-gray-900 capitalize">
                       {type === 'eligibility' ? 'Eligibility & Requirements' : 
                        type === 'exam' ? 'Exam Information' :
                        type === 'question' ? 'Practice Questions' :
                        type === 'news' ? 'Latest Updates' :
                        type === 'syllabus' ? 'Syllabus & Topics' : type}
                     </h2>
                     <Badge className={getTypeColor(type)}>
                       {results.length} {results.length === 1 ? 'result' : 'results'}
                     </Badge>
                   </div>

                   {/* Results in this group */}
                   <div className="space-y-4">
                     {results.map((result) => (
                       <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                         {/* Result Header */}
                         <div className="flex items-start justify-between mb-4">
                           <div className="flex items-center space-x-2">
                             {result.metadata.examType && (
                               <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                 {result.metadata.examType}
                               </Badge>
                             )}
                             {result.metadata.marks && (
                               <Badge variant="outline" className="bg-green-50 text-green-700">
                                 {result.metadata.marks}
                               </Badge>
                             )}
                             {result.metadata.percentage && (
                               <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                 {result.metadata.percentage}
                               </Badge>
                             )}
                           </div>
                           {result.metadata.topic && (
                             <Badge variant="outline" className="text-xs bg-gray-50">
                               {result.metadata.topic}
                             </Badge>
                           )}
                         </div>

                         {/* Result Title */}
                         <h3 className="text-lg font-semibold text-gray-900 mb-3">
                           {result.title}
                         </h3>

                         {/* Result Content */}
                         <div className="prose max-w-none">
                           <div className="text-gray-700 leading-relaxed space-y-3">
                             {result.content.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                               <p key={index} className="text-gray-700">
                                 {sentence.trim()}.
                               </p>
                             ))}
                           </div>
                         </div>

                         {/* Result Footer */}
                         {result.metadata.year && (
                           <div className="mt-4 pt-4 border-t border-gray-100">
                             <p className="text-sm text-gray-500">
                               <strong>Year:</strong> {result.metadata.year}
                             </p>
                           </div>
                         )}
                       </div>
                     ))}
                   </div>
                 </div>
               ))
             })()}
           </div>

          {/* No Results */}
          {searchResponse.results.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No results found for "{query}"
                </h3>
                <p className="text-gray-500 mb-4">
                  Try different keywords or check your spelling
                </p>
                <Link href="/">
                  <Button>
                    Back to Search
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageCircle, Lightbulb, ExternalLink, Sparkles, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface AgentResponse {
  answer: string
  sources: string[]
  confidence: number
  relatedTopics: string[]
  followUpQuestions: string[]
  suggestions: string[]
  processingTime: number
  success: boolean
}

export default function AgentResultsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('common')
  const searchParams = useSearchParams()
  const question = searchParams.get('q') || ''
  
  const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (question) {
      askAgent(question)
    }
  }, [question])

  const askAgent = async (userQuestion: string) => {
    setIsLoading(true)
    setError(null)

    // Detect language from the question
    const isHindi = /[\u0900-\u097F]/.test(userQuestion) // Check for Devanagari script
    const detectedLanguage = isHindi ? 'hi' : 'en'

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userQuestion.trim(),
          language: detectedLanguage
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setAgentResponse(data)
      } else {
        setError('Agent failed to process your question. Please try again.')
      }
    } catch (error) {
      console.error('Agent error:', error)
      setError('An error occurred while processing your question.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollowUpQuestion = (followUpQuestion: string) => {
    const agentUrl = `/agent-results?q=${encodeURIComponent(followUpQuestion)}`
    window.location.href = agentUrl
  }

  const formatAnswer = (answer: string) => {
    // Split answer into paragraphs and format with enhanced styling
    return answer.split('\n').filter(paragraph => paragraph.trim()).map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim()
      
      // Check if it's a numbered point (e.g., "1. Direct Answer:", "2. Relevant Context")
      if (/^\d+\.\s/.test(trimmedParagraph)) {
        const [number, ...content] = trimmedParagraph.split('. ')
        const title = content[0]
        const restContent = content.slice(1).join('. ')
        
        return (
          <div key={index} className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {number}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-800 mb-2">{title}</h3>
                {restContent && (
                  <p className="text-gray-700 leading-relaxed">{restContent}</p>
                )}
              </div>
            </div>
          </div>
        )
      }
      
      // Check if it's a bullet point or list item
      if (trimmedParagraph.startsWith('•') || trimmedParagraph.startsWith('-') || trimmedParagraph.startsWith('*')) {
        return (
          <div key={index} className="flex items-start space-x-2 mb-3">
            <div className="flex-shrink-0 w-2 h-2 bg-bpsc-600 rounded-full mt-2"></div>
            <p className="text-gray-700 leading-relaxed">{trimmedParagraph.replace(/^[•\-*]\s*/, '')}</p>
          </div>
        )
      }
      
      // Check if it's a heading (ends with colon)
      if (trimmedParagraph.endsWith(':') && trimmedParagraph.length < 50) {
        return (
          <h3 key={index} className="font-semibold text-gray-800 mb-3 text-lg">
            {trimmedParagraph}
          </h3>
        )
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {trimmedParagraph}
        </p>
      )
    })
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
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Thinking about your question...</h2>
              <p className="text-gray-500">Analyzing BPSC exam information and preparing a comprehensive answer...</p>
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
                <AlertCircle className="w-16 h-16 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Agent Error</h2>
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={() => askAgent(question)}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!agentResponse) {
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
                {agentResponse.processingTime}ms
              </p>
              <p className="text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                {Math.round(agentResponse.confidence * 100)}% confidence
              </p>
            </div>
          </div>

          {/* Question Display */}
          <div className="mb-8 p-6 bg-gradient-to-r from-bpsc-50 to-blue-50 rounded-lg border border-bpsc-200">
            <div className="flex items-center space-x-3 mb-3">
              <MessageCircle className="w-6 h-6 text-bpsc-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                "{question}"
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Here's what I found about your BPSC exam question:
            </p>
          </div>

          {/* AI Agent Answer */}
          <Card className="mb-8 border-l-4 border-l-bpsc-600 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-bpsc-50 to-blue-50">
              <CardTitle className="flex items-center text-lg">
                <Sparkles className="w-5 h-5 mr-2 text-bpsc-600" />
                AI Assistant Response
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                {formatAnswer(agentResponse.answer)}
              </div>
            </CardContent>
          </Card>

          {/* Sources */}
          {agentResponse.sources.length > 0 && (
            <Card className="mb-8 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center text-lg">
                  <ExternalLink className="w-5 h-5 mr-2 text-purple-600" />
                  Official Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {agentResponse.sources.map((source, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{source}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Topics */}
          {agentResponse.relatedTopics.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="w-5 h-5 mr-2 text-bpsc-600" />
                  Related Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agentResponse.relatedTopics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Follow-up Questions */}
          {agentResponse.followUpQuestions.length > 0 && (
            <Card className="mb-8 shadow-md">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center text-lg">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                  You might also want to know...
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {agentResponse.followUpQuestions.map((followUpQuestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleFollowUpQuestion(followUpQuestion)}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 font-medium">{followUpQuestion}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          {agentResponse.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="w-5 h-5 mr-2 text-bpsc-600" />
                  Popular Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {agentResponse.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleFollowUpQuestion(suggestion)}
                      className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-gray-600 text-sm">{suggestion}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

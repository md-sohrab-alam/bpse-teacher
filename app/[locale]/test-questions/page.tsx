'use client'

import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { loadQuestionsBySet, getAvailableQuestionSets, getQuestionCount } from '@/lib/question-loader'

interface TestQuestionsPageProps {
  params: { locale: string }
}

export default function TestQuestionsPage({ params: { locale } }: TestQuestionsPageProps) {
  const t = useTranslations('common')
  const [questionSets, setQuestionSets] = useState<string[]>([])
  const [selectedSet, setSelectedSet] = useState<string>('')
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load available question sets
    const sets = getAvailableQuestionSets()
    setQuestionSets(sets)
    if (sets.length > 0) {
      setSelectedSet(sets[0])
    }
  }, [])

  useEffect(() => {
    if (selectedSet) {
      loadQuestions(selectedSet)
    }
  }, [selectedSet])

  const loadQuestions = (questionSet: string) => {
    setLoading(true)
    try {
      const loadedQuestions = loadQuestionsBySet(questionSet, 5) // Load first 5 questions
      setQuestions(loadedQuestions)
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSubjectName = (questionSet: string) => {
    const subjectMap: Record<string, string> = {
      'computer-science-1': 'Computer Science Set 1',
      'computer-science-2': 'Computer Science Set 2',
      'computer-science-3': 'Computer Science Set 3',
      'computer-science-4': 'Computer Science Set 4',
      'computer-science-5': 'Computer Science Set 5',
      'computer-science-complete': 'Computer Science Complete',
      'general-studies': 'General Studies',
      'physics': 'Physics',
      'chemistry': 'Chemistry',
      'biology': 'Biology',
      'history': 'History',
      'geography': 'Geography',
      'economics': 'Economics',
      'math-1': 'Mathematics',
      'stet-computer-1': 'STET Computer Set 1',
      'stet-computer-2': 'STET Computer Set 2',
      'stet-computer-3': 'STET Computer Set 3',
      'stet-computer-4': 'STET Computer Set 4',
      'stet-computer-5': 'STET Computer Set 5',
      'stet-computer-6': 'STET Computer Set 6',
      'stet-computer-7': 'STET Computer Set 7'
    }
    return subjectMap[questionSet] || questionSet
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Question Data Test Page
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This page tests all the question data we've created and integrated into the application.
          </p>
        </div>

        {/* Question Sets Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Question Sets</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {questionSets.map((set) => (
              <Card key={set} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{getSubjectName(set)}</CardTitle>
                  <CardDescription>
                    {getQuestionCount(set)} questions available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant={selectedSet === set ? "default" : "outline"}
                    onClick={() => setSelectedSet(set)}
                    className="w-full"
                  >
                    {selectedSet === set ? 'Selected' : 'Select'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Question Set */}
        {selectedSet && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sample Questions from {getSubjectName(selectedSet)}
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <p>Loading questions...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <Card key={index} className="border-l-4 border-bpsc-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Question {index + 1}</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          Correct: {question.correctAnswer}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">
                        {question.text}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-700">English:</p>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">A:</span> {question.options.A}</p>
                            <p><span className="font-medium">B:</span> {question.options.B}</p>
                            <p><span className="font-medium">C:</span> {question.options.C}</p>
                            <p><span className="font-medium">D:</span> {question.options.D}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-700">Hindi:</p>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">A:</span> {question.optionsHi.A}</p>
                            <p><span className="font-medium">B:</span> {question.optionsHi.B}</p>
                            <p><span className="font-medium">C:</span> {question.optionsHi.C}</p>
                            <p><span className="font-medium">D:</span> {question.optionsHi.D}</p>
                          </div>
                        </div>
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="font-semibold text-blue-900 mb-2">Explanation:</p>
                          <p className="text-blue-800 text-sm">{question.explanation}</p>
                          {question.explanationHi && (
                            <p className="text-blue-800 text-sm mt-2">{question.explanationHi}</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        <div className="mt-12 p-6 bg-green-50 rounded-lg">
          <h3 className="text-xl font-bold text-green-900 mb-4">✅ Integration Summary</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-800">Question Sets Created:</p>
              <ul className="list-disc list-inside text-green-700 ml-4">
                <li>Physics (20 questions)</li>
                <li>Chemistry (20 questions)</li>
                <li>Biology (20 questions)</li>
                <li>History (20 questions)</li>
                <li>Geography (20 questions)</li>
                <li>Economics (20 questions)</li>
                <li>General Studies (existing)</li>
                <li>Computer Science (multiple sets)</li>
                <li>Mathematics (existing)</li>
                <li>STET Computer (7 sets)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-800">Integration Points:</p>
              <ul className="list-disc list-inside text-green-700 ml-4">
                <li>Question Loader Updated</li>
                <li>Mock Tests Page Enhanced</li>
                <li>Search API Extended</li>
                <li>Translation Issues Fixed</li>
                <li>Server Running Successfully</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

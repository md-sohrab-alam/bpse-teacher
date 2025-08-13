'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Flag, 
  AlertTriangle,
  Play,
  Pause,
  Square
} from 'lucide-react'
import Link from 'next/link'

interface TestPageProps {
  params: { locale: string; id: string }
}

interface Question {
  id: string
  text: string
  textHi: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  optionsHi: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation?: string
  explanationHi?: string
}

interface TestState {
  currentQuestion: number
  answers: Record<string, string>
  timeRemaining: number
  isPaused: boolean
  isSubmitted: boolean
  flaggedQuestions: Set<string>
}

export default function TestPage({ params: { locale, id } }: TestPageProps) {
  const t = useTranslations('mockTests')
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [testState, setTestState] = useState<TestState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: 7200, // 2 hours default
    isPaused: false,
    isSubmitted: false,
    flaggedQuestions: new Set()
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  // Mock questions - in real app, this would come from your model paper generation system
  const mockQuestions: Question[] = [
    {
      id: '1',
      text: 'What is the primary function of an operating system?',
      textHi: 'ऑपरेटिंग सिस्टम का प्राथमिक कार्य क्या है?',
      options: {
        A: 'To provide a user interface',
        B: 'To manage computer hardware and software resources',
        C: 'To connect to the internet',
        D: 'To store data permanently'
      },
      optionsHi: {
        A: 'उपयोगकर्ता इंटरफेस प्रदान करना',
        B: 'कंप्यूटर हार्डवेयर और सॉफ्टवेयर संसाधनों का प्रबंधन',
        C: 'इंटरनेट से कनेक्ट करना',
        D: 'डेटा को स्थायी रूप से संग्रहित करना'
      },
      correctAnswer: 'B'
    },
    {
      id: '2',
      text: 'Which programming language is known as the "language of the web"?',
      textHi: 'किस प्रोग्रामिंग भाषा को "वेब की भाषा" के रूप में जाना जाता है?',
      options: {
        A: 'Python',
        B: 'Java',
        C: 'JavaScript',
        D: 'C++'
      },
      optionsHi: {
        A: 'पायथन',
        B: 'जावा',
        C: 'जावास्क्रिप्ट',
        D: 'C++'
      },
      correctAnswer: 'C'
    },
    {
      id: '3',
      text: 'What does SQL stand for?',
      textHi: 'SQL का पूरा नाम क्या है?',
      options: {
        A: 'Structured Query Language',
        B: 'Simple Query Language',
        C: 'Standard Query Language',
        D: 'System Query Language'
      },
      optionsHi: {
        A: 'स्ट्रक्चर्ड क्वेरी लैंग्वेज',
        B: 'सिंपल क्वेरी लैंग्वेज',
        C: 'स्टैंडर्ड क्वेरी लैंग्वेज',
        D: 'सिस्टम क्वेरी लैंग्वेज'
      },
      correctAnswer: 'A'
    }
  ]

  useEffect(() => {
    // Load questions from your model paper generation system
    const loadQuestions = async () => {
      setIsLoading(true)
      try {
        // Call your model paper generation API
        const response = await fetch('/api/model-paper/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            testId: id,
            subject: 'Computer Science',
            questionCount: 120
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to load questions')
        }
        
        const data = await response.json()
        setQuestions(data.questions)
        setTestState(prev => ({
          ...prev,
          timeRemaining: data.duration || 7200
        }))
      } catch (error) {
        console.error('Error loading questions:', error)
        // Fallback to mock questions if API fails
        setQuestions(mockQuestions)
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [id])

  // Timer effect
  useEffect(() => {
    if (testState.isPaused || testState.isSubmitted || testState.timeRemaining <= 0) {
      return
    }

    const timer = setInterval(() => {
      setTestState(prev => ({
        ...prev,
        timeRemaining: prev.timeRemaining - 1
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [testState.isPaused, testState.isSubmitted, testState.timeRemaining])

  // Auto-submit when time runs out
  useEffect(() => {
    if (testState.timeRemaining <= 0 && !testState.isSubmitted) {
      handleSubmitTest()
    }
  }, [testState.timeRemaining, testState.isSubmitted])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setTestState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }))
  }

  const handleQuestionNavigation = (questionIndex: number) => {
    setTestState(prev => ({
      ...prev,
      currentQuestion: questionIndex
    }))
  }

  const toggleFlagQuestion = (questionId: string) => {
    setTestState(prev => ({
      ...prev,
      flaggedQuestions: new Set(prev.flaggedQuestions.has(questionId) 
        ? Array.from(prev.flaggedQuestions).filter(id => id !== questionId)
        : Array.from(prev.flaggedQuestions).concat([questionId])
      )
    }))
  }

  const togglePause = () => {
    setTestState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }))
  }

  const handleSubmitTest = useCallback(() => {
    setTestState(prev => ({
      ...prev,
      isSubmitted: true
    }))
    
    // Calculate and store test results
    const testResults = {
      questions: questions,
      answers: testState.answers,
      timeTaken: 7200 - testState.timeRemaining, // Calculate time taken
      testId: id,
      submittedAt: new Date().toISOString()
    }
    
    // Store results in localStorage for the results page
    localStorage.setItem(`test-results-${id}`, JSON.stringify(testResults))
    
    // Navigate to results page
    router.push(`/${locale}/mock-tests/${id}/result`)
  }, [router, locale, id, questions, testState.answers, testState.timeRemaining])

  const getQuestionStatus = (questionIndex: number) => {
    const question = questions[questionIndex]
    if (!question) return 'unanswered'
    
    if (testState.answers[question.id]) {
      return 'answered'
    }
    if (testState.flaggedQuestions.has(question.id)) {
      return 'flagged'
    }
    return 'unanswered'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bpsc-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading test questions...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[testState.currentQuestion]
  const progress = (Object.keys(testState.answers).length / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      {/* Test Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/${locale}/mock-tests/${id}`} className="text-bpsc-600 hover:text-bpsc-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold">BPSC Computer Teacher – Model Set 1</h1>
                <p className="text-sm text-gray-600">Question {testState.currentQuestion + 1} of {questions.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className={`font-mono text-lg font-semibold ${testState.timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatTime(testState.timeRemaining)}
                </span>
              </div>
              
              {/* Pause/Resume */}
              <Button
                variant="outline"
                size="sm"
                onClick={togglePause}
                disabled={testState.isSubmitted}
              >
                {testState.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {testState.isPaused ? 'Resume' : 'Pause'}
              </Button>
              
              {/* Submit */}
              <Button
                onClick={() => setShowConfirmSubmit(true)}
                disabled={testState.isSubmitted}
                className="bg-red-600 hover:bg-red-700"
              >
                <Square className="w-4 h-4 mr-2" />
                Submit Test
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {Math.round(progress)}%</span>
              <span>{Object.keys(testState.answers).length} / {questions.length} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Area */}
          <div className="lg:col-span-3">
            {currentQuestion && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Question {testState.currentQuestion + 1}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFlagQuestion(currentQuestion.id)}
                      className={testState.flaggedQuestions.has(currentQuestion.id) ? 'bg-yellow-100 border-yellow-300' : ''}
                    >
                      <Flag className={`w-4 h-4 ${testState.flaggedQuestions.has(currentQuestion.id) ? 'text-yellow-600 fill-current' : ''}`} />
                      {testState.flaggedQuestions.has(currentQuestion.id) ? 'Flagged' : 'Flag'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Question Text */}
                  <div className="text-lg">
                    <p className="mb-4">{currentQuestion.text}</p>
                    {locale === 'hi' && (
                      <p className="text-gray-600 mb-4">{currentQuestion.textHi}</p>
                    )}
                  </div>
                  
                  {/* Options */}
                  <div className="space-y-3">
                    {(['A', 'B', 'C', 'D'] as const).map((option) => (
                      <label
                        key={option}
                        className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          testState.answers[currentQuestion.id] === option
                            ? 'border-bpsc-600 bg-bpsc-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={testState.answers[currentQuestion.id] === option}
                          onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium">
                            {option}. {currentQuestion.options[option]}
                          </div>
                          {locale === 'hi' && (
                            <div className="text-gray-600 text-sm mt-1">
                              {currentQuestion.optionsHi[option]}
                            </div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => handleQuestionNavigation(Math.max(0, testState.currentQuestion - 1))}
                      disabled={testState.currentQuestion === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {testState.currentQuestion + 1} of {questions.length}
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleQuestionNavigation(Math.min(questions.length - 1, testState.currentQuestion + 1))}
                      disabled={testState.currentQuestion === questions.length - 1}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => {
                    const status = getQuestionStatus(index)
                    return (
                      <Button
                        key={index}
                        variant={status === 'answered' ? 'default' : status === 'flagged' ? 'secondary' : 'outline'}
                        size="sm"
                        onClick={() => handleQuestionNavigation(index)}
                        className={`h-10 w-10 p-0 ${
                          index === testState.currentQuestion ? 'ring-2 ring-bpsc-600' : ''
                        }`}
                      >
                        {index + 1}
                      </Button>
                    )
                  })}
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-bpsc-600 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                    <span>Unanswered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <span>Confirm Submission</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Are you sure you want to submit your test?</p>
              <div className="text-sm text-gray-600">
                <p>• Answered: {Object.keys(testState.answers).length} questions</p>
                <p>• Unanswered: {questions.length - Object.keys(testState.answers).length} questions</p>
                <p>• Time remaining: {formatTime(testState.timeRemaining)}</p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitTest}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Submit Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

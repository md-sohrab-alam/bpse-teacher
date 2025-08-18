'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Clock, FileText, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight, Flag } from 'lucide-react'
import Link from 'next/link'
import { loadQuestionsBySet } from '@/lib/question-loader'

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

interface TestConfig {
  id: string
  title: string
  questionSet: string
  duration: number
  questions: number
  negativeMarking: number
}

export default function TestPage({ params: { locale, id } }: TestPageProps) {
  const t = useTranslations('mockTests')
  const router = useRouter()
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [isTestCompleted, setIsTestCompleted] = useState(false)
  // Removed showExplanation state - explanations only shown after test completion
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  // Test configuration mapping
  const testConfigs: Record<string, TestConfig> = {
    '1': { id: '1', title: 'BPSC Computer Teacher – Model Set 1', questionSet: 'computer-science-1', duration: 7200, questions: 120, negativeMarking: 0 },
    '2': { id: '2', title: 'BPSC Computer Teacher – Model Set 2', questionSet: 'computer-science-2', duration: 7200, questions: 120, negativeMarking: 0 },
    '3': { id: '3', title: 'BPSC Computer Teacher – Model Set 3', questionSet: 'computer-science-3', duration: 7200, questions: 120, negativeMarking: 0 },
    '4': { id: '4', title: 'BPSC Computer Teacher – Model Set 4', questionSet: 'computer-science-4', duration: 7200, questions: 120, negativeMarking: 0 },
    '5': { id: '5', title: 'BPSC Computer Teacher – Model Set 5', questionSet: 'computer-science-5', duration: 7200, questions: 120, negativeMarking: 0 },
    '6': { id: '6', title: 'BPSC Mathematics Teacher – Model Set 1', questionSet: 'math-1', duration: 7200, questions: 120, negativeMarking: 0 },
    '7': { id: '7', title: 'STET Computer Science – Model Set 1', questionSet: 'stet-computer-1', duration: 9000, questions: 150, negativeMarking: 0 },
    '8': { id: '8', title: 'STET Computer Science – Model Set 2', questionSet: 'stet-computer-2', duration: 9000, questions: 150, negativeMarking: 0 },
    '9': { id: '9', title: 'STET Computer Science – Model Set 3', questionSet: 'stet-computer-3', duration: 9000, questions: 150, negativeMarking: 0 },
    '10': { id: '10', title: 'STET Computer Science – Model Set 4', questionSet: 'stet-computer-4', duration: 9000, questions: 150, negativeMarking: 0 },
    '11': { id: '11', title: 'STET Computer Science – Model Set 5', questionSet: 'stet-computer-5', duration: 9000, questions: 150, negativeMarking: 0 },
    '12': { id: '12', title: 'STET Computer Science – Model Set 6', questionSet: 'stet-computer-6', duration: 9000, questions: 150, negativeMarking: 0 },
    '13': { id: '13', title: 'STET Computer Science – Model Set 7', questionSet: 'stet-computer-7', duration: 9000, questions: 150, negativeMarking: 0 },
    '14': { id: '14', title: 'BPSC Physics Teacher – Model Set 1', questionSet: 'physics', duration: 1200, questions: 20, negativeMarking: 0 },
    '15': { id: '15', title: 'BPSC Chemistry Teacher – Model Set 1', questionSet: 'chemistry', duration: 1200, questions: 20, negativeMarking: 0 },
    '16': { id: '16', title: 'BPSC Biology Teacher – Model Set 1', questionSet: 'biology', duration: 1200, questions: 20, negativeMarking: 0 },
    '17': { id: '17', title: 'BPSC History Teacher – Model Set 1', questionSet: 'history', duration: 1200, questions: 20, negativeMarking: 0 },
    '18': { id: '18', title: 'BPSC Geography Teacher – Model Set 1', questionSet: 'geography', duration: 1200, questions: 20, negativeMarking: 0 },
    '19': { id: '19', title: 'BPSC Economics Teacher – Model Set 1', questionSet: 'economics', duration: 1200, questions: 20, negativeMarking: 0 },
    '20': { id: '20', title: 'BPSC General Studies – Model Set 1', questionSet: 'general-studies', duration: 1200, questions: 20, negativeMarking: 0 }
  }

  useEffect(() => {
    const config = testConfigs[id]
    if (!config) {
      router.push(`/${locale}/mock-tests`)
          return
        }

    setTestConfig(config)
    setTimeLeft(config.duration)

    // Load questions
    try {
      const loadedQuestions = loadQuestionsBySet(config.questionSet, config.questions)
        setQuestions(loadedQuestions)
      } catch (error) {
        console.error('Error loading questions:', error)
      } finally {
        setIsLoading(false)
      }
  }, [id, locale, router])

  // Timer effect
  useEffect(() => {
    if (!isTestStarted || isTestCompleted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTestCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTestStarted, isTestCompleted, timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTest = () => {
    setIsTestStarted(true)
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const submitTest = () => {
    // Save answers to localStorage for result page
    localStorage.setItem(`test_answers_${id}`, JSON.stringify(answers))
    setIsTestCompleted(true)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / questions.length) * 100

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bpsc-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading test...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!testConfig || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
            <p className="text-gray-600 mb-6">The requested test could not be loaded.</p>
            <Button asChild>
              <Link href={`/${locale}/mock-tests`}>Back to Mock Tests</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{testConfig.title}</h1>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-bpsc-600" />
                  <div>
                    <p className="font-semibold">{formatTime(testConfig.duration)}</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-bpsc-600" />
                  <div>
                    <p className="font-semibold">{testConfig.questions}</p>
                    <p className="text-sm text-gray-600">Questions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">Important Instructions:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Test cannot be paused once started</li>
                  <li>• Ensure stable internet connection</li>
                  <li>• Close other applications</li>
                  <li>• Test will auto-submit when time expires</li>
                  <li>• Explanations and solutions will be shown after test completion</li>
                </ul>
              </div>

              <Button onClick={startTest} size="lg" className="bg-bpsc-600 hover:bg-bpsc-700">
                Start Test Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isTestCompleted) {
    const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length
    const wrongAnswers = questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswer).length
    const unattempted = questions.length - answeredCount
         const score = correctAnswers
    const percentage = (score / questions.length) * 100

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Test Completed!</h1>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-bpsc-600 mb-2">{percentage.toFixed(1)}%</div>
                  <p className="text-gray-600">Score</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{score.toFixed(1)}</div>
                  <p className="text-gray-600">Total Marks</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                  <p className="text-sm text-green-700">Correct</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{wrongAnswers}</div>
                  <p className="text-sm text-red-700">Wrong</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{unattempted}</div>
                  <p className="text-sm text-gray-700">Unattempted</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-green-900 mb-2">📚 View Complete Solutions</h3>
                <p className="text-sm text-green-800">Click "View Detailed Results" to see explanations and solutions for all questions.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href={`/${locale}/mock-tests/${id}/result`}>
                    View Detailed Results
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/${locale}/mock-tests`}>
                    Take Another Test
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      {/* Test Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/${locale}/mock-tests/${id}`} className="text-bpsc-600 hover:text-bpsc-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{testConfig.title}</h1>
                <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{formatTime(timeLeft)}</div>
                <p className="text-xs text-gray-600">Time Left</p>
              </div>
              <Button onClick={submitTest} variant="destructive" size="sm">
                Submit Test
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {answeredCount}/{questions.length} answered</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Area */}
          <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Question {currentQuestionIndex + 1}</Badge>
                    {flaggedQuestions.has(currentQuestion.id) && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Flag className="w-3 h-3 mr-1" />
                        Flagged
                      </Badge>
                    )}
                  </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFlagQuestion(currentQuestion.id)}
                    >
                    <Flag className={`w-4 h-4 mr-1 ${flaggedQuestions.has(currentQuestion.id) ? 'text-yellow-600' : ''}`} />
                    {flaggedQuestions.has(currentQuestion.id) ? 'Unflag' : 'Flag'}
                    </Button>
                  </div>
                </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">{currentQuestion.text}</h2>
                  
                  <RadioGroup
                    value={answers[currentQuestion.id] || ''}
                    onValueChange={(value: string) => handleAnswerSelect(currentQuestion.id, value)}
                  >
                  <div className="space-y-3">
                    {(['A', 'B', 'C', 'D'] as const).map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                          <Label htmlFor={`${currentQuestion.id}-${option}`} className="flex-1 cursor-pointer">
                            <span className="font-medium mr-2">{option}.</span>
                            {currentQuestion.options[option]}
                          </Label>
                        </div>
                      ))}
                          </div>
                  </RadioGroup>
                            </div>

                {/* Explanations are only shown after test completion */}
                  
                <div className="flex items-center justify-between mt-6">
                    <Button
                      variant="outline"
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    
                  <div className="flex space-x-2">
                    {/* Explanation button removed - explanations only shown after test completion */}
                  </div>
                    
                    <Button
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle>Question Navigator</CardTitle>
                <CardDescription>Click to jump to any question</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((question, index) => {
                    const isAnswered = answers[question.id]
                    const isFlagged = flaggedQuestions.has(question.id)
                    const isCurrent = index === currentQuestionIndex
                    
                    return (
                      <Button
                        key={question.id}
                        variant={isCurrent ? "default" : "outline"}
                        size="sm"
                        className={`h-8 text-xs relative ${
                          isAnswered ? 'bg-green-100 border-green-300 text-green-800' : ''
                        }`}
                        onClick={() => goToQuestion(index)}
                      >
                        {index + 1}
                        {isFlagged && (
                          <Flag className="w-2 h-2 absolute -top-1 -right-1 text-yellow-600" />
                        )}
                      </Button>
                    )
                  })}
                </div>
                
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span>Flagged</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

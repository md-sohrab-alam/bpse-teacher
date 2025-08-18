'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  BarChart3, 
  BookOpen, 
  Share2, 
  ArrowLeft,
  ArrowRight,
  Target,
  TrendingUp,
  AlertTriangle,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { loadQuestionsBySet } from '@/lib/question-loader'

interface ResultPageProps {
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

export default function ResultPage({ params: { locale, id } }: ResultPageProps) {
  const t = useTranslations('mockTests')
  const router = useRouter()
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showHindi, setShowHindi] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

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

    // Load questions
    try {
      const loadedQuestions = loadQuestionsBySet(config.questionSet, config.questions)
      setQuestions(loadedQuestions)
      
      // Load answers from localStorage (simulating test completion)
      const savedAnswers = localStorage.getItem(`test_answers_${id}`)
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers))
      }
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [id, locale, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bpsc-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading results...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Results Not Found</h1>
            <p className="text-gray-600 mb-6">The test results could not be loaded.</p>
            <Button asChild>
              <Link href={`/${locale}/mock-tests`}>Back to Mock Tests</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Calculate results
  const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length
  const wrongAnswers = questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswer).length
  const unattempted = questions.length - Object.keys(answers).length
  const score = correctAnswers
  const percentage = (score / questions.length) * 100

  const getQuestionStatus = (question: Question) => {
    const userAnswer = answers[question.id]
    if (!userAnswer) return 'unattempted'
    if (userAnswer === question.correctAnswer) return 'correct'
    return 'incorrect'
  }

  const getOptionStyle = (question: Question, option: 'A' | 'B' | 'C' | 'D') => {
    const userAnswer = answers[question.id]
    const isCorrect = option === question.correctAnswer
    const isUserAnswer = option === userAnswer

    if (isCorrect && isUserAnswer) {
      return 'bg-green-100 border-green-500 text-green-800'
    } else if (isCorrect && !isUserAnswer) {
      return 'bg-green-100 border-green-500 text-green-800'
    } else if (isUserAnswer && !isCorrect) {
      return 'bg-red-100 border-red-500 text-red-800'
    }
    return 'bg-gray-50 border-gray-200 text-gray-700'
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

    const currentQuestion = questions[currentQuestionIndex]

  // Share results function
  const shareResults = async () => {
    setIsSharing(true)
    try {
      const shareData = {
        title: `${testConfig.title} - Test Results`,
        text: `I scored ${percentage.toFixed(1)}% on ${testConfig.title}! Correct: ${correctAnswers}, Wrong: ${wrongAnswers}, Unattempted: ${unattempted}`,
        url: window.location.href
      }

      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        const shareText = `${shareData.title}\n${shareData.text}\n\nView results: ${shareData.url}`
        await navigator.clipboard.writeText(shareText)
        alert('Results copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing results:', error)
      // Fallback: copy to clipboard
      try {
        const shareData = {
          title: `${testConfig.title} - Test Results`,
          text: `I scored ${percentage.toFixed(1)}% on ${testConfig.title}! Correct: ${correctAnswers}, Wrong: ${wrongAnswers}, Unattempted: ${unattempted}`,
          url: window.location.href
        }
        const shareText = `${shareData.title}\n${shareData.text}\n\nView results: ${shareData.url}`
        await navigator.clipboard.writeText(shareText)
        alert('Results copied to clipboard!')
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError)
        alert('Unable to share results. Please copy the URL manually.')
      }
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link href={`/${locale}/mock-tests/${id}`} className="text-bpsc-600 hover:text-bpsc-700">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Test
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
            <p className="text-lg text-gray-600">{testConfig.title}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Results Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Performance Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-bpsc-600 mb-2">{percentage.toFixed(1)}%</div>
                  <p className="text-sm text-gray-600">Overall Score</p>
                </div>

                {/* Detailed Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Correct</span>
                    </div>
                    <span className="font-bold text-green-600">{correctAnswers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium">Incorrect</span>
                    </div>
                    <span className="font-bold text-red-600">{wrongAnswers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium">Unattempted</span>
                    </div>
                    <span className="font-bold text-gray-600">{unattempted}</span>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="font-semibold">{((correctAnswers / (correctAnswers + wrongAnswers)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completion</span>
                    <span className="font-semibold">{(((correctAnswers + wrongAnswers) / questions.length) * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" onClick={shareResults}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Review */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="review" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="review">Question Review</TabsTrigger>
                <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
                <TabsTrigger value="solutions">All Solutions</TabsTrigger>
              </TabsList>

              <TabsContent value="review" className="space-y-6">
                {/* Question Navigation */}
            <Card>
              <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={previousQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={nextQuestion}
                          disabled={currentQuestionIndex === questions.length - 1}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
              </CardHeader>
              <CardContent>
                    {/* Question Status */}
                    <div className="mb-4">
                      {(() => {
                        const status = getQuestionStatus(currentQuestion)
                        if (status === 'correct') {
                          return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Correct</Badge>
                        } else if (status === 'incorrect') {
                          return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Incorrect</Badge>
                        } else {
                          return <Badge className="bg-gray-100 text-gray-800"><AlertTriangle className="w-3 h-3 mr-1" />Unattempted</Badge>
                        }
                      })()}
                    </div>

                    {/* Question Text */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Question:</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowHindi(!showHindi)}
                        >
                          {showHindi ? 'Show English' : 'Show Hindi'}
                        </Button>
                      </div>
                      <p className="text-gray-800 mb-4">
                        {showHindi ? currentQuestion.textHi : currentQuestion.text}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold">Options:</h4>
                      {(['A', 'B', 'C', 'D'] as const).map((option) => (
                        <div
                          key={option}
                          className={`p-3 border-2 rounded-lg ${getOptionStyle(currentQuestion, option)}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="font-bold">{option}.</span>
                            <span>{showHindi ? currentQuestion.optionsHi[option] : currentQuestion.options[option]}</span>
                            {option === currentQuestion.correctAnswer && (
                              <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                            )}
                            {option === answers[currentQuestion.id] && option !== currentQuestion.correctAnswer && (
                              <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                            )}
                    </div>
                  </div>
                      ))}
                    </div>

                    {/* User's Answer vs Correct Answer */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Your Answer:</h4>
                        <p className="text-blue-800">
                          {answers[currentQuestion.id] ? (
                            <span className="font-bold">{answers[currentQuestion.id]}. {showHindi ? currentQuestion.optionsHi[answers[currentQuestion.id] as keyof typeof currentQuestion.optionsHi] : currentQuestion.options[answers[currentQuestion.id] as keyof typeof currentQuestion.options]}</span>
                          ) : (
                            <span className="text-gray-500">Not attempted</span>
                          )}
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Correct Answer:</h4>
                        <p className="text-green-800">
                          <span className="font-bold">{currentQuestion.correctAnswer}. {showHindi ? currentQuestion.optionsHi[currentQuestion.correctAnswer] : currentQuestion.options[currentQuestion.correctAnswer]}</span>
                        </p>
                    </div>
                  </div>

                    {/* Explanation */}
                    {currentQuestion.explanation && (
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Solution & Explanation:
                        </h4>
                        <div className="text-yellow-800">
                          <p className="mb-2">{showHindi ? currentQuestion.explanationHi : currentQuestion.explanation}</p>
                          {showHindi && currentQuestion.explanation && (
                            <div className="mt-3 pt-3 border-t border-yellow-200">
                              <p className="text-sm text-yellow-700">{currentQuestion.explanation}</p>
                            </div>
                          )}
                  </div>
                </div>
                    )}
              </CardContent>
            </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of your performance</CardDescription>
              </CardHeader>
              <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Score Distribution</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Excellent (90%+)</span>
                            <Badge className={percentage >= 90 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                              {percentage >= 90 ? 'Achieved' : 'Not Achieved'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Good (70-89%)</span>
                            <Badge className={percentage >= 70 && percentage < 90 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                              {percentage >= 70 && percentage < 90 ? 'Achieved' : 'Not Achieved'}
                            </Badge>
                      </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Average (50-69%)</span>
                            <Badge className={percentage >= 50 && percentage < 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}>
                              {percentage >= 50 && percentage < 70 ? 'Achieved' : 'Not Achieved'}
                            </Badge>
                    </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Needs Improvement (&lt;50%)</span>
                            <Badge className={percentage < 50 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}>
                              {percentage < 50 ? 'Needs Work' : 'Not Applicable'}
                            </Badge>
                      </div>
                    </div>
                  </div>
                  
                      <div>
                        <h4 className="font-semibold mb-4">Recommendations</h4>
                        <div className="space-y-3">
                          {percentage < 50 && (
                            <div className="p-3 bg-red-50 rounded-lg">
                              <h5 className="font-semibold text-red-900">Focus Areas:</h5>
                              <ul className="text-sm text-red-800 mt-2 space-y-1">
                                <li>• Review fundamental concepts</li>
                                <li>• Practice more questions</li>
                                <li>• Take additional mock tests</li>
                              </ul>
                       </div>
                          )}
                          {percentage >= 50 && percentage < 70 && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                              <h5 className="font-semibold text-yellow-900">Improvement Areas:</h5>
                              <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                                <li>• Focus on weak topics</li>
                                <li>• Improve time management</li>
                                <li>• Review incorrect answers</li>
                              </ul>
                            </div>
                          )}
                          {percentage >= 70 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                              <h5 className="font-semibold text-green-900">Well Done!</h5>
                              <ul className="text-sm text-green-800 mt-2 space-y-1">
                                <li>• Maintain consistency</li>
                                <li>• Focus on remaining weak areas</li>
                                <li>• Practice advanced questions</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solutions" className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-blue-900 mb-2">📖 Complete Solutions & Explanations</h3>
                  <p className="text-sm text-blue-800">Review all questions with detailed explanations and correct answers to improve your understanding.</p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Solutions</CardTitle>
                    <CardDescription>Review all questions with solutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {questions.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">Question {index + 1}</h4>
                            {(() => {
                              const status = getQuestionStatus(question)
                              if (status === 'correct') {
                                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Correct</Badge>
                              } else if (status === 'incorrect') {
                                return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Incorrect</Badge>
                              } else {
                                return <Badge className="bg-gray-100 text-gray-800"><AlertTriangle className="w-3 h-3 mr-1" />Unattempted</Badge>
                              }
                            })()}
                          </div>
                          
                          <p className="text-gray-800 mb-3">{question.text}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-3">
                            <div className="text-sm">
                              <span className="font-medium text-gray-600">Your Answer: </span>
                              <span className={answers[question.id] === question.correctAnswer ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {answers[question.id] ? `${answers[question.id]}. ${question.options[answers[question.id] as keyof typeof question.options]}` : 'Not attempted'}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-gray-600">Correct Answer: </span>
                              <span className="text-green-600 font-semibold">
                                {question.correctAnswer}. {question.options[question.correctAnswer]}
                              </span>
                            </div>
                          </div>
                          
                          {question.explanation && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <h5 className="font-semibold text-blue-900 mb-2">Solution:</h5>
                              <p className="text-blue-800 text-sm">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href={`/${locale}/mock-tests/${id}/test`}>
              <Target className="w-4 h-4 mr-2" />
              Retake Test
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/${locale}/mock-tests`}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Try Another Test
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

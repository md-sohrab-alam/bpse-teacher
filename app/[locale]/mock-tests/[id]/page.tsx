'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, FileText, Play, Star, Users, AlertTriangle, CheckCircle, Bell } from 'lucide-react'
import Link from 'next/link'

interface MockTestPageProps {
  params: { locale: string; id: string }
}

interface MockTest {
  id: string
  title: string
  titleHi: string
  description: string
  descriptionHi: string
  duration: number
  questions: number
  negativeMarking: number
  difficulty: string
  attempts: number
  rating: number
  isFeatured: boolean
  exam: string
  subject: string
  instructions: string[]
  topics: string[]
}

export default function MockTestPage({ params: { locale, id } }: MockTestPageProps) {
  const t = useTranslations('mockTests')
  const router = useRouter()
  const [test, setTest] = useState<MockTest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showInstructions, setShowInstructions] = useState(false)
  const [liveAttempts, setLiveAttempts] = useState(0)
  const [showAttemptNotification, setShowAttemptNotification] = useState(false)

  // Mock data - in real app, this would come from API/database
  const mockTests: MockTest[] = [
    {
      id: '1',
      title: 'BPSC Computer Teacher – Model Set 1',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Computer Teacher recruitment with 120 questions covering all topics.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए 120 प्रश्नों के साथ व्यापक मॉक टेस्ट।',
      duration: 7200, // 2 hours in seconds
      questions: 120,
      negativeMarking: 0.25,
      difficulty: 'Medium',
      attempts: 1250,
      rating: 4.8,
      isFeatured: true,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      instructions: [
        'This test contains 120 questions',
        'Time duration: 2 hours',
        'Negative marking: 0.25 marks per wrong answer',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Computer Fundamentals',
        'Programming Concepts',
        'Database Management',
        'Web Technologies',
        'Computer Networks',
        'Operating Systems'
      ]
    },
    {
      id: '2',
      title: 'BPSC Computer Teacher – Model Set 2',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 2',
      description: 'Second comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए दूसरा व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0.25,
      difficulty: 'Medium',
      attempts: 980,
      rating: 4.7,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      instructions: [
        'This test contains 120 questions',
        'Time duration: 2 hours',
        'Negative marking: 0.25 marks per wrong answer',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Computer Fundamentals',
        'Programming Concepts',
        'Database Management',
        'Web Technologies',
        'Computer Networks',
        'Operating Systems'
      ]
    },
    {
      id: '3',
      title: 'BPSC Computer Teacher – Model Set 3',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 3',
      description: 'Third comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए तीसरा व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0.25,
      difficulty: 'Medium',
      attempts: 756,
      rating: 4.6,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      instructions: [
        'This test contains 120 questions',
        'Time duration: 2 hours',
        'Negative marking: 0.25 marks per wrong answer',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Computer Fundamentals',
        'Programming Concepts',
        'Database Management',
        'Web Technologies',
        'Computer Networks',
        'Operating Systems'
      ]
    },
    {
      id: '4',
      title: 'BPSC Computer Teacher – Model Set 4',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 4',
      description: 'Fourth comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए चौथा व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0.25,
      difficulty: 'Medium',
      attempts: 654,
      rating: 4.5,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      instructions: [
        'This test contains 120 questions',
        'Time duration: 2 hours',
        'Negative marking: 0.25 marks per wrong answer',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Computer Fundamentals',
        'Programming Concepts',
        'Database Management',
        'Web Technologies',
        'Computer Networks',
        'Operating Systems'
      ]
    },
    {
      id: '5',
      title: 'BPSC Computer Teacher – Model Set 5',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 5',
      description: 'Fifth comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए पांचवां व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0.25,
      difficulty: 'Medium',
      attempts: 543,
      rating: 4.4,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      instructions: [
        'This test contains 120 questions',
        'Time duration: 2 hours',
        'Negative marking: 0.25 marks per wrong answer',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Computer Fundamentals',
        'Programming Concepts',
        'Database Management',
        'Web Technologies',
        'Computer Networks',
        'Operating Systems'
      ]
    },
    {
      id: '6',
      title: 'BPSC Mathematics Teacher – Model Set 1',
      titleHi: 'बीपीएससी गणित शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Mathematics Teacher recruitment with 120 questions.',
      descriptionHi: 'बीपीएससी गणित शिक्षक भर्ती के लिए 120 प्रश्नों के साथ व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0.25,
      difficulty: 'Hard',
      attempts: 432,
      rating: 4.9,
      isFeatured: true,
      exam: 'BPSC Teacher',
      subject: 'Mathematics',
      instructions: [
        'This test contains 120 questions',
        'Time duration: 2 hours',
        'Negative marking: 0.25 marks per wrong answer',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Algebra',
        'Geometry',
        'Trigonometry',
        'Calculus',
        'Statistics',
        'Number Theory'
      ]
    },
    {
      id: '7',
      title: 'STET Computer Science – Model Set 1',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 1',
      description: 'Mock test for STET Computer Science covering advanced topics.',
      descriptionHi: 'उन्नत विषयों को कवर करने वाला एसटीईटी कंप्यूटर साइंस का मॉक टेस्ट।',
      duration: 9000, // 2.5 hours
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 345,
      rating: 4.8,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      instructions: [
        'This test contains 150 questions',
        'Time duration: 2.5 hours',
        'No negative marking',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Advanced Programming',
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Software Engineering',
        'Database Systems'
      ]
    },
    {
      id: '8',
      title: 'STET Computer Science – Model Set 2',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 2',
      description: 'Second mock test for STET Computer Science.',
      descriptionHi: 'एसटीईटी कंप्यूटर साइंस का दूसरा मॉक टेस्ट।',
      duration: 9000,
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 298,
      rating: 4.7,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      instructions: [
        'This test contains 150 questions',
        'Time duration: 2.5 hours',
        'No negative marking',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Advanced Programming',
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Software Engineering',
        'Database Systems'
      ]
    },
    {
      id: '9',
      title: 'STET Computer Science – Model Set 3',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 3',
      description: 'Third mock test for STET Computer Science.',
      descriptionHi: 'एसटीईटी कंप्यूटर साइंस का तीसरा मॉक टेस्ट।',
      duration: 9000,
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 267,
      rating: 4.6,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      instructions: [
        'This test contains 150 questions',
        'Time duration: 2.5 hours',
        'No negative marking',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Advanced Programming',
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Software Engineering',
        'Database Systems'
      ]
    },
    {
      id: '10',
      title: 'STET Computer Science – Model Set 4',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 4',
      description: 'Fourth mock test for STET Computer Science.',
      descriptionHi: 'एसटीईटी कंप्यूटर साइंस का चौथा मॉक टेस्ट।',
      duration: 9000,
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 234,
      rating: 4.5,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      instructions: [
        'This test contains 150 questions',
        'Time duration: 2.5 hours',
        'No negative marking',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Advanced Programming',
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Software Engineering',
        'Database Systems'
      ]
    },
    {
      id: '11',
      title: 'STET Computer Science – Model Set 5',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 5',
      description: 'Fifth mock test for STET Computer Science.',
      descriptionHi: 'एसटीईटी कंप्यूटर साइंस का पांचवां मॉक टेस्ट।',
      duration: 9000,
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 198,
      rating: 4.4,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      instructions: [
        'This test contains 150 questions',
        'Time duration: 2.5 hours',
        'No negative marking',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Advanced Programming',
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Software Engineering',
        'Database Systems'
      ]
    },
    {
      id: '12',
      title: 'STET Computer Science – Model Set 6',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 6',
      description: 'Sixth mock test for STET Computer Science.',
      descriptionHi: 'एसटीईटी कंप्यूटर साइंस का छठा मॉक टेस्ट।',
      duration: 9000,
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 167,
      rating: 4.3,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      instructions: [
        'This test contains 150 questions',
        'Time duration: 2.5 hours',
        'No negative marking',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Advanced Programming',
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Software Engineering',
        'Database Systems'
      ]
    },
    {
      id: '13',
      title: 'STET Computer Science – Model Set 7',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 7',
      description: 'Seventh mock test for STET Computer Science.',
      descriptionHi: 'एसटीईटी कंप्यूटर साइंस का सातवां मॉक टेस्ट।',
      duration: 9000,
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 145,
      rating: 4.2,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      instructions: [
        'This test contains 150 questions',
        'Time duration: 2.5 hours',
        'No negative marking',
        'You can navigate between questions',
        'Test will auto-submit when time expires'
      ],
      topics: [
        'Advanced Programming',
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Software Engineering',
        'Database Systems'
      ]
    }
  ]

  useEffect(() => {
    // Simulate API call
    const fetchTest = async () => {
      setIsLoading(true)
      // In real app, fetch from API
      const foundTest = mockTests.find(t => t.id === id)
      setTest(foundTest || null)
      if (foundTest) {
        setLiveAttempts(foundTest.attempts)
      }
      setIsLoading(false)
    }

    fetchTest()
  }, [id])

  // Simulate live attempts counter
  useEffect(() => {
    if (!test) return

    const interval = setInterval(() => {
      setLiveAttempts(prev => {
        // Randomly increase attempts to simulate real-time activity
        const increase = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
        if (increase > 0) {
          // Show notification for new attempts
          setShowAttemptNotification(true)
          setTimeout(() => setShowAttemptNotification(false), 2000)
        }
        return prev + increase
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [test])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const startTest = () => {
    // Navigate to the actual test interface
    router.push(`/${locale}/mock-tests/${id}/test`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bpsc-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading test details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation locale={locale} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-bpsc-600 to-stet-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon! 🚀</h1>
            <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
              We're working hard to bring you this amazing mock test. Our team is crafting high-quality questions 
              to help you ace your BPSC Teacher exam preparation.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="flex items-center space-x-2 text-blue-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">What to expect:</span>
              </div>
              <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
                <li>• Expert-curated questions</li>
                <li>• Real exam pattern simulation</li>
                <li>• Detailed explanations</li>
                <li>• Performance analytics</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-bpsc-600 hover:bg-bpsc-700">
                <Link href={`/${locale}/mock-tests`}>
                  <FileText className="w-4 h-4 mr-2" />
                  Browse Available Tests
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${locale}/news`}>
                  <Bell className="w-4 h-4 mr-2" />
                  Get Notified
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {/* Live Activity Notification */}
         {showAttemptNotification && (
           <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
             <div className="flex items-center space-x-2">
               <Users className="w-4 h-4" />
               <span className="text-sm font-medium">New attempt started!</span>
             </div>
           </div>
         )}
         
         {/* Test Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link href={`/${locale}/mock-tests`} className="text-bpsc-600 hover:text-bpsc-700">
              ← Back to Mock Tests
            </Link>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Badge className="bg-bpsc-600 text-white">{test.exam}</Badge>
                <Badge variant="outline">{test.subject}</Badge>
                <Badge variant={test.difficulty === 'Easy' ? 'default' : test.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                  {test.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
              <p className="text-lg text-gray-600">{test.description}</p>
            </div>
                         <div className="text-right">
               <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                 <Star className="w-5 h-5 fill-current" />
                 <span className="font-semibold text-lg">{test.rating}</span>
               </div>
               <div className="flex items-center space-x-2">
                 <p className="text-sm text-gray-600">{liveAttempts.toLocaleString()} attempts</p>
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-xs text-green-600 font-medium">Live</span>
               </div>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Test Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Test Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Test Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-8 h-8 text-bpsc-600" />
                    <div>
                      <p className="font-semibold text-lg">{formatDuration(test.duration)}</p>
                      <p className="text-sm text-gray-600">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-bpsc-600" />
                    <div>
                      <p className="font-semibold text-lg">{test.questions}</p>
                      <p className="text-sm text-gray-600">Questions</p>
                    </div>
                  </div>
                                     <div className="flex items-center space-x-3">
                     <Users className="w-8 h-8 text-bpsc-600" />
                     <div>
                       <div className="flex items-center space-x-2">
                         <p className="font-semibold text-lg">{liveAttempts.toLocaleString()}</p>
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       </div>
                       <p className="text-sm text-gray-600">Total Attempts</p>
                     </div>
                   </div>
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="font-semibold text-lg">-{test.negativeMarking}</p>
                      <p className="text-sm text-gray-600">Negative Marking</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Topics Covered */}
            <Card>
              <CardHeader>
                <CardTitle>Topics Covered</CardTitle>
                <CardDescription>This test covers the following topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {test.topics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Test Instructions</CardTitle>
                <CardDescription>Please read carefully before starting the test</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {test.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-bpsc-600 font-semibold">•</span>
                      <span className="text-sm">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Start Test Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ready to Start?</CardTitle>
                <CardDescription>Begin your mock test when you're ready</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Test cannot be paused once started</li>
                    <li>• Ensure stable internet connection</li>
                    <li>• Close other applications</li>
                    <li>• Have calculator ready if needed</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={startTest}
                  size="lg" 
                  className="w-full bg-bpsc-600 hover:bg-bpsc-700"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Test Now
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  <FileText className="w-5 h-5 mr-2" />
                  View Sample Questions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

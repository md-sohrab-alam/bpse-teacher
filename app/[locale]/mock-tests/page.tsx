'use client'

import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, FileText, Play, Star, Users } from 'lucide-react'
import Link from 'next/link'

interface MockTestsPageProps {
  params: { locale: string }
}

export default function MockTestsPage({ params: { locale } }: MockTestsPageProps) {
  const t = useTranslations('mockTests')

  const mockTests = [
    {
      id: 1,
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
      subject: 'Computer Science'
    },
    {
      id: 2,
      title: 'STET Paper I – Primary Level',
      titleHi: 'एसटीईटी पेपर I – प्राथमिक स्तर',
      description: 'Mock test for STET Paper I covering Primary level (Classes I-V) topics.',
      descriptionHi: 'प्राथमिक स्तर (कक्षा I-V) के लिए एसटीईटी पेपर I का मॉक टेस्ट।',
      duration: 9000, // 2.5 hours
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Easy',
      attempts: 890,
      rating: 4.6,
      isFeatured: false,
      exam: 'STET',
      subject: 'Primary'
    },
    {
      id: 3,
      title: 'STET Paper II – Upper Primary',
      titleHi: 'एसटीईटी पेपर II – उच्च प्राथमिक',
      description: 'Mock test for STET Paper II covering Upper Primary level (Classes VI-VIII) topics.',
      descriptionHi: 'उच्च प्राथमिक स्तर (कक्षा VI-VIII) के लिए एसटीईटी पेपर II का मॉक टेस्ट।',
      duration: 9000, // 2.5 hours
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 756,
      rating: 4.7,
      isFeatured: false,
      exam: 'STET',
      subject: 'Upper Primary'
    },
    {
      id: 4,
      title: 'BPSC Mathematics Teacher',
      titleHi: 'बीपीएससी गणित शिक्षक',
      description: 'Specialized mock test for BPSC Mathematics Teacher recruitment.',
      descriptionHi: 'बीपीएससी गणित शिक्षक भर्ती के लिए विशेष मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0.25,
      difficulty: 'Hard',
      attempts: 432,
      rating: 4.9,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Mathematics'
    }
  ]

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice with our comprehensive mock tests designed to help you prepare for STET and BPSC Teacher recruitment exams.
          </p>
        </div>

        {/* Featured Test */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Test</h2>
          {mockTests.filter(test => test.isFeatured).map((test) => (
            <Card key={test.id} className="border-2 border-bpsc-200 bg-gradient-to-r from-bpsc-50 to-blue-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-bpsc-600 text-white">Featured</Badge>
                      <Badge variant="outline">{test.exam}</Badge>
                      <Badge variant="outline">{test.subject}</Badge>
                    </div>
                    <CardTitle className="text-2xl text-bpsc-900">{test.title}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {test.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{test.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">{test.attempts} attempts</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">{formatDuration(test.duration)}</p>
                      <p className="text-sm text-gray-600">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">{test.questions}</p>
                      <p className="text-sm text-gray-600">Questions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">{test.attempts}</p>
                      <p className="text-sm text-gray-600">Attempts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={test.difficulty === 'Easy' ? 'default' : test.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                      {test.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button size="lg" className="bg-bpsc-600 hover:bg-bpsc-700" asChild>
                    <Link href={`/mock-tests/${test.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Test
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Tests */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Mock Tests</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTests.filter(test => !test.isFeatured).map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex space-x-2">
                      <Badge variant="outline">{test.exam}</Badge>
                      <Badge variant="outline">{test.subject}</Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{test.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{test.title}</CardTitle>
                  <CardDescription>
                    {test.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{formatDuration(test.duration)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{test.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Attempts:</span>
                      <span className="font-medium">{test.attempts}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Difficulty:</span>
                      <Badge variant={test.difficulty === 'Easy' ? 'default' : test.difficulty === 'Medium' ? 'secondary' : 'destructive'} className="text-xs">
                        {test.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/mock-tests/${test.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Test
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Test Instructions */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Test Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Before Starting:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Ensure you have a stable internet connection</li>
                    <li>• Close other applications to avoid distractions</li>
                    <li>• Keep your device charged</li>
                    <li>• Have a calculator ready if needed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">During the Test:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Timer will be visible throughout the test</li>
                    <li>• You can navigate between questions</li>
                    <li>• Review your answers before submitting</li>
                    <li>• Test will auto-submit when time expires</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

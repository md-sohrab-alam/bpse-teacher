'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Clock, FileText, Play, Star, Users, Search, Filter } from 'lucide-react'
import Link from 'next/link'

interface MockTestsPageProps {
  params: { locale: string }
}

export default function MockTestsPage({ params: { locale } }: MockTestsPageProps) {
  const t = useTranslations('mockTests')
  const [searchQuery, setSearchQuery] = useState('')
  const [examFilter, setExamFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')

  const mockTests = [
    {
      id: 1,
      title: 'BPSC Computer Teacher – Model Set 1',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Computer Teacher recruitment with 120 questions covering all topics.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए 120 प्रश्नों के साथ व्यापक मॉक टेस्ट।',
      duration: 7200, // 120 minutes (1 minute per question)
      questions: 120,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 1250,
      rating: 4.8,
      isFeatured: true,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      questionSet: 'computer-science-1'
    },
    {
      id: 2,
      title: 'BPSC Computer Teacher – Model Set 2',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 2',
      description: 'Second comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए दूसरा व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 980,
      rating: 4.7,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      questionSet: 'computer-science-2'
    },
    {
      id: 3,
      title: 'BPSC Computer Teacher – Model Set 3',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 3',
      description: 'Third comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए तीसरा व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 756,
      rating: 4.6,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      questionSet: 'computer-science-3'
    },
    {
      id: 4,
      title: 'BPSC Computer Teacher – Model Set 4',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 4',
      description: 'Fourth comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए चौथा व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 654,
      rating: 4.5,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      questionSet: 'computer-science-4'
    },
    {
      id: 5,
      title: 'BPSC Computer Teacher – Model Set 5',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 5',
      description: 'Fifth comprehensive mock test for BPSC Computer Teacher recruitment.',
      descriptionHi: 'बीपीएससी कंप्यूटर शिक्षक भर्ती के लिए पांचवां व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 543,
      rating: 4.4,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Computer Science',
      questionSet: 'computer-science-5'
    },
    {
      id: 6,
      title: 'BPSC Mathematics Teacher – Model Set 1',
      titleHi: 'बीपीएससी गणित शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Mathematics Teacher recruitment with 120 questions.',
      descriptionHi: 'बीपीएससी गणित शिक्षक भर्ती के लिए 120 प्रश्नों के साथ व्यापक मॉक टेस्ट।',
      duration: 7200,
      questions: 120,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 432,
      rating: 4.9,
      isFeatured: true,
      exam: 'BPSC Teacher',
      subject: 'Mathematics',
      questionSet: 'math-1'
    },
    {
      id: 7,
      title: 'STET Computer Science – Model Set 1',
      titleHi: 'एसटीईटी कंप्यूटर साइंस – मॉडल सेट 1',
      description: 'Mock test for STET Computer Science covering advanced topics.',
      descriptionHi: 'उन्नत विषयों को कवर करने वाला एसटीईटी कंप्यूटर साइंस का मॉक टेस्ट।',
      duration: 9000, // 150 minutes (1 minute per question)
      questions: 150,
      negativeMarking: 0,
      difficulty: 'Hard',
      attempts: 345,
      rating: 4.8,
      isFeatured: false,
      exam: 'STET',
      subject: 'Computer Science',
      questionSet: 'stet-computer-1'
    },
    {
      id: 8,
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
      questionSet: 'stet-computer-2'
    },
    {
      id: 9,
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
      questionSet: 'stet-computer-3'
    },
    {
      id: 10,
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
      questionSet: 'stet-computer-4'
    },
    {
      id: 11,
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
      questionSet: 'stet-computer-5'
    },
    {
      id: 12,
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
      questionSet: 'stet-computer-6'
    },
    {
      id: 13,
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
      questionSet: 'stet-computer-7'
    },
    {
      id: 14,
      title: 'BPSC Physics Teacher – Model Set 1',
      titleHi: 'बीपीएससी भौतिकी शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Physics Teacher recruitment with 20 questions covering mechanics, thermodynamics, and modern physics.',
      descriptionHi: 'बीपीएससी भौतिकी शिक्षक भर्ती के लिए 20 प्रश्नों के साथ व्यापक मॉक टेस्ट, यांत्रिकी, ऊष्मागतिकी और आधुनिक भौतिकी को कवर करता है।',
      duration: 1200, // 20 minutes (1 minute per question)
      questions: 20,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 89,
      rating: 4.6,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Physics',
      questionSet: 'physics'
    },
    {
      id: 15,
      title: 'BPSC Chemistry Teacher – Model Set 1',
      titleHi: 'बीपीएससी रसायन शास्त्र शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Chemistry Teacher recruitment with 20 questions covering physical chemistry, organic chemistry, and inorganic chemistry.',
      descriptionHi: 'बीपीएससी रसायन शास्त्र शिक्षक भर्ती के लिए 20 प्रश्नों के साथ व्यापक मॉक टेस्ट, भौतिक रसायन, कार्बनिक रसायन और अकार्बनिक रसायन को कवर करता है।',
      duration: 1200, // 20 minutes
      questions: 20,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 76,
      rating: 4.5,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Chemistry',
      questionSet: 'chemistry'
    },
    {
      id: 16,
      title: 'BPSC Biology Teacher – Model Set 1',
      titleHi: 'बीपीएससी जीव विज्ञान शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Biology Teacher recruitment with 20 questions covering cell biology, genetics, ecology, and human physiology.',
      descriptionHi: 'बीपीएससी जीव विज्ञान शिक्षक भर्ती के लिए 20 प्रश्नों के साथ व्यापक मॉक टेस्ट, कोशिका जीव विज्ञान, आनुवंशिकी, पारिस्थितिकी और मानव शरीर विज्ञान को कवर करता है।',
      duration: 1200, // 20 minutes
      questions: 20,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 67,
      rating: 4.4,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Biology',
      questionSet: 'biology'
    },
    {
      id: 17,
      title: 'BPSC History Teacher – Model Set 1',
      titleHi: 'बीपीएससी इतिहास शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC History Teacher recruitment with 20 questions covering ancient, medieval, and modern Indian history.',
      descriptionHi: 'बीपीएससी इतिहास शिक्षक भर्ती के लिए 20 प्रश्नों के साथ व्यापक मॉक टेस्ट, प्राचीन, मध्यकालीन और आधुनिक भारतीय इतिहास को कवर करता है।',
      duration: 1200, // 20 minutes
      questions: 20,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 54,
      rating: 4.3,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'History',
      questionSet: 'history'
    },
    {
      id: 18,
      title: 'BPSC Geography Teacher – Model Set 1',
      titleHi: 'बीपीएससी भूगोल शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Geography Teacher recruitment with 20 questions covering physical geography, human geography, and Indian geography.',
      descriptionHi: 'बीपीएससी भूगोल शिक्षक भर्ती के लिए 20 प्रश्नों के साथ व्यापक मॉक टेस्ट, भौतिक भूगोल, मानव भूगोल और भारतीय भूगोल को कवर करता है।',
      duration: 1200, // 20 minutes
      questions: 20,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 43,
      rating: 4.2,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Geography',
      questionSet: 'geography'
    },
    {
      id: 19,
      title: 'BPSC Economics Teacher – Model Set 1',
      titleHi: 'बीपीएससी अर्थशास्त्र शिक्षक – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC Economics Teacher recruitment with 20 questions covering microeconomics, macroeconomics, and Indian economy.',
      descriptionHi: 'बीपीएससी अर्थशास्त्र शिक्षक भर्ती के लिए 20 प्रश्नों के साथ व्यापक मॉक टेस्ट, सूक्ष्मअर्थशास्त्र, समष्टि अर्थशास्त्र और भारतीय अर्थव्यवस्था को कवर करता है।',
      duration: 1200, // 20 minutes
      questions: 20,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 38,
      rating: 4.1,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'Economics',
      questionSet: 'economics'
    },
    {
      id: 20,
      title: 'BPSC General Studies – Model Set 1',
      titleHi: 'बीपीएससी सामान्य अध्ययन – मॉडल सेट 1',
      description: 'Comprehensive mock test for BPSC General Studies with 20 questions covering current affairs, general knowledge, and reasoning.',
      descriptionHi: 'बीपीएससी सामान्य अध्ययन के लिए 20 प्रश्नों के साथ व्यापक मॉक टेस्ट, करंट अफेयर्स, सामान्य ज्ञान और तर्कशक्ति को कवर करता है।',
      duration: 1200, // 20 minutes
      questions: 20,
      negativeMarking: 0,
      difficulty: 'Medium',
      attempts: 156,
      rating: 4.7,
      isFeatured: false,
      exam: 'BPSC Teacher',
      subject: 'General Studies',
      questionSet: 'general-studies'
    }
  ]

  // Filter tests based on search and filters
  const filteredTests = mockTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesExam = examFilter === 'all' || test.exam === examFilter
    const matchesSubject = subjectFilter === 'all' || test.subject === subjectFilter
    
    return matchesSearch && matchesExam && matchesSubject
  })

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
    return `${minutes}m`
  }

  const uniqueExams = [...new Set(mockTests.map(test => test.exam))]
  const uniqueSubjects = [...new Set(mockTests.map(test => test.subject))]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mock Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice with our comprehensive mock tests designed to help you excel in BPSC Teacher and STET examinations.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Exam Filter */}
            <Select value={examFilter} onValueChange={setExamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {uniqueExams.map(exam => (
                  <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Subject Filter */}
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {uniqueSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTests.length} of {mockTests.length} tests
          </p>
        </div>

        {/* Mock Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-bpsc-600 text-white">{test.exam}</Badge>
                      <Badge variant="outline">{test.subject}</Badge>
                      {test.isFeatured && (
                        <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {test.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Test Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{formatDuration(test.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{test.questions} questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{test.attempts.toLocaleString()} attempts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{test.rating}</span>
                  </div>
                </div>
                  
                  {/* Action Button */}
                  <Button asChild className="w-full bg-bpsc-600 hover:bg-bpsc-700">
                    <Link href={`/${locale}/mock-tests/${test.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Test
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
                    </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tests found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('')
                setExamFilter('all')
                setSubjectFilter('all')
              }}
            >
              Clear Filters
                  </Button>
          </div>
        )}
      </div>
    </div>
  )
}

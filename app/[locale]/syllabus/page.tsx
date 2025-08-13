'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clock, Target, ExternalLink, Download, Search, Loader2 } from 'lucide-react'
import { fetchSyllabus, Syllabus, SyllabusTopic } from '@/lib/mock-data'

const availableStreams = [
  'Computer Science',
  'Mathematics', 
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'History',
  'Geography',
  'Economics',
  'Political Science',
  'Commerce'
]

export default function SyllabusPage() {
  const t = useTranslations('common')
  const [selectedStream, setSelectedStream] = useState<string>('')
  const [syllabus, setSyllabus] = useState<Syllabus[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (selectedStream) {
      loadSyllabus(selectedStream)
    }
  }, [selectedStream])

  const loadSyllabus = async (stream: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const syllabusData = await fetchSyllabus(stream)
      if (syllabusData) {
        setSyllabus(syllabusData)
      } else {
        setError('Syllabus not available for this stream. Please try another stream.')
      }
    } catch (error) {
      console.error('Error loading syllabus:', error)
      setError('Failed to load syllabus. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTopics = syllabus.length > 0 ? syllabus[0].topics.filter(topic => 
    topic.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.subtopics.some(subtopic => 
      subtopic.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              BPSC Teacher Exam Syllabus
            </h1>
            <p className="text-lg text-gray-600">
              Comprehensive syllabus for all streams with detailed topics and weightage
            </p>
          </div>

          {/* Stream Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Select Your Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Stream
                  </label>
                  <Select value={selectedStream} onValueChange={setSelectedStream}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a stream..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStreams.map((stream) => (
                        <SelectItem key={stream} value={stream}>
                          {stream}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {syllabus.length > 0 && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Duration: {syllabus[0].duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Total Marks: {syllabus[0].totalMarks}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card className="mb-8">
              <CardContent className="py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-bpsc-600" />
                  <p className="text-gray-600">Loading syllabus for {selectedStream}...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="mb-8 border-red-200">
              <CardContent className="py-8">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={() => loadSyllabus(selectedStream)}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Syllabus Content */}
          {syllabus.length > 0 && !isLoading && (
            <>
              {/* Search Topics */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search topics or subtopics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bpsc-500 focus:border-transparent"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Syllabus Overview */}
              <Card className="mb-8">
                <CardHeader className="bg-gradient-to-r from-bpsc-50 to-blue-50">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      {syllabus[0].stream} Syllabus Overview
                    </span>
                    <Badge variant="secondary" className="text-sm">
                      Source: {syllabus[0].source}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{syllabus[0].totalMarks}</div>
                      <div className="text-sm text-gray-600">Total Marks</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{syllabus[0].duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{syllabus[0].topics.length}</div>
                      <div className="text-sm text-gray-600">Main Topics</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Topics */}
              <div className="space-y-6">
                {filteredTopics.map((topic, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <div className="w-8 h-8 bg-bpsc-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </div>
                          {topic.topic}
                        </span>
                        {topic.weightage && (
                          <Badge className="bg-bpsc-100 text-bpsc-800">
                            {topic.weightage}
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {topic.description}
                      </p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Subtopics:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {topic.subtopics.map((subtopic, subIndex) => (
                            <div
                              key={subIndex}
                              className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="w-2 h-2 bg-bpsc-600 rounded-full"></div>
                              <span className="text-sm text-gray-700">{subtopic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {filteredTopics.length === 0 && searchQuery && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No topics found matching "{searchQuery}"
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery('')}
                      className="mt-4"
                    >
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <Card className="mt-8">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>View Official Syllabus</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Practice Questions</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Stream Selection Guide */}
          {!selectedStream && (
            <Card>
              <CardHeader>
                <CardTitle>How to Choose Your Stream</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableStreams.slice(0, 6).map((stream) => (
                    <div
                      key={stream}
                      className="p-4 border border-gray-200 rounded-lg hover:border-bpsc-300 hover:bg-bpsc-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedStream(stream)}
                    >
                      <h3 className="font-semibold text-gray-800 mb-2">{stream}</h3>
                      <p className="text-sm text-gray-600">
                        Click to view detailed syllabus for {stream}
                      </p>
                    </div>
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

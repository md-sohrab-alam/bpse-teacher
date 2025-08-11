'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ExternalLink, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'

interface NewsPageProps {
  params: { locale: string }
}

export default function NewsPage({ params: { locale } }: NewsPageProps) {
  const t = useTranslations('news')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const newsItems = [
    {
      id: 1,
      title: 'STET 2024 Application Form Released',
      titleHi: 'एसटीईटी 2024 आवेदन फॉर्म जारी',
      description: 'The application form for STET 2024 has been released. Candidates can apply online from March 1, 2024.',
      descriptionHi: 'एसटीईटी 2024 के लिए आवेदन फॉर्म जारी किया गया है। उम्मीदवार 1 मार्च 2024 से ऑनलाइन आवेदन कर सकते हैं।',
      sourceUrl: 'https://bseb.org.in/stet-2024',
      tag: 'Application',
      examKey: 'STET',
      publishedAt: '2024-03-01',
      isLatest: true
    },
    {
      id: 2,
      title: 'BPSC Teacher Admit Card 2024',
      titleHi: 'बीपीएससी शिक्षक प्रवेश पत्र 2024',
      description: 'Admit cards for BPSC Teacher recruitment 2024 are now available for download.',
      descriptionHi: 'बीपीएससी शिक्षक भर्ती 2024 के लिए प्रवेश पत्र अब डाउनलोड के लिए उपलब्ध हैं।',
      sourceUrl: 'https://bpsc.bih.nic.in/teacher-2024',
      tag: 'Admit Card',
      examKey: 'BPSC_TEACHER',
      publishedAt: '2024-06-01',
      isLatest: false
    },
    {
      id: 3,
      title: 'STET 2023 Result Declared',
      titleHi: 'एसटीईटी 2023 परिणाम घोषित',
      description: 'The result for STET 2023 has been declared. Check your result on the official website.',
      descriptionHi: 'एसटीईटी 2023 का परिणाम घोषित किया गया है। आधिकारिक वेबसाइट पर अपना परिणाम देखें।',
      sourceUrl: 'https://bseb.org.in/stet-2023-result',
      tag: 'Result',
      examKey: 'STET',
      publishedAt: '2024-02-15',
      isLatest: false
    },
    {
      id: 4,
      title: 'BPSC Teacher Recruitment 2024 Notice',
      titleHi: 'बीपीएससी शिक्षक भर्ती 2024 सूचना',
      description: 'BPSC has released the official notification for Teacher recruitment 2024 with detailed vacancy information.',
      descriptionHi: 'बीपीएससी ने विस्तृत रिक्ति जानकारी के साथ शिक्षक भर्ती 2024 की आधिकारिक सूचना जारी की है।',
      sourceUrl: 'https://bpsc.bih.nic.in/teacher-notice-2024',
      tag: 'Notice',
      examKey: 'BPSC_TEACHER',
      publishedAt: '2024-04-01',
      isLatest: false
    },
    {
      id: 5,
      title: 'STET 2024 Exam Date Announced',
      titleHi: 'एसटीईटी 2024 परीक्षा तिथि घोषित',
      description: 'BSEB has announced the exam date for STET 2024. The examination will be held on June 15, 2024.',
      descriptionHi: 'बीएसईबी ने एसटीईटी 2024 की परीक्षा तिथि घोषित की है। परीक्षा 15 जून 2024 को आयोजित की जाएगी।',
      sourceUrl: 'https://bseb.org.in/stet-2024-date',
      tag: 'Notice',
      examKey: 'STET',
      publishedAt: '2024-02-20',
      isLatest: false
    },
    {
      id: 6,
      title: 'BPSC Teacher Cut-off Marks 2023',
      titleHi: 'बीपीएससी शिक्षक कट-ऑफ अंक 2023',
      description: 'BPSC has released the cut-off marks for Teacher recruitment 2023. Check category-wise cut-offs.',
      descriptionHi: 'बीपीएससी ने शिक्षक भर्ती 2023 के लिए कट-ऑफ अंक जारी किए हैं। श्रेणी-वार कट-ऑफ देखें।',
      sourceUrl: 'https://bpsc.bih.nic.in/teacher-cutoff-2023',
      tag: 'Result',
      examKey: 'BPSC_TEACHER',
      publishedAt: '2024-01-30',
      isLatest: false
    }
  ]

  const filters = [
    { value: 'all', label: t('filters.all') },
    { value: 'stet', label: t('filters.stet') },
    { value: 'bpsc', label: t('filters.bpsc') },
    { value: 'application', label: t('filters.application') },
    { value: 'admitCard', label: t('filters.admitCard') },
    { value: 'result', label: t('filters.result') },
    { value: 'notice', label: t('filters.notice') }
  ]

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Application':
        return 'bg-green-100 text-green-800'
      case 'Admit Card':
        return 'bg-blue-100 text-blue-800'
      case 'Result':
        return 'bg-orange-100 text-orange-800'
      case 'Notice':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getExamColor = (examKey: string) => {
    return examKey === 'STET' ? 'bg-stet-100 text-stet-800' : 'bg-bpsc-100 text-bpsc-800'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'stet' && item.examKey === 'STET') ||
                         (selectedFilter === 'bpsc' && item.examKey === 'BPSC_TEACHER') ||
                         (selectedFilter === 'application' && item.tag === 'Application') ||
                         (selectedFilter === 'admitCard' && item.tag === 'Admit Card') ||
                         (selectedFilter === 'result' && item.tag === 'Result') ||
                         (selectedFilter === 'notice' && item.tag === 'Notice')
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news and notifications about STET and BPSC Teacher recruitment exams.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                {filters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Latest News Highlight */}
        {filteredNews.filter(item => item.isLatest).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest News</h2>
            {filteredNews.filter(item => item.isLatest).map((item) => (
              <Card key={item.id} className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-green-600 text-white">Latest</Badge>
                        <Badge className={getExamColor(item.examKey)}>{item.examKey}</Badge>
                        <Badge className={getTagColor(item.tag)}>{item.tag}</Badge>
                      </div>
                      <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {item.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href={item.sourceUrl} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* All News */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.filter(item => !item.isLatest).map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex space-x-2">
                      <Badge className={getExamColor(item.examKey)}>{item.examKey}</Badge>
                      <Badge className={getTagColor(item.tag)}>{item.tag}</Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={item.sourceUrl} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No news found</h3>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setSelectedFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-bpsc-600 to-stet-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Stay Updated</CardTitle>
              <CardDescription className="text-blue-100">
                Get notified about the latest exam updates and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                />
                <Button className="bg-white text-bpsc-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, Calculator, FileText, TrendingUp, Users, Star, Award, Clock, ExternalLink, RefreshCw, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Search as SearchComponent } from '@/components/search'
import { fetchLatestExamUpdates, ExamUpdate } from '@/lib/mock-data'

interface HomePageProps {
  params: { locale: string }
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations('home')
  const navT = useTranslations('navigation')
  const [stats, setStats] = useState({
    participants: 5000,
    rating: 4.2,
    testsTaken: 15000,
    successRate: 78
  })
  const [latestUpdates, setLatestUpdates] = useState<ExamUpdate[]>([])
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    // Update stats every 30 seconds to make it look dynamic
    const updateStats = () => {
      const timeVariation = Math.floor(Date.now() / 30000) % 1000
      const baseParticipants = 5000
      const baseTests = 15000
      
      setStats({
        participants: baseParticipants + timeVariation,
        rating: 4.2 + (Math.random() * 0.3), // Between 4.2 and 4.5
        testsTaken: baseTests + (timeVariation * 2),
        successRate: 78 + (Math.random() * 5) // Between 78 and 83
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Load latest updates
  useEffect(() => {
    loadLatestUpdates()
  }, [])

  const loadLatestUpdates = async () => {
    setIsLoadingUpdates(true)
    try {
      const updates = await fetchLatestExamUpdates()
      setLatestUpdates(updates.slice(0, 3)) // Show only 3 latest updates on home page
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error loading latest updates:', error)
    } finally {
      setIsLoadingUpdates(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notification':
        return 'bg-blue-100 text-blue-800'
      case 'news':
        return 'bg-green-100 text-green-800'
      case 'update':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bpsc-600 to-stet-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('hero.subtitle')}
            </p>
            
            {/* AI-Powered Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <SearchComponent
                locale={locale}
                placeholder={t('hero.searchPlaceholder')}
                className="w-full"
                showFilters={false}
                onResultClick={(result) => {
                  // Handle search result clicks
                  // You can add navigation logic here based on result type
                }}
              />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 mr-2" />
                  <span className="text-2xl font-bold">{stats.participants.toLocaleString()}+</span>
                </div>
                <p className="text-sm text-blue-100">{t('stats.activeParticipants')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 mr-2 text-yellow-300" />
                  <span className="text-2xl font-bold">{stats.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-blue-100">{t('stats.userRating')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 mr-2" />
                  <span className="text-2xl font-bold">{stats.testsTaken.toLocaleString()}+</span>
                </div>
                <p className="text-sm text-blue-100">{t('stats.testsTaken')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 mr-2 text-yellow-300" />
                  <span className="text-2xl font-bold">{stats.successRate}%</span>
                </div>
                <p className="text-sm text-blue-100">{t('stats.successRate')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* STET Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="bg-gradient-to-r from-stet-50 to-stet-100">
                                 <div className="flex items-center justify-between">
                   <CardTitle className="text-2xl text-stet-800">{t('examCards.stet.title')}</CardTitle>
                   <div className="bg-stet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                     {t('examCards.stet.latestUpdate')}
                   </div>
                 </div>
                 <CardDescription className="text-stet-700">
                   {t('examCards.stet.description')}
                 </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                                 <p className="text-gray-600 mb-4">
                   The Secondary Teacher Eligibility Test (STET) is conducted by the Bihar School Examination Board (BSEB) 
                   to determine the eligibility of candidates for appointment as teachers in secondary schools.
                 </p>
                 <div className="flex space-x-3">
                   <Button variant="stet" asChild>
                     <Link href={`/${locale}/stet`}>{t('buttons.learnMore')}</Link>
                   </Button>
                   <Button variant="outline" asChild>
                     <Link href={`/${locale}/eligibility`}>{t('quickLinks.eligibility')}</Link>
                   </Button>
                 </div>
              </CardContent>
            </Card>

            {/* BPSC Teacher Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="bg-gradient-to-r from-bpsc-50 to-bpsc-100">
                                 <div className="flex items-center justify-between">
                   <CardTitle className="text-2xl text-bpsc-800">{t('examCards.bpsc.title')}</CardTitle>
                   <div className="bg-bpsc-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                     {t('examCards.bpsc.latestUpdate')}
                   </div>
                 </div>
                 <CardDescription className="text-bpsc-700">
                   {t('examCards.bpsc.description')}
                 </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                                 <p className="text-gray-600 mb-4">
                   BPSC conducts teacher recruitment for various subjects and levels in government schools 
                   across Bihar. This is a direct recruitment process for permanent positions.
                 </p>
                 <div className="flex space-x-3">
                   <Button variant="bpsc" asChild>
                     <Link href={`/${locale}/bpsc-teacher`}>{t('buttons.learnMore')}</Link>
                   </Button>
                   <Button variant="outline" asChild>
                     <Link href={`/${locale}/eligibility`}>{t('quickLinks.eligibility')}</Link>
                   </Button>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl font-bold text-center mb-12">{t('quickLinks.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href={`/${locale}/eligibility`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-bpsc-600" />
                                     <h3 className="text-lg font-semibold mb-2">{t('quickLinks.eligibility')}</h3>
                   <p className="text-gray-600 text-sm">Verify your eligibility for both exams</p>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${locale}/syllabus`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-stet-600" />
                                     <h3 className="text-lg font-semibold mb-2">{t('quickLinks.syllabus')}</h3>
                   <p className="text-gray-600 text-sm">Complete syllabus for all subjects</p>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${locale}/cutoff`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-600" />
                                     <h3 className="text-lg font-semibold mb-2">{t('quickLinks.cutoff')}</h3>
                   <p className="text-gray-600 text-sm">Historical cut-off data and trends</p>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${locale}/mock-tests`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                                     <h3 className="text-lg font-semibold mb-2">{t('quickLinks.mockTests')}</h3>
                   <p className="text-gray-600 text-sm">Practice with our mock tests</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
                         <h2 className="text-3xl font-bold">{t('latestUpdates.title')}</h2>
            <div className="flex items-center space-x-4">
              <Button
                onClick={loadLatestUpdates}
                disabled={isLoadingUpdates}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingUpdates ? 'animate-spin' : ''}`} />
                                 <span>{t('buttons.refresh')}</span>
              </Button>
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {formatDate(lastUpdated.toISOString())}
                </p>
              )}
            </div>
          </div>

          {isLoadingUpdates ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-bpsc-600" />
                             <p className="text-gray-600">{t('common.loading')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {latestUpdates.map((update, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getTypeColor(update.type)}>
                        {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(update.date)}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>Source: {update.source}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {update.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={update.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                                                     {t('buttons.readFullArticle')}
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/${locale}/news`}>
                                                     {t('buttons.viewAllNews')}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* View All News Button */}
          <div className="text-center mt-8">
            <Button asChild>
              <Link href={`/${locale}/news`}>
                                 {t('buttons.viewAllUpdates')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
                             <h3 className="text-lg font-semibold mb-4">{navT('bpscTeacher')}</h3>
               <p className="text-gray-400 text-sm">
                 {t('footer.description')}
               </p>
            </div>
            <div>
                             <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
                             <ul className="space-y-2 text-sm text-gray-400">
                 <li><Link href={`/${locale}/stet`} className="hover:text-white">STET</Link></li>
                 <li><Link href={`/${locale}/bpsc-teacher`} className="hover:text-white">BPSC Teacher</Link></li>
                 <li><Link href={`/${locale}/eligibility`} className="hover:text-white">Eligibility</Link></li>
                 <li><Link href={`/${locale}/syllabus`} className="hover:text-white">Syllabus</Link></li>
               </ul>
            </div>
            <div>
                             <h4 className="font-semibold mb-4">{t('footer.resources')}</h4>
                             <ul className="space-y-2 text-sm text-gray-400">
                 <li><Link href={`/${locale}/mock-tests`} className="hover:text-white">Mock Tests</Link></li>
                 <li><Link href={`/${locale}/cutoff`} className="hover:text-white">Cut-off Marks</Link></li>
                 <li><Link href={`/${locale}/news`} className="hover:text-white">News & Updates</Link></li>
                 <li><Link href={`/${locale}/resources`} className="hover:text-white">Downloads</Link></li>
               </ul>
            </div>
            <div>
                             <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                                 <li>{t('footer.email')}</li>
                 <li>{t('footer.phone')}</li>
                 <li>{t('footer.address')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                         <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

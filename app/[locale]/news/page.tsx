'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefreshCw, ExternalLink, Calendar, Newspaper, Bell, Loader2, AlertCircle } from 'lucide-react'
import { fetchLatestExamUpdates, ExamUpdate } from '@/lib/mock-data'

export default function NewsPage() {
  const t = useTranslations('common')
  const [updates, setUpdates] = useState<ExamUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    loadUpdates()
  }, [])

  const loadUpdates = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const latestUpdates = await fetchLatestExamUpdates()
      setUpdates(latestUpdates)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error loading updates:', error)
      setError('Failed to load latest updates. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case 'notification':
        return 'bg-red-100 text-red-800'
      case 'news':
        return 'bg-blue-100 text-blue-800'
      case 'update':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUpdates = {
    all: updates,
    notifications: updates.filter(update => update.type === 'notification'),
    news: updates.filter(update => update.type === 'news'),
    updates: updates.filter(update => update.type === 'update')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              BPSC Exam News & Updates
            </h1>
            <p className="text-lg text-gray-600">
              Latest notifications, news, and updates from official sources
            </p>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={loadUpdates}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {formatDate(lastUpdated.toISOString())}
                </p>
              )}
            </div>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Bell className="w-3 h-3" />
              <span>{updates.length} Updates</span>
            </Badge>
          </div>

          {/* Loading State */}
          {isLoading && (
            <Card className="mb-8">
              <CardContent className="py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-bpsc-600" />
                  <p className="text-gray-600">Fetching latest updates from multiple sources...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="mb-8 border-red-200">
              <CardContent className="py-8">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={loadUpdates}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Updates Content */}
          {!isLoading && !error && (
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="flex items-center space-x-2">
                  <Newspaper className="w-4 h-4" />
                  <span>All ({filteredUpdates.all.length})</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications ({filteredUpdates.notifications.length})</span>
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center space-x-2">
                  <Newspaper className="w-4 h-4" />
                  <span>News ({filteredUpdates.news.length})</span>
                </TabsTrigger>
                <TabsTrigger value="updates" className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Updates ({filteredUpdates.updates.length})</span>
                </TabsTrigger>
              </TabsList>

              {Object.entries(filteredUpdates).map(([key, updatesList]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  {updatesList.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No {key} available at the moment.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    updatesList.map((update, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2 flex items-start space-x-3">
                                <Badge className={getUpdateTypeColor(update.type)}>
                                  {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                                </Badge>
                                <span className="flex-1">{update.title}</span>
                              </CardTitle>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(update.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ExternalLink className="w-4 h-4" />
                                  <span>{update.source}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {update.content}
                          </p>
                          {update.url && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center space-x-2"
                              onClick={() => window.open(update.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Read Full Article</span>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Sources Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Information Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Official Sources</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• BPSC Official Website</li>
                    <li>• Bihar Government Portal</li>
                    <li>• Official Notifications</li>
                  </ul>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">News Sources</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Jagran Josh</li>
                    <li>• Careers360</li>
                    <li>• Adda247</li>
                  </ul>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Update Frequency</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real-time updates</li>
                    <li>• Multiple source verification</li>
                    <li>• Automatic refresh</li>
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

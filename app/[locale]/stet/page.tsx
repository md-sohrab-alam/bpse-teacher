'use client'

import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, BookOpen, Calculator, Download, ExternalLink, Bell, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface STETPageProps {
  params: { locale: string }
}

export default function STETPage({ params: { locale } }: STETPageProps) {
  const t = useTranslations('exams')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-bold text-gray-900">STET (BSEB)</h1>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Pending 2025
                  </Badge>
                </div>
              </div>
              <p className="text-xl text-gray-600">
                Secondary Teacher Eligibility Test for Bihar
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
                <TabsTrigger value="eligibility">{t('tabs.eligibility')}</TabsTrigger>
                <TabsTrigger value="dates">{t('tabs.dates')}</TabsTrigger>
                <TabsTrigger value="syllabus">{t('tabs.syllabus')}</TabsTrigger>
                <TabsTrigger value="pattern">{t('tabs.pattern')}</TabsTrigger>
                <TabsTrigger value="cutoff">{t('tabs.cutoff')}</TabsTrigger>
                <TabsTrigger value="downloads">{t('tabs.downloads')}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      The Secondary Teacher Eligibility Test (STET) is conducted by the Bihar School Examination Board (BSEB) 
                      to determine the eligibility of candidates for appointment as teachers in secondary schools.
                    </p>
                    <p className="text-gray-700">
                      STET is a qualifying examination that candidates must pass to be eligible for teaching positions 
                      in government and private schools in Bihar.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Paper I</h4>
                        <p className="text-blue-700">Primary (Classes I to V)</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Paper II</h4>
                        <p className="text-green-700">Upper Primary (Classes VI to VIII)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="eligibility" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Age Limit</h4>
                        <p className="text-gray-700">21 to 37 years (with relaxations for reserved categories)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Educational Qualification</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Graduation with at least 50% marks</li>
                          <li>B.Ed or D.El.Ed qualification</li>
                          <li>CTET or STET qualification</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Nationality</h4>
                        <p className="text-gray-700">Indian citizen</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dates" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Important Dates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-semibold">Application Start Date</p>
                            <p className="text-sm text-gray-600">March 1, 2024</p>
                          </div>
                        </div>
                        <Badge variant="outline">Open</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-yellow-600" />
                          <div>
                            <p className="font-semibold">Application End Date</p>
                            <p className="text-sm text-gray-600">March 31, 2024</p>
                          </div>
                        </div>
                        <Badge variant="outline">Closing Soon</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-semibold">Admit Card Release</p>
                            <p className="text-sm text-gray-600">May 15, 2024</p>
                          </div>
                        </div>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-semibold">Exam Date</p>
                            <p className="text-sm text-gray-600">June 15, 2024</p>
                          </div>
                        </div>
                        <Badge variant="outline">Important</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="syllabus" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Syllabus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Paper I (Primary - Classes I to V)</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded">
                            <h5 className="font-medium">Child Development and Pedagogy (30 Questions)</h5>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              <li>• Child Development (Primary School Child)</li>
                              <li>• Concept of Inclusive education and understanding children with special needs</li>
                              <li>• Learning and Pedagogy</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h5 className="font-medium">Language I (30 Questions)</h5>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              <li>• Language Comprehension</li>
                              <li>• Pedagogy of Language Development</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h5 className="font-medium">Mathematics (30 Questions)</h5>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              <li>• Content</li>
                              <li>• Pedagogical issues</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pattern" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Pattern</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Paper I</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Duration: 2.5 hours</li>
                            <li>• Total Questions: 150</li>
                            <li>• Total Marks: 150</li>
                            <li>• Negative Marking: No</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-2">Paper II</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Duration: 2.5 hours</li>
                            <li>• Total Questions: 150</li>
                            <li>• Total Marks: 150</li>
                            <li>• Negative Marking: No</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Question Types</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Multiple Choice Questions (MCQs)</li>
                          <li>• Objective type questions</li>
                          <li>• All questions carry equal marks</li>
                          <li>• No negative marking for wrong answers</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cutoff" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cut-off Marks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Pass Marks</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Cut-off (2023)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">UR</td>
                              <td className="border border-gray-300 px-4 py-2">60%</td>
                              <td className="border border-gray-300 px-4 py-2">85.5%</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">OBC</td>
                              <td className="border border-gray-300 px-4 py-2">60%</td>
                              <td className="border border-gray-300 px-4 py-2">82.3%</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">SC</td>
                              <td className="border border-gray-300 px-4 py-2">60%</td>
                              <td className="border border-gray-300 px-4 py-2">78.9%</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">ST</td>
                              <td className="border border-gray-300 px-4 py-2">60%</td>
                              <td className="border border-gray-300 px-4 py-2">75.2%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="downloads" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Downloads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-semibold">STET 2024 Official Notification</p>
                            <p className="text-sm text-gray-600">PDF • 2.3 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-semibold">STET 2024 Application Form</p>
                            <p className="text-sm text-gray-600">PDF • 1.8 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-semibold">STET Syllabus 2024</p>
                            <p className="text-sm text-gray-600">PDF • 3.1 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="stet" asChild>
                    <Link href="/eligibility">
                      <Calculator className="w-4 h-4 mr-2" />
                      {t('sidebar.checkEligibility')}
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="https://bseb.org.in" target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('sidebar.officialLink')}
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    {t('sidebar.setReminder')}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Latest Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 rounded">
                    <p className="text-sm font-medium text-green-800">Application Open</p>
                    <p className="text-xs text-green-600">March 1 - March 31, 2024</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium text-blue-800">Admit Card</p>
                    <p className="text-xs text-blue-600">Available from May 15, 2024</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Important Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/mock-tests" className="block text-sm text-blue-600 hover:underline">
                    Take Mock Test
                  </Link>
                  <Link href="/syllabus" className="block text-sm text-blue-600 hover:underline">
                    View Syllabus
                  </Link>
                  <Link href="/cutoff" className="block text-sm text-blue-600 hover:underline">
                    Check Cut-off
                  </Link>
                  <Link href="/news" className="block text-sm text-blue-600 hover:underline">
                    Latest News
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, BookOpen, Calculator, ExternalLink, Bell, AlertTriangle } from 'lucide-react'
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
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Bell className="w-4 h-4 mr-1" />
                    {locale === 'hi' ? '2025 में अपेक्षित' : 'Expected 2025'}
                  </Badge>
                </div>
              </div>
              <p className="text-xl text-gray-600">
                {locale === 'hi' ? 'बिहार के लिए माध्यमिक शिक्षक पात्रता परीक्षा' : 'Secondary Teacher Eligibility Test for Bihar'}
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
                <TabsTrigger value="eligibility">{t('tabs.eligibility')}</TabsTrigger>
                <TabsTrigger value="dates">{t('tabs.dates')}</TabsTrigger>
                <TabsTrigger value="syllabus">{t('tabs.syllabus')}</TabsTrigger>
                <TabsTrigger value="pattern">{t('tabs.pattern')}</TabsTrigger>
                <TabsTrigger value="cutoff">{t('tabs.cutoff')}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('tabs.overview')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      {locale === 'hi' 
                        ? 'माध्यमिक शिक्षक पात्रता परीक्षा (STET) बिहार विद्यालय परीक्षा समिति (BSEB) द्वारा बिहार के माध्यमिक विद्यालयों में शिक्षकों की नियुक्ति के लिए उम्मीदवारों की पात्रता निर्धारित करने के लिए आयोजित की जाती है।'
                        : 'The Secondary Teacher Eligibility Test (STET) is conducted by the Bihar School Examination Board (BSEB) to determine the eligibility of candidates for appointment as teachers in secondary schools across Bihar.'
                      }
                    </p>
                    <p className="text-gray-700">
                      {locale === 'hi'
                        ? 'STET एक योग्यता परीक्षा है जो उम्मीदवारों को बिहार में सरकारी और निजी स्कूलों में शिक्षण पदों के लिए पात्र होने के लिए पास करनी होगी। प्रमाणपत्र जीवन भर के लिए मान्य है।'
                        : 'STET is a qualifying examination that candidates must pass to be eligible for teaching positions in government and private schools in Bihar. The certificate is valid for a lifetime.'
                      }
                    </p>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        {locale === 'hi' ? 'नवीनतम अपडेट (2025)' : 'Latest Update (2025)'}
                      </h4>
                      <p className="text-yellow-700 text-sm">
                        {locale === 'hi'
                          ? 'STET 2024 के परिणाम नवंबर 2024 में घोषित किए गए थे। 4,23,822 उम्मीदवारों में से 2,97,747 (70.25%) सफल रहे। STET 2025 की अधिसूचना TRE-4 रिक्तियों के बाद जारी होने की उम्मीद है।'
                          : 'STET 2024 results were declared in November 2024. Out of 423,822 candidates, 297,747 (70.25%) were successful. STET 2025 notification is expected after TRE-4 vacancies are released.'
                        }
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          {locale === 'hi' ? 'पेपर I' : 'Paper I'}
                        </h4>
                        <p className="text-blue-700 mb-2">
                          {locale === 'hi' ? 'कक्षा 9-10' : 'Classes 9-10'}
                        </p>
                        <ul className="text-sm text-blue-600 space-y-1">
                          <li>• {locale === 'hi' ? 'बाल विकास और शिक्षाशास्त्र' : 'Child Development & Pedagogy'}</li>
                          <li>• {locale === 'hi' ? 'भाषा I और II' : 'Language I & II'}</li>
                          <li>• {locale === 'hi' ? 'गणित' : 'Mathematics'}</li>
                          <li>• {locale === 'hi' ? 'विज्ञान' : 'Science'}</li>
                          <li>• {locale === 'hi' ? 'सामाजिक अध्ययन' : 'Social Studies'}</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">
                          {locale === 'hi' ? 'पेपर II' : 'Paper II'}
                        </h4>
                        <p className="text-green-700 mb-2">
                          {locale === 'hi' ? 'कक्षा 11-12' : 'Classes 11-12'}
                        </p>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>• {locale === 'hi' ? 'बाल विकास और शिक्षाशास्त्र' : 'Child Development & Pedagogy'}</li>
                          <li>• {locale === 'hi' ? 'भाषा I और II' : 'Language I & II'}</li>
                          <li>• {locale === 'hi' ? 'विषय-विशिष्ट सामग्री' : 'Subject-specific content'}</li>
                          <li>• {locale === 'hi' ? 'उन्नत शिक्षाशास्त्र' : 'Advanced pedagogy'}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="eligibility" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('tabs.eligibility')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {locale === 'hi' ? 'आयु सीमा' : 'Age Limit'}
                          </h4>
                          <p className="text-gray-700">
                            {locale === 'hi' ? '21 से 37 वर्ष (आरक्षित श्रेणियों के लिए छूट के साथ)' : '21 to 37 years (with relaxations for reserved categories)'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {locale === 'hi' ? 'शैक्षिक योग्यता' : 'Educational Qualification'}
                          </h4>
                          <ul className="text-gray-700 space-y-1 mt-1">
                            <li className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{locale === 'hi' ? 'कम से कम 50% अंकों के साथ स्नातक' : 'Graduation with at least 50% marks'}</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{locale === 'hi' ? 'बी.एड या डी.एल.एड योग्यता' : 'B.Ed or D.El.Ed qualification'}</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{locale === 'hi' ? 'सीटीईटी या एसटीईटी योग्यता' : 'CTET or STET qualification'}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {locale === 'hi' ? 'राष्ट्रीयता' : 'Nationality'}
                          </h4>
                          <p className="text-gray-700">
                            {locale === 'hi' ? 'भारतीय नागरिक' : 'Indian citizen'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        {locale === 'hi' ? 'महत्वपूर्ण नोट' : 'Important Note'}
                      </h4>
                      <p className="text-yellow-700 text-sm">
                        {locale === 'hi'
                          ? 'पात्रता मानदंड आधिकारिक STET 2025 अधिसूचना में अपडेट किए जा सकते हैं। कृपया सबसे वर्तमान जानकारी के लिए आधिकारिक BSEB वेबसाइट जांचें।'
                          : 'Eligibility criteria may be updated in the official STET 2025 notification. Please check the official BSEB website for the most current information.'
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dates" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('tabs.dates')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Bell className="w-5 h-5 text-gray-600" />
                          <h4 className="font-semibold text-gray-800">
                            {locale === 'hi' ? 'STET 2025 समयसीमा' : 'STET 2025 Timeline'}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {locale === 'hi'
                            ? 'STET 2024 के परिणाम घोषित हो चुके हैं। STET 2025 की अधिसूचना TRE-4 रिक्तियों के बाद जारी होने की उम्मीद है। निम्नलिखित तिथियां अनुमानित हैं।'
                            : 'STET 2024 results have been declared. STET 2025 notification is expected after TRE-4 vacancies are released. The following dates are tentative.'
                          }
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-semibold">
                              {locale === 'hi' ? 'अधिसूचना जारी' : 'Notification Release'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {locale === 'hi' ? 'अपेक्षित: TRE-4 के बाद' : 'Expected: After TRE-4'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">
                          {locale === 'hi' ? 'अपेक्षित' : 'Expected'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-semibold">
                              {locale === 'hi' ? 'आवेदन अवधि' : 'Application Period'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {locale === 'hi' ? 'अपेक्षित: TRE-4 के बाद' : 'Expected: After TRE-4'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          {locale === 'hi' ? 'अपेक्षित' : 'Expected'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-yellow-600" />
                          <div>
                            <p className="font-semibold">
                              {locale === 'hi' ? 'प्रवेश पत्र जारी' : 'Admit Card Release'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {locale === 'hi' ? 'अपेक्षित: TRE-4 के बाद' : 'Expected: After TRE-4'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                          {locale === 'hi' ? 'अपेक्षित' : 'Expected'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-semibold">
                              {locale === 'hi' ? 'परीक्षा तिथि' : 'Exam Date'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {locale === 'hi' ? 'अपेक्षित: TRE-4 के बाद' : 'Expected: After TRE-4'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-red-100 text-red-700">
                          {locale === 'hi' ? 'अपेक्षित' : 'Expected'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-semibold">
                              {locale === 'hi' ? 'परिणाम घोषणा' : 'Result Declaration'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {locale === 'hi' ? 'अपेक्षित: TRE-4 के बाद' : 'Expected: After TRE-4'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">
                          {locale === 'hi' ? 'अपेक्षित' : 'Expected'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="syllabus" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('tabs.syllabus')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">
                          {locale === 'hi' ? 'पेपर I (कक्षा 9-10)' : 'Paper I (Classes 9-10)'}
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded">
                            <h5 className="font-medium">
                              {locale === 'hi' ? 'बाल विकास और शिक्षाशास्त्र (शिक्षण क्षमता) (30 प्रश्न)' : 'Child Development and Pedagogy (Teaching Ability) (30 Questions)'}
                            </h5>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              <li>• {locale === 'hi' ? 'शिक्षार्थियों का विकास और वृद्धि' : 'Growth and development of learners'}</li>
                              <li>• {locale === 'hi' ? 'सीखने के सिद्धांत और उनका अनुप्रयोग' : 'Learning theories and their application'}</li>
                              <li>• {locale === 'hi' ? 'शिक्षण पद्धतियां और तकनीकें' : 'Teaching methodologies and techniques'}</li>
                              <li>• {locale === 'hi' ? 'कक्षा प्रबंधन और अनुशासन' : 'Classroom management and discipline'}</li>
                              <li>• {locale === 'hi' ? 'शैक्षिक मनोविज्ञान के सिद्धांत' : 'Educational psychology principles'}</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h5 className="font-medium">
                              {locale === 'hi' ? 'संबंधित विषय (उम्मीदवार द्वारा चुना गया कोई एक) (120 प्रश्न)' : 'Subject Concerned (Any one chosen by candidate) (120 Questions)'}
                            </h5>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              <li>• {locale === 'hi' ? 'हिंदी: व्याकरण, साहित्य, समझ, लेखन कौशल' : 'Hindi: Grammar, Literature, Comprehension, Writing Skills'}</li>
                              <li>• {locale === 'hi' ? 'अंग्रेजी: व्याकरण, शब्दावली, साहित्य, समझ' : 'English: Grammar, Vocabulary, Literature, Comprehension'}</li>
                              <li>• {locale === 'hi' ? 'गणित: संख्या प्रणाली, बीजगणित, ज्यामिति, क्षेत्रमिति, सांख्यिकी' : 'Mathematics: Number System, Algebra, Geometry, Mensuration, Statistics'}</li>
                              <li>• {locale === 'hi' ? 'विज्ञान: भौतिकी, रसायन विज्ञान, जीव विज्ञान, पर्यावरण' : 'Science: Physics, Chemistry, Biology, Environment'}</li>
                              <li>• {locale === 'hi' ? 'सामाजिक विज्ञान: इतिहास, भूगोल, नागरिक शास्त्र, अर्थशास्त्र' : 'Social Science: History, Geography, Civics, Economics'}</li>
                              <li>• {locale === 'hi' ? 'अन्य विषय: संस्कृत, उर्दू, आदि, चुनी गई विशेषज्ञता के आधार पर' : 'Other subjects: Sanskrit, Urdu, etc., based on the chosen specialization'}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-3">
                          {locale === 'hi' ? 'पेपर II (कक्षा 11-12)' : 'Paper II (Classes 11-12)'}
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded">
                            <h5 className="font-medium">
                              {locale === 'hi' ? 'बाल विकास और शिक्षाशास्त्र (शिक्षण क्षमता) (30 प्रश्न)' : 'Child Development and Pedagogy (Teaching Ability) (30 Questions)'}
                            </h5>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              <li>• {locale === 'hi' ? 'शिक्षार्थी विकास (किशोर)' : 'Learner development (adolescents)'}</li>
                              <li>• {locale === 'hi' ? 'शिक्षण के सिद्धांत' : 'Principles of teaching'}</li>
                              <li>• {locale === 'hi' ? 'पाठ्यक्रम और पाठ्यक्रम योजना' : 'Curriculum and syllabus planning'}</li>
                              <li>• {locale === 'hi' ? 'शैक्षिक मूल्यांकन' : 'Educational evaluation'}</li>
                              <li>• {locale === 'hi' ? 'कक्षा संपर्क और संचार रणनीतियां' : 'Classroom interaction and communication strategies'}</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h5 className="font-medium">
                              {locale === 'hi' ? 'संबंधित विषय (उम्मीदवार द्वारा चुना गया कोई एक) (120 प्रश्न)' : 'Subject Concerned (Any one chosen by candidate) (120 Questions)'}
                            </h5>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              <li>• {locale === 'hi' ? 'हिंदी: उन्नत व्याकरण, गद्य, कविता, नाटक' : 'Hindi: Advanced grammar, Prose, Poetry, Drama'}</li>
                              <li>• {locale === 'hi' ? 'अंग्रेजी: साहित्य, व्याकरण, रचना, ध्वनि विज्ञान' : 'English: Literature, Grammar, Composition, Phonetics'}</li>
                              <li>• {locale === 'hi' ? 'गणित: समुच्चय, संबंध, फलन, कैलकुलस, सांख्यिकी, प्रायिकता' : 'Mathematics: Sets, Relations, Functions, Calculus, Statistics, Probability'}</li>
                              <li>• {locale === 'hi' ? 'भौतिकी: यांत्रिकी, ऊष्मागतिकी, विद्युत चुंबकत्व, आधुनिक भौतिकी' : 'Physics: Mechanics, Thermodynamics, Electromagnetism, Modern Physics'}</li>
                              <li>• {locale === 'hi' ? 'रसायन विज्ञान: भौतिक रसायन, कार्बनिक रसायन, अकार्बनिक रसायन' : 'Chemistry: Physical Chemistry, Organic Chemistry, Inorganic Chemistry'}</li>
                              <li>• {locale === 'hi' ? 'जीव विज्ञान: आनुवंशिकी, पारिस्थितिकी, मानव शरीर विज्ञान, जैव प्रौद्योगिकी' : 'Biology: Genetics, Ecology, Human Physiology, Biotechnology'}</li>
                              <li>• {locale === 'hi' ? 'वाणिज्य: लेखाशास्त्र, व्यवसाय अध्ययन, अर्थशास्त्र' : 'Commerce: Accountancy, Business Studies, Economics'}</li>
                              <li>• {locale === 'hi' ? 'सामाजिक विज्ञान: इतिहास, राजनीति विज्ञान, भूगोल, समाजशास्त्र' : 'Social Science: History, Political Science, Geography, Sociology'}</li>
                              <li>• {locale === 'hi' ? 'कंप्यूटर विज्ञान: प्रोग्रामिंग, नेटवर्किंग, डेटा संरचनाएं' : 'Computer Science: Programming, Networking, Data Structures'}</li>
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
                    <CardTitle>{t('tabs.pattern')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">
                            {locale === 'hi' ? 'पेपर I' : 'Paper I'}
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• {locale === 'hi' ? 'अवधि: 2.5 घंटे' : 'Duration: 2.5 hours'}</li>
                            <li>• {locale === 'hi' ? 'कुल प्रश्न: 150' : 'Total Questions: 150'}</li>
                            <li>• {locale === 'hi' ? 'कुल अंक: 150' : 'Total Marks: 150'}</li>
                            <li>• {locale === 'hi' ? 'नकारात्मक अंकन: नहीं' : 'Negative Marking: No'}</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-2">
                            {locale === 'hi' ? 'पेपर II' : 'Paper II'}
                          </h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• {locale === 'hi' ? 'अवधि: 2.5 घंटे' : 'Duration: 2.5 hours'}</li>
                            <li>• {locale === 'hi' ? 'कुल प्रश्न: 150' : 'Total Questions: 150'}</li>
                            <li>• {locale === 'hi' ? 'कुल अंक: 150' : 'Total Marks: 150'}</li>
                            <li>• {locale === 'hi' ? 'नकारात्मक अंकन: नहीं' : 'Negative Marking: No'}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">
                          {locale === 'hi' ? 'प्रश्न प्रकार' : 'Question Types'}
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• {locale === 'hi' ? 'बहुविकल्पीय प्रश्न (MCQs)' : 'Multiple Choice Questions (MCQs)'}</li>
                          <li>• {locale === 'hi' ? 'वस्तुनिष्ठ प्रकार के प्रश्न' : 'Objective type questions'}</li>
                          <li>• {locale === 'hi' ? 'सभी प्रश्नों के बराबर अंक' : 'All questions carry equal marks'}</li>
                          <li>• {locale === 'hi' ? 'गलत उत्तरों के लिए नकारात्मक अंकन नहीं' : 'No negative marking for wrong answers'}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cutoff" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('tabs.cutoff')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        {locale === 'hi'
                          ? 'बिहार STET पास मार्क्स उम्मीदवार की श्रेणी के आधार पर भिन्न होते हैं। उम्मीदवारों को परीक्षा के लिए योग्य होने के लिए न्यूनतम आवश्यक अंक प्राप्त करने होंगे।'
                          : 'The Bihar STET pass marks vary based on the candidate\'s category. Candidates must score the minimum required marks to qualify for the examination.'
                        }
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 text-left">
                                {locale === 'hi' ? 'श्रेणी' : 'Category'}
                              </th>
                              <th className="border border-gray-300 px-4 py-2 text-left">
                                {locale === 'hi' ? 'पास प्रतिशत' : 'Pass Percentage'}
                              </th>
                              <th className="border border-gray-300 px-4 py-2 text-left">
                                {locale === 'hi' ? 'पास मार्क्स (150 में से)' : 'Pass Marks (out of 150)'}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">
                                {locale === 'hi' ? 'सामान्य' : 'General'}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">50%</td>
                              <td className="border border-gray-300 px-4 py-2">75</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">
                                {locale === 'hi' ? 'बीसी (पिछड़ा वर्ग)' : 'BC (Backward Class)'}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">45.5%</td>
                              <td className="border border-gray-300 px-4 py-2">68.25</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">
                                {locale === 'hi' ? 'ओबीसी (अन्य पिछड़ा वर्ग)' : 'OBC (Other Backward Class)'}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">42.5%</td>
                              <td className="border border-gray-300 px-4 py-2">63.75</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">
                                {locale === 'hi' ? 'एससी/एसटी/पीडब्ल्यूडी' : 'SC/ST/PwD'}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">40%</td>
                              <td className="border border-gray-300 px-4 py-2">60</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          {locale === 'hi' ? 'महत्वपूर्ण नोट:' : 'Important Notes:'}
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• {locale === 'hi' ? 'ये पास मार्क्स पेपर I और पेपर II दोनों पर लागू होते हैं' : 'These pass marks apply to both Paper I and Paper II'}</li>
                          <li>• {locale === 'hi' ? 'उम्मीदवारों को अपनी श्रेणी के लिए कम से कम न्यूनतम अंक प्राप्त करने होंगे' : 'Candidates must score at least the minimum marks for their category'}</li>
                          <li>• {locale === 'hi' ? 'STET एक योग्यता परीक्षा है - कोई मेरिट सूची तैयार नहीं की जाती' : 'STET is a qualifying examination - no merit list is prepared'}</li>
                          <li>• {locale === 'hi' ? 'पास मार्क्स आधिकारिक अधिसूचना के आधार पर बदल सकते हैं' : 'Pass marks are subject to change based on official notification'}</li>
                        </ul>
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
                  <CardTitle className="text-lg">
                    {locale === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="stet" asChild>
                    <Link href={`/${locale}/eligibility?from=stet`}>
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
                  <CardTitle className="text-lg">
                    {locale === 'hi' ? 'नवीनतम अपडेट' : 'Latest Updates'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800">
                      {locale === 'hi' ? 'STET 2024 परिणाम' : 'STET 2024 Results'}
                    </p>
                    <p className="text-xs text-yellow-600">70.25% Pass Rate</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">
                      {locale === 'hi' ? 'STET 2025 अधिसूचना' : 'STET 2025 Notification'}
                    </p>
                    <p className="text-xs text-blue-600">After TRE-4</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-sm font-medium text-green-800">
                      {locale === 'hi' ? 'प्रमाणपत्र उपलब्ध' : 'Certificates Available'}
                    </p>
                    <p className="text-xs text-green-600">Download Now</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {locale === 'hi' ? 'महत्वपूर्ण लिंक' : 'Important Links'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/mock-tests" className="block text-sm text-blue-600 hover:underline">
                    {locale === 'hi' ? 'मॉक टेस्ट दें' : 'Take Mock Test'}
                  </Link>
                  <Link href="/syllabus" className="block text-sm text-blue-600 hover:underline">
                    {locale === 'hi' ? 'पाठ्यक्रम देखें' : 'View Syllabus'}
                  </Link>
                  <Link href="/cutoff" className="block text-sm text-blue-600 hover:underline">
                    {locale === 'hi' ? 'पास मार्क्स जांचें' : 'Check Pass Marks'}
                  </Link>
                  <Link href="/news" className="block text-sm text-blue-600 hover:underline">
                    {locale === 'hi' ? 'नवीनतम समाचार' : 'Latest News'}
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

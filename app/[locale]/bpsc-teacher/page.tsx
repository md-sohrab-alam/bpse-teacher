'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

interface BPSCTeacherPageProps {
  params: { locale: string }
}

export default function BPSCTeacherPage({ params: { locale } }: BPSCTeacherPageProps) {
  const t = useTranslations('exams.bpscTeacher');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual database queries
  const examData = {
    overview: {
      en: `The Bihar Public Service Commission (BPSC) Teacher Recruitment Examination (TRE) is a prestigious competitive exam conducted to recruit qualified teachers for government schools across Bihar. This examination is conducted in multiple phases and covers various teaching levels including Primary, Upper Primary, Secondary, and Senior Secondary positions.

**Key Features:**
• Conducted by BPSC (Bihar Public Service Commission)
• Multiple phases: Written Exam, Interview/Document Verification
• Subject-specific recruitment for different teaching positions
• Domicile preference: 84.4% posts reserved for Bihar residents
• Regular recruitment cycle with TRE-4 expected in 2025

**Teaching Levels:**
• Primary Teachers (Classes 1-5)
• Upper Primary Teachers (Classes 6-8)
• Secondary Teachers (Classes 9-10)
• Senior Secondary Teachers (Classes 11-12)`,
      hi: `बिहार लोक सेवा आयोग (BPSC) शिक्षक भर्ती परीक्षा (TRE) बिहार के सरकारी स्कूलों में योग्य शिक्षकों की भर्ती के लिए आयोजित की जाने वाली एक प्रतिष्ठित प्रतियोगी परीक्षा है। यह परीक्षा कई चरणों में आयोजित की जाती है और प्राथमिक, उच्च प्राथमिक, माध्यमिक और उच्च माध्यमिक स्तर के विभिन्न शिक्षण पदों को कवर करती है।

**मुख्य विशेषताएं:**
• BPSC (बिहार लोक सेवा आयोग) द्वारा आयोजित
• कई चरण: लिखित परीक्षा, साक्षात्कार/दस्तावेज़ सत्यापन
• विभिन्न शिक्षण पदों के लिए विषय-विशिष्ट भर्ती
• डोमिसाइल प्राथमिकता: 84.4% पद बिहार के निवासियों के लिए आरक्षित
• नियमित भर्ती चक्र, TRE-4 2025 में अपेक्षित

**शिक्षण स्तर:**
• प्राथमिक शिक्षक (कक्षा 1-5)
• उच्च प्राथमिक शिक्षक (कक्षा 6-8)
• माध्यमिक शिक्षक (कक्षा 9-10)
• उच्च माध्यमिक शिक्षक (कक्षा 11-12)`
    },
    eligibility: {
      en: `**Age Limit:** 21-37 years (relaxation for reserved categories)\n**Education:** Graduation with 50% marks and B.Ed/D.El.Ed\n**TET Requirement:** CTET/STET qualification required\n**Domicile:** Bihar domicile with 84.4% posts prioritized for locals\n**Note:** Pending 2025 notification for exact criteria`,
      hi: `**आयु सीमा:** 21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)\n**शिक्षा:** 50% अंकों के साथ स्नातक और B.Ed/D.El.Ed\n**TET आवश्यकता:** CTET/STET योग्यता आवश्यक\n**डोमिसाइल:** बिहार डोमिसाइल, 84.4% पद स्थानीय लोगों के लिए आरक्षित\n**नोट:** सटीक मानदंडों के लिए 2025 अधिसूचना लंबित`
    },
    pattern: {
      en: `**Three Parts:**\n- Language (Hindi/English)\n- General Studies (SCERT)\n- Concerned Subject\n**Total Questions:** 150\n**Duration:** 2.5 hours\n**Note:** Pattern pending 2025 official notification`,
      hi: `**तीन भाग:**\n- भाषा (हिंदी/अंग्रेजी)\n- सामान्य अध्ययन (SCERT)\n- संबंधित विषय\n**कुल प्रश्न:** 150\n**अवधि:** 2.5 घंटे\n**नोट:** पैटर्न 2025 आधिकारिक अधिसूचना लंबित`
    },
    syllabus: {
      en: `**Language Section:**\n- Hindi/English grammar and comprehension\n\n**General Studies (SCERT):**\n- Current affairs\n- Bihar-specific knowledge\n- Educational policies\n\n**Subject-specific:**\n- Based on concerned subject for the post\n\n*Note: Detailed syllabus pending 2025 notification*`,
      hi: `**भाषा खंड:**\n- हिंदी/अंग्रेजी व्याकरण और समझ\n\n**सामान्य अध्ययन (SCERT):**\n- करंट अफेयर्स\n- बिहार-विशिष्ट ज्ञान\n- शैक्षिक नीतियां\n\n**विषय-विशिष्ट:**\n- पद के अनुसार संबंधित विषय पर आधारित\n\n*नोट: विस्तृत पाठ्यक्रम 2025 अधिसूचना लंबित*`
    }
  };

  const importantDates = [
    { label: 'TRE-4 Notification', date: 'Expected: Jan 2025', status: 'expected' },
    { label: 'Application Start', date: 'Expected: Feb 2025', status: 'expected' },
    { label: 'Application End', date: 'Expected: Mar 2025', status: 'expected' },
    { label: 'Written Exam', date: 'Expected: May 2025', status: 'expected' },
    { label: 'Interview Phase', date: 'Expected: Jul 2025', status: 'expected' }
  ];

  const downloads = [
    { title: 'BPSC Teacher Syllabus', url: 'https://bpsc.bihar.gov.in/syllabus' },
    { title: 'Previous Year Papers', url: 'https://bpsc.bihar.gov.in/previous-papers' }
  ];

  const cutoffs = [
    { year: 2023, category: 'General', passMarks: '60%', cutoff: '75-85%' },
    { year: 2023, category: 'BC', passMarks: '55%', cutoff: '70-80%' },
    { year: 2023, category: 'OBC', passMarks: '52%', cutoff: '65-75%' },
    { year: 2023, category: 'SC/ST/PwD', passMarks: '50%', cutoff: '60-70%' },
    { year: 2024, category: 'General', passMarks: 'TBA', cutoff: 'TBA' },
    { year: 2024, category: 'BC', passMarks: 'TBA', cutoff: 'TBA' },
    { year: 2024, category: 'OBC', passMarks: 'TBA', cutoff: 'TBA' },
    { year: 2024, category: 'SC/ST/PwD', passMarks: 'TBA', cutoff: 'TBA' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-bpsc-600">BPSC Teacher Recruitment (TRE)</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Expected 2025
          </Badge>
        </div>
        <p className="text-gray-600 text-lg">
          बिहार लोक सेवा आयोग शिक्षक भर्ती परीक्षा (TRE) - Teacher Recruitment Examination
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="pattern">Pattern</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Overview</CardTitle>
                  <CardDescription>Complete information about BPSC Teacher Recruitment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* English Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">English</h3>
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        The Bihar Public Service Commission (BPSC) Teacher Recruitment Examination (TRE) is a prestigious competitive exam conducted to recruit qualified teachers for government schools across Bihar. This examination is conducted in multiple phases and covers various teaching levels including Primary, Upper Primary, Secondary, and Senior Secondary positions.
                      </p>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-3">Key Features</h4>
                        <ul className="space-y-2 text-blue-700">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Conducted by BPSC (Bihar Public Service Commission)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Multiple phases: Written Exam, Interview/Document Verification</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Subject-specific recruitment for different teaching positions</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Domicile preference: 84.4% posts reserved for Bihar residents</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>Regular recruitment cycle with TRE-4 expected in 2025</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-3">Teaching Levels</h4>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            <span>Primary Teachers (Classes 1-5)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            <span>Upper Primary Teachers (Classes 6-8)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            <span>Secondary Teachers (Classes 9-10)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            <span>Senior Secondary Teachers (Classes 11-12)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Hindi Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">हिंदी</h3>
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        बिहार लोक सेवा आयोग (BPSC) शिक्षक भर्ती परीक्षा (TRE) बिहार के सरकारी स्कूलों में योग्य शिक्षकों की भर्ती के लिए आयोजित की जाने वाली एक प्रतिष्ठित प्रतियोगी परीक्षा है। यह परीक्षा कई चरणों में आयोजित की जाती है और प्राथमिक, उच्च प्राथमिक, माध्यमिक और उच्च माध्यमिक स्तर के विभिन्न शिक्षण पदों को कवर करती है।
                      </p>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-3">मुख्य विशेषताएं</h4>
                        <ul className="space-y-2 text-purple-700">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <span>BPSC (बिहार लोक सेवा आयोग) द्वारा आयोजित</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <span>कई चरण: लिखित परीक्षा, साक्षात्कार/दस्तावेज़ सत्यापन</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <span>विभिन्न शिक्षण पदों के लिए विषय-विशिष्ट भर्ती</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <span>डोमिसाइल प्राथमिकता: 84.4% पद बिहार के निवासियों के लिए आरक्षित</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            <span>नियमित भर्ती चक्र, TRE-4 2025 में अपेक्षित</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-900 mb-3">शिक्षण स्तर</h4>
                        <ul className="space-y-2 text-orange-700">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                            <span>प्राथमिक शिक्षक (कक्षा 1-5)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                            <span>उच्च प्राथमिक शिक्षक (कक्षा 6-8)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                            <span>माध्यमिक शिक्षक (कक्षा 9-10)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                            <span>उच्च माध्यमिक शिक्षक (कक्षा 11-12)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eligibility" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                  <CardDescription>Requirements for BPSC Teacher Recruitment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* English Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">English</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Age Limit</h4>
                            <p className="text-gray-700">21-37 years (relaxation for reserved categories)</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Education</h4>
                            <p className="text-gray-700">Graduation with 50% marks and B.Ed/D.El.Ed</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">TET Requirement</h4>
                            <p className="text-gray-700">CTET/STET qualification required</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Domicile</h4>
                            <p className="text-gray-700">Bihar domicile with 84.4% posts prioritized for locals</p>
                          </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 text-sm font-medium">Note: Pending 2025 notification for exact criteria</p>
                        </div>
                      </div>
                    </div>

                    {/* Hindi Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">हिंदी</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">आयु सीमा</h4>
                            <p className="text-gray-700">21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">शिक्षा</h4>
                            <p className="text-gray-700">50% अंकों के साथ स्नातक और B.Ed/D.El.Ed</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">TET आवश्यकता</h4>
                            <p className="text-gray-700">CTET/STET योग्यता आवश्यक</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-800">डोमिसाइल</h4>
                            <p className="text-gray-700">बिहार डोमिसाइल, 84.4% पद स्थानीय लोगों के लिए आरक्षित</p>
                          </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 text-sm font-medium">नोट: सटीक मानदंडों के लिए 2025 अधिसूचना लंबित</p>
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
                  <CardDescription>Structure and format of BPSC Teacher exam</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* English Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">English</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2">Three Parts</h4>
                            <ul className="space-y-2 text-blue-700">
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                <span>Language (Hindi/English)</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                <span>General Studies (SCERT)</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                <span>Concerned Subject</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-900 mb-2">Exam Details</h4>
                            <ul className="space-y-2 text-green-700">
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                <span>Total Questions: 150</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                <span>Duration: 2.5 hours</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                <span>Negative Marking: Usually no</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
                          <p className="text-yellow-700 text-sm">
                            Pattern pending 2025 official notification. Confirm details per official notification.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hindi Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">हिंदी</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h4 className="font-semibold text-purple-900 mb-2">तीन भाग</h4>
                            <ul className="space-y-2 text-purple-700">
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                <span>भाषा (हिंदी/अंग्रेजी)</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                <span>सामान्य अध्ययन (SCERT)</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                <span>संबंधित विषय</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <h4 className="font-semibold text-orange-900 mb-2">परीक्षा विवरण</h4>
                            <ul className="space-y-2 text-orange-700">
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                <span>कुल प्रश्न: 150</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                <span>अवधि: 2.5 घंटे</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                <span>नेगेटिव मार्किंग: आमतौर पर नहीं</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-yellow-900 mb-2">महत्वपूर्ण नोट</h4>
                          <p className="text-yellow-700 text-sm">
                            पैटर्न 2025 आधिकारिक अधिसूचना लंबित। अधिसूचना के अनुसार पुष्टि करें।
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syllabus" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Syllabus</CardTitle>
                  <CardDescription>Detailed syllabus for BPSC Teacher exam</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* English Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">English</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-900 mb-3">Language Section</h4>
                          <ul className="space-y-2 text-blue-700 text-sm">
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>Hindi/English grammar and comprehension</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-3">General Studies (SCERT)</h4>
                          <ul className="space-y-2 text-green-700 text-sm">
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>Current affairs</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>Bihar-specific knowledge</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>Educational policies</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-900 mb-3">Subject-specific</h4>
                          <ul className="space-y-2 text-purple-700 text-sm">
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>Based on concerned subject for the post</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                        <p className="text-yellow-700 text-sm font-medium">
                          Note: Detailed syllabus pending 2025 notification
                        </p>
                      </div>
                    </div>

                    {/* Hindi Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">हिंदी</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-900 mb-3">भाषा खंड</h4>
                          <ul className="space-y-2 text-orange-700 text-sm">
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>हिंदी/अंग्रेजी व्याकरण और समझ</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                          <h4 className="font-semibold text-teal-900 mb-3">सामान्य अध्ययन (SCERT)</h4>
                          <ul className="space-y-2 text-teal-700 text-sm">
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>करंट अफेयर्स</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>बिहार-विशिष्ट ज्ञान</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>शैक्षिक नीतियां</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                          <h4 className="font-semibold text-indigo-900 mb-3">विषय-विशिष्ट</h4>
                          <ul className="space-y-2 text-indigo-700 text-sm">
                            <li className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span>पद के अनुसार संबंधित विषय पर आधारित</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                        <p className="text-yellow-700 text-sm font-medium">
                          नोट: विस्तृत पाठ्यक्रम 2025 अधिसूचना लंबित
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Important Dates */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-800">TRE-4 2025 Timeline</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Official notification for TRE-4 2025 is expected to be released soon. 
                  The following dates are tentative based on previous year patterns.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {importantDates.map((date, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-blue-50">
                    <span className="font-medium">{date.label}</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      {date.date}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cut-off Marks */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Cut-off Marks</CardTitle>
              <CardDescription>Previous year qualifying marks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-800">Cut-off Information</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  Cut-off marks vary based on exam difficulty, number of vacancies, and candidate performance. 
                  The 2024 cut-offs will be available after the exam results are declared.
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2">Year</th>
                      <th className="border border-gray-300 px-4 py-2">Category</th>
                      <th className="border border-gray-300 px-4 py-2">Pass Marks</th>
                      <th className="border border-gray-300 px-4 py-2">Cut-off Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cutoffs.map((cutoff, index) => (
                      <tr key={index} className={cutoff.year === 2023 ? 'bg-green-50' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{cutoff.year}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Badge variant="outline" className="text-xs">{cutoff.category}</Badge>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 font-medium text-green-600">{cutoff.passMarks}</td>
                        <td className="border border-gray-300 px-4 py-2 font-medium text-blue-600">{cutoff.cutoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Downloads */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {downloads.map((download, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{download.title}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={download.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="bpsc" asChild>
                  <a href={`/${locale}/eligibility?from=bpsc`}>Check Eligibility</a>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <a href="https://bpsc.bihar.gov.in" target="_blank" rel="noopener noreferrer">
                    Official Website
                  </a>
                </Button>
                <Button className="w-full" variant="outline">
                  Set Reminder
                </Button>
              </CardContent>
            </Card>

            {/* Latest Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>TRE-4 2025:</strong> Expected soon
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Domicile Policy:</strong> 84.4% posts for locals
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Multiple Phases:</strong> Written + Interview
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Links */}
            <Card>
              <CardHeader>
                <CardTitle>Important Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a href="https://bpsc.bihar.gov.in" className="block text-sm text-blue-600 hover:underline">
                    BPSC Official Portal
                  </a>
                  <a href="https://state.bihar.gov.in/educationbihar" className="block text-sm text-blue-600 hover:underline">
                    Bihar Education Department
                  </a>
                  <a href={`/${locale}/eligibility?from=bpsc`} className="block text-sm text-blue-600 hover:underline">
                    Eligibility Checker
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

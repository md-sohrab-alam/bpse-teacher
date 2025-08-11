'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

export default function BPSCTeacherPage() {
  const t = useTranslations('exams.bpscTeacher');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual database queries
  const examData = {
    overview: {
      en: `Bihar Public Service Commission (BPSC) Teacher Recruitment Examination (TRE) is conducted to recruit teachers for government schools in Bihar. The exam includes multiple phases and is conducted for different levels (Primary, Upper Primary, Secondary, Senior Secondary).`,
      hi: `बिहार लोक सेवा आयोग (BPSC) शिक्षक भर्ती परीक्षा (TRE) बिहार के सरकारी स्कूलों में शिक्षकों की भर्ती के लिए आयोजित की जाती है। परीक्षा में कई चरण शामिल हैं और विभिन्न स्तरों (प्राथमिक, उच्च प्राथमिक, माध्यमिक, उच्च माध्यमिक) के लिए आयोजित की जाती है।`
    },
    eligibility: {
      en: `**Age Limit:** 21-37 years (relaxation for reserved categories)\n**Education:** Graduation with 50% marks and B.Ed/D.El.Ed\n**TET Requirement:** CTET/STET qualification required\n**Domicile:** Bihar domicile with 84.4% posts prioritized for locals\n**Note:** Pending 2025 notification for exact criteria`,
      hi: `**आयु सीमा:** 21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)\n**शिक्षा:** 50% अंकों के साथ स्नातक और B.Ed/D.El.Ed\n**TET आवश्यकता:** CTET/STET योग्यता आवश्यक\n**डोमिसाइल:** बिहार डोमिसाइल, 84.4% पद स्थानीय लोगों के लिए आरक्षित\n**नोट:** सटीक मानदंडों के लिए 2025 अधिसूचना लंबित`
    },
    pattern: {
      en: `**Three Parts:**\n- Language (Hindi/English)\n- General Studies (SCERT)\n- Concerned Subject\n**Total Questions:** 150\n**Duration:** 2.5 hours\n**Negative Marking:** Usually no negative marking (confirm per notification)\n**Note:** Pattern pending 2025 official notification`,
      hi: `**तीन भाग:**\n- भाषा (हिंदी/अंग्रेजी)\n- सामान्य अध्ययन (SCERT)\n- संबंधित विषय\n**कुल प्रश्न:** 150\n**अवधि:** 2.5 घंटे\n**नेगेटिव मार्किंग:** आमतौर पर नहीं (अधिसूचना के अनुसार पुष्टि करें)\n**नोट:** पैटर्न 2025 आधिकारिक अधिसूचना लंबित`
    },
    syllabus: {
      en: `**Language Section:**\n- Hindi/English grammar and comprehension\n\n**General Studies (SCERT):**\n- Current affairs\n- Bihar-specific knowledge\n- Educational policies\n\n**Subject-specific:**\n- Based on concerned subject for the post\n\n*Note: Detailed syllabus pending 2025 notification*`,
      hi: `**भाषा खंड:**\n- हिंदी/अंग्रेजी व्याकरण और समझ\n\n**सामान्य अध्ययन (SCERT):**\n- करंट अफेयर्स\n- बिहार-विशिष्ट ज्ञान\n- शैक्षिक नीतियां\n\n**विषय-विशिष्ट:**\n- पद के अनुसार संबंधित विषय पर आधारित\n\n*नोट: विस्तृत पाठ्यक्रम 2025 अधिसूचना लंबित*`
    }
  };

  const importantDates = [
    { label: 'TRE-4 Notification', date: 'TBA', status: 'pending' },
    { label: 'Application Start', date: 'TBA', status: 'pending' },
    { label: 'Application End', date: 'TBA', status: 'pending' },
    { label: 'Exam Date', date: 'TBA', status: 'pending' }
  ];

  const downloads = [
    { title: 'BPSC Teacher Syllabus', url: 'https://bpsc.bihar.gov.in/syllabus' },
    { title: 'Previous Year Papers', url: 'https://bpsc.bihar.gov.in/previous-papers' }
  ];

  const cutoffs = [
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
          <h1 className="text-3xl font-bold text-bpsc-600">BPSC Teacher Recruitment</h1>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Pending 2025
          </Badge>
        </div>
        <p className="text-gray-600 text-lg">
          बिहार लोक सेवा आयोग शिक्षक भर्ती परीक्षा (TRE)
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
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">English</h3>
                      <p className="text-gray-700">{examData.overview.en}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">हिंदी</h3>
                      <p className="text-gray-700 hindi">{examData.overview.hi}</p>
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
                  <div className="prose max-w-none">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">English</h3>
                      <div className="whitespace-pre-line text-gray-700">{examData.eligibility.en}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">हिंदी</h3>
                      <div className="whitespace-pre-line text-gray-700 hindi">{examData.eligibility.hi}</div>
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
                  <div className="prose max-w-none">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">English</h3>
                      <div className="whitespace-pre-line text-gray-700">{examData.pattern.en}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">हिंदी</h3>
                      <div className="whitespace-pre-line text-gray-700 hindi">{examData.pattern.hi}</div>
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
                  <div className="prose max-w-none">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">English</h3>
                      <div className="whitespace-pre-line text-gray-700">{examData.syllabus.en}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">हिंदी</h3>
                      <div className="whitespace-pre-line text-gray-700 hindi">{examData.syllabus.hi}</div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {importantDates.map((date, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">{date.label}</span>
                    <Badge variant={date.status === 'pending' ? 'secondary' : 'default'}>
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
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2">Year</th>
                      <th className="border border-gray-300 px-4 py-2">Category</th>
                      <th className="border border-gray-300 px-4 py-2">Pass Marks</th>
                      <th className="border border-gray-300 px-4 py-2">Cut-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cutoffs.map((cutoff, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{cutoff.year}</td>
                        <td className="border border-gray-300 px-4 py-2">{cutoff.category}</td>
                        <td className="border border-gray-300 px-4 py-2">{cutoff.passMarks}</td>
                        <td className="border border-gray-300 px-4 py-2">{cutoff.cutoff}</td>
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
                <Button className="w-full" variant="bpsc">
                  Check Eligibility
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
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>TRE-4 2025:</strong> Notification pending
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Domicile Policy:</strong> 84.4% posts for locals
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
                  <a href="/eligibility" className="block text-sm text-blue-600 hover:underline">
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

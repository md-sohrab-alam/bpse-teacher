import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, Calculator, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface HomePageProps {
  params: { locale: string }
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bpsc-600 to-stet-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Complete Guide to Bihar Government Teacher Recruitment
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find everything you need to become a government teacher in Bihar
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Find anything about Bihar Teacher exams..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-bpsc-600 hover:bg-gray-100">
                  Search
                </Button>
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
                  <CardTitle className="text-2xl text-stet-800">STET (BSEB)</CardTitle>
                  <div className="bg-stet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Latest Update
                  </div>
                </div>
                <CardDescription className="text-stet-700">
                  Secondary Teacher Eligibility Test for Bihar
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  The Secondary Teacher Eligibility Test (STET) is conducted by the Bihar School Examination Board (BSEB) 
                  to determine the eligibility of candidates for appointment as teachers in secondary schools.
                </p>
                <div className="flex space-x-3">
                  <Button variant="stet" asChild>
                    <Link href="/stet">Learn More</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/eligibility">Check Eligibility</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* BPSC Teacher Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="bg-gradient-to-r from-bpsc-50 to-bpsc-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-bpsc-800">BPSC Teacher</CardTitle>
                  <div className="bg-bpsc-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Latest Update
                  </div>
                </div>
                <CardDescription className="text-bpsc-700">
                  Bihar Public Service Commission Teacher Recruitment
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  BPSC conducts teacher recruitment for various subjects and levels in government schools 
                  across Bihar. This is a direct recruitment process for permanent positions.
                </p>
                <div className="flex space-x-3">
                  <Button variant="bpsc" asChild>
                    <Link href="/bpsc-teacher">Learn More</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/eligibility">Check Eligibility</Link>
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
          <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/eligibility">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-bpsc-600" />
                  <h3 className="text-lg font-semibold mb-2">Check Eligibility</h3>
                  <p className="text-gray-600 text-sm">Verify your eligibility for both exams</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/syllabus">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-stet-600" />
                  <h3 className="text-lg font-semibold mb-2">View Syllabus</h3>
                  <p className="text-gray-600 text-sm">Complete syllabus for all subjects</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/cutoff">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">Cut-off Marks</h3>
                  <p className="text-gray-600 text-sm">Historical cut-off data and trends</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/mock-tests">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                <CardContent className="pt-6">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-lg font-semibold mb-2">Take Mock Test</h3>
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
          <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sample News Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Application Open
                  </span>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <CardTitle className="text-lg">STET 2024 Application Form Released</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  The application form for STET 2024 has been released. Candidates can apply online from March 1, 2024.
                </p>
                <Button variant="outline" size="sm">Read More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    Admit Card
                  </span>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
                <CardTitle className="text-lg">BPSC Teacher Admit Card 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Admit cards for BPSC Teacher recruitment 2024 are now available for download.
                </p>
                <Button variant="outline" size="sm">Read More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                    Result
                  </span>
                  <span className="text-sm text-gray-500">2 weeks ago</span>
                </div>
                <CardTitle className="text-lg">STET 2023 Result Declared</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  The result for STET 2023 has been declared. Check your result on the official website.
                </p>
                <Button variant="outline" size="sm">Read More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BPSC Teacher</h3>
              <p className="text-gray-400 text-sm">
                Your complete guide to Bihar government teacher recruitment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/stet" className="hover:text-white">STET</Link></li>
                <li><Link href="/bpsc-teacher" className="hover:text-white">BPSC Teacher</Link></li>
                <li><Link href="/eligibility" className="hover:text-white">Eligibility</Link></li>
                <li><Link href="/syllabus" className="hover:text-white">Syllabus</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/mock-tests" className="hover:text-white">Mock Tests</Link></li>
                <li><Link href="/cutoff" className="hover:text-white">Cut-off Marks</Link></li>
                <li><Link href="/news" className="hover:text-white">News & Updates</Link></li>
                <li><Link href="/resources" className="hover:text-white">Downloads</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@bpscteacher.com</li>
                <li>Phone: +91-XXXXXXXXXX</li>
                <li>Address: Patna, Bihar</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 BPSC Teacher. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

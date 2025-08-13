'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefreshCw, ExternalLink, Calendar, UserCheck, GraduationCap, MapPin, Clock, Loader2, AlertCircle, CheckCircle, Calculator } from 'lucide-react'
import { fetchEligibilityCriteria, fetchCutoffMarks, EligibilityCriteria, CutoffData } from '@/lib/mock-data'

export default function EligibilityPage() {
  const t = useTranslations('common')
  const searchParams = useSearchParams()
  const locale = useSearchParams().get('locale') || 'en'
  const defaultTab = searchParams.get('tab') === 'calculator' ? 'calculator' : 
                    searchParams.get('tab') === 'cutoff' ? 'cutoff' : 'eligibility'
  const [eligibility, setEligibility] = useState<EligibilityCriteria[]>([])
  const [cutoffs, setCutoffs] = useState<CutoffData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  // Eligibility Calculator State
  const [calculatorData, setCalculatorData] = useState({
    age: '',
    education: '',
    tetQualification: '',
    domicile: '',
    category: '',
    experience: ''
  })
  const [calculatorResult, setCalculatorResult] = useState<{
    isEligible: boolean
    reasons: string[]
    suggestions: string[]
  } | null>(null)

  useEffect(() => {
    loadEligibilityData()
  }, [])

  const loadEligibilityData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const [eligibilityData, cutoffData] = await Promise.all([
        fetchEligibilityCriteria(),
        fetchCutoffMarks()
      ])
      setEligibility(eligibilityData)
      setCutoffs(cutoffData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error loading eligibility data:', error)
      setError('Failed to load eligibility information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const calculateEligibility = () => {
    const reasons: string[] = []
    const suggestions: string[] = []
    let isEligible = true

    // Age check
    const age = parseInt(calculatorData.age)
    if (isNaN(age) || age < 21 || age > 37) {
      reasons.push('Age must be between 21-37 years')
      suggestions.push('Check age relaxation for reserved categories')
      isEligible = false
    }

    // Education check
    if (!calculatorData.education || calculatorData.education === 'none') {
      reasons.push('Graduation with 50% marks required')
      suggestions.push('Complete your graduation with minimum 50% marks')
      isEligible = false
    }

    // TET qualification check
    if (!calculatorData.tetQualification || calculatorData.tetQualification === 'none') {
      reasons.push('CTET/STET qualification required')
      suggestions.push('Appear for CTET or STET to get qualified')
      isEligible = false
    }

    // Domicile check
    if (calculatorData.domicile !== 'bihar') {
      reasons.push('Bihar domicile preferred (84.4% posts for locals)')
      suggestions.push('Consider applying for non-domicile posts if available')
      isEligible = false
    }

    // Category-specific relaxations
    if (calculatorData.category === 'sc' || calculatorData.category === 'st') {
      suggestions.push('You may be eligible for age relaxation up to 5 years')
    } else if (calculatorData.category === 'obc') {
      suggestions.push('You may be eligible for age relaxation up to 3 years')
    }

    if (isEligible) {
      reasons.push('All basic eligibility criteria met')
      suggestions.push('You are eligible to apply for BPSC Teacher recruitment')
    }

    setCalculatorResult({ isEligible, reasons, suggestions })
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              BPSC Teacher Eligibility Criteria
            </h1>
            <p className="text-lg text-gray-600">
              Complete eligibility requirements and cutoff marks for BPSC Teacher recruitment
            </p>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={loadEligibilityData}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </Button>
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {formatDate(lastUpdated.toISOString())}
                </p>
              )}
            </div>
            <Badge variant="outline" className="flex items-center space-x-1">
              <UserCheck className="w-3 h-3" />
              <span>Live Data</span>
            </Badge>
          </div>

          {/* Loading State */}
          {isLoading && (
            <Card className="mb-8">
              <CardContent className="py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-bpsc-600" />
                  <p className="text-gray-600">Fetching latest eligibility criteria from official sources...</p>
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
                  <Button onClick={loadEligibilityData}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content */}
          {!isLoading && !error && (
            <Tabs defaultValue={defaultTab} className="space-y-6">
                             <TabsList className="grid w-full grid-cols-3">
                 <TabsTrigger value="eligibility" className="flex items-center space-x-2">
                   <UserCheck className="w-4 h-4" />
                   <span>Eligibility Criteria</span>
                 </TabsTrigger>
                 <TabsTrigger value="cutoff" className="flex items-center space-x-2">
                   <CheckCircle className="w-4 h-4" />
                   <span>Cut-Off Marks</span>
                 </TabsTrigger>
                 <TabsTrigger value="calculator" className="flex items-center space-x-2">
                   <Calculator className="w-4 h-4" />
                   <span>Eligibility Calculator</span>
                 </TabsTrigger>
               </TabsList>

              {/* Eligibility Criteria Tab */}
              <TabsContent value="eligibility" className="space-y-6">
                {eligibility.length > 0 ? (
                  <>
                    {/* Main Eligibility Card */}
                    <Card className="border-l-4 border-l-bpsc-600">
                      <CardHeader className="bg-gradient-to-r from-bpsc-50 to-blue-50">
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center">
                            <UserCheck className="w-5 h-5 mr-2" />
                            Basic Eligibility Requirements
                          </span>
                          <Badge variant="secondary" className="text-sm">
                            Source: {eligibility[0].source}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                              <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                              <div>
                                <h3 className="font-semibold text-blue-800 mb-1">Age Limit</h3>
                                <p className="text-gray-700">{eligibility[0].ageLimit || '21-37 years (relaxation for reserved categories)'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                              <div>
                                <h3 className="font-semibold text-green-800 mb-1">Educational Qualification</h3>
                                <p className="text-gray-700">{eligibility[0].education || 'Graduation with 50% marks and B.Ed/D.El.Ed'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                              <div>
                                <h3 className="font-semibold text-purple-800 mb-1">TET Requirement</h3>
                                <p className="text-gray-700">{eligibility[0].tetRequirement || 'CTET/STET qualification required'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                              <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                              <div>
                                <h3 className="font-semibold text-orange-800 mb-1">Domicile Requirement</h3>
                                <p className="text-gray-700">{eligibility[0].domicile || 'Bihar domicile with 84.4% posts for locals'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {eligibility[0].experience && (
                          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 mb-2">Experience Requirement</h3>
                            <p className="text-gray-700">{eligibility[0].experience}</p>
                          </div>
                        )}
                        
                        {eligibility[0].relaxation && (
                          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                            <h3 className="font-semibold text-indigo-800 mb-2">Relaxation Details</h3>
                            <p className="text-gray-700">{eligibility[0].relaxation}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Important Notes */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                          Important Notes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">All dates and criteria are subject to change based on official notifications</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">Always verify information from official BPSC website before applying</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">Reserved category candidates should check specific relaxation details</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Eligibility criteria not available at the moment.</p>
                    </CardContent>
                  </Card>
                )}
                             </TabsContent>

               {/* Cut-Off Marks Tab */}
               <TabsContent value="cutoff" className="space-y-6">
                 <Card className="border-l-4 border-l-green-600">
                   <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                     <CardTitle className="flex items-center justify-between">
                       <span className="flex items-center">
                         <CheckCircle className="w-5 h-5 mr-2" />
                         Cut-Off Marks & Passing Criteria
                       </span>
                       <Badge variant="secondary" className="text-sm">
                         Latest Data
                       </Badge>
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="p-6">
                     {cutoffs.length > 0 ? (
                       <div className="space-y-6">
                         {/* STET Cut-off Marks */}
                         <div>
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                             <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                             STET Qualifying Marks
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                             <div className="bg-blue-50 p-4 rounded-lg">
                               <h4 className="font-semibold text-blue-800 mb-2">General</h4>
                               <p className="text-2xl font-bold text-blue-600">50%</p>
                               <p className="text-sm text-gray-600">75/150 marks</p>
                             </div>
                             <div className="bg-purple-50 p-4 rounded-lg">
                               <h4 className="font-semibold text-purple-800 mb-2">BC</h4>
                               <p className="text-2xl font-bold text-purple-600">45.5%</p>
                               <p className="text-sm text-gray-600">68.25/150 marks</p>
                             </div>
                             <div className="bg-orange-50 p-4 rounded-lg">
                               <h4 className="font-semibold text-orange-800 mb-2">OBC</h4>
                               <p className="text-2xl font-bold text-orange-600">42.5%</p>
                               <p className="text-sm text-gray-600">63.75/150 marks</p>
                             </div>
                             <div className="bg-green-50 p-4 rounded-lg">
                               <h4 className="font-semibold text-green-800 mb-2">SC/ST/PwD</h4>
                               <p className="text-2xl font-bold text-green-600">40%</p>
                               <p className="text-sm text-gray-600">60/150 marks</p>
                             </div>
                           </div>
                         </div>

                         {/* BPSC Teacher Cut-off Table */}
                         <div>
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                             <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                             BPSC Teacher Recruitment Cut-off Marks
                           </h3>
                           <div className="overflow-x-auto">
                             <table className="w-full border-collapse border border-gray-300">
                               <thead>
                                 <tr className="bg-gray-50">
                                   <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Year</th>
                                   <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Category</th>
                                   <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Pass Marks</th>
                                   <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cut-off Marks</th>
                                   <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Vacancies</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {cutoffs.map((cutoff, index) => (
                                   <tr key={index} className="hover:bg-gray-50">
                                     <td className="border border-gray-300 px-4 py-2">{cutoff.year}</td>
                                     <td className="border border-gray-300 px-4 py-2">
                                       <Badge variant="outline" className="text-xs">
                                         {cutoff.category}
                                       </Badge>
                                     </td>
                                     <td className="border border-gray-300 px-4 py-2 font-medium text-green-600">
                                       {cutoff.passMarks}
                                     </td>
                                     <td className="border border-gray-300 px-4 py-2 font-medium text-blue-600">
                                       {cutoff.cutoffMarks}
                                     </td>
                                     <td className="border border-gray-300 px-4 py-2 text-center">
                                       {cutoff.totalVacancies}
                                     </td>
                                   </tr>
                                 ))}
                               </tbody>
                             </table>
                           </div>
                         </div>

                         {/* Important Notes */}
                         <Card className="bg-yellow-50 border-yellow-200">
                           <CardHeader>
                             <CardTitle className="flex items-center text-yellow-800">
                               <AlertCircle className="w-5 h-5 mr-2" />
                               Important Notes
                             </CardTitle>
                           </CardHeader>
                           <CardContent>
                             <div className="space-y-2 text-sm text-yellow-700">
                               <p>• Cut-off marks vary based on exam difficulty and number of applicants</p>
                               <p>• Passing marks are minimum qualifying criteria</p>
                               <p>• Cut-off marks determine final selection</p>
                               <p>• Always check official website for latest updates</p>
                             </div>
                           </CardContent>
                         </Card>
                       </div>
                     ) : (
                       <div className="text-center py-12">
                         <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                         <p className="text-gray-600">Cut-off data not available at the moment.</p>
                       </div>
                     )}
                   </CardContent>
                 </Card>
               </TabsContent>

               {/* Eligibility Calculator Tab */}
              <TabsContent value="calculator" className="space-y-6">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Check Your Eligibility
                    </CardTitle>
                    <CardDescription>
                      Enter your details to check if you're eligible for BPSC Teacher recruitment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Age */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Age (in years)</label>
                        <input
                          type="number"
                          value={calculatorData.age}
                          onChange={(e) => setCalculatorData({...calculatorData, age: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bpsc-500"
                          placeholder="Enter your age"
                        />
                      </div>

                      {/* Education */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Education Qualification</label>
                        <select
                          value={calculatorData.education}
                          onChange={(e) => setCalculatorData({...calculatorData, education: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bpsc-500"
                        >
                          <option value="">Select education</option>
                          <option value="graduation">Graduation with 50%+ marks</option>
                          <option value="post_graduation">Post Graduation</option>
                          <option value="none">Below Graduation</option>
                        </select>
                      </div>

                      {/* TET Qualification */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">TET Qualification</label>
                        <select
                          value={calculatorData.tetQualification}
                          onChange={(e) => setCalculatorData({...calculatorData, tetQualification: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bpsc-500"
                        >
                          <option value="">Select TET qualification</option>
                          <option value="ctet">CTET Qualified</option>
                          <option value="stet">STET Qualified</option>
                          <option value="both">Both CTET & STET</option>
                          <option value="none">Not Qualified</option>
                        </select>
                      </div>

                      {/* Domicile */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Domicile</label>
                        <select
                          value={calculatorData.domicile}
                          onChange={(e) => setCalculatorData({...calculatorData, domicile: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bpsc-500"
                        >
                          <option value="">Select domicile</option>
                          <option value="bihar">Bihar</option>
                          <option value="other">Other State</option>
                        </select>
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select
                          value={calculatorData.category}
                          onChange={(e) => setCalculatorData({...calculatorData, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bpsc-500"
                        >
                          <option value="">Select category</option>
                          <option value="general">General</option>
                          <option value="obc">OBC</option>
                          <option value="sc">SC</option>
                          <option value="st">ST</option>
                          <option value="pwd">PwD</option>
                        </select>
                      </div>

                      {/* Experience */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Teaching Experience</label>
                        <select
                          value={calculatorData.experience}
                          onChange={(e) => setCalculatorData({...calculatorData, experience: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bpsc-500"
                        >
                          <option value="">Select experience</option>
                          <option value="fresher">Fresher</option>
                          <option value="1-2">1-2 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Button 
                        onClick={calculateEligibility}
                        className="bg-bpsc-600 hover:bg-bpsc-700 text-white px-8 py-3"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Check Eligibility
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Calculator Results */}
                {calculatorResult && (
                  <Card className={calculatorResult.isEligible ? "border-green-200" : "border-red-200"}>
                    <CardHeader className={calculatorResult.isEligible ? "bg-green-50" : "bg-red-50"}>
                      <CardTitle className={`flex items-center ${calculatorResult.isEligible ? "text-green-800" : "text-red-800"}`}>
                        {calculatorResult.isEligible ? (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 mr-2" />
                        )}
                        {calculatorResult.isEligible ? "Eligible" : "Not Eligible"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Reasons */}
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-800">Assessment:</h4>
                          <ul className="space-y-2">
                            {calculatorResult.reasons.map((reason, index) => (
                              <li key={index} className="flex items-start">
                                <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                                  calculatorResult.isEligible ? "bg-green-500" : "bg-red-500"
                                }`}></div>
                                <span className="text-gray-700">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Suggestions */}
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-800">Suggestions:</h4>
                          <ul className="space-y-2">
                            {calculatorResult.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2 text-gray-800">Important Notes:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Age relaxation applies to reserved categories</li>
                          <li>• Final eligibility depends on official notification</li>
                          <li>• Always verify with official BPSC website</li>
                          <li>• This is a preliminary assessment only</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )}

                     {/* Action Buttons */}
           <Card className="mt-8">
             <CardContent className="p-6">
               <div className="flex flex-wrap gap-4 justify-center">
                 <Button asChild className="flex items-center space-x-2">
                   <a href="https://bpsc.bih.nic.in/" target="_blank" rel="noopener noreferrer">
                     <ExternalLink className="w-4 h-4" />
                     <span>Official BPSC Website</span>
                   </a>
                 </Button>
                 <Button asChild variant="outline" className="flex items-center space-x-2">
                   <Link href={`/${locale}/news`}>
                     <Calendar className="w-4 h-4" />
                     <span>Check Application Dates</span>
                   </Link>
                 </Button>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, XCircle, AlertCircle, Download, Save } from 'lucide-react'

interface EligibilityPageProps {
  params: { locale: string }
}

interface EligibilityForm {
  dateOfBirth: string
  category: string
  domicile: string
  graduationPercentage: string
  postGraduation: string
  subject: string
  bed: boolean
  deled: boolean
  ctet: boolean
  stet: boolean
  targetLevel: string
  attempts: string
}

interface EligibilityResult {
  eligible: boolean
  exam: string
  level: string
  reasons: string[]
  nextSteps: string[]
}

export default function EligibilityPage({ params: { locale } }: EligibilityPageProps) {
  const t = useTranslations('eligibility')
  const [formData, setFormData] = useState<EligibilityForm>({
    dateOfBirth: '',
    category: '',
    domicile: '',
    graduationPercentage: '',
    postGraduation: '',
    subject: '',
    bed: false,
    deled: false,
    ctet: false,
    stet: false,
    targetLevel: '',
    attempts: ''
  })
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof EligibilityForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const checkEligibility = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()
      const graduationPercent = parseFloat(formData.graduationPercentage)
      
      const reasons: string[] = []
      const nextSteps: string[] = []
      let eligible = true
      let exam = ''
      let level = ''

      // Age check
      if (age < 21) {
        reasons.push('Age is below minimum requirement (21 years)')
        eligible = false
        nextSteps.push('Wait until you turn 21 years old')
      } else if (age > 37) {
        reasons.push('Age exceeds maximum limit (37 years)')
        eligible = false
        nextSteps.push('Check for age relaxation based on your category')
      }

      // Education check
      if (graduationPercent < 50) {
        reasons.push('Graduation percentage is below 50%')
        eligible = false
        nextSteps.push('Improve your graduation percentage to at least 50%')
      }

      // Professional qualification check
      if (!formData.bed && !formData.deled) {
        reasons.push('Professional qualification (B.Ed or D.El.Ed) is required')
        eligible = false
        nextSteps.push('Complete B.Ed or D.El.Ed course')
      }

      // TET qualification check
      if (!formData.ctet && !formData.stet) {
        reasons.push('TET qualification (CTET or STET) is required')
        eligible = false
        nextSteps.push('Appear for CTET or STET examination')
      }

      if (eligible) {
        exam = formData.targetLevel.includes('Primary') ? 'STET' : 'BPSC Teacher'
        level = formData.targetLevel
        reasons.push('All eligibility criteria are met')
        nextSteps.push('Start preparing for the examination')
        nextSteps.push('Keep track of application dates')
      }

      setResult({
        eligible,
        exam,
        level,
        reasons,
        nextSteps
      })
      setIsLoading(false)
    }, 2000)
  }

  const downloadPDF = () => {
    // Implementation for PDF download
    console.log('Downloading PDF...')
  }

  const saveResult = () => {
    // Implementation for saving result
    console.log('Saving result...')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Fill in your details to check eligibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UR">UR (Unreserved)</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="EWS">EWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="domicile">Domicile</Label>
                    <Select value={formData.domicile} onValueChange={(value) => handleInputChange('domicile', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select domicile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bihar">Bihar</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="graduationPercentage">Graduation Percentage</Label>
                    <Input
                      id="graduationPercentage"
                      type="number"
                      placeholder="Enter percentage"
                      value={formData.graduationPercentage}
                      onChange={(e) => handleInputChange('graduationPercentage', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Social Studies">Social Studies</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="targetLevel">Target Class Level</Label>
                    <Select value={formData.targetLevel} onValueChange={(value) => handleInputChange('targetLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Primary (I-V)">Primary (I-V)</SelectItem>
                        <SelectItem value="Upper Primary (VI-VIII)">Upper Primary (VI-VIII)</SelectItem>
                        <SelectItem value="Secondary (IX-X)">Secondary (IX-X)</SelectItem>
                        <SelectItem value="Sr. Secondary (XI-XII)">Sr. Secondary (XI-XII)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Professional Qualification</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.bed}
                        onChange={(e) => handleInputChange('bed', e.target.checked)}
                        className="rounded"
                      />
                      <span>B.Ed</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.deled}
                        onChange={(e) => handleInputChange('deled', e.target.checked)}
                        className="rounded"
                      />
                      <span>D.El.Ed</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">TET Qualification</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.ctet}
                        onChange={(e) => handleInputChange('ctet', e.target.checked)}
                        className="rounded"
                      />
                      <span>CTET</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.stet}
                        onChange={(e) => handleInputChange('stet', e.target.checked)}
                        className="rounded"
                      />
                      <span>STET</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="attempts">Previous Attempts</Label>
                  <Input
                    id="attempts"
                    type="number"
                    placeholder="Number of previous attempts"
                    value={formData.attempts}
                    onChange={(e) => handleInputChange('attempts', e.target.value)}
                  />
                </div>

                <Button 
                  onClick={checkEligibility} 
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Checking...' : 'Check Eligibility'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-1">
            {result && (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {result.eligible ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <CardTitle className={result.eligible ? 'text-green-600' : 'text-red-600'}>
                      {result.eligible ? 'Eligible' : 'Not Eligible'}
                    </CardTitle>
                  </div>
                  {result.eligible && (
                    <CardDescription>
                      {result.exam} - {result.level}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Reasons:</h4>
                    <ul className="space-y-1">
                      {result.reasons.map((reason, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Next Steps:</h4>
                    <ul className="space-y-1">
                      {result.nextSteps.map((step, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" onClick={downloadPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={saveResult}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Result
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

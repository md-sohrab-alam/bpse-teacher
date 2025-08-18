'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, MessageSquare, Phone, Shield, CheckCircle, AlertCircle, Loader2, Twitter } from 'lucide-react'
import { trackContactForm } from '@/lib/gtag'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  category: string
  honeypot: string // Hidden field to catch bots
}

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: '',
    honeypot: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    // Check honeypot field (should be empty)
    if (formData.honeypot) {
      setErrorMessage('Invalid form submission')
      return false
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields')
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      return false
    }

    // Message length validation
    if (formData.message.length < 10) {
      setErrorMessage('Message must be at least 10 characters long')
      return false
    }

    // Rate limiting check (basic client-side)
    const lastSubmission = localStorage.getItem('lastContactSubmission')
    if (lastSubmission && Date.now() - parseInt(lastSubmission) < 60000) {
      setErrorMessage('Please wait 1 minute before submitting another message')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Track contact form submission
      trackContactForm(formData.category)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          locale
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          category: '',
          honeypot: ''
        })
        // Store submission timestamp for rate limiting
        localStorage.setItem('lastContactSubmission', Date.now().toString())
      } else {
        const error = await response.json()
        console.error('Contact form error:', error)
        setErrorMessage(error.message || error.error || 'Failed to send message. Please try again.')
        setSubmitStatus('error')
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {t('title')}
          </CardTitle>
          <p className="text-gray-600">{t('description')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field - hidden from users */}
            <div className="absolute -left-[9999px]">
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => handleInputChange('honeypot', e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name')} *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  maxLength={50}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email')} *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                {t('category')} *
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{t('categories.general')}</SelectItem>
                  <SelectItem value="technical">{t('categories.technical')}</SelectItem>
                  <SelectItem value="feedback">{t('categories.feedback')}</SelectItem>
                  <SelectItem value="bug">{t('categories.bug')}</SelectItem>
                  <SelectItem value="suggestion">{t('categories.suggestion')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                {t('subject')}
              </label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                maxLength={100}
                placeholder={t('subjectPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {t('message')} *
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                rows={5}
                maxLength={1000}
                placeholder={t('messagePlaceholder')}
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.message.length}/1000 {t('characters')}
              </div>
            </div>

            {/* Security notice */}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">{t('security.title')}</p>
                <p className="text-blue-700">{t('security.description')}</p>
              </div>
            </div>

            {/* Status messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-800">{t('success')}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('sending')}
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  {t('send')}
                </>
              )}
            </Button>
          </form>

                     {/* Alternative contact methods */}
           <div className="mt-6 pt-6 border-t">
             <h3 className="text-sm font-medium text-gray-700 mb-3">{t('alternativeContact')}</h3>
             <div className="space-y-2">
               <div className="flex items-center gap-2 text-sm text-gray-600">
                 <Mail className="w-4 h-4" />
                 <span>{t('emailUs')}:</span>
                 <Badge variant="outline" className="font-mono text-xs">
                   {t('emailPlaceholder')}
                 </Badge>
               </div>
               <div className="flex items-center gap-2 text-sm text-gray-600">
                 <Phone className="w-4 h-4" />
                 <span>{t('whatsapp')}:</span>
                 <Badge variant="outline" className="font-mono text-xs">
                   {t('phonePlaceholder')}
                 </Badge>
               </div>
               <div className="flex items-center gap-2 text-sm text-gray-600">
                 <Twitter className="w-4 h-4" />
                 <span>{t('twitter')}:</span>
                 <Badge variant="outline" className="font-mono text-xs">
                   {t('twitterPlaceholder')}
                 </Badge>
               </div>
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}

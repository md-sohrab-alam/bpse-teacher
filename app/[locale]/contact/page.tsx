'use client'

import { useTranslations } from 'next-intl'
import { ContactForm } from '@/components/contact-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MessageSquare, Clock, MapPin, Shield, Twitter } from 'lucide-react'

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('contact')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pageDescription')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm locale={locale} />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {t('quickContact')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('email')}</p>
                    <p className="text-sm text-gray-600">{t('emailPlaceholder')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('whatsapp')}</p>
                    <p className="text-sm text-gray-600">{t('phonePlaceholder')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('twitter')}</p>
                    <p className="text-sm text-gray-600">{t('twitterPlaceholder')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {t('responseTime.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('responseTime.weekdays')}</span>
                    <Badge variant="outline" className="text-xs">
                      {t('responseTime.weekdaysTime')}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('responseTime.weekends')}</span>
                    <Badge variant="outline" className="text-xs">
                      {t('responseTime.weekendsTime')}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('responseTime.urgent')}</span>
                    <Badge variant="outline" className="text-xs text-green-600">
                      {t('responseTime.urgentTime')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {t('security.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>{t('security.description')}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>{t('security.features.encryption')}</li>
                    <li>{t('security.features.spam')}</li>
                    <li>{t('security.features.privacy')}</li>
                    <li>{t('security.features.rateLimit')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>{t('faq.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                      {t('faq.q1')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('faq.a1')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                      {t('faq.q2')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('faq.a2')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                      {t('faq.q3')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('faq.a3')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

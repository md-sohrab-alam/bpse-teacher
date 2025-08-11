'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavigationProps {
  locale: string
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('navigation')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { href: '/', label: t('home') },
    { href: '/stet', label: t('stet') },
    { href: '/bpsc-teacher', label: t('bpscTeacher') },
    { href: '/eligibility', label: t('eligibilityChecker') },
    { href: '/syllabus', label: t('syllabus') },
    { href: '/cutoff', label: t('cutoff') },
    { href: '/news', label: t('news') },
    { href: '/resources', label: t('resources') },
    { href: '/mock-tests', label: t('mockTests') },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-bpsc-600 to-stet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                BPSC Teacher
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-bpsc-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="hidden md:block">
              <Link
                href={locale === 'en' ? '/hi' : '/en'}
                className="flex items-center text-gray-700 hover:text-bpsc-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Globe className="w-4 h-4 mr-1" />
                {locale === 'en' ? 'हिंदी' : 'English'}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-gray-700"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-bpsc-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile Language Toggle */}
          <Link
            href={locale === 'en' ? '/hi' : '/en'}
            className="text-gray-700 hover:text-bpsc-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              {locale === 'en' ? 'हिंदी' : 'English'}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

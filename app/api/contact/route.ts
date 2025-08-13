import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering to prevent build-time database connection
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

// Rate limiting store (in production, use Redis or similar)
let rateLimitStore: Map<string, { count: number; resetTime: number }> | null = null

// Security configuration
const SECURITY_CONFIG = {
  MAX_SUBMISSIONS_PER_HOUR: 5,
  MAX_SUBMISSIONS_PER_DAY: 20,
  BLOCKED_IPS: new Set<string>(), // Add known spam IPs here
  SUSPICIOUS_KEYWORDS: [
    'viagra', 'casino', 'loan', 'credit', 'debt', 'weight loss',
    'make money', 'earn money', 'work from home', 'get rich'
  ],
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
  HONEYPOT_FIELD: 'website'
}

// Initialize rate limit store only when needed
function getRateLimitStore() {
  if (!rateLimitStore) {
    rateLimitStore = new Map<string, { count: number; resetTime: number }>()
  }
  return rateLimitStore
}

interface ContactSubmission {
  name: string
  email: string
  subject?: string
  message: string
  category: string
  honeypot: string
  timestamp: string
  userAgent: string
  locale: string
}

function isSpam(submission: ContactSubmission, clientIP: string): { isSpam: boolean; reason?: string } {
  // Check honeypot field
  if (submission.honeypot) {
    return { isSpam: true, reason: 'Honeypot field filled' }
  }

  // Check blocked IPs
  if (SECURITY_CONFIG.BLOCKED_IPS.has(clientIP)) {
    return { isSpam: true, reason: 'IP address blocked' }
  }

  // Check for suspicious keywords
  const content = `${submission.name} ${submission.email} ${submission.subject} ${submission.message}`.toLowerCase()
  for (const keyword of SECURITY_CONFIG.SUSPICIOUS_KEYWORDS) {
    if (content.includes(keyword)) {
      return { isSpam: true, reason: `Suspicious keyword detected: ${keyword}` }
    }
  }

  // Check message length
  if (submission.message.length < SECURITY_CONFIG.MIN_MESSAGE_LENGTH) {
    return { isSpam: true, reason: 'Message too short' }
  }

  if (submission.message.length > SECURITY_CONFIG.MAX_MESSAGE_LENGTH) {
    return { isSpam: true, reason: 'Message too long' }
  }

  // Check for excessive links
  const linkCount = (submission.message.match(/https?:\/\/[^\s]+/g) || []).length
  if (linkCount > 3) {
    return { isSpam: true, reason: 'Too many links in message' }
  }

  // Check for repeated characters (common in spam)
  const repeatedChars = submission.message.match(/(.)\1{5,}/g)
  if (repeatedChars) {
    return { isSpam: true, reason: 'Repeated characters detected' }
  }

  return { isSpam: false }
}

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number; resetTime: number } {
  const store = getRateLimitStore()
  const now = Date.now()
  const hourKey = `${clientIP}:hour:${Math.floor(now / (1000 * 60 * 60))}`
  const dayKey = `${clientIP}:day:${Math.floor(now / (1000 * 60 * 60 * 24))}`

  // Check hourly limit
  const hourData = store.get(hourKey) || { count: 0, resetTime: now + (1000 * 60 * 60) }
  if (hourData.count >= SECURITY_CONFIG.MAX_SUBMISSIONS_PER_HOUR) {
    return { allowed: false, remaining: 0, resetTime: hourData.resetTime }
  }

  // Check daily limit
  const dayData = store.get(dayKey) || { count: 0, resetTime: now + (1000 * 60 * 60 * 24) }
  if (dayData.count >= SECURITY_CONFIG.MAX_SUBMISSIONS_PER_DAY) {
    return { allowed: false, remaining: 0, resetTime: dayData.resetTime }
  }

  // Update counters
  hourData.count++
  dayData.count++
  store.set(hourKey, hourData)
  store.set(dayKey, dayData)

  return { 
    allowed: true, 
    remaining: Math.min(
      SECURITY_CONFIG.MAX_SUBMISSIONS_PER_HOUR - hourData.count,
      SECURITY_CONFIG.MAX_SUBMISSIONS_PER_DAY - dayData.count
    ),
    resetTime: Math.min(hourData.resetTime, dayData.resetTime)
  }
}

async function sendEmailNotification(submission: ContactSubmission, clientIP: string) {
  try {
    // In production, use a proper email service like SendGrid, AWS SES, etc.
    const emailContent = `
New Contact Form Submission

Name: ${submission.name}
Email: ${submission.email}
Category: ${submission.category}
Subject: ${submission.subject || 'No subject'}

Message:
${submission.message}

---
Technical Details:
- IP: ${clientIP}
- User Agent: ${submission.userAgent}
- Locale: ${submission.locale}
- Timestamp: ${submission.timestamp}
    `

    // For now, just log the email content
    console.log('Email notification would be sent:', emailContent)
    
    // TODO: Implement actual email sending
    // Example with SendGrid:
    // await sgMail.send({
    //   to: 'iamsohrabalam@gmail.com',
    //   from: 'noreply@bpseteacher.com',
    //   subject: `New Contact Form: ${submission.category}`,
    //   text: emailContent
    // })

  } catch (error) {
    console.error('Failed to send email notification:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Clean up expired rate limit entries
    cleanupRateLimitStore()
    
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limiting
    const rateLimit = checkRateLimit(clientIP)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: 'Too many submissions. Please try again later.',
          resetTime: rateLimit.resetTime
        },
        { status: 429 }
      )
    }

    // Parse request body
    const submission: ContactSubmission = await request.json()

    // Validate required fields
    if (!submission.name || !submission.email || !submission.message || !submission.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check for spam
    const spamCheck = isSpam(submission, clientIP)
    if (spamCheck.isSpam) {
      console.log(`Spam detected from IP ${clientIP}: ${spamCheck.reason}`)
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    // Store submission in database (optional, for analytics)
    try {
      await prisma.contactSubmission.create({
        data: {
          name: submission.name,
          email: submission.email,
          subject: submission.subject || '',
          message: submission.message,
          category: submission.category,
          ipAddress: clientIP,
          userAgent: submission.userAgent,
          locale: submission.locale,
          isSpam: false
        }
      })
    } catch (dbError) {
      console.error('Failed to store contact submission:', dbError)
      // Continue with email notification even if DB fails
    }

    // Send email notification
    await sendEmailNotification(submission, clientIP)

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully',
        remaining: rateLimit.remaining
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Clean up rate limit store on each request (simpler approach for serverless)
function cleanupRateLimitStore() {
  const store = getRateLimitStore()
  const now = Date.now()
  Array.from(store.entries()).forEach(([key, data]) => {
    if (now > data.resetTime) {
      store.delete(key)
    }
  })
}

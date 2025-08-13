// Email configuration for contact form
// In production, use environment variables for sensitive data

export const EMAIL_CONFIG = {
  // Contact form recipient (your email)
  RECIPIENT_EMAIL: 'iamsohrabalam@gmail.com',
  
  // Sender email (noreply address)
  SENDER_EMAIL: 'noreply@bpseteacher.com',
  
  // Email service configuration
  // For production, use services like SendGrid, AWS SES, or Nodemailer with SMTP
  SERVICE: {
    // SendGrid configuration
    SENDGRID: {
      apiKey: process.env.SENDGRID_API_KEY,
      from: 'noreply@bpseteacher.com',
      templateId: process.env.SENDGRID_TEMPLATE_ID,
    },
    
    // AWS SES configuration
    SES: {
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    
    // SMTP configuration
    SMTP: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },
  
  // Email templates
  TEMPLATES: {
    CONTACT_FORM: {
      subject: 'New Contact Form Submission - {{category}}',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> {{name}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Category:</strong> {{category}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">{{message}}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 12px; color: #64748b;">
            <h4 style="margin-top: 0;">Technical Details</h4>
            <p><strong>IP Address:</strong> {{ipAddress}}</p>
            <p><strong>User Agent:</strong> {{userAgent}}</p>
            <p><strong>Locale:</strong> {{locale}}</p>
            <p><strong>Timestamp:</strong> {{timestamp}}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              This email was sent from the BPSC Teacher contact form.<br>
              Please respond directly to the sender's email address.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Information:
- Name: {{name}}
- Email: {{email}}
- Category: {{category}}
- Subject: {{subject}}

Message:
{{message}}

Technical Details:
- IP Address: {{ipAddress}}
- User Agent: {{userAgent}}
- Locale: {{locale}}
- Timestamp: {{timestamp}}

---
This email was sent from the BPSC Teacher contact form.
Please respond directly to the sender's email address.
      `,
    },
    
    AUTO_REPLY: {
      subject: 'Thank you for contacting BPSC Teacher',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Thank you for contacting us!</h2>
          
          <p>Dear {{name}},</p>
          
          <p>Thank you for reaching out to BPSC Teacher. We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message Details</h3>
            <p><strong>Category:</strong> {{category}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Submitted:</strong> {{timestamp}}</p>
          </div>
          
          <h3>What happens next?</h3>
          <ul>
            <li>We'll review your message within 24 hours (weekdays)</li>
            <li>You'll receive a detailed response from our team</li>
            <li>For urgent queries, you can also reach us on WhatsApp: +91 98995 39767</li>
          </ul>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0369a1;">Quick Links</h3>
            <p><a href="https://bpseteacher.com/mock-tests" style="color: #0369a1;">Take Mock Tests</a></p>
            <p><a href="https://bpseteacher.com/eligibility" style="color: #0369a1;">Check Eligibility</a></p>
            <p><a href="https://bpseteacher.com/syllabus" style="color: #0369a1;">View Syllabus</a></p>
          </div>
          
          <p>Best regards,<br>The BPSC Teacher Team</p>
        </div>
      `,
    },
  },
  
  // Security settings
  SECURITY: {
    // Maximum emails per hour per IP
    MAX_EMAILS_PER_HOUR: 10,
    
    // Maximum emails per day per IP
    MAX_EMAILS_PER_DAY: 50,
    
    // Blocked email domains (common spam domains)
    BLOCKED_DOMAINS: [
      'tempmail.org',
      '10minutemail.com',
      'guerrillamail.com',
      'mailinator.com',
      'throwaway.email',
    ],
    
    // Rate limiting window (in milliseconds)
    RATE_LIMIT_WINDOW: 60 * 60 * 1000, // 1 hour
  },
}

// Email validation function
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && !EMAIL_CONFIG.SECURITY.BLOCKED_DOMAINS.some(domain => 
    email.toLowerCase().includes(domain)
  )
}

// Rate limiting store (in production, use Redis)
const emailRateLimit = new Map<string, { count: number; resetTime: number }>()

export function checkEmailRateLimit(ip: string): boolean {
  const now = Date.now()
  const key = `email:${ip}`
  const data = emailRateLimit.get(key) || { count: 0, resetTime: now + EMAIL_CONFIG.SECURITY.RATE_LIMIT_WINDOW }
  
  if (now > data.resetTime) {
    data.count = 0
    data.resetTime = now + EMAIL_CONFIG.SECURITY.RATE_LIMIT_WINDOW
  }
  
  if (data.count >= EMAIL_CONFIG.SECURITY.MAX_EMAILS_PER_HOUR) {
    return false
  }
  
  data.count++
  emailRateLimit.set(key, data)
  return true
}

// Clean up rate limit store periodically
setInterval(() => {
  const now = Date.now()
  Array.from(emailRateLimit.entries()).forEach(([key, data]) => {
    if (now > data.resetTime) {
      emailRateLimit.delete(key)
    }
  })
}, 1000 * 60 * 5) // Clean up every 5 minutes

# 🚀 BPSC Teacher App - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Local Testing
- [ ] Application builds successfully (`npm run build`)
- [ ] All pages load correctly in development
- [ ] Language switching works (English/Hindi)
- [ ] Search functionality works
- [ ] Contact form works
- [ ] Mock tests work
- [ ] No console errors

### 2. Environment Variables
- [ ] Copy `env.production.template` to `.env.local`
- [ ] Fill in your actual values:
  - [ ] Database URL (PostgreSQL)
  - [ ] NextAuth secret (generate a secure random string)
  - [ ] OpenAI API key
  - [ ] Google Analytics ID (G-1TV023FZJC)
  - [ ] Email service credentials (optional)

### 3. Database Setup
- [ ] Create PostgreSQL database on GoDaddy
- [ ] Note down connection details
- [ ] Update DATABASE_URL in `.env.local`

### 4. Files Ready for Upload
- [ ] All source code files
- [ ] `package.json` (updated with start script)
- [ ] `server.js` (custom server for GoDaddy)
- [ ] `.env.local` (with production values)
- [ ] `next.config.js`
- [ ] `prisma/` folder
- [ ] `public/` folder

## 🎯 GoDaddy Deployment Steps

### 1. Hosting Setup
- [ ] Log into GoDaddy cPanel
- [ ] Create Node.js app
- [ ] Set Node.js version to 18.x or 20.x
- [ ] Set startup file to `server.js`

### 2. File Upload
- [ ] Upload all files to `/bpseteacher/`
- [ ] Ensure proper file permissions
- [ ] Verify all files are uploaded correctly

### 3. Database Migration
- [ ] Run `npx prisma generate`
- [ ] Run `npm run db:migrate:deploy`
- [ ] Run `npm run db:seed`

### 4. Build & Start
- [ ] Run `npm install --production`
- [ ] Run `npm run build`
- [ ] Start the application

### 5. Domain Configuration
- [ ] Point domain to hosting
- [ ] Install SSL certificate
- [ ] Force HTTPS redirect

## 🔍 Post-Deployment Testing

### 1. Basic Functionality
- [ ] Home page loads at `https://bpseteacher.com`
- [ ] Navigation works
- [ ] Language switching works
- [ ] All pages are accessible

### 2. Core Features
- [ ] Search functionality works
- [ ] AI agent responds correctly
- [ ] Contact form submits successfully
- [ ] Mock tests work
- [ ] STET information displays correctly

### 3. Performance
- [ ] Page load times are acceptable
- [ ] Images load correctly
- [ ] No 404 errors
- [ ] No 500 errors

### 4. SEO & Analytics
- [ ] Google Analytics is tracking
- [ ] Meta tags are present
- [ ] Sitemap is accessible
- [ ] Robots.txt is working

## 🛡️ Security Verification

- [ ] Environment variables are not exposed
- [ ] SSL certificate is active
- [ ] Rate limiting is working
- [ ] Spam protection is active
- [ ] Database is secured

## 📧 Email Setup (Optional)

- [ ] Choose email service (SendGrid/AWS SES/SMTP)
- [ ] Configure email credentials
- [ ] Test contact form email delivery
- [ ] Verify spam protection

## 🎉 Launch Ready!

Once all items are checked:
- [ ] Monitor application for 24-48 hours
- [ ] Check Google Analytics for traffic
- [ ] Monitor error logs
- [ ] Test contact form submissions

## 🆘 Troubleshooting

If you encounter issues:
1. Check GoDaddy error logs
2. Verify environment variables
3. Test database connection
4. Check file permissions
5. Contact GoDaddy support if needed

---

**Your BPSC Teacher application will be live at: https://bpseteacher.com** 🎓

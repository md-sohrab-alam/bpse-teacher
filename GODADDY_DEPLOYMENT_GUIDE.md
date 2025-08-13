# 🚀 BPSC Teacher App - GoDaddy Deployment Guide

## 🎯 **Complete Deployment with All Features**

This guide will deploy your BPSC Teacher app to GoDaddy with **100% functionality**:
- ✅ AI Search with Hindi support
- ✅ PostgreSQL database
- ✅ Contact form with email notifications
- ✅ Mock tests with scoring
- ✅ User authentication
- ✅ Google Analytics
- ✅ SEO optimization

## 📋 **Prerequisites**

### 1. GoDaddy Account
- GoDaddy hosting account with Node.js support
- Domain: `bpseteacher.com`
- cPanel access

### 2. Required Services
- **PostgreSQL Database** (GoDaddy or external)
- **OpenAI API Key** (for AI search)
- **Email Service** (SendGrid/AWS SES for contact form)

## 🎯 **Step 1: GoDaddy Hosting Setup**

### 1.1 Access GoDaddy cPanel
1. Log into your GoDaddy account
2. Go to your hosting control panel
3. Access cPanel

### 1.2 Create Node.js App
1. In cPanel, find **"Node.js"** or **"Node.js Selector"**
2. Click **"Create Application"**
3. Fill in the details:
   ```
   App Name: bpseteacher
   Node.js Version: 18.x (or 20.x)
   App Root: /bpseteacher
   App URL: https://bpseteacher.com
   App Startup File: server.js
   ```
4. Click **"Create"**

## 🗄️ **Step 2: Database Setup**

### 2.1 Create PostgreSQL Database
1. In cPanel, find **"PostgreSQL Databases"**
2. Click **"Create Database"**
3. Fill in:
   ```
   Database Name: bpseteacher_db
   Database User: bpseteacher_user
   Password: [create a strong password]
   ```
4. Note down these details for your `.env.local`

### 2.2 Alternative: External Database
If GoDaddy doesn't provide PostgreSQL, use:
- **Railway** (free tier available)
- **Supabase** (free tier available)
- **Neon** (free tier available)

## 📁 **Step 3: Upload Application Files**

### 3.1 Prepare Files
Create a `.env.local` file with your production settings:

```env
# Database Configuration
DATABASE_URL="postgresql://bpseteacher_user:your_password@localhost:5432/bpseteacher_db"

# NextAuth Configuration
NEXTAUTH_URL="https://bpseteacher.com"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI API (for AI search functionality)
OPENAI_API_KEY="your-openai-api-key"

# Google Analytics
NEXT_PUBLIC_GA_ID="G-1TV023FZJC"

# Email Service (Choose one)
# Option 1: SendGrid
SENDGRID_API_KEY="your-sendgrid-api-key"

# Option 2: AWS SES
# AWS_SES_ACCESS_KEY="your-aws-access-key"
# AWS_SES_SECRET_KEY="your-aws-secret-key"
# AWS_SES_REGION="us-east-1"

# Environment
NODE_ENV="production"
```

### 3.2 Upload Files
1. Use **File Manager** in cPanel or **FTP**
2. Upload all project files to `/bpseteacher/`
3. Ensure these files are included:
   - All source code files
   - `package.json`
   - `server.js`
   - `.env.local`
   - `next.config.js`
   - `prisma/` folder
   - `public/` folder

## 🔧 **Step 4: Server Configuration**

### 4.1 Install Dependencies
1. Access **SSH Terminal** in cPanel
2. Navigate to your app:
   ```bash
   cd /bpseteacher
   ```
3. Install dependencies:
   ```bash
   npm install --production
   ```

### 4.2 Database Setup
1. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
2. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Seed the database:
   ```bash
   npm run db:seed
   ```

### 4.3 Build Application
```bash
npm run build
```

## 🚀 **Step 5: Start the Application**

### 5.1 Configure Node.js App
1. Go back to **Node.js** in cPanel
2. Set **Startup File** to: `server.js`
3. Set **Node.js Version** to: `18.x`
4. Click **"Restart"**

### 5.2 Verify Deployment
1. Visit `https://bpseteacher.com`
2. Test all features:
   - ✅ Home page loads
   - ✅ Language switching works
   - ✅ AI search works
   - ✅ Contact form submits
   - ✅ Mock tests work
   - ✅ STET information displays

## 🌐 **Step 6: Domain & SSL Setup**

### 6.1 SSL Certificate
1. In cPanel, find **"SSL/TLS"**
2. Install SSL certificate for `bpseteacher.com`
3. Force HTTPS redirect

### 6.2 Domain Configuration
1. Ensure domain points to GoDaddy hosting
2. Set up DNS records if needed
3. Test domain resolution

## 📧 **Step 7: Email Service Setup**

### 7.1 SendGrid Setup (Recommended)
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Update `.env.local`:
   ```env
   SENDGRID_API_KEY="your-sendgrid-api-key"
   ```
4. Update `lib/email-config.ts` to use SendGrid

### 7.2 AWS SES Setup (Alternative)
1. Create AWS account
2. Set up SES in your preferred region
3. Get access keys
4. Update `.env.local` with AWS credentials

## 🔍 **Step 8: Testing & Verification**

### 8.1 Functionality Tests
- [ ] **Homepage** - Loads correctly
- [ ] **Navigation** - All links work
- [ ] **Language Switch** - English/Hindi
- [ ] **AI Search** - Responds in both languages
- [ ] **Contact Form** - Submits and sends email
- [ ] **Mock Tests** - Complete test flow
- [ ] **STET Info** - Displays correctly
- [ ] **Google Analytics** - Tracking active

### 8.2 Performance Tests
- [ ] **Page Load Speed** - Under 3 seconds
- [ ] **Mobile Responsive** - Works on all devices
- [ ] **SEO Meta Tags** - Present and correct
- [ ] **SSL Certificate** - HTTPS working

## 🛡️ **Step 9: Security & Monitoring**

### 9.1 Security Checklist
- [ ] Environment variables are set
- [ ] SSL certificate is active
- [ ] Database is secured
- [ ] API keys are protected
- [ ] Rate limiting is working
- [ ] Spam protection is active

### 9.2 Monitoring Setup
- [ ] Google Analytics tracking
- [ ] Error monitoring (optional)
- [ ] Uptime monitoring (optional)
- [ ] Performance monitoring

## 🎉 **Step 10: Launch & Maintenance**

### 10.1 Pre-Launch Checklist
- [ ] All features tested
- [ ] Database seeded
- [ ] Email service configured
- [ ] SSL certificate active
- [ ] Google Analytics tracking
- [ ] Contact form working

### 10.2 Post-Launch Tasks
- [ ] Monitor for 24-48 hours
- [ ] Check error logs
- [ ] Test contact form submissions
- [ ] Monitor Google Analytics
- [ ] Backup database regularly

## 🆘 **Troubleshooting**

### Common Issues

1. **Build Errors**
   - Check Node.js version compatibility
   - Ensure all dependencies installed
   - Verify environment variables

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check database credentials
   - Ensure database is accessible

3. **500 Errors**
   - Check server logs in cPanel
   - Verify file permissions
   - Ensure all files uploaded

4. **Contact Form Not Working**
   - Check email service configuration
   - Verify API keys
   - Test email service separately

## 📞 **Support Resources**

- **GoDaddy Support**: Contact GoDaddy for hosting issues
- **Application Logs**: Check cPanel error logs
- **Database Issues**: Verify PostgreSQL connection
- **Email Issues**: Test email service configuration

---

## 🎯 **Your BPSC Teacher App is Live!**

**URL**: https://bpseteacher.com

**Features Working**:
- ✅ AI-powered search with Hindi support
- ✅ Complete mock test system
- ✅ Contact form with email notifications
- ✅ Database for user data
- ✅ Google Analytics tracking
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ SSL secured

**Next Steps**:
1. Monitor the application
2. Collect user feedback
3. Optimize performance
4. Add new features as needed

Your BPSC Teacher application is now fully functional and ready to help students prepare for their exams! 🎓

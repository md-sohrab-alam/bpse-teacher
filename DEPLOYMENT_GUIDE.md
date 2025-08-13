# BPSC Teacher App - GoDaddy Deployment Guide

## Prerequisites
- GoDaddy hosting account with Node.js support
- Domain: `https://bpseteacher.com`
- Database: PostgreSQL (provided by GoDaddy or external service)

## Step 1: Prepare Your Local Environment

### 1.1 Build the Application
```bash
npm run build
```

### 1.2 Environment Variables
Create a `.env.local` file with your production settings:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_URL="https://bpseteacher.com"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Google Analytics
NEXT_PUBLIC_GA_ID="G-1TV023FZJC"

# Email Service (Optional - for contact form)
SENDGRID_API_KEY="your-sendgrid-key"
# OR
AWS_SES_ACCESS_KEY="your-aws-key"
AWS_SES_SECRET_KEY="your-aws-secret"
AWS_SES_REGION="us-east-1"
```

## Step 2: GoDaddy Hosting Setup

### 2.1 Access GoDaddy cPanel
1. Log into your GoDaddy account
2. Go to your hosting control panel
3. Access cPanel

### 2.2 Database Setup
1. In cPanel, find "MySQL Databases" or "PostgreSQL Databases"
2. Create a new database
3. Create a database user
4. Assign the user to the database with full privileges
5. Note down the connection details for your `.env.local`

### 2.3 Node.js Setup
1. In cPanel, find "Node.js" or "Node.js Selector"
2. Create a new Node.js app:
   - App name: `bpseteacher`
   - Node.js version: `18.x` or `20.x`
   - App root: `/bpseteacher`
   - App URL: `https://bpseteacher.com`
   - App startup file: `server.js`

## Step 3: Upload and Deploy

### 3.1 Upload Files
1. Use File Manager in cPanel or FTP
2. Upload all project files to `/bpseteacher/`
3. Make sure to include:
   - All source files
   - `package.json`
   - `.env.local`
   - `next.config.js`
   - `prisma/` folder

### 3.2 Install Dependencies
1. Access SSH terminal in cPanel
2. Navigate to your app directory:
   ```bash
   cd /bpseteacher
   ```
3. Install dependencies:
   ```bash
   npm install --production
   ```

### 3.3 Database Migration
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

### 3.4 Build the Application
```bash
npm run build
```

## Step 4: Configure the Server

### 4.1 Create Server File
Create `server.js` in your app root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
```

### 4.2 Update package.json Scripts
Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "next build",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate deploy",
    "db:seed": "ts-node prisma/seed.ts"
  }
}
```

## Step 5: Start the Application

### 5.1 Start the App
In your GoDaddy Node.js app settings:
1. Set the startup file to `server.js`
2. Set the Node.js version
3. Click "Restart" to start your application

### 5.2 Verify Deployment
1. Visit `https://bpseteacher.com`
2. Test all major features:
   - Home page loads correctly
   - Language switching works
   - Search functionality works
   - Contact form works
   - Mock tests work

## Step 6: Post-Deployment Setup

### 6.1 SSL Certificate
1. In cPanel, find "SSL/TLS"
2. Install SSL certificate for your domain
3. Force HTTPS redirect

### 6.2 Domain Configuration
1. Point your domain to the hosting server
2. Set up DNS records if needed
3. Configure subdomains if required

### 6.3 Monitoring
1. Set up error monitoring (optional)
2. Monitor Google Analytics
3. Check server logs regularly

## Step 7: Email Service Setup (Optional)

### 7.1 SendGrid Setup
1. Create a SendGrid account
2. Get your API key
3. Update your `.env.local`:
   ```env
   SENDGRID_API_KEY="your-sendgrid-key"
   ```
4. Update `lib/email-config.ts` to use SendGrid

### 7.2 AWS SES Setup
1. Create an AWS account
2. Set up SES in your preferred region
3. Get your access keys
4. Update your `.env.local`:
   ```env
   AWS_SES_ACCESS_KEY="your-aws-key"
   AWS_SES_SECRET_KEY="your-aws-secret"
   AWS_SES_REGION="us-east-1"
   ```

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version compatibility
   - Ensure all dependencies are installed
   - Verify environment variables

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check database credentials
   - Ensure database is accessible from hosting

3. **500 Errors**
   - Check server logs
   - Verify file permissions
   - Ensure all required files are uploaded

4. **Performance Issues**
   - Enable caching
   - Optimize images
   - Use CDN for static assets

## Security Checklist

- [ ] Environment variables are set
- [ ] SSL certificate is installed
- [ ] Database is secured
- [ ] API keys are protected
- [ ] Rate limiting is working
- [ ] Spam protection is active

## Performance Optimization

- [ ] Enable gzip compression
- [ ] Set up CDN
- [ ] Optimize images
- [ ] Enable caching headers
- [ ] Monitor Core Web Vitals

## Support

If you encounter issues:
1. Check GoDaddy hosting logs
2. Verify all environment variables
3. Test locally first
4. Contact GoDaddy support if needed

Your BPSC Teacher application should now be live at `https://bpseteacher.com`!

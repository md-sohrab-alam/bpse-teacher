# 🚀 BPSC Teacher App - GitHub Pages Deployment Guide

## 🎯 **Strategy: GitHub Pages → GoDaddy Domain**

This approach lets you:
1. **Deploy quickly** to GitHub Pages (free, static hosting)
2. **Test thoroughly** with a live URL
3. **Switch domain** to GoDaddy when ready
4. **Keep full functionality** by moving to GoDaddy later

## 📋 **What Works on GitHub Pages**

### ✅ **Static Features (Will Work)**
- Home page and navigation
- STET information pages
- Mock tests (client-side)
- Language switching (English/Hindi)
- Contact form (will submit to external service)
- Google Analytics
- SEO meta tags
- Responsive design

### ❌ **Server Features (Won't Work)**
- AI search functionality
- Database operations
- API routes
- Server-side rendering

## 🚀 **Step 1: Prepare for GitHub Pages**

### 1.1 Update package.json
Add GitHub Pages deployment scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export",
    "deploy": "npm run build && touch out/.nojekyll"
  }
}
```

### 1.2 Create GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
      env:
        NEXT_PUBLIC_GA_ID: ${{ secrets.NEXT_PUBLIC_GA_ID }}
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## 🎯 **Step 2: GitHub Repository Setup**

### 2.1 Create GitHub Repository
1. Go to GitHub.com
2. Create new repository: `bpseteacher`
3. Make it public (required for free GitHub Pages)
4. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bpseteacher.git
git push -u origin main
```

### 2.2 Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: "Deploy from a branch"
4. Branch: "gh-pages" (will be created by GitHub Actions)
5. Folder: "/ (root)"
6. Click "Save"

## 🔧 **Step 3: Configure for Static Export**

### 3.1 Update Environment Variables
Create `.env.local` for GitHub Pages:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID="G-1TV023FZJC"

# Environment
NODE_ENV="production"
```

### 3.2 Disable Server Features Temporarily
Comment out server-side features in components that use them.

## 🚀 **Step 4: Deploy to GitHub Pages**

### 4.1 Push Code
```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push
```

### 4.2 Check Deployment
1. Go to Actions tab in GitHub
2. Watch the deployment workflow
3. Once complete, visit: `https://YOUR_USERNAME.github.io/bpseteacher`

## 🌐 **Step 5: Connect GoDaddy Domain**

### 5.1 Add Custom Domain
1. In GitHub repository Settings → Pages
2. Add custom domain: `bpseteacher.com`
3. Check "Enforce HTTPS"
4. Save

### 5.2 Configure DNS in GoDaddy
1. Log into GoDaddy
2. Go to DNS Management for `bpseteacher.com`
3. Add/Update these records:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 600

Type: A
Name: @
Value: 185.199.109.153
TTL: 600

Type: A
Name: @
Value: 185.199.110.153
TTL: 600

Type: A
Name: @
Value: 185.199.111.153
TTL: 600

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 600
```

### 5.3 Wait for DNS Propagation
- Can take 24-48 hours
- Check with: `nslookup bpseteacher.com`

## 🔄 **Step 6: Full Migration to GoDaddy (Later)**

When you're ready for full functionality:

### 6.1 Prepare GoDaddy Hosting
1. Set up Node.js hosting on GoDaddy
2. Create PostgreSQL database
3. Configure environment variables

### 6.2 Update DNS
1. Point domain to GoDaddy hosting
2. Remove GitHub Pages custom domain
3. Update DNS records to GoDaddy IP

### 6.3 Deploy Full Application
1. Upload code to GoDaddy
2. Run database migrations
3. Enable all server features

## 📊 **Benefits of This Approach**

### ✅ **Immediate Benefits**
- **Live testing** - Get feedback quickly
- **SEO start** - Begin indexing immediately
- **User feedback** - Collect early user input
- **No server costs** - Free hosting initially

### ✅ **Easy Migration**
- **Same domain** - No URL changes needed
- **Gradual transition** - Move features one by one
- **Zero downtime** - Seamless switch
- **Fallback option** - Can revert if needed

## 🛠️ **Temporary Limitations**

### During GitHub Pages Phase:
- ❌ AI search won't work (needs server)
- ❌ Contact form needs external service
- ❌ No database features
- ❌ Limited dynamic content

### Solutions:
- **Contact Form**: Use Formspree, Netlify Forms, or similar
- **AI Search**: Disable temporarily or use external API
- **Database**: Use localStorage for mock data

## 🎯 **Recommended Timeline**

### Week 1: GitHub Pages Launch
- Deploy static version
- Test all static features
- Collect user feedback
- Begin SEO optimization

### Week 2-3: GoDaddy Setup
- Set up hosting and database
- Configure full environment
- Test server features locally

### Week 4: Full Migration
- Switch DNS to GoDaddy
- Enable all features
- Monitor performance

## 🚀 **Quick Start Commands**

```bash
# 1. Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/bpseteacher.git
git push -u origin main

# 3. Deploy (automatic via GitHub Actions)
# Just push to main branch!

# 4. Check deployment
# Visit: https://YOUR_USERNAME.github.io/bpseteacher
```

## 🎉 **Success Metrics**

### GitHub Pages Phase:
- [ ] Site loads at GitHub Pages URL
- [ ] All static pages work
- [ ] Language switching works
- [ ] Mock tests work
- [ ] Contact form submits (to external service)
- [ ] Google Analytics tracking

### GoDaddy Migration:
- [ ] Domain points to GoDaddy
- [ ] All server features work
- [ ] Database operations work
- [ ] AI search functional
- [ ] Performance optimized

---

**Your BPSC Teacher app will be live at: https://bpseteacher.com** 🎓

This approach gives you the best of both worlds: quick deployment and full functionality when ready!

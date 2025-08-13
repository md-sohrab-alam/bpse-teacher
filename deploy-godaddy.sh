#!/bin/bash

# BPSC Teacher - GoDaddy Deployment Script

echo "🚀 BPSC Teacher App - GoDaddy Deployment"
echo "========================================"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "📝 Please copy env.production.template to .env.local and fill in your values"
    echo "   cp env.production.template .env.local"
    exit 1
fi

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎯 Next Steps for GoDaddy Deployment:"
echo "====================================="
echo ""
echo "1. 📁 Upload Files to GoDaddy:"
echo "   - Upload all project files to /bpseteacher/"
echo "   - Include: package.json, server.js, .env.local, next.config.js"
echo "   - Include: prisma/ folder, public/ folder"
echo ""
echo "2. 🗄️ Database Setup:"
echo "   - Create PostgreSQL database in GoDaddy cPanel"
echo "   - Note down connection details"
echo "   - Update DATABASE_URL in .env.local"
echo ""
echo "3. 🔧 Server Configuration:"
echo "   - Access SSH terminal in cPanel"
echo "   - Run: cd /bpseteacher"
echo "   - Run: npm install --production"
echo "   - Run: npx prisma generate"
echo "   - Run: npx prisma migrate deploy"
echo "   - Run: npm run db:seed"
echo "   - Run: npm run build"
echo ""
echo "4. 🚀 Start Application:"
echo "   - In Node.js app settings, set startup file to: server.js"
echo "   - Set Node.js version to: 18.x"
echo "   - Click 'Restart'"
echo ""
echo "5. 🌐 Domain & SSL:"
echo "   - Install SSL certificate for bpseteacher.com"
echo "   - Force HTTPS redirect"
echo ""
echo "6. 📧 Email Service:"
echo "   - Set up SendGrid or AWS SES"
echo "   - Update email credentials in .env.local"
echo ""
echo "7. ✅ Testing:"
echo "   - Visit: https://bpseteacher.com"
echo "   - Test all features: AI search, contact form, mock tests"
echo ""
echo "📋 For detailed instructions, see: GODADDY_DEPLOYMENT_GUIDE.md"
echo "📋 For checklist, see: GODADDY_DEPLOYMENT_CHECKLIST.md"
echo ""
echo "🎉 Your BPSC Teacher app will be live with ALL features working!"

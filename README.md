# BPSC Teacher - Bihar Govt Teacher Guide

A comprehensive bilingual (English + Hindi) website providing everything students need to become government teachers in Bihar: STET (BSEB) + BPSC Teacher Recruitment.

## 🌟 Features

### Core Features
- **Bilingual Support**: Complete English and Hindi interface
- **Eligibility Checker**: Interactive form to check eligibility for both exams
- **Exam Information**: Detailed information about STET and BPSC Teacher exams
- **Mock Tests**: Practice tests with timer and negative marking
- **News & Updates**: Latest exam notifications and updates
- **Syllabus**: Complete syllabus for all subjects and levels
- **Cut-off Analysis**: Historical cut-off data and trends
- **Resources**: Downloadable PDFs and official links

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** + **shadcn/ui** for modern UI
- **Prisma** + **PostgreSQL** for database
- **NextAuth** for authentication (Email + Google)
- **next-intl** for internationalization
- **React Hook Form** + **Zod** for form validation
- **SEO Optimized** with metadata and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bpscteacher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/bpscteacher"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Email (for NextAuth email provider)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@bpscteacher.com"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with initial data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bpscteacher/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Home page
│   │   ├── eligibility/   # Eligibility checker
│   │   ├── stet/          # STET exam pages
│   │   ├── bpsc-teacher/  # BPSC Teacher pages
│   │   └── layout.tsx     # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   └── ...               # Other components
├── lib/                  # Utility functions
│   ├── db.ts            # Prisma client
│   └── utils.ts         # Helper functions
├── messages/             # Internationalization
│   ├── en.json          # English translations
│   └── hi.json          # Hindi translations
├── prisma/              # Database
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
└── types/               # TypeScript types
```

## 🗄️ Database Schema

### Core Models
- **User**: Authentication and user profiles
- **Exam**: STET and BPSC Teacher exam information
- **MockTest**: Practice tests with questions
- **News**: Latest updates and notifications
- **RuleSet**: Eligibility rules engine
- **Attempt**: User test attempts and results

### Key Features
- **Bilingual Content**: All content stored in both English and Hindi
- **Flexible Rules Engine**: JSON-based eligibility rules
- **Audit Trail**: Created/updated timestamps on all models
- **Relationships**: Proper foreign key relationships with cascade deletes

## 🎯 Key Pages

### Home Page (`/`)
- Hero section with search functionality
- Exam cards for STET and BPSC Teacher
- Quick links to key features
- Latest updates section

### Eligibility Checker (`/eligibility`)
- Interactive form with all eligibility criteria
- Real-time validation and feedback
- PDF download and result saving
- Bilingual form labels

### Exam Pages (`/stet`, `/bpsc-teacher`)
- Tabbed interface (Overview, Eligibility, Dates, Syllabus, etc.)
- Sticky sidebar with quick actions
- Latest update badges
- Downloadable resources

### Mock Tests (`/mock-tests`)
- Timer-based tests with negative marking
- Question navigator (desktop) / bottom drawer (mobile)
- Result analytics with PDF download
- Bilingual questions and explanations

## 🔧 Configuration

### Internationalization
The app supports English and Hindi. Language switching is available in the navigation.

### Authentication
- **Email Provider**: Magic link authentication
- **Google OAuth**: Social login (optional)
- **Role-based Access**: STUDENT and ADMIN roles

### Database
- **PostgreSQL**: Primary database
- **Prisma**: ORM with type safety
- **Seeding**: Initial data with exams, news, and mock tests

## 📊 SEO & Performance

### SEO Features
- **Metadata**: Dynamic meta tags for all pages
- **Open Graph**: Social media sharing
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Auto-generated sitemap
- **Canonical URLs**: Proper canonical tags

### Performance
- **Next.js 14**: Latest features and optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Built-in caching strategies

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Database Tests
```bash
npm run test:db
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy PostgreSQL integration
- **DigitalOcean**: App Platform deployment

## 📝 Content Management

### Adding News
1. Access admin panel (`/admin`)
2. Navigate to News section
3. Add new news item with bilingual content
4. Set tags and exam association

### Updating Eligibility Rules
1. Go to Admin > Rule Sets
2. Edit JSON rules for specific exam/level
3. Rules are versioned and can be activated/deactivated

### Importing Questions
1. Use the JSON/CSV import wizard in admin
2. Format: Question text, options, correct answer, explanation
3. Support for both English and Hindi content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the docs folder
- **Issues**: Report bugs on GitHub
- **Discussions**: Ask questions in GitHub Discussions

## 🔗 Links

- **Website**: [https://bpscteacher.com](https://bpscteacher.com)
- **Documentation**: [https://docs.bpscteacher.com](https://docs.bpscteacher.com)
- **GitHub**: [https://github.com/your-org/bpscteacher](https://github.com/your-org/bpscteacher)

---

Built with ❤️ for Bihar's aspiring teachers

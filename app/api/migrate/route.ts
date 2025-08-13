import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering to prevent build-time database connection
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Create tables if they don't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Exam" (
        "id" TEXT NOT NULL,
        "key" TEXT NOT NULL,
        "nameEn" TEXT NOT NULL,
        "nameHi" TEXT NOT NULL,
        "descriptionEn" TEXT NOT NULL,
        "descriptionHi" TEXT NOT NULL,
        "syllabusEn" TEXT NOT NULL,
        "syllabusHi" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
      )
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ExamDate" (
        "id" TEXT NOT NULL,
        "examId" TEXT NOT NULL,
        "date" TIMESTAMP(3),
        "descriptionEn" TEXT NOT NULL,
        "descriptionHi" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "ExamDate_pkey" PRIMARY KEY ("id")
      )
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ContactSubmission" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "subject" TEXT NOT NULL DEFAULT '',
        "message" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "ipAddress" TEXT NOT NULL,
        "userAgent" TEXT NOT NULL,
        "locale" TEXT NOT NULL,
        "isSpam" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
      )
    `

    // Create unique constraint on Exam.key
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "Exam_key_key" ON "Exam"("key")
    `

    // Add foreign key constraints
    await prisma.$executeRaw`
      ALTER TABLE "ExamDate" ADD CONSTRAINT "ExamDate_examId_fkey" 
      FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    `

    // Seed the database with STET exam data
    await prisma.exam.upsert({
      where: { key: 'STET' },
      update: {},
      create: {
        id: 'stet-exam',
        key: 'STET',
        overviewEn: 'STET (BSEB) - Secondary Teacher Eligibility Test',
        overviewHi: 'STET (BSEB) - माध्यमिक शिक्षक पात्रता परीक्षा',
        eligibilityEn: 'Secondary Teacher Eligibility Test conducted by Bihar School Examination Board',
        eligibilityHi: 'बिहार विद्यालय परीक्षा समिति द्वारा आयोजित माध्यमिक शिक्षक पात्रता परीक्षा',
        patternEn: 'Paper I (Classes 9-10) and Paper II (Classes 11-12)',
        patternHi: 'पेपर I (कक्षा 9-10) और पेपर II (कक्षा 11-12)',
        syllabusEn: `Paper I (Classes 9-10):
• Child Development and Pedagogy
• Language I (English/Hindi)
• Language II (English/Hindi)
• Mathematics
• Science
• Social Studies

Paper II (Classes 11-12):
• Child Development and Pedagogy
• Language I (English/Hindi)
• Language II (English/Hindi)
• Mathematics and Science OR Social Studies`,
        syllabusHi: `पेपर I (कक्षा 9-10):
• बाल विकास और शिक्षाशास्त्र
• भाषा I (अंग्रेजी/हिंदी)
• भाषा II (अंग्रेजी/हिंदी)
• गणित
• विज्ञान
• सामाजिक अध्ययन

पेपर II (कक्षा 11-12):
• बाल विकास और शिक्षाशास्त्र
• भाषा I (अंग्रेजी/हिंदी)
• भाषा II (अंग्रेजी/हिंदी)
• गणित और विज्ञान या सामाजिक अध्ययन`
      }
    })

    await prisma.exam.upsert({
      where: { key: 'BPSC_TEACHER' },
      update: {},
      create: {
        id: 'bpsc-teacher-exam',
        key: 'BPSC_TEACHER',
        overviewEn: 'BPSC Teacher Recruitment',
        overviewHi: 'बीपीएससी शिक्षक भर्ती',
        eligibilityEn: 'Bihar Public Service Commission Teacher Recruitment Examination',
        eligibilityHi: 'बिहार लोक सेवा आयोग शिक्षक भर्ती परीक्षा',
        patternEn: 'General Studies + Subject Knowledge',
        patternHi: 'सामान्य अध्ययन + विषय ज्ञान',
        syllabusEn: `General Studies:
• Indian History and Culture
• Geography of India and Bihar
• Indian Polity and Economy
• General Science
• Current Affairs

Subject Knowledge:
• Mathematics
• Science
• Social Studies
• Language (English/Hindi)`,
        syllabusHi: `सामान्य अध्ययन:
• भारतीय इतिहास और संस्कृति
• भारत और बिहार का भूगोल
• भारतीय राजनीति और अर्थव्यवस्था
• सामान्य विज्ञान
• करंट अफेयर्स

विषय ज्ञान:
• गणित
• विज्ञान
• सामाजिक अध्ययन
• भाषा (अंग्रेजी/हिंदी)`
      }
    })

    // Add exam dates
    await prisma.examDate.upsert({
      where: { id: 'stet-date-1' },
      update: {},
      create: {
        id: 'stet-date-1',
        examId: 'stet-exam',
        date: null, // To be announced
        labelEn: 'STET 2024 - To Be Announced',
        labelHi: 'STET 2024 - घोषित किया जाना है'
      }
    })

    await prisma.examDate.upsert({
      where: { id: 'bpsc-teacher-date-1' },
      update: {},
      create: {
        id: 'bpsc-teacher-date-1',
        examId: 'bpsc-teacher-exam',
        date: null, // To be announced
        labelEn: 'BPSC Teacher Recruitment 2024 - To Be Announced',
        labelHi: 'बीपीएससी शिक्षक भर्ती 2024 - घोषित किया जाना है'
      }
    })

    await prisma.$disconnect()

    return NextResponse.json({ 
      success: true, 
      message: 'Database migrated and seeded successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Migration error:', error)
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

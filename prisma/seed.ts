import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create STET Exam
  const stetExam = await prisma.exam.upsert({
    where: { key: 'STET' },
    update: {},
    create: {
      key: 'STET',
      overviewEn: 'Bihar Secondary Teacher Eligibility Test (STET) is conducted by Bihar School Examination Board (BSEB) to determine the eligibility of candidates for appointment as teachers in Classes 9-10 and 11-12 in government and government-aided schools of Bihar.',
      overviewHi: 'बिहार माध्यमिक शिक्षक पात्रता परीक्षा (STET) बिहार विद्यालय परीक्षा समिति (BSEB) द्वारा कक्षा 9-10 और 11-12 के शिक्षकों की नियुक्ति के लिए उम्मीदवारों की पात्रता निर्धारित करने के लिए आयोजित की जाती है।',
      eligibilityEn: '**Age Limit:** 21-37 years (relaxation for reserved categories)\n**Education:** Graduation with 50% marks and B.Ed/D.El.Ed\n**TET Requirement:** CTET/STET qualification required\n**Domicile:** Bihar domicile preferred\n**Note:** Pending 2025 notification for exact criteria',
      eligibilityHi: '**आयु सीमा:** 21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)\n**शिक्षा:** 50% अंकों के साथ स्नातक और B.Ed/D.El.Ed\n**TET आवश्यकता:** CTET/STET योग्यता आवश्यक\n**डोमिसाइल:** बिहार डोमिसाइल वरीयता\n**नोट:** सटीक मानदंडों के लिए 2025 अधिसूचना लंबित',
      patternEn: '**Paper-1 (Class 9-10):** 150 questions, 150 marks, 2.5 hours\n**Paper-2 (Class 11-12):** 150 questions, 150 marks, 2.5 hours\n**Question Type:** Objective MCQs\n**Negative Marking:** No negative marking\n**Note:** Pattern pending 2025 official notification',
      patternHi: '**पेपर-1 (कक्षा 9-10):** 150 प्रश्न, 150 अंक, 2.5 घंटे\n**पेपर-2 (कक्षा 11-12):** 150 प्रश्न, 150 अंक, 2.5 घंटे\n**प्रश्न प्रकार:** वस्तुनिष्ठ MCQs\n**नेगेटिव मार्किंग:** नहीं\n**नोट:** पैटर्न 2025 आधिकारिक अधिसूचना लंबित',
      syllabusEn: `# STET Syllabus

## Paper I (Primary - Classes I to V)

### Child Development and Pedagogy (30 Questions)
- Child Development (Primary School Child)
- Concept of Inclusive education and understanding children with special needs
- Learning and Pedagogy

### Language I (30 Questions)
- Language Comprehension
- Pedagogy of Language Development

### Language II (30 Questions)
- Comprehension
- Pedagogy of Language Development

### Mathematics (30 Questions)
- Content
- Pedagogical issues

### Environmental Studies (30 Questions)
- Content
- Pedagogical Issues

## Paper II (Upper Primary - Classes VI to VIII)

### Child Development and Pedagogy (30 Questions)
- Child Development (Elementary School Child)
- Concept of Inclusive education and understanding children with special needs
- Learning and Pedagogy

### Language I (30 Questions)
- Language Comprehension
- Pedagogy of Language Development

### Language II (30 Questions)
- Comprehension
- Pedagogy of Language Development

### Mathematics and Science (60 Questions)
- Mathematics (30 Questions)
- Science (30 Questions)

### Social Studies/Social Science (60 Questions)
- Social Studies (30 Questions)
- Social Science (30 Questions)`,
      syllabusHi: `# एसटीईटी पाठ्यक्रम

## पेपर I (प्राथमिक - कक्षा I से V)

### बाल विकास और शिक्षाशास्त्र (30 प्रश्न)
- बाल विकास (प्राथमिक स्कूल बच्चा)
- समावेशी शिक्षा की अवधारणा और विशेष आवश्यकताओं वाले बच्चों की समझ
- सीखना और शिक्षाशास्त्र

### भाषा I (30 प्रश्न)
- भाषा समझ
- भाषा विकास का शिक्षाशास्त्र

### भाषा II (30 प्रश्न)
- समझ
- भाषा विकास का शिक्षाशास्त्र

### गणित (30 प्रश्न)
- सामग्री
- शैक्षणिक मुद्दे

### पर्यावरण अध्ययन (30 प्रश्न)
- सामग्री
- शैक्षणिक मुद्दे

## पेपर II (उच्च प्राथमिक - कक्षा VI से VIII)

### बाल विकास और शिक्षाशास्त्र (30 प्रश्न)
- बाल विकास (प्राथमिक विद्यालय बच्चा)
- समावेशी शिक्षा की अवधारणा और विशेष आवश्यकताओं वाले बच्चों की समझ
- सीखना और शिक्षाशास्त्र

### भाषा I (30 प्रश्न)
- भाषा समझ
- भाषा विकास का शिक्षाशास्त्र

### भाषा II (30 प्रश्न)
- समझ
- भाषा विकास का शिक्षाशास्त्र

### गणित और विज्ञान (60 प्रश्न)
- गणित (30 प्रश्न)
- विज्ञान (30 प्रश्न)

### सामाजिक अध्ययन/सामाजिक विज्ञान (60 प्रश्न)
- सामाजिक अध्ययन (30 प्रश्न)
- सामाजिक विज्ञान (30 प्रश्न)`
    }
  })

  // Create BPSC Teacher Exam
  const bpscExam = await prisma.exam.upsert({
    where: { key: 'BPSC_TEACHER' },
    update: {},
    create: {
      key: 'BPSC_TEACHER',
      overviewEn: 'Bihar Public Service Commission (BPSC) Teacher Recruitment Examination (TRE) is conducted to recruit teachers for government schools in Bihar. The exam includes multiple phases and is conducted for different levels (Primary, Upper Primary, Secondary, Senior Secondary).',
      overviewHi: 'बिहार लोक सेवा आयोग (BPSC) शिक्षक भर्ती परीक्षा (TRE) बिहार के सरकारी स्कूलों में शिक्षकों की भर्ती के लिए आयोजित की जाती है। परीक्षा में कई चरण शामिल हैं और विभिन्न स्तरों (प्राथमिक, उच्च प्राथमिक, माध्यमिक, उच्च माध्यमिक) के लिए आयोजित की जाती है।',
      eligibilityEn: '**Age Limit:** 21-37 years (relaxation for reserved categories)\n**Education:** Graduation with 50% marks and B.Ed/D.El.Ed\n**TET Requirement:** CTET/STET qualification required\n**Domicile:** Bihar domicile with 84.4% posts prioritized for locals\n**Note:** Pending 2025 notification for exact criteria',
      eligibilityHi: '**आयु सीमा:** 21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)\n**शिक्षा:** 50% अंकों के साथ स्नातक और B.Ed/D.El.Ed\n**TET आवश्यकता:** CTET/STET योग्यता आवश्यक\n**डोमिसाइल:** बिहार डोमिसाइल, 84.4% पद स्थानीय लोगों के लिए आरक्षित\n**नोट:** सटीक मानदंडों के लिए 2025 अधिसूचना लंबित',
      patternEn: '**Three Parts:**\n- Language (Hindi/English)\n- General Studies (SCERT)\n- Concerned Subject\n**Total Questions:** 150\n**Duration:** 2.5 hours\n**Negative Marking:** Usually no negative marking (confirm per notification)\n**Note:** Pattern pending 2025 official notification',
      patternHi: '**तीन भाग:**\n- भाषा (हिंदी/अंग्रेजी)\n- सामान्य अध्ययन (SCERT)\n- संबंधित विषय\n**कुल प्रश्न:** 150\n**अवधि:** 2.5 घंटे\n**नेगेटिव मार्किंग:** आमतौर पर नहीं (अधिसूचना के अनुसार पुष्टि करें)\n**नोट:** पैटर्न 2025 आधिकारिक अधिसूचना लंबित',
      syllabusEn: `# BPSC Teacher Syllabus

## General Studies (40 Questions)
- Indian History
- Indian Geography
- Indian Polity
- Indian Economy
- General Science
- Current Affairs

## Subject Specific (80 Questions)
- Mathematics
- Science
- English
- Hindi
- Social Studies
- Computer Science

## Teaching Aptitude (20 Questions)
- Teaching Methods
- Educational Psychology
- Classroom Management
- Assessment and Evaluation`,
      syllabusHi: `# बीपीएससी शिक्षक पाठ्यक्रम

## सामान्य अध्ययन (40 प्रश्न)
- भारतीय इतिहास
- भारतीय भूगोल
- भारतीय राजनीति
- भारतीय अर्थव्यवस्था
- सामान्य विज्ञान
- करंट अफेयर्स

## विषय विशिष्ट (80 प्रश्न)
- गणित
- विज्ञान
- अंग्रेजी
- हिंदी
- सामाजिक अध्ययन
- कंप्यूटर विज्ञान

## शिक्षण योग्यता (20 प्रश्न)
- शिक्षण विधियां
- शैक्षिक मनोविज्ञान
- कक्षा प्रबंधन
- मूल्यांकन और आकलन`
    }
  })

  // Create Exam Dates
  await prisma.examDate.createMany({
    skipDuplicates: true,
    data: [
      {
        examId: stetExam.id,
        labelEn: '2025 Notification',
        labelHi: '2025 अधिसूचना',
        date: null
      },
      {
        examId: stetExam.id,
        labelEn: 'Application Start',
        labelHi: 'आवेदन शुरू',
        date: null
      },
      {
        examId: stetExam.id,
        labelEn: 'Application End',
        labelHi: 'आवेदन समाप्त',
        date: null
      },
      {
        examId: stetExam.id,
        labelEn: 'Exam Date',
        labelHi: 'परीक्षा तिथि',
        date: null
      },
      {
        examId: bpscExam.id,
        labelEn: 'TRE-4 Notification',
        labelHi: 'TRE-4 अधिसूचना',
        date: null
      },
      {
        examId: bpscExam.id,
        labelEn: 'Application Start',
        labelHi: 'आवेदन शुरू',
        date: null
      },
      {
        examId: bpscExam.id,
        labelEn: 'Application End',
        labelHi: 'आवेदन समाप्त',
        date: null
      },
      {
        examId: bpscExam.id,
        labelEn: 'Exam Date',
        labelHi: 'परीक्षा तिथि',
        date: null
      }
    ]
  })

  // Create Cutoffs
  await prisma.cutoff.createMany({
    skipDuplicates: true,
    data: [
      {
        examId: stetExam.id,
        year: 2024,
        category: 'General',
        passMarks: 75,
        cutoff: null,
        notesEn: 'Qualifying (50%)',
        notesHi: 'योग्यता (50%)'
      },
      {
        examId: stetExam.id,
        year: 2024,
        category: 'BC',
        passMarks: 68.25,
        cutoff: null,
        notesEn: 'Qualifying (45.5%)',
        notesHi: 'योग्यता (45.5%)'
      },
      {
        examId: stetExam.id,
        year: 2024,
        category: 'OBC',
        passMarks: 63.75,
        cutoff: null,
        notesEn: 'Qualifying (42.5%)',
        notesHi: 'योग्यता (42.5%)'
      },
      {
        examId: stetExam.id,
        year: 2024,
        category: 'SC/ST/PwD',
        passMarks: 60,
        cutoff: null,
        notesEn: 'Qualifying (40%)',
        notesHi: 'योग्यता (40%)'
      },
      {
        examId: stetExam.id,
        year: 2024,
        category: 'Women',
        passMarks: 60,
        cutoff: null,
        notesEn: 'Qualifying (40%)',
        notesHi: 'योग्यता (40%)'
      },
      {
        examId: bpscExam.id,
        year: 2025,
        category: 'General',
        passMarks: null,
        cutoff: null,
        notesEn: 'TBA - Pending 2025 notification',
        notesHi: 'TBA - 2025 अधिसूचना लंबित'
      },
      {
        examId: bpscExam.id,
        year: 2025,
        category: 'BC',
        passMarks: null,
        cutoff: null,
        notesEn: 'TBA - Pending 2025 notification',
        notesHi: 'TBA - 2025 अधिसूचना लंबित'
      },
      {
        examId: bpscExam.id,
        year: 2025,
        category: 'OBC',
        passMarks: null,
        cutoff: null,
        notesEn: 'TBA - Pending 2025 notification',
        notesHi: 'TBA - 2025 अधिसूचना लंबित'
      },
      {
        examId: bpscExam.id,
        year: 2025,
        category: 'SC/ST/PwD',
        passMarks: null,
        cutoff: null,
        notesEn: 'TBA - Pending 2025 notification',
        notesHi: 'TBA - 2025 अधिसूचना लंबित'
      }
    ]
  })

  // Create Downloads
  await prisma.download.createMany({
    skipDuplicates: true,
    data: [
      {
        examId: stetExam.id,
        titleEn: 'STET 2024 Official Notification',
        titleHi: 'एसटीईटी 2024 आधिकारिक सूचना',
        url: '/downloads/stet-2024-notification.pdf'
      },
      {
        examId: stetExam.id,
        titleEn: 'STET 2024 Application Form',
        titleHi: 'एसटीईटी 2024 आवेदन फॉर्म',
        url: '/downloads/stet-2024-application.pdf'
      },
      {
        examId: bpscExam.id,
        titleEn: 'BPSC Teacher 2024 Official Notification',
        titleHi: 'बीपीएससी शिक्षक 2024 आधिकारिक सूचना',
        url: '/downloads/bpsc-teacher-2024-notification.pdf'
      },
      {
        examId: bpscExam.id,
        titleEn: 'BPSC Teacher 2024 Application Form',
        titleHi: 'बीपीएससी शिक्षक 2024 आवेदन फॉर्म',
        url: '/downloads/bpsc-teacher-2024-application.pdf'
      }
    ]
  })

  // Create News
  await prisma.news.createMany({
    skipDuplicates: true,
    data: [
      {
        titleEn: 'Govt plans TRE-4 in 2025; domicile priority announced',
        titleHi: 'सरकार ने TRE-4 2025 में; डोमिसाइल वरीयता घोषित',
        sourceUrl: 'https://timesofindia.indiatimes.com/city/patna/bihar-govt-announces-domicile-priority-for-teacher-recruitment/articleshow/123456789.cms',
        tag: 'Policy',
        examKey: 'BPSC_TEACHER',
        publishedAt: new Date('2024-12-15')
      },
      {
        titleEn: 'Aspirants demand STET before TRE-4',
        titleHi: 'TRE-4 से पहले STET की मांग',
        sourceUrl: 'https://timesofindia.indiatimes.com/city/patna/aspirants-demand-stet-before-tre4/articleshow/123456790.cms',
        tag: 'Update',
        examKey: null,
        publishedAt: new Date('2024-12-10')
      },
      {
        titleEn: 'Special School Teacher recruitment 2025 notification out',
        titleHi: 'विशेष स्कूल शिक्षक भर्ती 2025 अधिसूचना जारी',
        sourceUrl: 'https://timesofindia.indiatimes.com/city/patna/special-school-teacher-recruitment-2025/articleshow/123456791.cms',
        tag: 'Notification',
        examKey: 'BPSC_TEACHER',
        publishedAt: new Date('2024-12-05')
      },
      {
        titleEn: 'STET 2025 notification pending - BSEB to announce soon',
        titleHi: 'STET 2025 अधिसूचना लंबित - BSEB जल्द घोषित करेगा',
        sourceUrl: 'https://secondary.biharboardonline.com/stet-2025',
        tag: 'Update',
        examKey: 'STET',
        publishedAt: new Date('2024-12-01')
      }
    ]
  })

  // Create Mock Test
  const mockTest = await prisma.mockTest.create({
    data: {
      examId: bpscExam.id,
      titleEn: 'BPSC Computer Teacher – Model Set 1',
      titleHi: 'बीपीएससी कंप्यूटर शिक्षक – मॉडल सेट 1',
      durationSec: 7200, // 2 hours
      negMarkPerQ: 0.25,
      isPublished: true
    }
  })

  // Create Questions for Mock Test
  await prisma.question.createMany({
    skipDuplicates: true,
    data: [
      {
        mockTestId: mockTest.id,
        textEn: 'What is the full form of CPU?',
        textHi: 'CPU का पूरा नाम क्या है?',
        optionAEn: 'Central Processing Unit',
        optionAHi: 'सेंट्रल प्रोसेसिंग यूनिट',
        optionBEn: 'Computer Personal Unit',
        optionBHi: 'कंप्यूटर पर्सनल यूनिट',
        optionCEn: 'Central Personal Unit',
        optionCHi: 'सेंट्रल पर्सनल यूनिट',
        optionDEn: 'Computer Processing Unit',
        optionDHi: 'कंप्यूटर प्रोसेसिंग यूनिट',
        correct: 'A',
        explanationEn: 'CPU stands for Central Processing Unit, which is the main component of a computer that performs most of the processing.',
        explanationHi: 'CPU का मतलब सेंट्रल प्रोसेसिंग यूनिट है, जो कंप्यूटर का मुख्य घटक है जो अधिकांश प्रोसेसिंग करता है।'
      },
      {
        mockTestId: mockTest.id,
        textEn: 'Which programming language is known as the "language of the web"?',
        textHi: 'कौन सी प्रोग्रामिंग भाषा को "वेब की भाषा" के रूप में जाना जाता है?',
        optionAEn: 'Java',
        optionAHi: 'जावा',
        optionBEn: 'Python',
        optionBHi: 'पायथन',
        optionCEn: 'JavaScript',
        optionCHi: 'जावास्क्रिप्ट',
        optionDEn: 'C++',
        optionDHi: 'सी++',
        correct: 'C',
        explanationEn: 'JavaScript is often called the "language of the web" because it is the primary language used for client-side web development.',
        explanationHi: 'जावास्क्रिप्ट को अक्सर "वेब की भाषा" कहा जाता है क्योंकि यह क्लाइंट-साइड वेब डेवलपमेंट के लिए प्राथमिक भाषा है।'
      },
      {
        mockTestId: mockTest.id,
        textEn: 'What does HTML stand for?',
        textHi: 'HTML का क्या मतलब है?',
        optionAEn: 'Hyper Text Markup Language',
        optionAHi: 'हाइपर टेक्स्ट मार्कअप लैंग्वेज',
        optionBEn: 'High Tech Modern Language',
        optionBHi: 'हाई टेक मॉडर्न लैंग्वेज',
        optionCEn: 'Home Tool Markup Language',
        optionCHi: 'होम टूल मार्कअप लैंग्वेज',
        optionDEn: 'Hyperlink and Text Markup Language',
        optionDHi: 'हाइपरलिंक और टेक्स्ट मार्कअप लैंग्वेज',
        correct: 'A',
        explanationEn: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.',
        explanationHi: 'HTML का मतलब हाइपर टेक्स्ट मार्कअप लैंग्वेज है, जो वेब पेज बनाने के लिए मानक मार्कअप भाषा है।'
      }
    ]
  })

  // Create Rule Sets
  await prisma.ruleSet.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'STET-Secondary-2025',
        examKey: 'STET',
        level: 'SECONDARY',
        isActive: true,
        json: {
          age: {
            min: 21,
            max: 37,
            relaxations: [
              { category: 'OBC', years: 3 },
              { category: 'SC', years: 5 },
              { category: 'ST', years: 5 }
            ],
            asOfDate: '2025-08-01'
          },
          education: {
            required: [
              {
                anyOf: [
                  { allOf: [{ field: 'graduation', op: '>=', value: 50 }] },
                  { allOf: [{ field: 'postGraduation', op: '>=', value: 50 }] }
                ]
              }
            ],
            professional: [
              {
                anyOf: [
                  { token: 'B.Ed' },
                  { token: 'D.El.Ed', levelIn: ['PRIMARY', 'UPPER_PRIMARY'] }
                ]
              }
            ]
          },
          tet: {
            required: true,
            accepted: ['STET', 'CTET'],
            subjectMustMatch: true,
            validityYears: 7
          },
          attemptLimit: null,
          domicile: { required: false },
          output: {
            eligibleMessageEn: 'Eligible for STET (Secondary – {subject})',
            ineligibleMessageEn: 'Not eligible. See reasons below.'
          }
        }
      },
      {
        name: 'BPSC-Secondary-2025',
        examKey: 'BPSC_TEACHER',
        level: 'SECONDARY',
        isActive: true,
        json: {
          age: {
            min: 21,
            max: 37,
            relaxations: [
              { category: 'OBC', years: 3 },
              { category: 'SC', years: 5 },
              { category: 'ST', years: 5 }
            ],
            asOfDate: '2025-08-01'
          },
          education: {
            required: [
              {
                anyOf: [
                  { allOf: [{ field: 'graduation', op: '>=', value: 50 }] },
                  { allOf: [{ field: 'postGraduation', op: '>=', value: 50 }] }
                ]
              }
            ],
            professional: [
              {
                anyOf: [
                  { token: 'B.Ed' }
                ]
              }
            ]
          },
          tet: {
            required: true,
            accepted: ['STET', 'CTET'],
            subjectMustMatch: true,
            validityYears: 7
          },
          attemptLimit: null,
          domicile: { required: true },
          output: {
            eligibleMessageEn: 'Eligible for BPSC Teacher (Secondary – {subject})',
            ineligibleMessageEn: 'Not eligible. See reasons below.'
          }
        }
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

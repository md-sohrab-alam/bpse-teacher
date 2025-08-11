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
      overviewEn: 'The Secondary Teacher Eligibility Test (STET) is conducted by the Bihar School Examination Board (BSEB) to determine the eligibility of candidates for appointment as teachers in secondary schools.',
      overviewHi: 'माध्यमिक शिक्षक पात्रता परीक्षा (एसटीईटी) बिहार स्कूल परीक्षा बोर्ड (बीएसईबी) द्वारा माध्यमिक स्कूलों में शिक्षकों की नियुक्ति के लिए उम्मीदवारों की पात्रता निर्धारित करने के लिए आयोजित की जाती है।',
      eligibilityEn: 'Candidates must have completed graduation with at least 50% marks and B.Ed or D.El.Ed qualification. Age limit is 21-37 years with relaxations for reserved categories.',
      eligibilityHi: 'उम्मीदवारों को कम से कम 50% अंकों के साथ स्नातक और बी.एड या डी.एल.एड योग्यता पूरी होनी चाहिए। आयु सीमा 21-37 वर्ष है जिसमें आरक्षित श्रेणियों के लिए छूट है।',
      patternEn: 'The exam consists of two papers: Paper I for Primary (I-V) and Paper II for Upper Primary (VI-VIII). Each paper has 150 questions with 150 marks.',
      patternHi: 'परीक्षा में दो पेपर होते हैं: प्राथमिक (I-V) के लिए पेपर I और उच्च प्राथमिक (VI-VIII) के लिए पेपर II। प्रत्येक पेपर में 150 प्रश्न 150 अंकों के साथ होते हैं।',
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
      overviewEn: 'BPSC conducts teacher recruitment for various subjects and levels in government schools across Bihar. This is a direct recruitment process for permanent positions.',
      overviewHi: 'बीपीएससी बिहार के सरकारी स्कूलों में विभिन्न विषयों और स्तरों के लिए शिक्षक भर्ती आयोजित करता है। यह स्थायी पदों के लिए एक सीधी भर्ती प्रक्रिया है।',
      eligibilityEn: 'Candidates must have completed graduation with at least 50% marks, B.Ed qualification, and CTET/STET qualification. Age limit is 21-37 years.',
      eligibilityHi: 'उम्मीदवारों को कम से कम 50% अंकों के साथ स्नातक, बी.एड योग्यता और सीटीईटी/एसटीईटी योग्यता पूरी होनी चाहिए। आयु सीमा 21-37 वर्ष है।',
      patternEn: 'The exam consists of a written test with objective type questions. The paper has 120 questions with 120 marks. Duration is 2 hours.',
      patternHi: 'परीक्षा में वस्तुनिष्ठ प्रकार के प्रश्नों के साथ लिखित परीक्षा होती है। पेपर में 120 प्रश्न 120 अंकों के साथ होते हैं। अवधि 2 घंटे है।',
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
        labelEn: 'Application Start Date',
        labelHi: 'आवेदन प्रारंभ तिथि',
        date: new Date('2024-03-01')
      },
      {
        examId: stetExam.id,
        labelEn: 'Application End Date',
        labelHi: 'आवेदन समाप्ति तिथि',
        date: new Date('2024-03-31')
      },
      {
        examId: stetExam.id,
        labelEn: 'Admit Card Release',
        labelHi: 'प्रवेश पत्र जारी',
        date: new Date('2024-05-15')
      },
      {
        examId: stetExam.id,
        labelEn: 'Exam Date',
        labelHi: 'परीक्षा तिथि',
        date: new Date('2024-06-15')
      },
      {
        examId: bpscExam.id,
        labelEn: 'Application Start Date',
        labelHi: 'आवेदन प्रारंभ तिथि',
        date: new Date('2024-04-01')
      },
      {
        examId: bpscExam.id,
        labelEn: 'Application End Date',
        labelHi: 'आवेदन समाप्ति तिथि',
        date: new Date('2024-04-30')
      },
      {
        examId: bpscExam.id,
        labelEn: 'Admit Card Release',
        labelHi: 'प्रवेश पत्र जारी',
        date: new Date('2024-06-01')
      },
      {
        examId: bpscExam.id,
        labelEn: 'Exam Date',
        labelHi: 'परीक्षा तिथि',
        date: new Date('2024-07-15')
      }
    ]
  })

  // Create Cutoffs
  await prisma.cutoff.createMany({
    skipDuplicates: true,
    data: [
      {
        examId: stetExam.id,
        year: 2023,
        category: 'UR',
        passMarks: 60,
        cutoff: 85.5,
        notesEn: 'STET 2023 cut-off marks for Unreserved category',
        notesHi: 'एसटीईटी 2023 अनारक्षित श्रेणी के लिए कट-ऑफ अंक'
      },
      {
        examId: stetExam.id,
        year: 2023,
        category: 'OBC',
        passMarks: 60,
        cutoff: 82.3,
        notesEn: 'STET 2023 cut-off marks for OBC category',
        notesHi: 'एसटीईटी 2023 ओबीसी श्रेणी के लिए कट-ऑफ अंक'
      },
      {
        examId: stetExam.id,
        year: 2023,
        category: 'SC',
        passMarks: 60,
        cutoff: 78.9,
        notesEn: 'STET 2023 cut-off marks for SC category',
        notesHi: 'एसटीईटी 2023 एससी श्रेणी के लिए कट-ऑफ अंक'
      },
      {
        examId: bpscExam.id,
        year: 2023,
        category: 'UR',
        passMarks: 60,
        cutoff: 88.2,
        notesEn: 'BPSC Teacher 2023 cut-off marks for Unreserved category',
        notesHi: 'बीपीएससी शिक्षक 2023 अनारक्षित श्रेणी के लिए कट-ऑफ अंक'
      },
      {
        examId: bpscExam.id,
        year: 2023,
        category: 'OBC',
        passMarks: 60,
        cutoff: 85.1,
        notesEn: 'BPSC Teacher 2023 cut-off marks for OBC category',
        notesHi: 'बीपीएससी शिक्षक 2023 ओबीसी श्रेणी के लिए कट-ऑफ अंक'
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
        titleEn: 'STET 2024 Application Form Released',
        titleHi: 'एसटीईटी 2024 आवेदन फॉर्म जारी',
        sourceUrl: 'https://bseb.org.in/stet-2024',
        tag: 'Application',
        examKey: 'STET',
        publishedAt: new Date('2024-03-01')
      },
      {
        titleEn: 'BPSC Teacher Admit Card 2024',
        titleHi: 'बीपीएससी शिक्षक प्रवेश पत्र 2024',
        sourceUrl: 'https://bpsc.bih.nic.in/teacher-2024',
        tag: 'Admit Card',
        examKey: 'BPSC_TEACHER',
        publishedAt: new Date('2024-06-01')
      },
      {
        titleEn: 'STET 2023 Result Declared',
        titleHi: 'एसटीईटी 2023 परिणाम घोषित',
        sourceUrl: 'https://bseb.org.in/stet-2023-result',
        tag: 'Result',
        examKey: 'STET',
        publishedAt: new Date('2024-02-15')
      },
      {
        titleEn: 'BPSC Teacher Recruitment 2024 Notice',
        titleHi: 'बीपीएससी शिक्षक भर्ती 2024 सूचना',
        sourceUrl: 'https://bpsc.bih.nic.in/teacher-notice-2024',
        tag: 'Notice',
        examKey: 'BPSC_TEACHER',
        publishedAt: new Date('2024-04-01')
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

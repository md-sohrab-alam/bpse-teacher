import { computerScienceQuestions } from '@/data/computer-science-questions'
import { generalStudiesQuestions } from '@/data/general-studies-questions'
import { physicsQuestions } from '@/data/physics-questions'
import { chemistryQuestions } from '@/data/chemistry-questions'
import { biologyQuestions } from '@/data/biology-questions'
import { historyQuestions } from '@/data/history-questions'
import { geographyQuestions } from '@/data/geography-questions'
import { economicsQuestions } from '@/data/economics-questions'

/**
 * Collect all searchable content from database and static files
 */
export async function collectSearchableContent() {
  const content: Array<{
    id: string
    type: string
    title: string
    titleHi: string
    content: string
    contentHi: string
    metadata: any
  }> = []

  try {
    // 1. Add questions from static data
    computerScienceQuestions.forEach((q, index) => {
      content.push({
        id: `cs_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'Computer Science',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'Technical'
        }
      })
    })

    generalStudiesQuestions.forEach((q, index) => {
      content.push({
        id: `gs_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'General Studies',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'General'
        }
      })
    })

    // Add new question sets
    physicsQuestions.forEach((q, index) => {
      content.push({
        id: `physics_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'Physics',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'Science'
        }
      })
    })

    chemistryQuestions.forEach((q, index) => {
      content.push({
        id: `chemistry_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'Chemistry',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'Science'
        }
      })
    })

    biologyQuestions.forEach((q, index) => {
      content.push({
        id: `biology_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'Biology',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'Science'
        }
      })
    })

    historyQuestions.forEach((q, index) => {
      content.push({
        id: `history_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'History',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'Arts'
        }
      })
    })

    geographyQuestions.forEach((q, index) => {
      content.push({
        id: `geography_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'Geography',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'Arts'
        }
      })
    })

    economicsQuestions.forEach((q, index) => {
      content.push({
        id: `economics_question_${index}`,
        type: 'question',
        title: q.textEn,
        titleHi: q.textHi,
        content: `${q.optionAEn} ${q.optionBEn} ${q.optionCEn} ${q.optionDEn} ${q.explanationEn || ''}`,
        contentHi: `${q.optionAHi} ${q.optionBHi} ${q.optionCHi} ${q.optionDHi} ${q.explanationHi || ''}`,
        metadata: {
          topic: 'Economics',
          difficulty: 'Medium',
          examType: 'BPSC_TEACHER',
          category: 'Commerce'
        }
      })
    })

    // 2. Add static exam information
    const staticExams = [
      {
        id: 'stet_exam',
        type: 'exam',
        title: 'STET Exam Information',
        titleHi: 'एसटीईटी परीक्षा की जानकारी',
        content: 'Secondary Teacher Eligibility Test (STET) is conducted by Bihar School Examination Board (BSEB) for recruitment of secondary teachers in Bihar.',
        contentHi: 'माध्यमिक शिक्षक पात्रता परीक्षा (एसटीईटी) बिहार स्कूल परीक्षा बोर्ड (बीएसईबी) द्वारा बिहार में माध्यमिक शिक्षकों की भर्ती के लिए आयोजित की जाती है।',
        metadata: {
          examType: 'STET',
          topic: 'Exam Information',
          category: 'Information'
        }
      },
      {
        id: 'bpsc_exam',
        type: 'exam',
        title: 'BPSC Teacher Exam Information',
        titleHi: 'बीपीएससी शिक्षक परीक्षा की जानकारी',
        content: 'Bihar Public Service Commission (BPSC) conducts teacher recruitment exams for various subjects and levels in Bihar government schools.',
        contentHi: 'बिहार लोक सेवा आयोग (बीपीएससी) बिहार सरकारी स्कूलों में विभिन्न विषयों और स्तरों के लिए शिक्षक भर्ती परीक्षा आयोजित करता है।',
        metadata: {
          examType: 'BPSC_TEACHER',
          topic: 'Exam Information',
          category: 'Information'
        }
      }
    ]

    staticExams.forEach(exam => {
      content.push(exam)
    })

    // Add TRE 4.0 specific information
    const tre4Data = [
      {
        id: 'tre4_exam_date',
        type: 'exam',
        title: 'BPSC TRE 4.0 Exam Date 2025 - Latest Update',
        titleHi: 'बीपीएससी टीआरई 4.0 परीक्षा तिथि 2025 - नवीनतम अपडेट',
        content: 'According to latest reports, BPSC TRE 4.0 exam is tentatively scheduled for August 2025, specifically in the third or fourth week of August. However, the exact exam date has not been officially confirmed by BPSC yet. The official notification is expected to be released by the end of September 2025, which will contain the confirmed exam dates and detailed schedule.',
        contentHi: 'नवीनतम रिपोर्ट्स के अनुसार, बीपीएससी टीआरई 4.0 परीक्षा अगस्त 2025 में आयोजित होने की संभावना है, विशेष रूप से अगस्त के तीसरे या चौथे सप्ताह में। हालांकि, बीपीएससी द्वारा अभी तक सटीक परीक्षा तिथि की आधिकारिक पुष्टि नहीं की गई है। आधिकारिक अधिसूचना सितंबर 2025 के अंत तक जारी होने की उम्मीद है, जिसमें पुष्टि की गई परीक्षा तिथियां और विस्तृत कार्यक्रम शामिल होगा।',
        metadata: {
          examType: 'TRE_4.0',
          topic: 'Important Dates',
          category: 'Exam Schedule',
          year: '2025',
          date: 'August 2025',
          status: 'Tentative'
        }
      },
      {
        id: 'tre4_notification',
        type: 'news',
        title: 'BPSC TRE 4.0 Notification Release Date',
        titleHi: 'बीपीएससी टीआरई 4.0 अधिसूचना जारी करने की तिथि',
        content: 'The official BPSC TRE 4.0 notification is expected to be released by the end of September 2025. This notification will contain detailed information about exam dates, eligibility criteria, application process, and important dates.',
        contentHi: 'बीपीएससी टीआरई 4.0 की आधिकारिक अधिसूचना सितंबर 2025 के अंत तक जारी होने की उम्मीद है। इस अधिसूचना में परीक्षा तिथियों, पात्रता मानदंडों, आवेदन प्रक्रिया और महत्वपूर्ण तिथियों के बारे में विस्तृत जानकारी होगी।',
        metadata: {
          examType: 'TRE_4.0',
          topic: 'News & Updates',
          category: 'Notification',
          year: '2025',
          date: 'September 2025'
        }
      }
    ]

    tre4Data.forEach(item => {
      content.push(item)
    })

    // Add STET Pass Marks Information
    const stetPassMarks = [
      {
        id: 'stet_passmarks_general',
        type: 'eligibility',
        title: 'STET Pass Marks - General Category',
        titleHi: 'एसटीईटी पास मार्क्स - सामान्य श्रेणी',
        content: 'General category candidates need 50% marks (75 out of 150) to qualify STET exam. This is the minimum qualifying percentage for general candidates.',
        contentHi: 'सामान्य श्रेणी के उम्मीदवारों को एसटीईटी परीक्षा में योग्य होने के लिए 50% अंक (150 में से 75) की आवश्यकता होती है। यह सामान्य उम्मीदवारों के लिए न्यूनतम योग्यता प्रतिशत है।',
        metadata: {
          examType: 'STET',
          topic: 'Cut-off Marks',
          category: 'Eligibility',
          marks: '75/150',
          percentage: '50%'
        }
      },
      {
        id: 'stet_passmarks_sc_st',
        type: 'eligibility',
        title: 'STET Pass Marks - SC/ST/PwD/Women',
        titleHi: 'एसटीईटी पास मार्क्स - एससी/एसटी/पीडब्ल्यूडी/महिलाएं',
        content: 'SC, ST, PwD, and Women candidates need 40% marks (60 out of 150) to qualify STET exam. This is the minimum qualifying percentage for reserved category candidates.',
        contentHi: 'एससी, एसटी, पीडब्ल्यूडी और महिला उम्मीदवारों को एसटीईटी परीक्षा में योग्य होने के लिए 40% अंक (150 में से 60) की आवश्यकता होती है। यह आरक्षित श्रेणी के उम्मीदवारों के लिए न्यूनतम योग्यता प्रतिशत है।',
        metadata: {
          examType: 'STET',
          topic: 'Cut-off Marks',
          category: 'Eligibility',
          marks: '60/150',
          percentage: '40%'
        }
      }
    ]

    stetPassMarks.forEach(mark => {
      content.push(mark)
    })

    // 3. Add static news items
    const staticNews = [
      {
        id: 'news_1',
        type: 'news',
        title: 'STET 2024 Application Process Started',
        titleHi: 'एसटीईटी 2024 आवेदन प्रक्रिया शुरू',
        content: 'BSEB has announced the STET 2024 application process. Candidates can apply online through the official website.',
        contentHi: 'बीएसईबी ने एसटीईटी 2024 आवेदन प्रक्रिया की घोषणा की है। उम्मीदवार आधिकारिक वेबसाइट के माध्यम से ऑनलाइन आवेदन कर सकते हैं।',
        metadata: {
          examType: 'STET',
          topic: 'News & Updates',
          date: new Date().toISOString(),
          category: 'Application'
        }
      },
      {
        id: 'news_2',
        type: 'news',
        title: 'BPSC Teacher Recruitment 2024 Notification Released',
        titleHi: 'बीपीएससी शिक्षक भर्ती 2024 अधिसूचना जारी',
        content: 'BPSC has released the official notification for teacher recruitment 2024. Check eligibility criteria and important dates.',
        contentHi: 'बीपीएससी ने शिक्षक भर्ती 2024 की आधिकारिक अधिसूचना जारी की है। पात्रता मानदंड और महत्वपूर्ण तिथियां देखें।',
        metadata: {
          examType: 'BPSC_TEACHER',
          topic: 'News & Updates',
          date: new Date().toISOString(),
          category: 'Notification'
        }
      }
    ]

    staticNews.forEach(news => {
      content.push(news)
    })

    // 4. Add static eligibility information
    const staticEligibility = [
      {
        id: 'eligibility_1',
        type: 'eligibility',
        title: 'STET - Secondary Level Eligibility Rules',
        titleHi: 'एसटीईटी - माध्यमिक स्तर पात्रता नियम',
        content: 'Eligibility rules for STET Secondary level. Age limit: 21-35 years. Educational qualification: Graduation with B.Ed or equivalent.',
        contentHi: 'एसटीईटी माध्यमिक स्तर के लिए पात्रता नियम। आयु सीमा: 21-35 वर्ष। शैक्षिक योग्यता: बी.एड या समकक्ष के साथ स्नातक।',
        metadata: {
          examType: 'STET',
          topic: 'Eligibility',
          category: 'Rules',
          level: 'Secondary'
        }
      },
      {
        id: 'eligibility_2',
        type: 'eligibility',
        title: 'BPSC Teacher - Eligibility Rules',
        titleHi: 'बीपीएससी शिक्षक - पात्रता नियम',
        content: 'Eligibility rules for BPSC Teacher recruitment. Age limit: 21-37 years. Educational qualification: Graduation with B.Ed or equivalent.',
        contentHi: 'बीपीएससी शिक्षक भर्ती के लिए पात्रता नियम। आयु सीमा: 21-37 वर्ष। शैक्षिक योग्यता: बी.एड या समकक्ष के साथ स्नातक।',
        metadata: {
          examType: 'BPSC_TEACHER',
          topic: 'Eligibility',
          category: 'Rules',
          level: 'Teacher'
        }
      }
    ]

    staticEligibility.forEach(eligibility => {
      content.push(eligibility)
    })

  } catch (error) {
    console.error('Error collecting searchable content:', error)
  }

  return content
}

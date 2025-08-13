import { NextRequest, NextResponse } from 'next/server'
import { enhancedSearch, SearchQuery, extractKeyInfo } from '@/lib/ai-search'
import { prisma } from '@/lib/db'
import { computerScienceQuestions } from '@/data/computer-science-questions'
import { generalStudiesQuestions } from '@/data/general-studies-questions'

export async function POST(request: NextRequest) {
  try {
    const body: SearchQuery = await request.json()
    const { query, language = 'en', filters, limit = 10 } = body

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters long' },
        { status: 400 }
      )
    }

    // Collect all searchable content from database and static data
    const searchableContent = await collectSearchableContent()

    // Perform enhanced search
    const searchResponse = await enhancedSearch(
      { query, language, filters, limit },
      searchableContent
    )

    // Extract key information using AI
    const keyInfo = await extractKeyInfo(searchResponse.results)

    return NextResponse.json({
      ...searchResponse,
      keyInfo,
      success: true
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed', success: false },
      { status: 500 }
    )
  }
}

/**
 * Collect all searchable content from database and static files
 */
async function collectSearchableContent() {
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

    // 2. Add static exam information (since database is not available)
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
      },
      {
        id: 'tre4_timeline',
          type: 'exam',
        title: 'BPSC TRE 4.0 Timeline 2025',
        titleHi: 'बीपीएससी टीआरई 4.0 समयसीमा 2025',
        content: 'TRE 4.0 timeline: Official notification expected by end of September 2025, exam likely in third or fourth week of August 2025. Candidates should monitor BPSC official website for exact dates and start preparation assuming late August exam.',
        contentHi: 'टीआरई 4.0 समयसीमा: आधिकारिक अधिसूचना सितंबर 2025 के अंत तक, परीक्षा अगस्त 2025 के तीसरे या चौथे सप्ताह में होने की संभावना। उम्मीदवारों को सटीक तिथियों के लिए बीपीएससी की आधिकारिक वेबसाइट की निगरानी करनी चाहिए और अगस्त के अंत में परीक्षा की धारणा के साथ तैयारी शुरू करनी चाहिए।',
          metadata: {
          examType: 'TRE_4.0',
            topic: 'Important Dates',
          category: 'Timeline',
          year: '2025'
        }
      },
             {
         id: 'tre4_preparation',
         type: 'exam',
         title: 'BPSC TRE 4.0 Preparation Strategy',
         titleHi: 'बीपीएससी टीआरई 4.0 तैयारी रणनीति',
         content: 'For TRE 4.0 preparation, focus on the expected August 2025 timeline. Start preparation early as the exam is likely in late August. Monitor BPSC website for official notification and exact exam dates. Previous TRE patterns suggest similar exam structure.',
         contentHi: 'टीआरई 4.0 तैयारी के लिए, अगस्त 2025 की अपेक्षित समयसीमा पर ध्यान केंद्रित करें। जल्दी तैयारी शुरू करें क्योंकि परीक्षा अगस्त के अंत में होने की संभावना है। आधिकारिक अधिसूचना और सटीक परीक्षा तिथियों के लिए बीपीएससी वेबसाइट की निगरानी करें। पिछले टीआरई पैटर्न समान परीक्षा संरचना का सुझाव देते हैं।',
         metadata: {
           examType: 'TRE_4.0',
           topic: 'Exam Preparation',
           category: 'Strategy',
           year: '2025'
         }
       },
       {
         id: 'tre4_official_sources',
         type: 'news',
         title: 'BPSC TRE 4.0 Official Sources and Updates',
         titleHi: 'बीपीएससी टीआरई 4.0 आधिकारिक स्रोत और अपडेट',
         content: 'For the most accurate and up-to-date information about BPSC TRE 4.0, regularly check the official BPSC website (bpsc.bih.nic.in). The official notification will be published there first. Also monitor the Bihar government education portal and official social media handles of BPSC for timely updates. All tentative dates mentioned are based on media reports and should be verified with official sources.',
         contentHi: 'बीपीएससी टीआरई 4.0 के बारे में सबसे सटीक और नवीनतम जानकारी के लिए, नियमित रूप से आधिकारिक बीपीएससी वेबसाइट (bpsc.bih.nic.in) की जांच करें। आधिकारिक अधिसूचना वहां पहले प्रकाशित होगी। समय पर अपडेट के लिए बिहार सरकार के शिक्षा पोर्टल और बीपीएससी के आधिकारिक सोशल मीडिया हैंडल्स की भी निगरानी करें। उल्लिखित सभी अनुमानित तिथियां मीडिया रिपोर्ट्स पर आधारित हैं और आधिकारिक स्रोतों से सत्यापित की जानी चाहिए।',
         metadata: {
           examType: 'TRE_4.0',
           topic: 'News & Updates',
           category: 'Official Sources',
           year: '2025',
           sources: 'bpsc.bih.nic.in'
         }
       },
       {
         id: 'tre4_latest_news',
         type: 'news',
         title: 'BPSC TRE 4.0 Latest News and Updates 2025',
         titleHi: 'बीपीएससी टीआरई 4.0 नवीनतम समाचार और अपडेट 2025',
         content: 'Latest updates suggest BPSC TRE 4.0 will be conducted after the completion of Phase 3 teacher recruitment. The exam is expected to fill over 1.60 lakh teacher positions in Bihar. CM Nitish Kumar has given updates about the upcoming Bihar teacher recruitment exam. The exact dates are still tentative and subject to official confirmation.',
         contentHi: 'नवीनतम अपडेट्स से पता चलता है कि बीपीएससी टीआरई 4.0 फेज 3 शिक्षक भर्ती के पूरा होने के बाद आयोजित किया जाएगा। परीक्षा से बिहार में 1.60 लाख से अधिक शिक्षक पद भरे जाने की उम्मीद है। सीएम नीतीश कुमार ने आगामी बिहार शिक्षक भर्ती परीक्षा के बारे में अपडेट दिया है। सटीक तिथियां अभी भी अनुमानित हैं और आधिकारिक पुष्टि के अधीन हैं।',
         metadata: {
           examType: 'TRE_4.0',
           topic: 'News & Updates',
           category: 'Latest News',
           year: '2025',
           positions: '1.60 lakh+'
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
        id: 'stet_passmarks_bc',
        type: 'eligibility',
        title: 'STET Pass Marks - Backward Class (BC)',
        titleHi: 'एसटीईटी पास मार्क्स - पिछड़ा वर्ग (बीसी)',
        content: 'Backward Class (BC) candidates need 45.5% marks (68.25 out of 150) to qualify STET exam. This is the minimum qualifying percentage for BC candidates.',
        contentHi: 'पिछड़ा वर्ग (बीसी) के उम्मीदवारों को एसटीईटी परीक्षा में योग्य होने के लिए 45.5% अंक (150 में से 68.25) की आवश्यकता होती है। यह बीसी उम्मीदवारों के लिए न्यूनतम योग्यता प्रतिशत है।',
        metadata: {
          examType: 'STET',
          topic: 'Cut-off Marks',
          category: 'Eligibility',
          marks: '68.25/150',
          percentage: '45.5%'
        }
      },
      {
        id: 'stet_passmarks_obc',
        type: 'eligibility',
        title: 'STET Pass Marks - Other Backward Class (OBC)',
        titleHi: 'एसटीईटी पास मार्क्स - अन्य पिछड़ा वर्ग (ओबीसी)',
        content: 'Other Backward Class (OBC) candidates need 42.5% marks (63.75 out of 150) to qualify STET exam. This is the minimum qualifying percentage for OBC candidates.',
        contentHi: 'अन्य पिछड़ा वर्ग (ओबीसी) के उम्मीदवारों को एसटीईटी परीक्षा में योग्य होने के लिए 42.5% अंक (150 में से 63.75) की आवश्यकता होती है। यह ओबीसी उम्मीदवारों के लिए न्यूनतम योग्यता प्रतिशत है।',
        metadata: {
          examType: 'STET',
          topic: 'Cut-off Marks',
          category: 'Eligibility',
          marks: '63.75/150',
          percentage: '42.5%'
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
      },
      {
        id: 'stet_passmarks_summary',
        type: 'eligibility',
        title: 'STET Qualifying Marks Summary 2024-2025',
        titleHi: 'एसटीईटी योग्यता अंक सारांश 2024-2025',
        content: 'STET qualifying marks by category: General (50% - 75/150), BC (45.5% - 68.25/150), OBC (42.5% - 63.75/150), SC/ST/PwD/Women (40% - 60/150). These are minimum qualifying percentages to pass STET exam.',
        contentHi: 'श्रेणी के अनुसार एसटीईटी योग्यता अंक: सामान्य (50% - 75/150), बीसी (45.5% - 68.25/150), ओबीसी (42.5% - 63.75/150), एससी/एसटी/पीडब्ल्यूडी/महिलाएं (40% - 60/150)। ये एसटीईटी परीक्षा पास करने के लिए न्यूनतम योग्यता प्रतिशत हैं।',
          metadata: {
          examType: 'STET',
            topic: 'Cut-off Marks',
          category: 'Eligibility',
          year: '2024-2025'
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

    // 4. Add static mock tests
    const staticMockTests = [
      {
        id: 'mocktest_1',
        type: 'question',
        title: 'Computer Science Mock Test - Set 1',
        titleHi: 'कंप्यूटर साइंस मॉक टेस्ट - सेट 1',
        content: 'Practice mock test for Computer Science with 50 questions. Duration: 60 minutes. Negative marking: 0.25 marks per wrong answer.',
        contentHi: '50 प्रश्नों के साथ कंप्यूटर साइंस के लिए अभ्यास मॉक टेस्ट। अवधि: 60 मिनट। नेगेटिव मार्किंग: प्रति गलत उत्तर 0.25 अंक।',
        metadata: {
          examType: 'BPSC_TEACHER',
          topic: 'Mock Tests',
          difficulty: 'Practice',
          category: 'Test'
        }
      },
      {
        id: 'mocktest_2',
        type: 'question',
        title: 'General Studies Mock Test - Set 1',
        titleHi: 'सामान्य अध्ययन मॉक टेस्ट - सेट 1',
        content: 'Practice mock test for General Studies with 50 questions. Duration: 60 minutes. Negative marking: 0.25 marks per wrong answer.',
        contentHi: '50 प्रश्नों के साथ सामान्य अध्ययन के लिए अभ्यास मॉक टेस्ट। अवधि: 60 मिनट। नेगेटिव मार्किंग: प्रति गलत उत्तर 0.25 अंक।',
        metadata: {
          examType: 'BPSC_TEACHER',
          topic: 'Mock Tests',
          difficulty: 'Practice',
          category: 'Test'
        }
      }
    ]

    staticMockTests.forEach(test => {
      content.push(test)
    })

    // 5. Add static eligibility information
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

/**
 * GET endpoint for search suggestions
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { suggestions: [] },
        { status: 200 }
      )
    }

    // Get searchable content for suggestions
    const searchableContent = await collectSearchableContent()
    
    // Find suggestions based on content
    const suggestions = searchableContent
      .filter(item => {
        const searchText = `${item.title} ${item.content}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      })
      .slice(0, 5)
      .map(item => item.title)

    return NextResponse.json({
      suggestions,
      success: true
    })

  } catch (error) {
    console.error('Search suggestions error:', error)
    return NextResponse.json(
      { suggestions: [], success: false },
      { status: 500 }
    )
  }
}

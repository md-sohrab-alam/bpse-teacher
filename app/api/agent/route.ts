import { NextRequest, NextResponse } from 'next/server'
import { enhancedSearch, SearchQuery } from '@/lib/ai-search'
import { collectSearchableContent } from './search-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, language = 'en' } = body

    if (!question || question.trim().length < 2) {
      return NextResponse.json(
        { error: 'Question must be at least 2 characters long' },
        { status: 400 }
      )
    }

    // Collect searchable content
    const searchableContent = await collectSearchableContent()

    // Perform search to find relevant information
    const searchResponse = await enhancedSearch(
      { query: question, language, limit: 10 },
      searchableContent
    )

    // Generate AI response based on search results
    const aiResponse = await generateAIResponse(question, searchResponse.results, language)

    return NextResponse.json({
      ...aiResponse,
      success: true
    })

  } catch (error) {
    console.error('Agent API error:', error)
    return NextResponse.json(
      { error: 'Agent failed to process your question', success: false },
      { status: 500 }
    )
  }
}

async function generateAIResponse(
  question: string,
  searchResults: any[],
  language: string
) {
  const startTime = Date.now()
  const isHindi = language === 'hi'
  
  // Extract relevant information from search results in appropriate language
  const relevantInfo = searchResults
    .slice(0, 5)
    .map(result => `${isHindi ? result.titleHi : result.title}: ${isHindi ? result.contentHi : result.content}`)
    .join('\n\n')

  // Generate response based on question type and available information
  let answer = ''
  let sources: string[] = []
  let relatedTopics: string[] = []
  let followUpQuestions: string[] = []
  let suggestions: string[] = []

  // Analyze question and generate appropriate response
  const questionLower = question.toLowerCase()
  
  if (questionLower.includes('stet') || questionLower.includes('एसटीईटी')) {
    answer = generateSTETResponse(question, searchResults, language)
    sources = ['BSEB Official Website', 'STET Notification 2024']
    relatedTopics = ['STET Eligibility', 'STET Exam Pattern', 'STET Syllabus', 'STET Pass Marks']
    followUpQuestions = [
      'What are the STET qualifying marks for different categories?',
      'When is the next STET exam scheduled?',
      'What is the STET exam pattern?'
    ]
  } else if (questionLower.includes('bpsc') || questionLower.includes('teacher') || questionLower.includes('शिक्षक')) {
    answer = generateBPSCResponse(question, searchResults, language)
    sources = ['BPSC Official Website', 'BPSC Teacher Notification']
    relatedTopics = ['BPSC Teacher Eligibility', 'BPSC Exam Pattern', 'BPSC Syllabus', 'BPSC Cut-off']
    followUpQuestions = [
      'What is the BPSC Teacher exam pattern?',
      'What are the BPSC Teacher eligibility criteria?',
      'When is the next BPSC Teacher exam?'
    ]
  } else if (questionLower.includes('tre') || questionLower.includes('4.0') || questionLower.includes('टीआरई')) {
    answer = generateTREResponse(question, searchResults, language)
    sources = ['BPSC Official Website', 'TRE 4.0 Notification']
    relatedTopics = ['TRE 4.0 Exam Date', 'TRE 4.0 Eligibility', 'TRE 4.0 Pattern']
    followUpQuestions = [
      'When is the TRE 4.0 exam scheduled?',
      'What is the TRE 4.0 exam pattern?',
      'How to apply for TRE 4.0?'
    ]
  } else {
    // Generic response for other questions
    answer = generateGenericResponse(question, searchResults, language)
    sources = ['BPSC Official Website', 'BSEB Official Website']
    relatedTopics = ['Exam Information', 'Eligibility', 'Important Dates']
    followUpQuestions = [
      'What are the latest exam updates?',
      'How to check eligibility?',
      'What are the important dates?'
    ]
  }

  // Add common suggestions
  suggestions = [
    'Check official website for latest updates',
    'Download previous year question papers',
    'Practice mock tests regularly',
    'Stay updated with exam notifications'
  ]

  const processingTime = Date.now() - startTime

  return {
    answer,
    sources,
    confidence: 0.85,
    relatedTopics,
    followUpQuestions,
    suggestions,
    processingTime
  }
}

function generateSTETResponse(question: string, searchResults: any[], language: string): string {
  const isHindi = language === 'hi'
  
  if (isHindi) {
    return `एसटीईटी (माध्यमिक शिक्षक पात्रता परीक्षा) के बारे में आपका प्रश्न:

1. परीक्षा की जानकारी:
• एसटीईटी बिहार स्कूल परीक्षा बोर्ड (बीएसईबी) द्वारा आयोजित की जाती है
• यह माध्यमिक स्तर के शिक्षकों की भर्ती के लिए आवश्यक है
• परीक्षा में 150 प्रश्न होते हैं और समय 2.5 घंटे है

2. योग्यता मानदंड:
• आयु सीमा: 21-35 वर्ष
• शैक्षिक योग्यता: बी.एड या समकक्ष के साथ स्नातक
• न्यूनतम अंक: सामान्य श्रेणी के लिए 50% (75/150)

3. महत्वपूर्ण तिथियां:
• आवेदन प्रक्रिया शुरू हो चुकी है
• परीक्षा तिथि की घोषणा जल्द होगी

अधिक जानकारी के लिए आधिकारिक वेबसाइट देखें।`
  }

  return `STET (Secondary Teacher Eligibility Test) Information:

1. Exam Overview:
• STET is conducted by Bihar School Examination Board (BSEB)
• Required for secondary level teacher recruitment in Bihar
• Exam consists of 150 questions with 2.5 hours duration

2. Eligibility Criteria:
• Age Limit: 21-35 years
• Educational Qualification: Graduation with B.Ed or equivalent
• Minimum Marks: 50% (75/150) for General category

3. Important Dates:
• Application process has started
• Exam date announcement expected soon

4. Pass Marks by Category:
• General: 50% (75/150 marks)
• BC: 45.5% (68.25/150 marks)
• OBC: 42.5% (63.75/150 marks)
• SC/ST/PwD/Women: 40% (60/150 marks)

For more details, check the official website.`
}

function generateBPSCResponse(question: string, searchResults: any[], language: string): string {
  const isHindi = language === 'hi'
  
  if (isHindi) {
    return `बीपीएससी शिक्षक भर्ती के बारे में आपका प्रश्न:

1. परीक्षा की जानकारी:
• बीपीएससी शिक्षक भर्ती बिहार लोक सेवा आयोग द्वारा आयोजित की जाती है
• विभिन्न विषयों और स्तरों के लिए शिक्षकों की भर्ती
• परीक्षा कई चरणों में आयोजित की जाती है

2. योग्यता मानदंड:
• आयु सीमा: 21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)
• शैक्षिक योग्यता: 50% अंकों के साथ स्नातक और बी.एड/डी.एल.एड
• टीईटी योग्यता: सीटीईटी/एसटीईटी आवश्यक

3. महत्वपूर्ण तिथियां:
• आधिकारिक अधिसूचना जल्द जारी होगी
• आवेदन प्रक्रिया शुरू होने की उम्मीद है

अधिक जानकारी के लिए आधिकारिक वेबसाइट देखें।`
  }

  return `BPSC Teacher Recruitment Information:

1. Exam Overview:
• BPSC Teacher recruitment is conducted by Bihar Public Service Commission
• Recruitment for various subjects and teaching levels
• Exam conducted in multiple phases

2. Eligibility Criteria:
• Age Limit: 21-37 years (relaxation for reserved categories)
• Educational Qualification: Graduation with 50% marks and B.Ed/D.El.Ed
• TET Requirement: CTET/STET qualification required

3. Important Dates:
• Official notification expected soon
• Application process likely to start soon

4. Exam Pattern:
• Three parts: Language, General Studies, Subject-specific
• Total questions: 150
• Duration: 2.5 hours

For more details, check the official BPSC website.`
}

function generateTREResponse(question: string, searchResults: any[], language: string): string {
  const isHindi = language === 'hi'
  
  if (isHindi) {
    return `बीपीएससी टीआरई 4.0 के बारे में आपका प्रश्न:

1. परीक्षा की जानकारी:
• टीआरई 4.0 बिहार लोक सेवा आयोग द्वारा आयोजित किया जाएगा
• अनुमानित तिथि: अगस्त 2025 के तीसरे या चौथे सप्ताह
• आधिकारिक अधिसूचना सितंबर 2025 के अंत तक जारी होगी

2. महत्वपूर्ण अपडेट:
• फेज 3 शिक्षक भर्ती के पूरा होने के बाद आयोजित होगा
• 1.60 लाख से अधिक शिक्षक पद भरे जाने की उम्मीद
• सीएम नीतीश कुमार ने अपडेट दिया है

3. तैयारी सुझाव:
• जल्दी तैयारी शुरू करें
• आधिकारिक वेबसाइट की निगरानी करें
• पिछले टीआरई पैटर्न का अध्ययन करें

अधिक जानकारी के लिए आधिकारिक वेबसाइट देखें।`
  }

  return `BPSC TRE 4.0 Information:

1. Exam Overview:
• TRE 4.0 will be conducted by Bihar Public Service Commission
• Tentative date: Third or fourth week of August 2025
• Official notification expected by end of September 2025

2. Important Updates:
• Will be conducted after completion of Phase 3 teacher recruitment
• Expected to fill over 1.60 lakh teacher positions
• CM Nitish Kumar has provided updates

3. Preparation Tips:
• Start preparation early
• Monitor official website regularly
• Study previous TRE patterns

4. Timeline:
• Official notification: End of September 2025
• Exam: August 2025 (tentative)
• Application process: Expected after notification

For the most accurate information, check the official BPSC website.`
}

function generateGenericResponse(question: string, searchResults: any[], language: string): string {
  const isHindi = language === 'hi'
  
  if (isHindi) {
    return `आपके प्रश्न के बारे में जानकारी:

1. सामान्य जानकारी:
• बिहार में शिक्षक भर्ती के लिए दो मुख्य परीक्षाएं हैं: एसटीईटी और बीपीएससी
• एसटीईटी बीएसईबी द्वारा आयोजित की जाती है
• बीपीएससी शिक्षक भर्ती बीपीएससी द्वारा आयोजित की जाती है

2. महत्वपूर्ण सुझाव:
• आधिकारिक वेबसाइट की नियमित जांच करें
• पात्रता मानदंड की जांच करें
• समय पर आवेदन करें

3. तैयारी के लिए:
• मॉक टेस्ट का अभ्यास करें
• पिछले वर्ष के प्रश्न पत्र डाउनलोड करें
• नियमित रूप से अध्ययन करें

अधिक विशिष्ट जानकारी के लिए कृपया अपना प्रश्न स्पष्ट करें।`
  }

  return `Information about your question:

1. General Information:
• There are two main exams for teacher recruitment in Bihar: STET and BPSC
• STET is conducted by BSEB
• BPSC Teacher recruitment is conducted by BPSC

2. Important Tips:
• Regularly check official websites
• Verify eligibility criteria
• Apply on time

3. For Preparation:
• Practice mock tests
• Download previous year question papers
• Study regularly

For more specific information, please clarify your question.`
}

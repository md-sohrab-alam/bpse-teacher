import OpenAI from 'openai'
import { searchExamInfo, fetchLatestExamUpdates, fetchCutoffMarks, fetchEligibilityCriteria } from './web-scraper'

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

export interface AgentResponse {
  answer: string
  sources: string[]
  confidence: number
  relatedTopics: string[]
  followUpQuestions: string[]
}

export interface AgentQuery {
  question: string
  context?: string
  language?: 'en' | 'hi'
}

/**
 * AI Agent for BPSC Exam Questions
 * Acts like a knowledgeable assistant that can answer any BPSC-related question
 */
export async function askBPSCAgent(query: AgentQuery): Promise<AgentResponse> {
  // First, search for real-time information from web sources
  let webResults: any[] = []
  let latestUpdates: any[] = []
  let cutoffData: any[] = []
  let eligibilityData: any = null
  
  try {
    // Search for specific information
    webResults = await searchExamInfo(query.question)
    
    // Get latest updates if relevant
    if (query.question.toLowerCase().includes('latest') || 
        query.question.toLowerCase().includes('update') || 
        query.question.toLowerCase().includes('news')) {
      latestUpdates = await fetchLatestExamUpdates()
    }
    
    // Get cutoff marks if relevant
    if (query.question.toLowerCase().includes('cutoff') || 
        query.question.toLowerCase().includes('marks') || 
        query.question.toLowerCase().includes('pass')) {
      cutoffData = await fetchCutoffMarks()
    }
    
    // Get eligibility criteria if relevant
    if (query.question.toLowerCase().includes('eligibility') || 
        query.question.toLowerCase().includes('criteria') || 
        query.question.toLowerCase().includes('requirement')) {
      eligibilityData = await fetchEligibilityCriteria()
    }
  } catch (error) {
    console.error('Error fetching web data:', error)
  }

  if (!openai) {
    // Enhanced fallback response with web data
    const isHindi = query.language === 'hi'
    
    let answer = isHindi 
      ? `मैं समझता हूं कि आप "${query.question}" के बारे में बीपीएससी परीक्षाओं के संदर्भ में पूछ रहे हैं। `
      : `I understand you're asking about "${query.question}" regarding BPSC exams. `
    
    if (webResults.length > 0) {
      answer += isHindi
        ? `हाल की जानकारी के अनुसार: ${webResults[0]?.content || ''} `
        : `Based on recent information: ${webResults[0]?.content || ''} `
    }
    
    if (latestUpdates.length > 0) {
      answer += isHindi
        ? `नवीनतम अपडेट: ${latestUpdates[0]?.title || ''} `
        : `Latest update: ${latestUpdates[0]?.title || ''} `
    }
    
    answer += isHindi
      ? `सबसे सटीक और नवीनतम जानकारी के लिए कृपया आधिकारिक बीपीएससी वेबसाइट (bpsc.bih.nic.in) देखें।`
      : `Please check the official BPSC website (bpsc.bih.nic.in) for the most accurate and up-to-date information.`
    
    return {
      answer,
      sources: ['bpsc.bih.nic.in', ...webResults.map(r => r.source)],
      confidence: 0.8,
      relatedTopics: isHindi 
        ? ['बीपीएससी परीक्षा जानकारी', 'आधिकारिक स्रोत', 'परीक्षा अपडेट']
        : ['BPSC Exam Information', 'Official Sources', 'Exam Updates'],
      followUpQuestions: isHindi
        ? [
            'बीपीएससी परीक्षाओं के लिए पात्रता मानदंड क्या हैं?',
            'अगली बीपीएससी परीक्षा कब निर्धारित है?',
            'मैं बीपीएससी परीक्षाओं के लिए कैसे आवेदन कर सकता हूं?'
          ]
        : [
            'What are the eligibility criteria for BPSC exams?',
            'When is the next BPSC exam scheduled?',
            'How can I apply for BPSC exams?'
          ]
    }
  }

  try {
    const systemPrompt = `You are an expert BPSC (Bihar Public Service Commission) exam assistant. You have comprehensive knowledge about:

1. BPSC Teacher Recruitment Exams (TRE)
2. STET (Secondary Teacher Eligibility Test)
3. Exam dates, notifications, and schedules
4. Eligibility criteria and requirements
5. Application processes and important dates
6. Exam patterns and syllabus
7. Cut-off marks and results
8. Preparation strategies and tips

IMPORTANT GUIDELINES:
- Always provide accurate, helpful information
- If dates are tentative, clearly mention they are not final
- Always recommend checking official sources for confirmation
- Be conversational and helpful like a knowledgeable friend
- If you're not sure about something, say so and suggest official sources
- Provide practical advice and actionable information
- Include relevant context and background information
- RESPOND IN THE SAME LANGUAGE AS THE USER'S QUESTION (Hindi or English)

RESPONSE FORMAT:
- Give a comprehensive, well-structured answer
- Mention official sources where applicable
- Suggest related topics or follow-up questions
- Be encouraging and supportive
- Use the same language as the user's question

Current context: The user is asking about BPSC exams and related information.`

    const userPrompt = `Question: "${query.question}"
Language: ${query.language || 'en'}

REAL-TIME DATA AVAILABLE:
${webResults.length > 0 ? `Web Search Results: ${webResults.map(r => `${r.title}: ${r.content}`).join(' | ')}` : ''}
${latestUpdates.length > 0 ? `Latest Updates: ${latestUpdates.map(u => `${u.title}: ${u.content}`).join(' | ')}` : ''}
${cutoffData.length > 0 ? `Cutoff Data: ${cutoffData.map(c => `${c.year} ${c.category}: ${c.passMarks}/${c.cutoffMarks}`).join(' | ')}` : ''}
${eligibilityData ? `Eligibility: Age: ${eligibilityData.ageLimit}, Education: ${eligibilityData.education}, TET: ${eligibilityData.tetRequirement}` : ''}

IMPORTANT: RESPOND IN ${query.language === 'hi' ? 'HINDI' : 'ENGLISH'} - THE SAME LANGUAGE AS THE USER'S QUESTION.

Please provide a comprehensive, helpful answer as a BPSC exam expert using the real-time data above. Structure your response with:

1. Direct Answer: Give a clear, direct response to the question using the latest information
2. Relevant Context: Provide background information and context
3. Official Sources: List official sources where users can verify information
4. Practical Advice: Offer actionable next steps and advice
5. Related Topics: Suggest related areas of interest

FORMATTING GUIDELINES:
- Use bullet points (•) for lists and key points
- Make important information stand out
- Use clear headings for each section
- Include specific details and examples
- Be encouraging and supportive
- Always mention if information is from real-time sources
- RESPOND ENTIRELY IN ${query.language === 'hi' ? 'HINDI' : 'ENGLISH'}

Make it conversational and helpful, like you're talking to a friend who's preparing for BPSC exams.`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    })

    const answer = response.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response at the moment. Please try again or check the official BPSC website for information.'

    // Generate follow-up questions
    const followUpResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Generate 3-4 relevant follow-up questions that someone might ask after getting this answer. Make them specific and helpful. ${query.language === 'hi' ? 'Generate questions in HINDI.' : 'Generate questions in ENGLISH.'} Return as JSON array.`
        },
        {
          role: 'user',
          content: `Based on this answer: "${answer}", generate follow-up questions in ${query.language === 'hi' ? 'HINDI' : 'ENGLISH'}.`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })

    let followUpQuestions: string[] = []
    try {
      const followUpText = followUpResponse.choices[0]?.message?.content
      if (followUpText) {
        followUpQuestions = JSON.parse(followUpText)
      }
    } catch {
      const isHindi = query.language === 'hi'
      followUpQuestions = isHindi
        ? [
            'पात्रता मानदंड क्या हैं?',
            'अगली परीक्षा कब निर्धारित है?',
            'मैं प्रभावी ढंग से कैसे तैयारी कर सकता हूं?'
          ]
        : [
            'What are the eligibility criteria?',
            'When is the next exam scheduled?',
            'How can I prepare effectively?'
          ]
    }

    return {
      answer,
      sources: [
        'bpsc.bih.nic.in', 
        'Official BPSC notifications',
        ...webResults.map(r => r.source),
        ...latestUpdates.map(u => u.source)
      ].filter((source, index, arr) => arr.indexOf(source) === index), // Remove duplicates
      confidence: 0.95,
      relatedTopics: ['BPSC Exams', 'Teacher Recruitment', 'Exam Preparation'],
      followUpQuestions
    }

  } catch (error) {
    console.error('AI Agent error:', error)
    const isHindi = query.language === 'hi'
    
    return {
      answer: isHindi
        ? `मैं क्षमा चाहता हूं, लेकिन मुझे आपके प्रश्न को संसाधित करने में अभी समस्या हो रही है। कृपया कुछ देर बाद फिर से प्रयास करें, या "${query.question}" के बारे में सबसे सटीक जानकारी के लिए आधिकारिक बीपीएससी वेबसाइट (bpsc.bih.nic.in) देखें।`
        : `I apologize, but I'm having trouble processing your question right now. Please try again in a moment, or check the official BPSC website (bpsc.bih.nic.in) for the most accurate information about "${query.question}".`,
      sources: ['bpsc.bih.nic.in'],
      confidence: 0.5,
      relatedTopics: isHindi 
        ? ['बीपीएससी जानकारी', 'आधिकारिक स्रोत']
        : ['BPSC Information', 'Official Sources'],
      followUpQuestions: isHindi
        ? [
            'बुनियादी पात्रता आवश्यकताएं क्या हैं?',
            'मैं परीक्षा सूचनाओं के साथ कैसे अपडेट रह सकता हूं?',
            'मुझे आधिकारिक जानकारी कहां मिल सकती है?'
          ]
        : [
            'What are the basic eligibility requirements?',
            'How can I stay updated with exam notifications?',
            'Where can I find official information?'
          ]
    }
  }
}

/**
 * Generate search suggestions based on the question
 */
export async function generateAgentSuggestions(question: string, language: 'en' | 'hi' = 'en'): Promise<string[]> {
  if (!openai) {
    const isHindi = language === 'hi'
    return isHindi
      ? [
          'बीपीएससी परीक्षा तिथियां 2025',
          'टीआरई 4.0 सूचना',
          'एसटीईटी पात्रता मानदंड',
          'शिक्षक भर्ती प्रक्रिया',
          'परीक्षा तैयारी टिप्स'
        ]
      : [
          'BPSC exam dates 2025',
          'TRE 4.0 notification',
          'STET eligibility criteria',
          'Teacher recruitment process',
          'Exam preparation tips'
        ]
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Generate 5 relevant BPSC exam-related questions that someone might ask. Make them specific and helpful. ${language === 'hi' ? 'Generate questions in HINDI.' : 'Generate questions in ENGLISH.'} Return as JSON array.`
        },
        {
          role: 'user',
          content: `Based on this question: "${question}", generate related questions in ${language === 'hi' ? 'HINDI' : 'ENGLISH'}.`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })

    const suggestions = response.choices[0]?.message?.content
    if (suggestions) {
      try {
        return JSON.parse(suggestions)
          } catch {
      const isHindi = language === 'hi'
      return isHindi
        ? [
            'बीपीएससी परीक्षा तिथियां 2025',
            'टीआरई 4.0 सूचना',
            'एसटीईटी पात्रता मानदंड',
            'शिक्षक भर्ती प्रक्रिया',
            'परीक्षा तैयारी टिप्स'
          ]
        : [
            'BPSC exam dates 2025',
            'TRE 4.0 notification',
            'STET eligibility criteria',
            'Teacher recruitment process',
            'Exam preparation tips'
          ]
    }
    }

    return []
  } catch (error) {
    console.error('Error generating suggestions:', error)
    const isHindi = language === 'hi'
    return isHindi
      ? [
          'बीपीएससी परीक्षा तिथियां 2025',
          'टीआरई 4.0 सूचना',
          'एसटीईटी पात्रता मानदंड',
          'शिक्षक भर्ती प्रक्रिया',
          'परीक्षा तैयारी टिप्स'
        ]
      : [
          'BPSC exam dates 2025',
          'TRE 4.0 notification',
          'STET eligibility criteria',
          'Teacher recruitment process',
          'Exam preparation tips'
        ]
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { askBPSCAgent, generateAgentSuggestions, AgentQuery } from '@/lib/ai-agent'

export async function POST(request: NextRequest) {
  try {
    const body: AgentQuery = await request.json()
    const { question, language = 'en', context } = body

    if (!question || question.trim().length < 3) {
      return NextResponse.json(
        { error: 'Question must be at least 3 characters long' },
        { status: 400 }
      )
    }

    const startTime = Date.now()

    // Get AI agent response
    const agentResponse = await askBPSCAgent({
      question: question.trim(),
      language,
      context
    })

    // Generate suggestions
    const suggestions = await generateAgentSuggestions(question, language)

    const processingTime = Date.now() - startTime

    return NextResponse.json({
      ...agentResponse,
      suggestions,
      processingTime,
      success: true
    })

  } catch (error) {
    console.error('Agent API error:', error)
    return NextResponse.json(
      { 
        error: 'Agent failed to process your question', 
        success: false,
        answer: 'I apologize, but I\'m having trouble processing your question right now. Please try again or check the official BPSC website for information.',
        sources: ['bpsc.bih.nic.in'],
        confidence: 0.3,
        relatedTopics: ['BPSC Information'],
        followUpQuestions: [
          'What are the basic eligibility requirements?',
          'How can I stay updated with exam notifications?',
          'Where can I find official information?'
        ],
        suggestions: [
          'BPSC exam dates 2025',
          'TRE 4.0 notification',
          'STET eligibility criteria'
        ]
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const question = searchParams.get('q')

    if (!question || question.trim().length < 3) {
      return NextResponse.json(
        { suggestions: [] },
        { status: 200 }
      )
    }

    // Generate suggestions based on the question
    const suggestions = await generateAgentSuggestions(question.trim(), 'en')

    return NextResponse.json({
      suggestions,
      success: true
    })

  } catch (error) {
    console.error('Agent suggestions error:', error)
    return NextResponse.json(
      { 
        suggestions: [
          'BPSC exam dates 2025',
          'TRE 4.0 notification',
          'STET eligibility criteria',
          'Teacher recruitment process',
          'Exam preparation tips'
        ], 
        success: false 
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { generateBPSCComputerScienceQuestions, generateCompleteBPSCComputerScienceExam, GeneratedQuestion } from '@/lib/model-paper-integration'

interface GenerateRequest {
  testId: string
  subject?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  questionCount?: number
  topics?: string[]
}

interface Question {
  id: string
  text: string
  textHi: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  optionsHi: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation?: string
  explanationHi?: string
  topic?: string
  difficulty?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    const { testId, subject, difficulty = 'medium', questionCount = 120, topics } = body

    let questions: Question[] = []

    // Always use our comprehensive Computer Science question bank for BPSC Teacher/Computer Science
    if (subject === 'Computer Science' || subject === 'BPSC_TEACHER') {
      // Use complete BPSC Computer Science exam (80 CS + 40 GS = 120 questions)
      const generatedQuestions = generateCompleteBPSCComputerScienceExam();
      questions = generatedQuestions.map((q) => ({
        id: q.id,
        text: q.question,
        textHi: q.questionHi || '',
        options: q.options,
        optionsHi: q.optionsHi || {
          A: '',
          B: '',
          C: '',
          D: ''
        },
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        explanationHi: q.explanationHi
      }))
    } else {
      // Generate questions using your existing system for other subjects
      questions = await generateQuestionsFromExistingSystem({
        subject: subject || 'Computer Science',
        difficulty,
        questionCount,
        topics
      })
    }

    // Shuffle questions for randomization
    questions = shuffleArray(questions)

    // Limit to requested question count
    questions = questions.slice(0, questionCount)

    return NextResponse.json({
      success: true,
      testId,
      questions,
      totalQuestions: questions.length,
      duration: 7200, // 2 hours default
      negativeMarking: 0.25
    })

  } catch (error) {
    console.error('Model paper generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate model paper' },
      { status: 500 }
    )
  }
}

// Function to integrate with your existing model paper generation system
async function generateQuestionsFromExistingSystem(params: {
  subject: string
  difficulty: string
  questionCount: number
  topics?: string[]
}): Promise<Question[]> {
  try {
    // TODO: Replace this with actual integration to your existing system
    // You would typically:
    // 1. Make an HTTP request to your existing system
    // 2. Or import and call functions directly from your existing codebase
    // 3. Transform the response to match the expected Question interface

    // Example integration (replace with actual implementation):
    /*
    const response = await fetch('http://localhost:3001/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: params.subject,
        difficulty: params.difficulty,
        count: params.questionCount,
        topics: params.topics
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate questions from existing system')
    }

    const data = await response.json()
    return data.questions.map(transformQuestion)
    */

    // For now, return mock questions
    return generateMockQuestions(params)
  } catch (error) {
    console.error('Error generating questions from existing system:', error)
    // Fallback to mock questions
    return generateMockQuestions(params)
  }
}

// Transform function to convert your existing question format to the expected format
function transformQuestion(existingQuestion: any): Question {
  return {
    id: existingQuestion.id || Math.random().toString(36).substr(2, 9),
    text: existingQuestion.question || existingQuestion.text,
    textHi: existingQuestion.questionHi || existingQuestion.textHi || '',
    options: {
      A: existingQuestion.options?.A || existingQuestion.optionA,
      B: existingQuestion.options?.B || existingQuestion.optionB,
      C: existingQuestion.options?.C || existingQuestion.optionC,
      D: existingQuestion.options?.D || existingQuestion.optionD
    },
    optionsHi: {
      A: existingQuestion.optionsHi?.A || existingQuestion.optionAHi || '',
      B: existingQuestion.optionsHi?.B || existingQuestion.optionBHi || '',
      C: existingQuestion.optionsHi?.C || existingQuestion.optionCHi || '',
      D: existingQuestion.optionsHi?.D || existingQuestion.optionDHi || ''
    },
    correctAnswer: existingQuestion.correctAnswer || existingQuestion.correct,
    explanation: existingQuestion.explanation,
    explanationHi: existingQuestion.explanationHi,
    topic: existingQuestion.topic,
    difficulty: existingQuestion.difficulty
  }
}

// Generate mock questions as fallback
function generateMockQuestions(params: {
  subject: string
  difficulty: string
  questionCount: number
  topics?: string[]
}): Question[] {
  const mockQuestions: Question[] = [
    {
      id: '1',
      text: 'What is the primary function of an operating system?',
      textHi: 'ऑपरेटिंग सिस्टम का प्राथमिक कार्य क्या है?',
      options: {
        A: 'To provide a user interface',
        B: 'To manage computer hardware and software resources',
        C: 'To connect to the internet',
        D: 'To store data permanently'
      },
      optionsHi: {
        A: 'उपयोगकर्ता इंटरफेस प्रदान करना',
        B: 'कंप्यूटर हार्डवेयर और सॉफ्टवेयर संसाधनों का प्रबंधन',
        C: 'इंटरनेट से कनेक्ट करना',
        D: 'डेटा को स्थायी रूप से संग्रहित करना'
      },
      correctAnswer: 'B',
      explanation: 'An operating system manages computer hardware and software resources and provides common services for computer programs.',
      topic: 'Operating Systems',
      difficulty: 'medium'
    },
    {
      id: '2',
      text: 'Which programming language is known as the "language of the web"?',
      textHi: 'किस प्रोग्रामिंग भाषा को "वेब की भाषा" के रूप में जाना जाता है?',
      options: {
        A: 'Python',
        B: 'Java',
        C: 'JavaScript',
        D: 'C++'
      },
      optionsHi: {
        A: 'पायथन',
        B: 'जावा',
        C: 'जावास्क्रिप्ट',
        D: 'C++'
      },
      correctAnswer: 'C',
      explanation: 'JavaScript is the primary language used for web development and is often called the "language of the web".',
      topic: 'Web Technologies',
      difficulty: 'easy'
    },
    {
      id: '3',
      text: 'What does SQL stand for?',
      textHi: 'SQL का पूरा नाम क्या है?',
      options: {
        A: 'Structured Query Language',
        B: 'Simple Query Language',
        C: 'Standard Query Language',
        D: 'System Query Language'
      },
      optionsHi: {
        A: 'स्ट्रक्चर्ड क्वेरी लैंग्वेज',
        B: 'सिंपल क्वेरी लैंग्वेज',
        C: 'स्टैंडर्ड क्वेरी लैंग्वेज',
        D: 'सिस्टम क्वेरी लैंग्वेज'
      },
      correctAnswer: 'A',
      explanation: 'SQL stands for Structured Query Language, which is used to manage and manipulate relational databases.',
      topic: 'Database Management',
      difficulty: 'easy'
    }
  ]

  // Generate additional questions based on the requested count
  const additionalQuestions: Question[] = []
  for (let i = 4; i <= params.questionCount; i++) {
    additionalQuestions.push({
      id: i.toString(),
      text: `Sample question ${i} for ${params.subject}`,
      textHi: `${params.subject} के लिए नमूना प्रश्न ${i}`,
      options: {
        A: `Option A for question ${i}`,
        B: `Option B for question ${i}`,
        C: `Option C for question ${i}`,
        D: `Option D for question ${i}`
      },
      optionsHi: {
        A: `प्रश्न ${i} के लिए विकल्प A`,
        B: `प्रश्न ${i} के लिए विकल्प B`,
        C: `प्रश्न ${i} के लिए विकल्प C`,
        D: `प्रश्न ${i} के लिए विकल्प D`
      },
      correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] as 'A' | 'B' | 'C' | 'D',
      topic: params.topics?.[Math.floor(Math.random() * (params.topics?.length || 1))] || 'General',
      difficulty: params.difficulty
    })
  }

  return [...mockQuestions, ...additionalQuestions]
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

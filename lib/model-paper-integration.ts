// Integration utilities for the existing model paper generation system
// This file contains functions to connect with your existing BPSC exam web app

// Import computer science questions
import { 
  allComputerScienceQuestions, 
  getRandomComputerScienceQuestions,
  getQuestionsWithDistribution,
  defaultBPSCDistribution 
} from '../data/computer-science-questions-complete';

// Import general studies questions
import { generalStudiesQuestions } from '../data/general-studies-questions';

export interface ModelPaperConfig {
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  questionCount: number
  topics?: string[]
  examType: 'STET' | 'BPSC_TEACHER'
  level?: string
}

export interface GeneratedQuestion {
  id: string
  question: string
  questionHi?: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  optionsHi?: {
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
  marks?: number
}

export interface ModelPaperResponse {
  success: boolean
  questions: GeneratedQuestion[]
  totalQuestions: number
  duration: number
  negativeMarking: number
  topics: string[]
  difficulty: string
}

/**
 * Generate model paper questions using your existing system
 * Replace this function with actual integration to your existing BPSC exam web app
 */
export async function generateModelPaper(config: ModelPaperConfig): Promise<ModelPaperResponse> {
  try {
    // TODO: Replace this with actual integration to your existing system at E:\Web App\bpsc_exam_web_app
    
    // Option 1: HTTP API call to your existing system
    // const response = await fetch('http://localhost:3001/api/generate-model-paper', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(config)
    // })
    
    // Option 2: Direct function call (if you can import from your existing system)
    // import { generateQuestions } from 'E:/Web App/bpsc_exam_web_app/src/utils/questionGenerator'
    // const questions = await generateQuestions(config)
    
    // Option 3: File system integration
    // const questions = await readQuestionsFromFile(config)
    
    // For now, return mock data
    return generateMockModelPaper(config)
  } catch (error) {
    console.error('Error generating model paper:', error)
    throw new Error('Failed to generate model paper')
  }
}

/**
 * Generate mock model paper for development/testing
 */
function generateMockModelPaper(config: ModelPaperConfig): ModelPaperResponse {
  const questions: GeneratedQuestion[] = []
  
  // Generate questions based on subject
  const subjectQuestions = getSubjectQuestions(config.subject)
  
  for (let i = 0; i < config.questionCount; i++) {
    const baseQuestion = subjectQuestions[i % subjectQuestions.length]
    questions.push({
      id: `q_${config.subject}_${i + 1}`,
      question: `${baseQuestion.question} (Question ${i + 1})`,
      questionHi: baseQuestion.questionHi ? `${baseQuestion.questionHi} (प्रश्न ${i + 1})` : undefined,
      options: baseQuestion.options,
      optionsHi: baseQuestion.optionsHi,
      correctAnswer: baseQuestion.correctAnswer,
      explanation: baseQuestion.explanation,
      explanationHi: baseQuestion.explanationHi,
      topic: baseQuestion.topic,
      difficulty: config.difficulty,
      marks: 1
    })
  }
  
  return {
    success: true,
    questions,
    totalQuestions: questions.length,
    duration: config.questionCount * 60, // 1 minute per question
    negativeMarking: 0.25,
    topics: config.topics || ['General'],
    difficulty: config.difficulty
  }
}

/**
 * Generate computer science questions from the comprehensive question bank
 */
function generateComputerScienceQuestions(): GeneratedQuestion[] {
  // Use the actual computer science questions instead of mock data
  const questions = getRandomComputerScienceQuestions(120);
  
  return questions.map((q, index) => ({
    id: `cs_${index + 1}`,
    question: q.textEn,
    questionHi: q.textHi,
    options: {
      A: q.optionAEn,
      B: q.optionBEn,
      C: q.optionCEn,
      D: q.optionDEn
    },
    optionsHi: {
      A: q.optionAHi,
      B: q.optionBHi,
      C: q.optionCHi,
      D: q.optionDHi
    },
    correctAnswer: q.correct as 'A' | 'B' | 'C' | 'D',
    explanation: q.explanationEn,
    explanationHi: q.explanationHi,
    topic: 'Computer Science',
    difficulty: 'Medium',
    marks: 1
  }));
}

/**
 * Generate BPSC Teacher Computer Science questions with proper distribution
 */
export function generateBPSCComputerScienceQuestions(count: number = 120): GeneratedQuestion[] {
  const questions = getQuestionsWithDistribution(defaultBPSCDistribution);
  
  return questions.map((q, index) => ({
    id: `bpsc-cs-${index + 1}`,
    question: q.textEn,
    questionHi: q.textHi,
    options: {
      A: q.optionAEn,
      B: q.optionBEn,
      C: q.optionCEn,
      D: q.optionDEn
    },
    optionsHi: {
      A: q.optionAHi,
      B: q.optionBHi,
      C: q.optionCHi,
      D: q.optionDHi
    },
    correctAnswer: q.correct as 'A' | 'B' | 'C' | 'D',
    explanation: q.explanationEn,
    explanationHi: q.explanationHi,
    topic: 'Computer Science',
    difficulty: 'Medium',
    marks: 1
  }));
}

export function generateCompleteBPSCComputerScienceExam(): GeneratedQuestion[] {
  // Get 80 Computer Science questions
  const csQuestions = getQuestionsWithDistribution(defaultBPSCDistribution).slice(0, 80);
  
  // Get 40 General Studies questions
  const gsQuestions = generalStudiesQuestions.slice(0, 40);
  
  const allQuestions: GeneratedQuestion[] = [];
  
  // Add Computer Science questions (1-80)
  csQuestions.forEach((q, index) => {
    allQuestions.push({
      id: `bpsc-cs-${index + 1}`,
      question: q.textEn,
      questionHi: q.textHi,
      options: {
        A: q.optionAEn,
        B: q.optionBEn,
        C: q.optionCEn,
        D: q.optionDEn
      },
      optionsHi: {
        A: q.optionAHi,
        B: q.optionBHi,
        C: q.optionCHi,
        D: q.optionDHi
      },
      correctAnswer: q.correct as 'A' | 'B' | 'C' | 'D',
      explanation: q.explanationEn,
      explanationHi: q.explanationHi,
      topic: 'Computer Science',
      difficulty: 'Medium',
      marks: 1
    });
  });
  
  // Add General Studies questions (81-120)
  gsQuestions.forEach((q, index) => {
    allQuestions.push({
      id: `bpsc-gs-${index + 1}`,
      question: q.textEn,
      questionHi: q.textHi,
      options: {
        A: q.optionAEn,
        B: q.optionBEn,
        C: q.optionCEn,
        D: q.optionDEn
      },
      optionsHi: {
        A: q.optionAHi,
        B: q.optionBHi,
        C: q.optionCHi,
        D: q.optionDHi
      },
      correctAnswer: q.correct as 'A' | 'B' | 'C' | 'D',
      explanation: q.explanationEn,
      explanationHi: q.explanationHi,
      topic: 'General Studies',
      difficulty: 'Medium',
      marks: 1
    });
  });
  
  return allQuestions;
}

/**
 * Get subject-specific questions
 */
function getSubjectQuestions(subject: string): GeneratedQuestion[] {
  const questionBank: Record<string, GeneratedQuestion[]> = {
    'Computer Science': generateComputerScienceQuestions(),
    'Mathematics': [
      {
        id: 'math_1',
        question: 'What is the value of π (pi) to two decimal places?',
        questionHi: 'π (पाई) का मान दो दशमलव स्थानों तक क्या है?',
        options: {
          A: '3.12',
          B: '3.14',
          C: '3.16',
          D: '3.18'
        },
        optionsHi: {
          A: '3.12',
          B: '3.14',
          C: '3.16',
          D: '3.18'
        },
        correctAnswer: 'B',
        explanation: 'The value of π (pi) is approximately 3.14159..., which rounds to 3.14 to two decimal places.',
        topic: 'Geometry'
      }
    ],
    'English': [
      {
        id: 'eng_1',
        question: 'Which of the following is a correct sentence?',
        questionHi: 'निम्नलिखित में से कौन सा सही वाक्य है?',
        options: {
          A: 'I am going to the store.',
          B: 'I is going to the store.',
          C: 'I are going to the store.',
          D: 'I be going to the store.'
        },
        optionsHi: {
          A: 'मैं दुकान जा रहा हूँ।',
          B: 'मैं दुकान जा रहा हूँ।',
          C: 'मैं दुकान जा रहा हूँ।',
          D: 'मैं दुकान जा रहा हूँ।'
        },
        correctAnswer: 'A',
        explanation: 'The correct sentence uses the first person singular form "am" with the subject "I".',
        topic: 'Grammar'
      }
    ]
  }
  
  return questionBank[subject] || questionBank['Computer Science']
}

/**
 * Transform questions to match the expected format
 */
export function transformQuestions(questions: GeneratedQuestion[]): any[] {
  return questions.map(q => ({
    id: q.id,
    textEn: q.question,
    textHi: q.questionHi || '',
    optionAEn: q.options.A,
    optionAHi: q.optionsHi?.A || '',
    optionBEn: q.options.B,
    optionBHi: q.optionsHi?.B || '',
    optionCEn: q.options.C,
    optionCHi: q.optionsHi?.C || '',
    optionDEn: q.options.D,
    optionDHi: q.optionsHi?.D || '',
    correct: q.correctAnswer,
    explanationEn: q.explanation || '',
    explanationHi: q.explanationHi || '',
    topic: q.topic,
    difficulty: q.difficulty,
    marks: q.marks || 1
  }))
}

/**
 * Save generated questions to database
 */
export async function saveQuestionsToDatabase(testId: string, questions: GeneratedQuestion[]) {
  try {
    // Transform questions to database format
    const transformedQuestions = transformQuestions(questions)
    
    // Save to database using Prisma
    // This would be implemented in your API route
    console.log(`Saving ${questions.length} questions to test ${testId}`)
    
    return true
  } catch (error) {
    console.error('Error saving questions to database:', error)
    throw error
  }
}

/**
 * Integration helper for your existing system
 * Replace this with actual integration code
 */
export async function integrateWithExistingSystem(config: ModelPaperConfig): Promise<GeneratedQuestion[]> {
  // TODO: Implement actual integration with your existing system
  
  // Example integration approaches:
  
  // 1. HTTP API call
  /*
  const response = await fetch('http://localhost:3001/api/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  })
  const data = await response.json()
  return data.questions
  */
  
  // 2. Direct import (if possible)
  /*
  const { generateQuestions } = await import('E:/Web App/bpsc_exam_web_app/src/utils/questionGenerator')
  return await generateQuestions(config)
  */
  
  // 3. File system read
  /*
  const questions = await readQuestionsFromFile(config)
  return questions
  */
  
  // For now, return mock data
  return generateMockModelPaper(config).questions
}

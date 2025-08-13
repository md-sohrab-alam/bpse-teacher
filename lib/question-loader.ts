// Import all question sets
import { computerScienceQuestions } from '@/data/computer-science-questions'
import { computerScienceQuestions2 } from '@/data/computer-science-questions-2'
import { computerScienceQuestions3 } from '@/data/computer-science-questions-3'
import { computerScienceQuestions4 } from '@/data/computer-science-questions-4'
import { computerScienceQuestions5 } from '@/data/computer-science-questions-5'
import { mathQuestions1 } from '@/data/math/math-1'
import { stetQuestions1 } from '@/data/stet/computer/stetQuestions1'
import { stetQuestions2 } from '@/data/stet/computer/stetQuestions2'
import { stetQuestions3 } from '@/data/stet/computer/stetQuestions3'
import { stetQuestions4 } from '@/data/stet/computer/stetQuestions4'
import { stetQuestions5 } from '@/data/stet/computer/stetQuestions5'
import { stetQuestions6 } from '@/data/stet/computer/stetQuestions6'
import { stetQuestions7 } from '@/data/stet/computer/stetQuestions7'

export interface Question {
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
}

// Function to transform question format from data files to our interface
function transformQuestion(question: any, index: number): Question {
  return {
    id: (index + 1).toString(),
    text: question.textEn,
    textHi: question.textHi,
    options: {
      A: question.optionAEn,
      B: question.optionBEn,
      C: question.optionCEn,
      D: question.optionDEn
    },
    optionsHi: {
      A: question.optionAHi,
      B: question.optionBHi,
      C: question.optionCHi,
      D: question.optionDHi
    },
    correctAnswer: question.correct as 'A' | 'B' | 'C' | 'D',
    explanation: question.explanationEn,
    explanationHi: question.explanationHi
  }
}

// Question set mapping
const questionSets: Record<string, any[]> = {
  'computer-science-1': computerScienceQuestions,
  'computer-science-2': computerScienceQuestions2,
  'computer-science-3': computerScienceQuestions3,
  'computer-science-4': computerScienceQuestions4,
  'computer-science-5': computerScienceQuestions5,
  'math-1': mathQuestions1,
  'stet-computer-1': stetQuestions1,
  'stet-computer-2': stetQuestions2,
  'stet-computer-3': stetQuestions3,
  'stet-computer-4': stetQuestions4,
  'stet-computer-5': stetQuestions5,
  'stet-computer-6': stetQuestions6,
  'stet-computer-7': stetQuestions7
}

// Function to load questions by question set
export function loadQuestionsBySet(questionSet: string, count?: number): Question[] {
  const questions = questionSets[questionSet]
  
  if (!questions) {
    console.error(`Question set '${questionSet}' not found`)
    return []
  }

  // Transform questions to our format
  const transformedQuestions = questions.map((q, index) => transformQuestion(q, index))
  
  // If count is specified, return only that many questions
  if (count && count < transformedQuestions.length) {
    return transformedQuestions.slice(0, count)
  }
  
  return transformedQuestions
}

// Function to get random questions from a set
export function getRandomQuestions(questionSet: string, count: number): Question[] {
  const questions = loadQuestionsBySet(questionSet)
  
  if (questions.length === 0) return []
  
  // Shuffle questions and take the specified count
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, questions.length))
}

// Function to get available question sets
export function getAvailableQuestionSets(): string[] {
  return Object.keys(questionSets)
}

// Function to get question count for a set
export function getQuestionCount(questionSet: string): number {
  const questions = questionSets[questionSet]
  return questions ? questions.length : 0
}

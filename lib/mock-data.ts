export interface ExamUpdate {
  title: string
  content: string
  date: string
  source: string
  url: string
  type: 'notification' | 'news' | 'update'
}

export interface SyllabusTopic {
  topic: string
  subtopics: string[]
  description: string
  weightage?: string
}

export interface Syllabus {
  stream: string
  topics: SyllabusTopic[]
  totalMarks: number
  duration: string
  source: string
}

export interface CutoffData {
  year: string
  category: string
  passMarks: string
  cutoffMarks: string
  totalVacancies: number
  source: string
}

export interface EligibilityCriteria {
  ageLimit: string
  education: string
  tetRequirement: string
  domicile: string
  experience?: string
  relaxation?: string
  source: string
}

/**
 * Fetch latest BPSC exam updates (mock data for client-side)
 */
export async function fetchLatestExamUpdates(): Promise<ExamUpdate[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return [
    {
      title: 'BPSC Teacher Recruitment 2025 Notification Expected Soon',
      content: 'The Bihar Public Service Commission is expected to release the official notification for Teacher Recruitment 2025 in the coming weeks. Candidates are advised to stay updated.',
      date: new Date().toISOString(),
      source: 'BPSC Official',
      url: 'https://bpsc.bih.nic.in/',
      type: 'notification'
    },
    {
      title: 'STET 2025 Application Process to Begin',
      content: 'The Secondary Teacher Eligibility Test (STET) 2025 application process is expected to begin soon. All eligible candidates can apply online.',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      source: 'BSEB Official',
      url: 'https://bseb.org.in/',
      type: 'news'
    },
    {
      title: 'TRE 5.0 Exam Pattern and Syllabus Released',
      content: 'The detailed exam pattern and syllabus for Teacher Recruitment Exam (TRE) 5.0 has been officially released by BPSC.',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      source: 'BPSC Official',
      url: 'https://bpsc.bih.nic.in/',
      type: 'update'
    },
    {
      title: 'BPSC Teacher Cut-off Marks 2024 Released',
      content: 'BPSC has officially released the cut-off marks for Teacher Recruitment 2024. Check category-wise cut-offs on the official website.',
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      source: 'BPSC Official',
      url: 'https://bpsc.bih.nic.in/',
      type: 'notification'
    },
    {
      title: 'STET 2024 Result Declared',
      content: 'The result for STET 2024 has been declared. Successful candidates can download their certificates from the official portal.',
      date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      source: 'BSEB Official',
      url: 'https://bseb.org.in/',
      type: 'news'
    }
  ]
}

/**
 * Fetch syllabus data (mock data for client-side)
 */
export async function fetchSyllabus(examType: string = 'STET'): Promise<Syllabus[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return [
    {
      stream: 'Paper I (Classes 9-10)',
      totalMarks: 150,
      duration: '2.5 hours',
      source: 'BSEB Official',
      topics: [
        {
          topic: 'Child Development and Pedagogy',
          subtopics: ['Growth and development of learners', 'Learning theories', 'Teaching methodologies'],
          description: 'Understanding child development and effective teaching methods',
          weightage: '30 questions'
        },
        {
          topic: 'Subject Concerned',
          subtopics: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science'],
          description: 'Subject-specific knowledge and pedagogy',
          weightage: '120 questions'
        }
      ]
    },
    {
      stream: 'Paper II (Classes 11-12)',
      totalMarks: 150,
      duration: '2.5 hours',
      source: 'BSEB Official',
      topics: [
        {
          topic: 'Child Development and Pedagogy',
          subtopics: ['Learner development', 'Principles of teaching', 'Curriculum planning'],
          description: 'Advanced pedagogy for senior secondary level',
          weightage: '30 questions'
        },
        {
          topic: 'Subject Concerned',
          subtopics: ['Advanced subjects', 'Subject-specific pedagogy', 'Interdisciplinary approaches'],
          description: 'Advanced subject knowledge and teaching methods',
          weightage: '120 questions'
        }
      ]
    }
  ]
}

/**
 * Fetch eligibility criteria (mock data for client-side)
 */
export async function fetchEligibilityCriteria(examType: string = 'STET'): Promise<EligibilityCriteria[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return [
    {
      ageLimit: '21 to 37 years',
      education: 'Graduation with 50% marks',
      tetRequirement: 'CTET or STET qualification required',
      domicile: 'Bihar domicile preferred',
      experience: 'No experience required',
      relaxation: 'Age relaxation for reserved categories',
      source: 'BSEB Official'
    }
  ]
}

/**
 * Fetch cutoff marks (mock data for client-side)
 */
export async function fetchCutoffMarks(examType: string = 'STET'): Promise<CutoffData[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return [
    {
      year: '2024',
      category: 'General',
      passMarks: '75',
      cutoffMarks: '85',
      totalVacancies: 1500,
      source: 'BSEB Official'
    },
    {
      year: '2024',
      category: 'OBC',
      passMarks: '68',
      cutoffMarks: '78',
      totalVacancies: 1500,
      source: 'BSEB Official'
    },
    {
      year: '2024',
      category: 'SC',
      passMarks: '60',
      cutoffMarks: '70',
      totalVacancies: 1500,
      source: 'BSEB Official'
    },
    {
      year: '2024',
      category: 'ST',
      passMarks: '60',
      cutoffMarks: '68',
      totalVacancies: 1500,
      source: 'BSEB Official'
    },
    {
      year: '2023',
      category: 'General',
      passMarks: '72',
      cutoffMarks: '82',
      totalVacancies: 1200,
      source: 'BSEB Official'
    },
    {
      year: '2023',
      category: 'OBC',
      passMarks: '65',
      cutoffMarks: '75',
      totalVacancies: 1200,
      source: 'BSEB Official'
    }
  ]
}

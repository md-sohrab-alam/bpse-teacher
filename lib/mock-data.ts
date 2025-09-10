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
      title: 'TRE-3.0 Cancelled Due to Paper Leak - New Dates Expected',
      content: 'BPSC cancelled TRE-3.0 in March 2024 due to question paper leak allegations. Over 5 lakh candidates were affected. New examination dates will be announced soon.',
      date: new Date().toISOString(),
      source: 'BPSC Official',
      url: 'https://bpsc.bih.nic.in/',
      type: 'notification'
    },
    {
      title: 'STET 2024 Results Declared - 70.25% Pass Rate',
      content: 'BSEB announced STET 2024 results in November 2024. Out of 423,822 candidates, 297,747 (70.25%) were declared successful. Certificates available for download.',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      source: 'BSEB Official',
      url: 'https://bseb.org.in/',
      type: 'news'
    },
    {
      title: 'TRE-4.0 Recruitment for 1.6 Lakh Posts Expected',
      content: 'BPSC is preparing to fill approximately 1.6 lakh teaching positions through TRE-4.0 recruitment drive, tentatively scheduled for late 2025. Vacancies across all teaching levels.',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      source: 'BPSC Official',
      url: 'https://bpsc.bih.nic.in/',
      type: 'update'
    },
    {
      title: 'Massive Protests in Patna Over STET Delays',
      content: 'Thousands of STET aspirants protested in Patna in August 2025, demanding STET be conducted before TRE-4. Education Minister stated STET will be held after TRE-4 vacancies are released.',
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      source: 'News Reports',
      url: 'https://timesofindia.indiatimes.com/',
      type: 'news'
    },
    {
      title: 'BPSC Issues Advisory Against Fraudulent Coaching Claims',
      content: 'BPSC warned candidates against coaching centers claiming their materials are directly aligned with actual exam questions. Commission clarified all papers are randomly selected from official question bank.',
      date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      source: 'BPSC Official',
      url: 'https://bpsc.bih.nic.in/',
      type: 'notification'
    },
    {
      title: 'STET 2025 Notification Expected After TRE-4 Vacancies',
      content: 'Education Minister Sunil Kumar stated that STET 2025 will be conducted only after TRE-4 vacancies are released. This decision aims to manage the number of qualified candidates effectively.',
      date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      source: 'Government Statement',
      url: 'https://state.bihar.gov.in/',
      type: 'update'
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

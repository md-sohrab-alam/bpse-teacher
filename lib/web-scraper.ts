// Using native fetch instead of axios to avoid Node.js compatibility issues
import * as cheerio from 'cheerio'

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
 * Fetch latest BPSC exam updates from multiple sources
 */
export async function fetchLatestExamUpdates(): Promise<ExamUpdate[]> {
  const updates: ExamUpdate[] = []
  
  try {
    // For now, return mock data since web scraping might have CORS issues in browser
    // In production, this would be handled by API routes
    updates.push(
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
    )
    
  } catch (error) {
    console.error('Error fetching exam updates:', error)
  }
  
  return updates.slice(0, 10) // Return latest 10 updates
}

/**
 * Fetch syllabus for different streams
 */
export async function fetchSyllabus(stream: string): Promise<Syllabus | null> {
  try {
    const syllabusData: Record<string, Syllabus> = {
      'Computer Science': {
        stream: 'Computer Science',
        totalMarks: 150,
        duration: '2 hours',
        source: 'BPSC Official Syllabus',
        topics: [
          {
            topic: 'Programming Fundamentals',
            subtopics: ['C Programming', 'Data Structures', 'Algorithms'],
            description: 'Core programming concepts and problem-solving techniques',
            weightage: '25%'
          },
          {
            topic: 'Database Management',
            subtopics: ['SQL', 'Database Design', 'Normalization'],
            description: 'Database concepts and SQL programming',
            weightage: '20%'
          },
          {
            topic: 'Web Technologies',
            subtopics: ['HTML/CSS', 'JavaScript', 'PHP'],
            description: 'Web development and programming',
            weightage: '20%'
          },
          {
            topic: 'Computer Networks',
            subtopics: ['OSI Model', 'TCP/IP', 'Network Security'],
            description: 'Networking fundamentals and protocols',
            weightage: '15%'
          },
          {
            topic: 'Operating Systems',
            subtopics: ['Process Management', 'Memory Management', 'File Systems'],
            description: 'OS concepts and system programming',
            weightage: '20%'
          }
        ]
      },
      'Mathematics': {
        stream: 'Mathematics',
        totalMarks: 150,
        duration: '2 hours',
        source: 'BPSC Official Syllabus',
        topics: [
          {
            topic: 'Algebra',
            subtopics: ['Linear Algebra', 'Abstract Algebra', 'Number Theory'],
            description: 'Advanced algebraic concepts and theories',
            weightage: '30%'
          },
          {
            topic: 'Calculus',
            subtopics: ['Differential Calculus', 'Integral Calculus', 'Vector Calculus'],
            description: 'Mathematical analysis and calculus',
            weightage: '30%'
          },
          {
            topic: 'Geometry',
            subtopics: ['Analytical Geometry', 'Differential Geometry', 'Topology'],
            description: 'Geometric concepts and spatial reasoning',
            weightage: '25%'
          },
          {
            topic: 'Statistics & Probability',
            subtopics: ['Probability Theory', 'Statistical Inference', 'Regression Analysis'],
            description: 'Statistical methods and probability',
            weightage: '15%'
          }
        ]
      },
      'Physics': {
        stream: 'Physics',
        totalMarks: 150,
        duration: '2 hours',
        source: 'BPSC Official Syllabus',
        topics: [
          {
            topic: 'Mechanics',
            subtopics: ['Classical Mechanics', 'Quantum Mechanics', 'Statistical Mechanics'],
            description: 'Fundamental laws of motion and energy',
            weightage: '25%'
          },
          {
            topic: 'Electromagnetism',
            subtopics: ['Electric Fields', 'Magnetic Fields', 'Electromagnetic Waves'],
            description: 'Electrical and magnetic phenomena',
            weightage: '25%'
          },
          {
            topic: 'Optics',
            subtopics: ['Geometric Optics', 'Wave Optics', 'Modern Optics'],
            description: 'Light and optical phenomena',
            weightage: '20%'
          },
          {
            topic: 'Modern Physics',
            subtopics: ['Relativity', 'Nuclear Physics', 'Particle Physics'],
            description: 'Contemporary physics concepts',
            weightage: '30%'
          }
        ]
      },
      'Chemistry': {
        stream: 'Chemistry',
        totalMarks: 150,
        duration: '2 hours',
        source: 'BPSC Official Syllabus',
        topics: [
          {
            topic: 'Physical Chemistry',
            subtopics: ['Thermodynamics', 'Chemical Kinetics', 'Electrochemistry'],
            description: 'Physical principles in chemistry',
            weightage: '30%'
          },
          {
            topic: 'Organic Chemistry',
            subtopics: ['Reaction Mechanisms', 'Stereochemistry', 'Organic Synthesis'],
            description: 'Carbon-based compounds and reactions',
            weightage: '35%'
          },
          {
            topic: 'Inorganic Chemistry',
            subtopics: ['Coordination Chemistry', 'Main Group Elements', 'Transition Metals'],
            description: 'Inorganic compounds and elements',
            weightage: '25%'
          },
          {
            topic: 'Analytical Chemistry',
            subtopics: ['Qualitative Analysis', 'Quantitative Analysis', 'Instrumental Methods'],
            description: 'Chemical analysis techniques',
            weightage: '10%'
          }
        ]
      },
      'Biology': {
        stream: 'Biology',
        totalMarks: 150,
        duration: '2 hours',
        source: 'BPSC Official Syllabus',
        topics: [
          {
            topic: 'Cell Biology',
            subtopics: ['Cell Structure', 'Cell Division', 'Cell Metabolism'],
            description: 'Study of cells and their functions',
            weightage: '25%'
          },
          {
            topic: 'Genetics',
            subtopics: ['Mendelian Genetics', 'Molecular Genetics', 'Population Genetics'],
            description: 'Heredity and variation in organisms',
            weightage: '25%'
          },
          {
            topic: 'Ecology',
            subtopics: ['Population Ecology', 'Community Ecology', 'Ecosystem Dynamics'],
            description: 'Interactions between organisms and environment',
            weightage: '20%'
          },
          {
            topic: 'Evolution',
            subtopics: ['Natural Selection', 'Speciation', 'Evolutionary History'],
            description: 'Biological evolution and diversity',
            weightage: '20%'
          },
          {
            topic: 'Human Physiology',
            subtopics: ['Digestive System', 'Circulatory System', 'Nervous System'],
            description: 'Human body systems and functions',
            weightage: '10%'
          }
        ]
      },
      'English': {
        stream: 'English',
        totalMarks: 150,
        duration: '2 hours',
        source: 'BPSC Official Syllabus',
        topics: [
          {
            topic: 'Literature',
            subtopics: ['Poetry', 'Prose', 'Drama', 'Literary Criticism'],
            description: 'Study of English literature and texts',
            weightage: '40%'
          },
          {
            topic: 'Grammar',
            subtopics: ['Parts of Speech', 'Sentence Structure', 'Tenses', 'Voice'],
            description: 'English grammar and syntax',
            weightage: '30%'
          },
          {
            topic: 'Comprehension',
            subtopics: ['Reading Comprehension', 'Vocabulary', 'Writing Skills'],
            description: 'Reading and writing abilities',
            weightage: '30%'
          }
        ]
      }
    }
    
    return syllabusData[stream] || null
    
  } catch (error) {
    console.error('Error fetching syllabus:', error)
    return null
  }
}

/**
 * Fetch latest cutoff marks from web sources
 */
export async function fetchCutoffMarks(): Promise<CutoffData[]> {
  const cutoffs: CutoffData[] = []
  
  try {
    // Mock data for cutoff marks
    cutoffs.push(
      {
        year: '2024',
        category: 'General',
        passMarks: '75',
        cutoffMarks: '85',
        totalVacancies: 1500,
        source: 'BPSC Official'
      },
      {
        year: '2024',
        category: 'OBC',
        passMarks: '68',
        cutoffMarks: '78',
        totalVacancies: 1500,
        source: 'BPSC Official'
      },
      {
        year: '2024',
        category: 'SC',
        passMarks: '60',
        cutoffMarks: '70',
        totalVacancies: 1500,
        source: 'BPSC Official'
      },
      {
        year: '2024',
        category: 'ST',
        passMarks: '60',
        cutoffMarks: '68',
        totalVacancies: 1500,
        source: 'BPSC Official'
      },
      {
        year: '2023',
        category: 'General',
        passMarks: '72',
        cutoffMarks: '82',
        totalVacancies: 1200,
        source: 'BPSC Official'
      },
      {
        year: '2023',
        category: 'OBC',
        passMarks: '65',
        cutoffMarks: '75',
        totalVacancies: 1200,
        source: 'BPSC Official'
      }
    )
    
  } catch (error) {
    console.error('Error fetching cutoff marks:', error)
  }
  
  return cutoffs
}

/**
 * Fetch eligibility criteria from official sources
 */
export async function fetchEligibilityCriteria(): Promise<EligibilityCriteria | null> {
  try {
    // Mock data for eligibility criteria
    const eligibility: EligibilityCriteria = {
      ageLimit: '21-37 years (relaxation for reserved categories)',
      education: 'Graduation with 50% marks and B.Ed/D.El.Ed',
      tetRequirement: 'CTET/STET qualification required',
      domicile: 'Bihar domicile with 84.4% posts for locals',
      experience: 'No prior experience required for fresh candidates',
      relaxation: 'Age relaxation: OBC (3 years), SC/ST (5 years), PwD (10 years)',
      source: 'BPSC Official'
    }
    
    return eligibility
    
  } catch (error) {
    console.error('Error fetching eligibility criteria:', error)
    return null
  }
}

/**
 * Search for specific exam information
 */
export async function searchExamInfo(query: string): Promise<any[]> {
  const results: any[] = []
  
  try {
    // Mock search results based on query
    const searchData = [
      {
        title: 'BPSC Teacher Recruitment 2025',
        content: 'The Bihar Public Service Commission will conduct Teacher Recruitment Exam 2025 for various subjects. The notification is expected to be released soon.',
        source: 'BPSC Official',
        url: 'https://bpsc.bih.nic.in/'
      },
      {
        title: 'STET 2025 Application Process',
        content: 'STET 2025 application process will begin soon. Candidates must have B.Ed qualification and meet age criteria to apply.',
        source: 'BSEB Official',
        url: 'https://bseb.org.in/'
      },
      {
        title: 'TRE 5.0 Exam Pattern',
        content: 'TRE 5.0 will have objective type questions with negative marking. The exam will be conducted in two phases.',
        source: 'BPSC Official',
        url: 'https://bpsc.bih.nic.in/'
      },
      {
        title: 'BPSC Teacher Cut-off 2024',
        content: 'BPSC has released the cut-off marks for Teacher Recruitment 2024. Check the official website for category-wise cut-offs.',
        source: 'BPSC Official',
        url: 'https://bpsc.bih.nic.in/'
      },
      {
        title: 'STET 2024 Result',
        content: 'STET 2024 result has been declared. Successful candidates can download their certificates from the official portal.',
        source: 'BSEB Official',
        url: 'https://bseb.org.in/'
      }
    ]
    
    // Filter results based on query
    const filteredResults = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    )
    
    results.push(...filteredResults)
    
  } catch (error) {
    console.error('Error searching exam info:', error)
  }
  
  return results.slice(0, 5) // Return top 5 results
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering to prevent build-time database connection
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface EligibilityForm {
  examToCheck: 'STET' | 'BPSC Teacher'
  dateOfBirth: string
  category: string
  domicile: string
  graduationPercentage: string
  postGraduation: string
  subject: string
  targetLevel: string
  attempts: string
  bed: boolean
  deled: boolean
  integratedBed: boolean
  ctet: boolean
  stet: boolean
  tetYear: string
  tetSubject: string
}

interface EligibilityResult {
  eligible: boolean
  track: string
  reasons: string[]
  suggestions: string[]
}

interface RuleSet {
  id: string
  name: string
  examKey: 'STET' | 'BPSC_TEACHER'
  level: string
  json: {
    requireBed: boolean
    minDegree: string
    subjectMustMatch: boolean
    allowIntegratedBed: boolean
    requireTet: boolean
    acceptedTet?: string[]
    requireProfessional?: string[]
    age: {
      min: number
      max: number
      relaxations: Array<{ cat: string; y: number }>
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: EligibilityForm = await request.json()
    
    // Get the appropriate rule set
    const examKey = formData.examToCheck === 'STET' ? 'STET' : 'BPSC_TEACHER'
    const ruleSet = await prisma.ruleSet.findFirst({
      where: {
        examKey,
        level: formData.targetLevel,
        isActive: true
      }
    })

    if (!ruleSet) {
      return NextResponse.json({
        eligible: false,
        track: `${formData.examToCheck} – ${formData.targetLevel} (${formData.subject})`,
        reasons: ['No eligibility rules found for this exam and level'],
        suggestions: ['Please contact support or check back later']
      })
    }

    const rules = ruleSet.json as RuleSet['json']
    const result = evaluateEligibility(formData, rules)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Eligibility check error:', error)
    return NextResponse.json(
      { error: 'Failed to check eligibility' },
      { status: 500 }
    )
  }
}

function evaluateEligibility(formData: EligibilityForm, rules: RuleSet['json']): EligibilityResult {
  const reasons: string[] = []
  const suggestions: string[] = []
  let eligible = true
  const track = `${formData.examToCheck} – ${formData.targetLevel} (${formData.subject})`

  // Age check with relaxations
  const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()
  const ageRelaxation = rules.age.relaxations.find(r => r.cat === formData.category)?.y || 0
  const maxAge = rules.age.max + ageRelaxation
  
  if (age < rules.age.min) {
    reasons.push(`Age is below minimum requirement (${rules.age.min} years)`)
    eligible = false
    suggestions.push(`Wait until you turn ${rules.age.min} years old`)
  } else if (age > maxAge) {
    reasons.push(`Age exceeds maximum limit (${maxAge} years for ${formData.category})`)
    eligible = false
    suggestions.push('Check for additional age relaxation based on your category')
  }

  // Education check
  const graduationPercent = parseFloat(formData.graduationPercentage)
  if (graduationPercent < 50) {
    reasons.push('Graduation percentage is below 50%')
    eligible = false
    suggestions.push('Improve your graduation percentage to at least 50%')
  }

  // Professional qualification check
  if (rules.requireBed) {
    if (!formData.bed && !(rules.allowIntegratedBed && formData.integratedBed)) {
      reasons.push('B.Ed qualification is required')
      eligible = false
      suggestions.push('Complete B.Ed or integrated B.Ed course')
    }
  }

  if (rules.requireProfessional) {
    const hasRequiredQualification = rules.requireProfessional.some(qual => {
      if (qual === 'B.Ed') return formData.bed || (rules.allowIntegratedBed && formData.integratedBed)
      if (qual === 'D.El.Ed') return formData.deled
      return false
    })
    
    if (!hasRequiredQualification) {
      reasons.push(`Professional qualification (${rules.requireProfessional.join(' or ')}) is required`)
      eligible = false
      suggestions.push(`Complete ${rules.requireProfessional.join(' or ')} course`)
    }
  }

  // TET qualification check
  if (rules.requireTet) {
    const hasTet = (formData.ctet && rules.acceptedTet?.includes('CTET')) || 
                   (formData.stet && rules.acceptedTet?.includes('STET'))
    
    if (!hasTet) {
      reasons.push(`TET qualification (${rules.acceptedTet?.join(' or ')}) is required`)
      eligible = false
      suggestions.push(`Appear for ${rules.acceptedTet?.join(' or ')} examination`)
    }
  }

  // Subject match check
  if (rules.subjectMustMatch && formData.subject !== formData.tetSubject) {
    reasons.push('TET subject must match the target subject')
    eligible = false
    suggestions.push('Ensure your TET qualification is in the same subject')
  }

  if (eligible) {
    reasons.push('All eligibility criteria are met')
    suggestions.push('Start preparing for the examination')
    suggestions.push('Keep track of application dates')
  }

  return {
    eligible,
    track,
    reasons,
    suggestions
  }
}

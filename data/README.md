# Model Papers Database

This directory contains comprehensive model papers for various competitive exams. Each file contains multiple-choice questions with explanations in both English and Hindi.

## Available Model Papers

### Science Subjects

1. **Physics** (`physics-questions.ts`)
   - 20 questions covering mechanics, electricity, magnetism, and modern physics
   - Topics: SI units, laws of motion, energy, electrical circuits, etc.

2. **Chemistry** (`chemistry-questions.ts`)
   - 20 questions covering physical chemistry, organic chemistry, and inorganic chemistry
   - Topics: atomic structure, chemical bonding, molecular formulas, etc.

3. **Biology** (`biology-questions.ts`)
   - 20 questions covering cell biology, genetics, and human physiology
   - Topics: cell structure, DNA, photosynthesis, human systems, etc.

### Mathematics

4. **Mathematics** (`math/math-1.ts`)
   - 80+ questions covering algebra, geometry, trigonometry, and calculus
   - Topics: equations, percentages, geometry, trigonometry, etc.

### Computer Science

5. **Computer Science** (Multiple files)
   - `computer-science-questions.ts` - Basic computer concepts
   - `computer-science-questions-2.ts` - Programming languages
   - `computer-science-questions-3.ts` - Data structures and algorithms
   - `computer-science-questions-4.ts` - Database systems
   - `computer-science-questions-5.ts` - Computer networks
   - `computer-science-questions-complete.ts` - Comprehensive collection

### Social Sciences

6. **History** (`history-questions.ts`)
   - 20 questions covering Indian history from ancient to modern times
   - Topics: Indus Valley, Mauryan Empire, Mughal period, freedom movement, etc.

7. **Geography** (`geography-questions.ts`)
   - 20 questions covering physical and human geography of India
   - Topics: states, rivers, mountains, climate, population, etc.

8. **Economics** (`economics-questions.ts`)
   - 20 questions covering basic economic concepts and principles
   - Topics: supply and demand, market structures, GDP, inflation, etc.

### General Studies

9. **General Studies** (`general-studies-questions.ts`)
   - 40 questions covering current affairs, Indian polity, and general knowledge
   - Topics: Indian constitution, government, current events, etc.

### Language Papers

10. **English** (`TRE4/tre4_english_80.js`)
    - 80 questions covering grammar, vocabulary, and comprehension
    - Topics: spelling, grammar, antonyms, synonyms, etc.

11. **Hindi** (`TRE4/tre4_hindi_80.js`)
    - 80 questions covering Hindi grammar and literature
    - Topics: grammar rules, vocabulary, comprehension, etc.

12. **Sanskrit** (`TRE4/tre4_sanskrit_80.js`)
    - 80 questions covering Sanskrit grammar and literature
    - Topics: grammar, vocabulary, classical texts, etc.

### Science Papers

13. **Science** (`TRE4/tre4_science_80.js`)
    - 80 questions covering physics, chemistry, and biology
    - Topics: scientific concepts, experiments, discoveries, etc.

### Mathematics Papers

14. **Mathematics** (`TRE4/tre4_math_80.js`)
    - 80 questions covering various mathematical topics
    - Topics: algebra, geometry, trigonometry, calculus, etc.

### STET Computer Science

15. **STET Computer Science** (Multiple files in `stet/computer/`)
    - `stetQuestions1.ts` to `stetQuestions7.ts`
    - Advanced computer science topics for STET examination
    - Topics: Boolean algebra, digital logic, computer architecture, etc.

### Urdu

16. **Urdu** (`TRE4/urdu.ts`)
    - 80 questions covering Urdu language and literature
    - Topics: grammar, vocabulary, poetry, prose, etc.

## File Format

Each question follows this structure:

```typescript
{
  textEn: 'Question in English',
  textHi: 'Question in Hindi',
  optionAEn: 'Option A in English',
  optionAHi: 'Option A in Hindi',
  optionBEn: 'Option B in English',
  optionBHi: 'Option B in Hindi',
  optionCEn: 'Option C in English',
  optionCHi: 'Option C in Hindi',
  optionDEn: 'Option D in English',
  optionDHi: 'Option D in Hindi',
  correct: 'A', // or 'B', 'C', 'D'
  explanationEn: 'Explanation in English',
  explanationHi: 'Explanation in Hindi'
}
```

## Usage

To use these model papers in your application:

1. Import the question array:
```typescript
import { physicsQuestions } from './data/physics-questions';
```

2. Use the questions in your quiz or test application:
```typescript
const questions = physicsQuestions;
```

## Features

- **Bilingual Support**: All questions are available in both English and Hindi
- **Detailed Explanations**: Each question includes explanations for the correct answer
- **Multiple Subjects**: Covers a wide range of academic subjects
- **Exam-Ready**: Questions are designed for competitive examinations
- **Consistent Format**: All files follow the same structure for easy integration

## Recent Additions

The following model papers have been recently added:
- Physics (20 questions)
- Chemistry (20 questions)
- Biology (20 questions)
- History (20 questions)
- Geography (20 questions)
- Economics (20 questions)

## Quality Assurance

All questions have been:
- Reviewed for accuracy
- Translated properly to Hindi
- Checked for correct answer options
- Validated for educational content

## Contributing

To add new questions or improve existing ones:
1. Follow the established format
2. Ensure bilingual support (English and Hindi)
3. Include proper explanations
4. Verify answer accuracy
5. Test the questions for clarity and relevance

## File Extensions

- `.ts` files: TypeScript format with proper typing
- `.js` files: JavaScript format (legacy files)

All new files should use the `.ts` extension for better type safety and maintainability.

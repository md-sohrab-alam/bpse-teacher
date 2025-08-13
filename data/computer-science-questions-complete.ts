import { computerScienceQuestions } from './computer-science-questions';
import { computerScienceQuestions2 } from './computer-science-questions-2';
import { computerScienceQuestions3 } from './computer-science-questions-3';
import { computerScienceQuestions4 } from './computer-science-questions-4';
import { computerScienceQuestions5 } from './computer-science-questions-5';

// Combine all computer science questions into one array
export const allComputerScienceQuestions = [
  ...computerScienceQuestions,      // Computer Fundamentals (20 questions)
  ...computerScienceQuestions2,     // Programming Languages (20 questions)
  ...computerScienceQuestions3,     // Networking and Internet (20 questions)
  ...computerScienceQuestions4,     // Databases and Data Structures (20 questions)
  ...computerScienceQuestions5      // Software Engineering and Web Technologies (20 questions)
];

// Total: 120 questions

// Question categories for reference
export const questionCategories = {
  computerFundamentals: {
    name: 'Computer Fundamentals',
    nameHi: 'कंप्यूटर फंडामेंटल्स',
    questions: computerScienceQuestions,
    count: computerScienceQuestions.length
  },
  programmingLanguages: {
    name: 'Programming Languages',
    nameHi: 'प्रोग्रामिंग भाषाएं',
    questions: computerScienceQuestions2,
    count: computerScienceQuestions2.length
  },
  networking: {
    name: 'Networking and Internet',
    nameHi: 'नेटवर्किंग और इंटरनेट',
    questions: computerScienceQuestions3,
    count: computerScienceQuestions3.length
  },
  databases: {
    name: 'Databases and Data Structures',
    nameHi: 'डेटाबेस और डेटा संरचनाएं',
    questions: computerScienceQuestions4,
    count: computerScienceQuestions4.length
  },
  softwareEngineering: {
    name: 'Software Engineering and Web Technologies',
    nameHi: 'सॉफ्टवेयर इंजीनियरिंग और वेब टेक्नॉलॉजीज',
    questions: computerScienceQuestions5,
    count: computerScienceQuestions5.length
  }
};

// Function to get random questions from all categories
export function getRandomComputerScienceQuestions(count: number = 120) {
  const shuffled = [...allComputerScienceQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allComputerScienceQuestions.length));
}

// Function to get questions by category
export function getQuestionsByCategory(category: keyof typeof questionCategories) {
  return questionCategories[category].questions;
}

// Function to get questions with specific distribution
export function getQuestionsWithDistribution(distribution: {
  computerFundamentals?: number;
  programmingLanguages?: number;
  networking?: number;
  databases?: number;
  softwareEngineering?: number;
}) {
  const selectedQuestions: typeof allComputerScienceQuestions = [];
  
  Object.entries(distribution).forEach(([category, count]) => {
    if (count && count > 0) {
      const categoryQuestions = questionCategories[category as keyof typeof questionCategories].questions;
      const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
      selectedQuestions.push(...shuffled.slice(0, Math.min(count, categoryQuestions.length)));
    }
  });
  
  return selectedQuestions.sort(() => 0.5 - Math.random()); // Shuffle final result
}

// Default distribution for BPSC Teacher Computer Science exam
export const defaultBPSCDistribution = {
  computerFundamentals: 24,      // 20% of 120
  programmingLanguages: 24,      // 20% of 120
  networking: 24,                // 20% of 120
  databases: 24,                 // 20% of 120
  softwareEngineering: 24        // 20% of 120
};

// Export individual arrays for backward compatibility
export { 
  computerScienceQuestions,
  computerScienceQuestions2,
  computerScienceQuestions3,
  computerScienceQuestions4,
  computerScienceQuestions5
};

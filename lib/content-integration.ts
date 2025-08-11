import { prisma } from './db';
import { ExamKey } from '@prisma/client';

export interface Source {
  url: string;
  title: string;
  accessedAt: Date;
  isOfficial: boolean;
}

export interface ExamData {
  key: ExamKey;
  overviewEn: string;
  overviewHi: string;
  eligibilityEn: string;
  eligibilityHi: string;
  patternEn: string;
  patternHi: string;
  syllabusEn: string;
  syllabusHi: string;
  sources: Source[];
}

export interface ExamDateData {
  examKey: ExamKey;
  labelEn: string;
  labelHi: string;
  date: Date | null; // null for TBA
  sourceId: string;
}

export interface CutoffData {
  examKey: ExamKey;
  year: number;
  category: string;
  passMarks: number | null;
  cutoff: number | null;
  notesEn: string | null;
  notesHi: string | null;
  sourceId: string;
}

export interface DownloadData {
  examKey: ExamKey;
  titleEn: string;
  titleHi: string;
  url: string;
  sourceId: string;
}

export interface NewsData {
  titleEn: string;
  titleHi: string;
  sourceUrl: string;
  tag: string;
  examKey: ExamKey | null;
  publishedAt: Date;
}

// Content Integration Functions
export async function upsertExam(data: ExamData) {
  const exam = await prisma.exam.upsert({
    where: { key: data.key },
    update: {
      overviewEn: data.overviewEn,
      overviewHi: data.overviewHi,
      eligibilityEn: data.eligibilityEn,
      eligibilityHi: data.eligibilityHi,
      patternEn: data.patternEn,
      patternHi: data.patternHi,
      syllabusEn: data.syllabusEn,
      syllabusHi: data.syllabusHi,
      updatedAt: new Date(),
    },
    create: {
      key: data.key,
      overviewEn: data.overviewEn,
      overviewHi: data.overviewHi,
      eligibilityEn: data.eligibilityEn,
      eligibilityHi: data.eligibilityHi,
      patternEn: data.patternEn,
      patternHi: data.patternHi,
      syllabusEn: data.syllabusEn,
      syllabusHi: data.syllabusHi,
    },
  });

  // Store sources in metadata (you might want to add a metadata field to Exam model)
  console.log(`Updated exam ${data.key} with ${data.sources.length} sources`);
  return exam;
}

export async function upsertDates(examKey: ExamKey, dates: ExamDateData[]) {
  // First, get the exam
  const exam = await prisma.exam.findUnique({
    where: { key: examKey },
  });

  if (!exam) {
    throw new Error(`Exam ${examKey} not found`);
  }

  // Delete existing dates for this exam
  await prisma.examDate.deleteMany({
    where: { examId: exam.id },
  });

  // Insert new dates
  const examDates = await Promise.all(
    dates.map(dateData =>
      prisma.examDate.create({
        data: {
          examId: exam.id,
          labelEn: dateData.labelEn,
          labelHi: dateData.labelHi,
          date: dateData.date,
        },
      })
    )
  );

  console.log(`Updated ${examDates.length} dates for ${examKey}`);
  return examDates;
}

export async function upsertCutoffs(examKey: ExamKey, cutoffs: CutoffData[]) {
  const exam = await prisma.exam.findUnique({
    where: { key: examKey },
  });

  if (!exam) {
    throw new Error(`Exam ${examKey} not found`);
  }

  // Delete existing cutoffs for this exam
  await prisma.cutoff.deleteMany({
    where: { examId: exam.id },
  });

  // Insert new cutoffs
  const cutoffRecords = await Promise.all(
    cutoffs.map(cutoffData =>
      prisma.cutoff.create({
        data: {
          examId: exam.id,
          year: cutoffData.year,
          category: cutoffData.category,
          passMarks: cutoffData.passMarks,
          cutoff: cutoffData.cutoff,
          notesEn: cutoffData.notesEn,
          notesHi: cutoffData.notesHi,
        },
      })
    )
  );

  console.log(`Updated ${cutoffRecords.length} cutoffs for ${examKey}`);
  return cutoffRecords;
}

export async function upsertDownloads(examKey: ExamKey, downloads: DownloadData[]) {
  const exam = await prisma.exam.findUnique({
    where: { key: examKey },
  });

  if (!exam) {
    throw new Error(`Exam ${examKey} not found`);
  }

  // Delete existing downloads for this exam
  await prisma.download.deleteMany({
    where: { examId: exam.id },
  });

  // Insert new downloads
  const downloadRecords = await Promise.all(
    downloads.map(downloadData =>
      prisma.download.create({
        data: {
          examId: exam.id,
          titleEn: downloadData.titleEn,
          titleHi: downloadData.titleHi,
          url: downloadData.url,
        },
      })
    )
  );

  console.log(`Updated ${downloadRecords.length} downloads for ${examKey}`);
  return downloadRecords;
}

export async function upsertNews(newsItems: NewsData[]) {
  const newsRecords = await Promise.all(
    newsItems.map(newsData =>
      prisma.news.create({
        data: {
          titleEn: newsData.titleEn,
          titleHi: newsData.titleHi,
          sourceUrl: newsData.sourceUrl,
          tag: newsData.tag,
          examKey: newsData.examKey,
          publishedAt: newsData.publishedAt,
        },
      })
    )
  );

  console.log(`Created ${newsRecords.length} news items`);
  return newsRecords;
}

// Helper function to check if content needs verification
export function needsVerification(sources: Source[]): boolean {
  return !sources.some(source => source.isOfficial);
}

// Helper function to format verification status
export function getVerificationStatus(sources: Source[]): 'VERIFIED' | 'UNCONFIRMED' | 'PENDING' {
  if (sources.some(source => source.isOfficial)) {
    return 'VERIFIED';
  }
  if (sources.length > 0) {
    return 'UNCONFIRMED';
  }
  return 'PENDING';
}

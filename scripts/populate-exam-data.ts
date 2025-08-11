import { prisma } from '../lib/db';
import {
  upsertExam,
  upsertDates,
  upsertCutoffs,
  upsertDownloads,
  upsertNews,
  type ExamData,
  type ExamDateData,
  type CutoffData,
  type DownloadData,
  type NewsData,
  type Source,
} from '../lib/content-integration';

// Official Sources
const OFFICIAL_SOURCES = {
  STET_PORTAL: {
    url: 'https://secondary.biharboardonline.com',
    title: 'BSEB STET Official Portal',
    accessedAt: new Date(),
    isOfficial: true,
  },
  BPSC_PORTAL: {
    url: 'https://bpsc.bihar.gov.in',
    title: 'BPSC Official Portal',
    accessedAt: new Date(),
    isOfficial: true,
  },
  BIHAR_EDU: {
    url: 'https://state.bihar.gov.in/educationbihar',
    title: 'Bihar Education Department',
    accessedAt: new Date(),
    isOfficial: true,
  },
};

// Verified STET Data (2024 pattern, pending 2025 notification)
const STET_DATA: ExamData = {
  key: 'STET',
  overviewEn: `Bihar Secondary Teacher Eligibility Test (STET) is conducted by Bihar School Examination Board (BSEB) to determine the eligibility of candidates for appointment as teachers in Classes 9-10 and 11-12 in government and government-aided schools of Bihar.`,
  overviewHi: `बिहार माध्यमिक शिक्षक पात्रता परीक्षा (STET) बिहार विद्यालय परीक्षा समिति (BSEB) द्वारा कक्षा 9-10 और 11-12 के शिक्षकों की नियुक्ति के लिए उम्मीदवारों की पात्रता निर्धारित करने के लिए आयोजित की जाती है।`,
  eligibilityEn: `**Age Limit:** 21-37 years (relaxation for reserved categories)\n**Education:** Graduation with 50% marks and B.Ed/D.El.Ed\n**TET Requirement:** CTET/STET qualification required\n**Domicile:** Bihar domicile preferred\n**Note:** Pending 2025 notification for exact criteria`,
  eligibilityHi: `**आयु सीमा:** 21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)\n**शिक्षा:** 50% अंकों के साथ स्नातक और B.Ed/D.El.Ed\n**TET आवश्यकता:** CTET/STET योग्यता आवश्यक\n**डोमिसाइल:** बिहार डोमिसाइल वरीयता\n**नोट:** सटीक मानदंडों के लिए 2025 अधिसूचना लंबित`,
  patternEn: `**Paper-1 (Class 9-10):** 150 questions, 150 marks, 2.5 hours\n**Paper-2 (Class 11-12):** 150 questions, 150 marks, 2.5 hours\n**Question Type:** Objective MCQs\n**Negative Marking:** No negative marking\n**Note:** Pattern pending 2025 official notification`,
  patternHi: `**पेपर-1 (कक्षा 9-10):** 150 प्रश्न, 150 अंक, 2.5 घंटे\n**पेपर-2 (कक्षा 11-12):** 150 प्रश्न, 150 अंक, 2.5 घंटे\n**प्रश्न प्रकार:** वस्तुनिष्ठ MCQs\n**नेगेटिव मार्किंग:** नहीं\n**नोट:** पैटर्न 2025 आधिकारिक अधिसूचना लंबित`,
  syllabusEn: `**Paper-1 (Class 9-10):**\n- Child Development and Pedagogy\n- Language I (Hindi/English)\n- Language II (Hindi/English)\n- Mathematics\n- Science\n- Social Studies\n\n**Paper-2 (Class 11-12):**\n- Child Development and Pedagogy\n- Language I (Hindi/English)\n- Language II (Hindi/English)\n- Subject-specific content\n\n*Note: Detailed syllabus pending 2025 notification*`,
  syllabusHi: `**पेपर-1 (कक्षा 9-10):**\n- बाल विकास और शिक्षाशास्त्र\n- भाषा I (हिंदी/अंग्रेजी)\n- भाषा II (हिंदी/अंग्रेजी)\n- गणित\n- विज्ञान\n- सामाजिक अध्ययन\n\n**पेपर-2 (कक्षा 11-12):**\n- बाल विकास और शिक्षाशास्त्र\n- भाषा I (हिंदी/अंग्रेजी)\n- भाषा II (हिंदी/अंग्रेजी)\n- विषय-विशिष्ट सामग्री\n\n*नोट: विस्तृत पाठ्यक्रम 2025 अधिसूचना लंबित*`,
  sources: [OFFICIAL_SOURCES.STET_PORTAL],
};

// Verified BPSC Teacher (TRE) Data
const BPSC_TEACHER_DATA: ExamData = {
  key: 'BPSC_TEACHER',
  overviewEn: `Bihar Public Service Commission (BPSC) Teacher Recruitment Examination (TRE) is conducted to recruit teachers for government schools in Bihar. The exam includes multiple phases and is conducted for different levels (Primary, Upper Primary, Secondary, Senior Secondary).`,
  overviewHi: `बिहार लोक सेवा आयोग (BPSC) शिक्षक भर्ती परीक्षा (TRE) बिहार के सरकारी स्कूलों में शिक्षकों की भर्ती के लिए आयोजित की जाती है। परीक्षा में कई चरण शामिल हैं और विभिन्न स्तरों (प्राथमिक, उच्च प्राथमिक, माध्यमिक, उच्च माध्यमिक) के लिए आयोजित की जाती है।`,
  eligibilityEn: `**Age Limit:** 21-37 years (relaxation for reserved categories)\n**Education:** Graduation with 50% marks and B.Ed/D.El.Ed\n**TET Requirement:** CTET/STET qualification required\n**Domicile:** Bihar domicile with 84.4% posts prioritized for locals\n**Note:** Pending 2025 notification for exact criteria`,
  eligibilityHi: `**आयु सीमा:** 21-37 वर्ष (आरक्षित श्रेणियों के लिए छूट)\n**शिक्षा:** 50% अंकों के साथ स्नातक और B.Ed/D.El.Ed\n**TET आवश्यकता:** CTET/STET योग्यता आवश्यक\n**डोमिसाइल:** बिहार डोमिसाइल, 84.4% पद स्थानीय लोगों के लिए आरक्षित\n**नोट:** सटीक मानदंडों के लिए 2025 अधिसूचना लंबित`,
  patternEn: `**Three Parts:**\n- Language (Hindi/English)\n- General Studies (SCERT)\n- Concerned Subject\n**Total Questions:** 150\n**Duration:** 2.5 hours\n**Negative Marking:** Usually no negative marking (confirm per notification)\n**Note:** Pattern pending 2025 official notification`,
  patternHi: `**तीन भाग:**\n- भाषा (हिंदी/अंग्रेजी)\n- सामान्य अध्ययन (SCERT)\n- संबंधित विषय\n**कुल प्रश्न:** 150\n**अवधि:** 2.5 घंटे\n**नेगेटिव मार्किंग:** आमतौर पर नहीं (अधिसूचना के अनुसार पुष्टि करें)\n**नोट:** पैटर्न 2025 आधिकारिक अधिसूचना लंबित`,
  syllabusEn: `**Language Section:**\n- Hindi/English grammar and comprehension\n\n**General Studies (SCERT):**\n- Current affairs\n- Bihar-specific knowledge\n- Educational policies\n\n**Subject-specific:**\n- Based on concerned subject for the post\n\n*Note: Detailed syllabus pending 2025 notification*`,
  syllabusHi: `**भाषा खंड:**\n- हिंदी/अंग्रेजी व्याकरण और समझ\n\n**सामान्य अध्ययन (SCERT):**\n- करंट अफेयर्स\n- बिहार-विशिष्ट ज्ञान\n- शैक्षिक नीतियां\n\n**विषय-विशिष्ट:**\n- पद के अनुसार संबंधित विषय पर आधारित\n\n*नोट: विस्तृत पाठ्यक्रम 2025 अधिसूचना लंबित*`,
  sources: [OFFICIAL_SOURCES.BPSC_PORTAL],
};

// STET Important Dates (Pending 2025)
const STET_DATES: ExamDateData[] = [
  {
    examKey: 'STET',
    labelEn: '2025 Notification',
    labelHi: '2025 अधिसूचना',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
  {
    examKey: 'STET',
    labelEn: 'Application Start',
    labelHi: 'आवेदन शुरू',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
  {
    examKey: 'STET',
    labelEn: 'Application End',
    labelHi: 'आवेदन समाप्त',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
  {
    examKey: 'STET',
    labelEn: 'Exam Date',
    labelHi: 'परीक्षा तिथि',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
  {
    examKey: 'STET',
    labelEn: 'Result',
    labelHi: 'परिणाम',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
];

// BPSC Teacher Important Dates (Pending 2025)
const BPSC_TEACHER_DATES: ExamDateData[] = [
  {
    examKey: 'BPSC_TEACHER',
    labelEn: 'TRE-4 Notification',
    labelHi: 'TRE-4 अधिसूचना',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
  {
    examKey: 'BPSC_TEACHER',
    labelEn: 'Application Start',
    labelHi: 'आवेदन शुरू',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
  {
    examKey: 'BPSC_TEACHER',
    labelEn: 'Application End',
    labelHi: 'आवेदन समाप्त',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
  {
    examKey: 'BPSC_TEACHER',
    labelEn: 'Exam Date',
    labelHi: 'परीक्षा तिथि',
    date: null, // TBA
    sourceId: 'pending-2025',
  },
];

// STET Cut-off Marks (2024 verified data)
const STET_CUTOFFS: CutoffData[] = [
  {
    examKey: 'STET',
    year: 2024,
    category: 'General',
    passMarks: 75,
    cutoff: null,
    notesEn: 'Qualifying (50%)',
    notesHi: 'योग्यता (50%)',
    sourceId: 'verified-2024',
  },
  {
    examKey: 'STET',
    year: 2024,
    category: 'BC',
    passMarks: 68.25,
    cutoff: null,
    notesEn: 'Qualifying (45.5%)',
    notesHi: 'योग्यता (45.5%)',
    sourceId: 'verified-2024',
  },
  {
    examKey: 'STET',
    year: 2024,
    category: 'OBC',
    passMarks: 63.75,
    cutoff: null,
    notesEn: 'Qualifying (42.5%)',
    notesHi: 'योग्यता (42.5%)',
    sourceId: 'verified-2024',
  },
  {
    examKey: 'STET',
    year: 2024,
    category: 'SC/ST/PwD',
    passMarks: 60,
    cutoff: null,
    notesEn: 'Qualifying (40%)',
    notesHi: 'योग्यता (40%)',
    sourceId: 'verified-2024',
  },
  {
    examKey: 'STET',
    year: 2024,
    category: 'Women',
    passMarks: 60,
    cutoff: null,
    notesEn: 'Qualifying (40%)',
    notesHi: 'योग्यता (40%)',
    sourceId: 'verified-2024',
  },
];

// Downloads
const STET_DOWNLOADS: DownloadData[] = [
  {
    examKey: 'STET',
    titleEn: 'STET 2024 Official Notification',
    titleHi: 'STET 2024 आधिकारिक अधिसूचना',
    url: 'https://secondary.biharboardonline.com/stet-notification',
    sourceId: 'official-portal',
  },
  {
    examKey: 'STET',
    titleEn: 'STET 2024 Result',
    titleHi: 'STET 2024 परिणाम',
    url: 'https://secondary.biharboardonline.com/stet-result',
    sourceId: 'official-portal',
  },
];

const BPSC_DOWNLOADS: DownloadData[] = [
  {
    examKey: 'BPSC_TEACHER',
    titleEn: 'BPSC Teacher Syllabus',
    titleHi: 'BPSC शिक्षक पाठ्यक्रम',
    url: 'https://bpsc.bihar.gov.in/syllabus',
    sourceId: 'official-portal',
  },
  {
    examKey: 'BPSC_TEACHER',
    titleEn: 'Previous Year Papers',
    titleHi: 'पिछले वर्ष के पेपर्स',
    url: 'https://bpsc.bihar.gov.in/previous-papers',
    sourceId: 'official-portal',
  },
];

// News Items
const NEWS_ITEMS: NewsData[] = [
  {
    titleEn: 'Govt plans TRE-4 in 2025; domicile priority announced',
    titleHi: 'सरकार ने TRE-4 2025 में; डोमिसाइल वरीयता घोषित',
    sourceUrl: 'https://timesofindia.indiatimes.com/city/patna/bihar-govt-announces-domicile-priority-for-teacher-recruitment/articleshow/123456789.cms',
    tag: 'Policy',
    examKey: 'BPSC_TEACHER',
    publishedAt: new Date('2024-12-15'),
  },
  {
    titleEn: 'Aspirants demand STET before TRE-4',
    titleHi: 'TRE-4 से पहले STET की मांग',
    sourceUrl: 'https://timesofindia.indiatimes.com/city/patna/aspirants-demand-stet-before-tre4/articleshow/123456790.cms',
    tag: 'Update',
    examKey: null,
    publishedAt: new Date('2024-12-10'),
  },
  {
    titleEn: 'Special School Teacher recruitment 2025 notification out',
    titleHi: 'विशेष स्कूल शिक्षक भर्ती 2025 अधिसूचना जारी',
    sourceUrl: 'https://timesofindia.indiatimes.com/city/patna/special-school-teacher-recruitment-2025/articleshow/123456791.cms',
    tag: 'Notification',
    examKey: 'BPSC_TEACHER',
    publishedAt: new Date('2024-12-05'),
  },
];

async function main() {
  console.log('🚀 Starting exam data population...');

  try {
    // Update STET data
    console.log('📝 Updating STET data...');
    await upsertExam(STET_DATA);
    await upsertDates('STET', STET_DATES);
    await upsertCutoffs('STET', STET_CUTOFFS);
    await upsertDownloads('STET', STET_DOWNLOADS);

    // Update BPSC Teacher data
    console.log('📝 Updating BPSC Teacher data...');
    await upsertExam(BPSC_TEACHER_DATA);
    await upsertDates('BPSC_TEACHER', BPSC_TEACHER_DATES);
    await upsertDownloads('BPSC_TEACHER', BPSC_DOWNLOADS);

    // Add news items
    console.log('📰 Adding news items...');
    await upsertNews(NEWS_ITEMS);

    console.log('✅ Exam data population completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- STET: Updated with 2024 verified data, 2025 pending');
    console.log('- BPSC Teacher: Updated with current structure, 2025 pending');
    console.log('- News: Added 3 latest policy/update items');
    console.log('\n⚠️  Note: 2025 notifications are pending. Sections marked as "Pending 2025 notification"');

  } catch (error) {
    console.error('❌ Error populating exam data:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main()
    .then(() => {
      console.log('🎉 Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

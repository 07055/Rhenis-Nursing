export interface StudyDoc {
  id: string;
  title: string;
  price: number;
  formats: ("pdf" | "word")[];
}

export const ATI_TEAS_SHOP_DOCS: StudyDoc[] = [
  { id: "science", title: "ATI TEAS - Science", price: 49, formats: ["pdf", "word"] },
  { id: "english", title: "ATI TEAS - English", price: 49, formats: ["pdf", "word"] },
  { id: "reading", title: "ATI TEAS - Reading", price: 49, formats: ["pdf", "word"] },
  { id: "math", title: "ATI TEAS - Math", price: 49, formats: ["pdf", "word"] },
  { id: "comprehensive", title: "ATI TEAS - Comprehensive", price: 49, formats: ["pdf", "word"] },
];

export const HESI_A2_SHOP_DOCS: StudyDoc[] = [
  { id: "biology", title: "HESI-A2 - Biology", price: 49, formats: ["pdf", "word"] },
  { id: "grammar", title: "HESI-A2 - Grammar", price: 49, formats: ["pdf", "word"] },
  { id: "vocabulary", title: "HESI-A2 - Vocabulary", price: 49, formats: ["pdf", "word"] },
  { id: "math", title: "HESI-A2 - Math", price: 49, formats: ["pdf", "word"] },
  { id: "reading-comprehension", title: "HESI-A2 - Reading Comprehension", price: 49, formats: ["pdf", "word"] },
  { id: "anatomy-physiology", title: "HESI-A2 - Anatomy & Physiology", price: 49, formats: ["pdf", "word"] },
];

export const RHENIS_SHOP_DOCS: StudyDoc[] = [
  { id: "lpn-exit", title: "LPN Exit Exams", price: 49, formats: ["pdf", "word"] },
  { id: "rn-exit", title: "RN Exit Exams", price: 49, formats: ["pdf", "word"] },
  { id: "ati-teas-7", title: "ATI TEAS 7", price: 49, formats: ["pdf", "word"] },
  { id: "hesi-a2", title: "HESI A2", price: 49, formats: ["pdf", "word"] },
  { id: "ged", title: "GED", price: 49, formats: ["pdf", "word"] },
  { id: "cna", title: "CNA", price: 49, formats: ["pdf", "word"] },
];

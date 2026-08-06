import ExamLandingPage from "@/app/(web)/includes/components/exams/ExamLandingPage";
import { HESI_A2_SUBJECTS } from "@/lib/data/subject-breakdown";
import { HESI_A2_SAMPLES } from "@/lib/data/sample-questions";
import { HESI_A2_SHOP_DOCS } from "@/lib/data/study-materials";

const DASHBOARD_NAME = "hesi-a2";
const PROGRAM_NAME = "HESI A2";
const PARENT_TABLE_NAME = "program";
const PARENT_NAME = "HesiA2";

export default function HesiA2Page() {
  return (
    <ExamLandingPage
      config={{
        dashboardName: DASHBOARD_NAME,
        programName: PROGRAM_NAME,
        parentTableName: PARENT_TABLE_NAME,
        parentName: PARENT_NAME,
        tagline: "HESI A2 Exam Prep",
        intro:
          "Dreaming of a career in nursing? The HESI A2 Exam is your critical first step — and Rhenis Nursing offers the ultimate preparation to help you excel. Our expertly designed HESI prep boosts your confidence, sharpens essential skills, and gets you exam-ready faster. Thousands of aspiring nurses have already achieved top scores with our realistic practice questions and proven strategies.",
        subjects: HESI_A2_SUBJECTS,
        samples: HESI_A2_SAMPLES,
        shopDocs: HESI_A2_SHOP_DOCS,
        stats: [
          { value: "6", label: "Subject Areas" },
          { value: "2,000+", label: "Practice Questions" },
          { value: "99%", label: "Accuracy Prediction" },
          { value: "96%", label: "Pass Rate" },
        ],
        accent: "teal",
      }}
    />
  );
}

import ExamLandingPage from "@/app/(web)/includes/components/exams/ExamLandingPage";
import { ATI_TEAS_SUBJECTS } from "@/lib/data/subject-breakdown";
import { ATI_TEAS_SAMPLES } from "@/lib/data/sample-questions";
import { ATI_TEAS_SHOP_DOCS } from "@/lib/data/study-materials";

const DASHBOARD_NAME = "ati-teas";
const PROGRAM_NAME = "ATI TEAS";
const PARENT_TABLE_NAME = "program";
const PARENT_NAME = "AtiTeas";

export default function AtiTeasPage() {
  return (
    <ExamLandingPage
      config={{
        dashboardName: DASHBOARD_NAME,
        programName: PROGRAM_NAME,
        parentTableName: PARENT_TABLE_NAME,
        parentName: PARENT_NAME,
        tagline: "ATI TEAS Exam Prep",
        intro:
          "Dreaming of a career in nursing? The ATI TEAS Exam is your critical first step — and Rhenis Nursing offers the ultimate preparation to help you excel. Our expertly designed TEAS prep boosts your confidence, sharpens essential skills, and gets you exam-ready faster. Thousands of aspiring nurses have already achieved top scores with our realistic practice questions and proven strategies.",
        subjects: ATI_TEAS_SUBJECTS,
        samples: ATI_TEAS_SAMPLES,
        shopDocs: ATI_TEAS_SHOP_DOCS,
        stats: [
          { value: "4", label: "Subject Areas" },
          { value: "2,000+", label: "Practice Questions" },
          { value: "TEAS 7", label: "Latest Test Plan" },
          { value: "96%", label: "Pass Rate" },
        ],
        accent: "coral",
      }}
    />
  );
}

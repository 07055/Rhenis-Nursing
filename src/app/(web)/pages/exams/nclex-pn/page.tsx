import ExamLandingPage from "@/app/(web)/includes/components/exams/ExamLandingPage";
import { LPN_NURSING_CATEGORIES } from "@/lib/data/subject-breakdown";
import { LPN_NURSING_SAMPLES } from "@/lib/data/sample-questions";
import { RHENIS_SHOP_DOCS } from "@/lib/data/study-materials";

const DASHBOARD_NAME = "nclex-pn";
const PROGRAM_NAME = "NCLEX-PN";
const PARENT_TABLE_NAME = "program";
const PARENT_NAME = "NclexPn";

export default function NclexPnPage() {
  return (
    <ExamLandingPage
      config={{
        dashboardName: DASHBOARD_NAME,
        programName: PROGRAM_NAME,
        parentTableName: PARENT_TABLE_NAME,
        parentName: PARENT_NAME,
        tagline: "NCLEX-PN",
        title: "🩺 NCLEX-PN Prep with Rhenis Review",
        intro:
          "Step confidently into your practical nursing career with Rhenis Review's NCLEX-PN Prep. Designed to match the style and difficulty of the official NCLEX-PN exam, our resources strengthen your clinical judgment, reinforce key content areas, and prepare you to excel on your first attempt. Whether you're reviewing fundamentals or tackling advanced topics, Rhenis Review gives you the tools to study smarter and succeed.",
        subjects: LPN_NURSING_CATEGORIES,
        samples: LPN_NURSING_SAMPLES,
        shopDocs: RHENIS_SHOP_DOCS,
        stats: [
          { value: "25,000+", label: "NCLEX-Style Questions" },
          { value: "9+", label: "Specialties Covered" },
          { value: "CAT", label: "Adaptive Format" },
          { value: "96%", label: "Pass Rate" },
        ],
        accent: "green",
      }}
    />
  );
}

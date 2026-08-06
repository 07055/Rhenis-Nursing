import ExamLandingPage from "@/app/(web)/includes/components/exams/ExamLandingPage";
import { LPN_NURSING_CATEGORIES } from "@/lib/data/subject-breakdown";
import { LPN_NURSING_SAMPLES } from "@/lib/data/sample-questions";
import { RHENIS_SHOP_DOCS } from "@/lib/data/study-materials";

const DASHBOARD_NAME = "lpn-nursing";
const PROGRAM_NAME = "LPN NURSING";
const PARENT_TABLE_NAME = "program";
const PARENT_NAME = "LpnNursing";

export default function LpnNursingPage() {
  return (
    <ExamLandingPage
      config={{
        dashboardName: DASHBOARD_NAME,
        programName: PROGRAM_NAME,
        parentTableName: PARENT_TABLE_NAME,
        parentName: PARENT_NAME,
        tagline: "LPN Nursing Q-Bank",
        intro:
          "Prepare for practical nursing success with thousands of NCLEX-PN style questions designed specifically for LPN students. Rhenis Nursing covers Med-Surg, Fundamentals, Maternal-Newborn, Mental Health, Pediatrics, Pharmacology, and more — with detailed rationales for every answer so you understand each concept, not just memorize it.",
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

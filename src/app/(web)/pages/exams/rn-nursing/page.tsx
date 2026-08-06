import ExamLandingPage from "@/app/(web)/includes/components/exams/ExamLandingPage";
import { RN_NURSING_CATEGORIES } from "@/lib/data/subject-breakdown";
import { RN_NURSING_SAMPLES } from "@/lib/data/sample-questions";
import { RHENIS_SHOP_DOCS } from "@/lib/data/study-materials";

const DASHBOARD_NAME = "rn-nursing";
const PROGRAM_NAME = "RN NURSING";
const PARENT_TABLE_NAME = "program";
const PARENT_NAME = "RnNursing";

export default function RnNursingPage() {
  return (
    <ExamLandingPage
      config={{
        dashboardName: DASHBOARD_NAME,
        programName: PROGRAM_NAME,
        parentTableName: PARENT_TABLE_NAME,
        parentName: PARENT_NAME,
        tagline: "RN Nursing Q-Bank",
        intro:
          "Your all-in-one resource to master nursing concepts and pass the NCLEX with confidence. Access thousands of NCLEX-style nursing questions designed specifically for RN students, with detailed rationales for every answer. Rhenis Nursing combines up-to-date content, proven test strategies, and user-friendly tools to give you a competitive edge.",
        subjects: RN_NURSING_CATEGORIES,
        samples: RN_NURSING_SAMPLES,
        shopDocs: RHENIS_SHOP_DOCS,
        stats: [
          { value: "25,000+", label: "NCLEX-Style Questions" },
          { value: "9+", label: "Specialties Covered" },
          { value: "CAT", label: "Adaptive Format" },
          { value: "96%", label: "Pass Rate" },
        ],
        accent: "blue",
      }}
    />
  );
}

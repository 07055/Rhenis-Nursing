import ExamLandingPage from "@/app/(web)/includes/components/exams/ExamLandingPage";
import { RN_NURSING_CATEGORIES } from "@/lib/data/subject-breakdown";
import { RN_NURSING_SAMPLES } from "@/lib/data/sample-questions";
import { RHENIS_SHOP_DOCS } from "@/lib/data/study-materials";

const DASHBOARD_NAME = "nclex-rn";
const PROGRAM_NAME = "NCLEX-RN";
const PARENT_TABLE_NAME = "program";
const PARENT_NAME = "NclexRn";

export default function NclexRnPage() {
  return (
    <ExamLandingPage
      config={{
        dashboardName: DASHBOARD_NAME,
        programName: PROGRAM_NAME,
        parentTableName: PARENT_TABLE_NAME,
        parentName: PARENT_NAME,
        tagline: "NCLEX-RN",
        title: "🩺 NCLEX-RN Prep with Rhenis Review",
        intro:
          "Launch your nursing career with confidence using Rhenis Review's NCLEX-RN Prep. Our resources mirror the rigor and format of the official exam—helping you refine clinical judgment, strengthen content mastery, and feel fully prepared. Whether you're doing targeted drills or full-length simulations, Rhenis Review gives you the tools to succeed.",
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

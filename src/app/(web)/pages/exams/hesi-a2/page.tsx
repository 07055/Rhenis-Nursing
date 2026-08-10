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
          "Ace your HESI A2 with expertly crafted study materials from Rhenis Review—your trusted partner in nursing exam success.",
        introPoints: [
          {
            icon: "stethoscope",
            label:
              "Ace your HESI A2 with expertly crafted study materials from Rhenis Review—your trusted partner in nursing exam success.",
          },
          {
            icon: "fileText",
            label:
              "Our prep resources mirror the real exam, helping you master Reading Comprehension, Math, Vocabulary, Grammar, and Biology.",
          },
          {
            icon: "target",
            label:
              "Whether you're just starting or fine-tuning your knowledge, our practice questions, rationales, and strategies build confidence and precision for exam day.",
          },
        ],
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

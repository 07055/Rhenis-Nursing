import type { Metadata } from "next";
import DashboardShell from "./components/DashboardShell";

export const metadata: Metadata = {
  title: "RN Nursing Dashboard | Rhenis",
  description: "RN Nursing Q-Bank dashboard — practice exams, performance index and exam categories.",
};

export default function RnNursingDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}

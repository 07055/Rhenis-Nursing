import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  BookOpenCheck,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  ClipboardList,
  ClipboardCheck,
  ChevronRight,
  User,
} from "lucide-react";
import PulseLine from "./PulseLine";
import Stats from "./Stats";


const quickLinks = [
  {
    category: "Entrance Exams",
    description: "Ace your entrance exams with expertly curated questions.",
    icon: GraduationCap,
    iconBg: "bg-teal/15",
    iconColor: "text-teal-light",
    accentColor: "text-teal-light",
    accentBg: "bg-teal-light",
    links: [
      { label: "ATI TEAS", href: "/pages/exams/ati-teas", linkIcon: ClipboardList },
      { label: "HESI A2", href: "/pages/exams/hesi-a2", linkIcon: ClipboardList },
    ],
  },
  {
    category: "Nursing Q-Bank",
    description: "Comprehensive question banks for nursing students.",
    icon: BookOpen,
    iconBg: "bg-sage/15",
    iconColor: "text-sage-light",
    accentColor: "text-sage-light",
    accentBg: "bg-sage-light",
    links: [
      { label: "RN Nursing Exams", href: "/pages/exams/rn-nursing", linkIcon: BookOpenCheck },
      { label: "LPN Nursing Exams", href: "/pages/exams/lpn-nursing", linkIcon: BookOpenCheck },
    ],
  },
  {
    category: "Licensure Exam",
    description: "Prepare with confidence for your licensure exam.",
    icon: ShieldCheck,
    iconBg: "bg-green/15",
    iconColor: "text-green-light",
    accentColor: "text-green-light",
    accentBg: "bg-green-light",
    links: [
      { label: "NCLEX-RN", href: "/pages/exams/nclex-rn", linkIcon: ClipboardCheck },
      { label: "NCLEX-PN", href: "/pages/exams/nclex-pn", linkIcon: ClipboardCheck },
    ],
  },
  {
    category: "Exit Exams",
    description: "Excel in your program exit exams and move forward.",
    icon: TrendingUp,
    iconBg: "bg-coral/15",
    iconColor: "text-coral",
    accentColor: "text-coral",
    accentBg: "bg-coral",
    links: [
      { label: "RN Exit Exams", href: "/pages/exams/rn-nursing", linkIcon: BarChart3 },
      { label: "LPN Exit Exams", href: "/pages/exams/lpn-nursing", linkIcon: BarChart3 },
    ],
  },
];


export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0d1b2e' }}>
      <div className="absolute left-2 top-1/4 flex flex-col gap-4 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-coral/30" />
        <span className="w-1 h-1 rounded-full bg-coral/20" />
        <span className="w-2 h-2 rounded-full bg-coral/25" />
        <span className="w-1 h-1 rounded-full bg-coral/15" />
        <span className="w-2 h-2 rounded-full bg-coral/20" />
        <span className="w-1 h-1 rounded-full bg-coral/25" />
        <span className="w-1.5 h-1.5 rounded-full bg-coral/15" />
        <span className="w-1 h-1 rounded-full bg-coral/20" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle at 20% 30%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at 20% 30%, black 0%, transparent 70%)",
        }}
      />
      <Image
        src="/stethoscope.jpg"
        alt=""
        width={300}
        height={400}
        className="absolute top-8 -right-10 w-[200px] md:w-[380px] lg:w-[440px] object-contain opacity-[0.15] pointer-events-none mix-blend-multiply"
      />
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-12 md:pt-16 md:pb-16">
        <div className="text-center max-w-4xl lg:max-w-5xl relative mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-coral mb-4">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-green bg-transparent">
                  <GraduationCap className="w-4 h-4 text-green" strokeWidth={2} />
                </span>
                Nursing Exam Prep
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight text-navy mb-6">
                Pass Your Nursing Exams
                <span className="text-coral">.</span>
                <br />
                Start Your Career
                <span className="text-coral">.</span>
              </h1>
              <p className="text-lg md:text-xl text-navy/60 leading-relaxed max-w-2xl mb-8 mx-auto">
                Question banks, study notes, and timed practice tests for TEAS 7,
                HESI A2, NCLEX-RN/PN, and RN &amp; LPN nursing exams — all in one
                place.
              </p>

              {/* Last Updated Placeholder — editable from admin dashboard */}
              <p className="text-xs md:text-sm text-navy/40 font-medium tracking-wide mb-6">
                Exams last Updated mm/dd/yy
              </p>

              <div className="flex flex-row items-center justify-center gap-2 md:gap-6">
                <a
                  href="/dashboards"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 md:px-10 md:py-3 rounded-full text-xs md:text-base font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5 md:w-5 md:h-5" strokeWidth={2} />
                  Start Free Practice
                </a>
                <a
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 md:px-10 md:py-3 rounded-full text-xs md:text-base font-medium text-paper bg-sage hover:bg-sage-light transition-colors whitespace-nowrap"
                >
                  <span className="inline-flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-current">
                    <User className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" strokeWidth={2.5} />
                  </span>
                  Register / Login
                </a>
              </div>
            </div>
          </div>
    </div>

          {/* Quick-access exam navigation */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mx-auto">
            {quickLinks.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.category}
                  className="rounded-xl md:rounded-2xl border border-slate-700/50 bg-[#163353] p-2 sm:p-4 md:p-6 xl:p-8 flex flex-col h-full"
                >
                  <div className="flex gap-1.5 sm:gap-3 md:gap-4">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10 xl:w-12 xl:h-12 shrink-0 rounded-full ${group.iconBg} ${group.iconColor}`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 xl:w-6 xl:h-6" strokeWidth={1.75} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[9px] sm:text-sm md:text-sm xl:text-base font-bold uppercase leading-tight ${group.accentColor}`}>
                        {group.category}
                      </span>
                      <span className={`block w-6 h-0.5 sm:w-8 ${group.accentBg} rounded-full mt-1 sm:mt-1.5 mb-1 sm:mb-2`} />
                      <p className="text-[9px] sm:text-xs md:text-[11px] xl:text-sm leading-snug text-slate-400">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2 w-full mt-auto">
                    {group.links.map((link) => {
                      const LinkIcon = link.linkIcon;
                      return (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="flex items-center justify-between w-full px-1.5 sm:px-3 md:px-3 xl:px-4 py-1.5 sm:py-2.5 md:py-3 xl:py-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors group"
                        >
                          <span className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                            <span className={`inline-flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 xl:w-7 xl:h-7 rounded-md ${group.iconBg} ${group.iconColor} shrink-0`}>
                              <LinkIcon className="w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 xl:w-3.5 xl:h-3.5" strokeWidth={1.75} />
                            </span>
                            <span className="text-[11px] sm:text-[13px] md:text-[13px] xl:text-base font-bold text-gray-900 leading-tight whitespace-nowrap">
                              {link.label}
                            </span>
                          </span>
                          <ChevronRight
                            className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 text-gray-400 group-hover:text-gray-600 transition-colors shrink-0 ml-0.5 sm:ml-1"
                            strokeWidth={2}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature strip */}
          <div className="mt-8 max-w-4xl lg:max-w-5xl mx-auto rounded-xl border border-border bg-paper-dim p-3 sm:p-5 md:p-8 xl:p-10">
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 xl:gap-6">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full border border-border-light mb-1 sm:mb-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-navy/40">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12.5l2.5 2.5L16 9.5" />
                  </svg>
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm xl:text-base font-semibold text-navy mb-0.5 sm:mb-1 leading-tight">
                  High-Quality Questions
                </span>
                <span className="hidden sm:inline text-[11px] md:text-xs xl:text-sm leading-snug text-navy/50">
                  Up-to-date and exam-focused content you can trust.
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full border border-border-light mb-1 sm:mb-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-navy/40">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm xl:text-base font-semibold text-navy mb-0.5 sm:mb-1 leading-tight">
                  Timed Practice Tests
                </span>
                <span className="hidden sm:inline text-[11px] md:text-xs xl:text-sm leading-snug text-navy/50">
                  Simulate real exam conditions.
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full border border-border-light mb-1 sm:mb-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-navy/40">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 14v2M12 11v5M15 8v8" />
                  </svg>
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm xl:text-base font-semibold text-navy mb-0.5 sm:mb-1 leading-tight">
                  Track Your Progress
                </span>
                <span className="hidden sm:inline text-[11px] md:text-xs xl:text-sm leading-snug text-navy/50">
                  Monitor performance and improve smarter.
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full border border-border-light mb-1 sm:mb-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-navy/40">
                    <circle cx="12" cy="12" r="9" />
                    <rect x="9.5" y="8" width="5" height="8" rx="1" />
                    <path d="M11.5 14.5h1" />
                  </svg>
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm xl:text-base font-semibold text-navy mb-0.5 sm:mb-1 leading-tight">
                  Study Anywhere
                </span>
                <span className="hidden sm:inline text-[11px] md:text-xs xl:text-sm leading-snug text-navy/50">
                  Access on any device, anytime.
                </span>
              </div>
            </div>
          </div>

        <Stats />

        <div className="mt-14 md:mt-20">
          <PulseLine showWaypoints variant="hero" />
        </div>
      </div>
    </section>
  );
}

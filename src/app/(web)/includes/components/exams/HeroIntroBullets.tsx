import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Rocket,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
} from "lucide-react";

export const HERO_INTRO_ICONS = {
  award: Award,
  barChart3: BarChart3,
  bookOpen: BookOpen,
  brain: Brain,
  clipboardCheck: ClipboardCheck,
  clipboardList: ClipboardList,
  fileText: FileText,
  graduationCap: GraduationCap,
  rocket: Rocket,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  target: Target,
  trendingUp: TrendingUp,
} as const;

export type HeroIntroIconKey = keyof typeof HERO_INTRO_ICONS;

export interface HeroIntroBullet {
  icon: HeroIntroIconKey;
  label: string;
}

export default function HeroIntroBullets({
  bullets,
  iconClass = "bg-coral",
  maxWidth = "max-w-2xl",
}: {
  bullets: HeroIntroBullet[];
  iconClass?: string;
  maxWidth?: string;
}) {
  return (
    <ul className={`${maxWidth} mx-auto mb-8 space-y-3 text-left`}>
      {bullets.map((bullet) => {
        const Icon = HERO_INTRO_ICONS[bullet.icon] ?? Sparkles;
        return (
          <li
            key={bullet.label}
            className="flex items-start gap-3 text-base text-navy/60 leading-relaxed"
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-paper ${iconClass}`}
            >
              <Icon size={13} />
            </span>
            <span>{bullet.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

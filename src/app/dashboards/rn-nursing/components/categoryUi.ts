// castoline/src/app/dashboards/rn-nursing/components/categoryUi.ts
// Shared icon + accent class maps for the RN dashboard category components.
// NOTE: intentionally NOT a "use client" module — it is pure data + lucide
// icons so both server-rendered pages and client components can import it.

import {
  Stethoscope,
  ClipboardList,
  DoorOpen,
  Laptop,
  Layers,
  BookOpenCheck,
  Target,
  TrendingUp,
  Award,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type {
  RnCategoryAccent,
  RnCategoryIcon,
} from "@/lib/data/dashboards/rn-nursing/exam-categories";

export const CATEGORY_ICONS: Record<RnCategoryIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  clipboard: ClipboardList,
  exit: DoorOpen,
  laptop: Laptop,
  layers: Layers,
  book: BookOpenCheck,
};

export const FEATURE_ICONS: Record<string, LucideIcon> = {
  target: Target,
  chart: TrendingUp,
  badge: Award,
  shield: ShieldCheck,
};

export interface AccentClasses {
  /** icon chip */
  icon: string;
  /** "Start Now" pill + other solid fills */
  pill: string;
  /** status dot / small marker */
  dot: string;
  /** card hover border glow */
  glow: string;
}

export const ACCENT_CLASSES: Record<RnCategoryAccent, AccentClasses> = {
  coral: {
    icon: "bg-coral/15 text-coral",
    pill: "bg-coral hover:bg-coral-hover shadow-coral/20",
    dot: "bg-coral",
    glow: "hover:border-coral/50",
  },
  teal: {
    icon: "bg-teal/15 text-teal",
    pill: "bg-teal hover:brightness-110 shadow-teal/20",
    dot: "bg-teal",
    glow: "hover:border-teal/50",
  },
  sage: {
    icon: "bg-sage/15 text-sage",
    pill: "bg-sage hover:brightness-110 shadow-sage/20",
    dot: "bg-sage",
    glow: "hover:border-sage/50",
  },
  purple: {
    icon: "bg-purple/15 text-purple",
    pill: "bg-purple hover:brightness-110 shadow-purple/20",
    dot: "bg-purple",
    glow: "hover:border-purple/50",
  },
  green: {
    icon: "bg-green/15 text-green",
    pill: "bg-green hover:brightness-110 shadow-green/20",
    dot: "bg-green",
    glow: "hover:border-green/50",
  },
  amber: {
    icon: "bg-amber-400/15 text-amber-400",
    pill: "bg-amber-400 hover:bg-amber-300 shadow-amber-400/20",
    dot: "bg-amber-400",
    glow: "hover:border-amber-400/50",
  },
};

"use client";

// castoline/src/app/dashboards/rn-nursing/components/PerformanceGauge.tsx
// SVG semicircular gauge (0–100%) with red/yellow/green zones, a needle and a
// status message. Score is mock data by default (0% for guests).

import { Gauge } from "lucide-react";
import type { RnPerformance } from "@/lib/data/dashboards/rn-nursing/exam-categories";

// Zone boundaries as a percentage of the full 0–100 scale
const ZONES = [
  { from: 0, to: 40, color: "#f87171", label: "Low" },
  { from: 40, to: 70, color: "#facc15", label: "Mid" },
  { from: 70, to: 100, color: "#34d399", label: "High" },
] as const;

const CX = 100;
const CY = 100;
const R = 82;

function polar(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CX + R * Math.cos(rad),
    y: CY - R * Math.sin(rad),
  };
}

function arcPath(fromPercent: number, toPercent: number) {
  const a1 = fromPercent * 1.8; // 0 → left, 180 → right
  const a2 = toPercent * 1.8;
  const p1 = polar(a1);
  const p2 = polar(a2);
  const largeArc = a2 - a1 > 180 ? 1 : 0;
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${R} ${R} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

function statusFor(score: number) {
  if (score < 40) return "Performance Low! Practice more to level up.";
  if (score < 70) return "Good start! Keep practicing to level up.";
  return "Great performance! You're exam ready.";
}

export default function PerformanceGauge({
  performance,
}: {
  performance: RnPerformance;
}) {
  const score = Math.max(0, Math.min(100, performance.score));
  const needleAngle = score * 1.8;
  const status = statusFor(score);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0f1f38] p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#e6edf7]">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple/15 text-purple">
            <Gauge className="w-4.5 h-4.5" />
          </span>
          Performance Index
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7e93b0]">
          Guest
        </span>
      </div>

      {/* Gauge */}
      <div className="flex justify-center">
        <svg viewBox="0 0 200 116" className="w-full max-w-[260px]" role="img" aria-label={`Performance index ${score} percent`}>
          {/* Track */}
          <path
            d={arcPath(0, 100)}
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Zones */}
          {ZONES.map((zone) => (
            <path
              key={zone.label}
              d={arcPath(zone.from, zone.to)}
              fill="none"
              stroke={zone.color}
              strokeWidth="12"
              strokeLinecap="round"
              opacity={score >= zone.from ? 0.95 : 0.35}
            />
          ))}

          {/* Needle */}
          <g transform={`rotate(${needleAngle} ${CX} ${CY})`}>
            <line
              x1={CX - 6}
              y1={CY}
              x2={CX + 56}
              y2={CY}
              stroke="#e6edf7"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Center hub */}
          <circle cx={CX} cy={CY} r="7" fill="#0a1628" stroke="#e6edf7" strokeWidth="2" />

          {/* Score text */}
          <text
            x={CX}
            y={66}
            textAnchor="middle"
            fill="#e6edf7"
            fontSize="26"
            fontWeight="800"
            fontFamily="inherit"
          >
            {score}%
          </text>
          <text
            x={CX}
            y={80}
            textAnchor="middle"
            fill="#7e93b0"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="1"
            fontFamily="inherit"
          >
            PERFORMANCE INDEX
          </text>
        </svg>
      </div>

      {/* Zone legend */}
      <div className="flex items-center justify-center gap-4 mt-1">
        {ZONES.map((zone) => (
          <span key={zone.label} className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#93a6c0]">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: zone.color }} />
            {zone.label}
          </span>
        ))}
      </div>

      {/* Status message */}
      <div className="mt-4 rounded-xl border border-white/10 bg-[#0a1628] px-4 py-3 text-center">
        <p
          className={`text-xs sm:text-sm font-semibold ${
            score < 40
              ? "text-red-400"
              : score < 70
                ? "text-amber-300"
                : "text-green-400"
          }`}
        >
          {performance.statusLabel || status}
        </p>
        <p className="mt-0.5 text-[10px] text-[#7e93b0]">
          {performance.totalAttempted} questions attempted • {performance.correctAnswers} correct
        </p>
      </div>
    </section>
  );
}

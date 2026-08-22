"use client";

const CX = 150;
const CY = 140;
const R = 100;
const ARC_WIDTH = 14;

const ZONES = [
  { from: 0, to: 25, color: "#ef4444" },
  { from: 25, to: 50, color: "#f97316" },
  { from: 50, to: 75, color: "#eab308" },
  { from: 75, to: 100, color: "#22c55e" },
] as const;

const TICKS = [0, 25, 50, 75, 100];

function pctToAngle(pct: number) {
  return 180 - pct * 1.8;
}

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY - r * Math.sin(rad) };
}

function arcPath(fromPct: number, toPct: number) {
  const a1 = pctToAngle(fromPct);
  const a2 = pctToAngle(toPct);
  const p1 = polar(R, a1);
  const p2 = polar(R, a2);
  const span = Math.abs(a1 - a2);
  const largeArc = span > 180 ? 1 : 0;
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${R} ${R} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

function statusFor(score: number) {
  if (score < 40)
    return "Performance Low! \u2018You\u2019re at the starting line \u2014 practice more to level up.\u2019";
  if (score < 70)
    return "Good progress! \u2019You\u2019re building momentum \u2014 keep going.\u2019";
  return "Excellent work! \u2019You\u2019re exam ready.\u2019";
}

export default function PerformanceIndexGauge({ score = 0 }: { score?: number }) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const needleRotation = (clampedScore - 50) * 1.8;
  const status = statusFor(clampedScore);
  const statusColor =
    clampedScore < 40
      ? "text-red-500"
      : clampedScore < 70
        ? "text-amber-500"
        : "text-green-500";

  return (
    <div className="rounded-2xl border border-[var(--text-color)]/15 bg-[var(--content-bg)] p-5 flex flex-col items-center text-center h-full">
      {/* Heading */}
      <h2 className="text-base md:text-2xl font-bold text-[var(--text-color)] mb-1">Performance Index!</h2>

      {/* Status message */}
      <p className={`text-sm md:text-lg font-semibold mb-4 leading-snug ${statusColor}`}>
        {status}
      </p>

      {/* Gauge SVG */}
      <div className="w-full flex justify-center">
        <svg
          viewBox="0 0 300 165"
          className="w-full max-w-[260px] text-[var(--text-color)]"
          role="img"
          aria-label={`Performance index ${clampedScore} percent`}
        >
          {/* Colored zone arcs */}
          {ZONES.map((zone, i) => (
            <path
              key={zone.color}
              d={arcPath(zone.from, zone.to)}
              fill="none"
              stroke={zone.color}
              strokeWidth={ARC_WIDTH}
              strokeLinecap={i === 0 || i === ZONES.length - 1 ? "round" : "butt"}
            />
          ))}

          {/* Tick marks and labels */}
          {TICKS.map((t) => {
            const angle = pctToAngle(t);
            const inner = polar(R - ARC_WIDTH / 2 - 4, angle);
            const outer = polar(R + ARC_WIDTH / 2 + 4, angle);
            const label = polar(R + ARC_WIDTH / 2 + 14, angle);
            return (
              <g key={t}>
                <line
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="#6b7280"
                  strokeWidth="1.5"
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#6b7280"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="inherit"
                >
                  {t}%
                </text>
              </g>
            );
          })}

          {/* Needle */}
          <g transform={`rotate(${needleRotation} ${CX} ${CY})`}>
            <polygon
              points={`${CX},${CY - R + 24} ${CX - 2.5},${CY + 2} ${CX + 2.5},${CY + 2}`}
              fill="currentColor"
            />
          </g>

          {/* Center hub */}
          <circle cx={CX} cy={CY} r="6" fill="currentColor" />
          <circle cx={CX} cy={CY} r="3" fill="white" />

          {/* Score percentage */}
          <text
            x={CX}
            y={CY - 32}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            fontSize="28"
            fontWeight="800"
            fontFamily="inherit"
          >
            {clampedScore}%
          </text>
        </svg>
      </div>

      {/* Score label */}
      <div className="mt-2 text-center">
        <span className="text-sm md:text-lg font-semibold text-[var(--text-color)] opacity-60">
          Score : <span className="text-[var(--text-color)]">{clampedScore}</span>
        </span>
      </div>
    </div>
  );
}

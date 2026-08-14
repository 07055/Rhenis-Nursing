"use client";

// castoline/src/app/dashboards/rn-nursing/components/GreetingCard.tsx
// Greeting hero card: GMT+3 date/time, "Good Morning, Guest!", weather icon
// and a rotating tagline/joke.

import { useEffect, useState } from "react";
import { CloudSun, Clock, MapPin } from "lucide-react";
import { RN_TAGLINES } from "@/lib/data/dashboards/rn-nursing/exam-categories";

const GMT_3_TIME_ZONE = "Etc/GMT-3"; // fixed UTC+3 (no DST)

function formatDateParts(timeZone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  return {
    date: `${get("weekday")}, ${get("month")} ${get("day")}, ${get("year")}`,
    time: new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now),
  };
}

export default function GreetingCard() {
  const [clock, setClock] = useState(() => formatDateParts(GMT_3_TIME_ZONE));
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(true);

  // Live clock — tick every second
  useEffect(() => {
    const interval = setInterval(
      () => setClock(formatDateParts(GMT_3_TIME_ZONE)),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  // Rotate the tagline every 6s with a small fade
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineVisible(false);
      setTimeout(() => {
        setTaglineIndex((i) => (i + 1) % RN_TAGLINES.length);
        setTaglineVisible(true);
      }, 250);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#12294a] via-[#0d1f38] to-[#0a1628] p-5 sm:p-7">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-coral/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-teal/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-coral/15 text-coral shrink-0">
            <CloudSun className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-[#93a6c0]">
              <Clock className="w-3.5 h-3.5 text-coral" />
              {clock.date}
            </p>

            <h1 className="mt-1.5 text-xl sm:text-2xl md:text-3xl font-bold text-[#e6edf7]">
              Good Morning, Guest!
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-[#93a6c0]">
              Welcome to the RN Nursing dashboard — let&apos;s get you exam ready. ⚓
            </p>
          </div>
        </div>

        {/* Time + tagline */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end gap-3 shrink-0">
          <div className="text-left sm:text-right">
            <p className="font-mono text-2xl sm:text-3xl font-bold text-coral tabular-nums">
              {clock.time}
            </p>
            <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#7e93b0] sm:justify-end">
              <MapPin className="w-3 h-3" />
              GMT+3
            </p>
          </div>

          <div className="w-full sm:w-64 lg:w-56 rounded-xl border border-white/10 bg-white/5 px-3 py-2 min-h-[52px] flex items-center">
            <p
              className={`text-xs sm:text-sm text-[#c6d4e8] leading-snug transition-opacity duration-300 ${
                taglineVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {RN_TAGLINES[taglineIndex]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

const UNITS = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HRS" },
  { key: "minutes", label: "MIN" },
  { key: "seconds", label: "SEC" },
] as const;

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState(() => diff(targetMs));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(diff(targetMs));
    const id = window.setInterval(() => setTime(diff(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return (
    <div className="y-countdown" aria-label="대회 시작까지 남은 시간" suppressHydrationWarning>
      {UNITS.map((unit) => (
        <div className="y-count-cell" key={unit.key}>
          <strong suppressHydrationWarning>
            {mounted ? String(time[unit.key]).padStart(2, "0") : "--"}
          </strong>
          <small>{unit.label}</small>
        </div>
      ))}
    </div>
  );
}

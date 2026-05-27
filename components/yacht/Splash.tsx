"use client";

import { useEffect, useState } from "react";
import { eventInfo } from "@/lib/yacht/data";

export function Splash() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Only show once per session so navigation back to the landing isn't gated.
    if (typeof window !== "undefined" && sessionStorage.getItem("jsgp_splash") === "seen") {
      setHidden(true);
      setMounted(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const hideTimer = window.setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem("jsgp_splash", "seen");
      document.body.style.overflow = "";
    }, 2000);
    const removeTimer = window.setTimeout(() => setMounted(false), 2900);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="y-splash" data-hidden={hidden} aria-hidden={hidden}>
      <div className="y-splash__inner">
        <div className="y-splash__mark">⛵</div>
        <h1 className="y-splash__title">{eventInfo.titleEn}</h1>
        <p className="y-splash__sub">
          {eventInfo.edition} · JEJU, KOREA
        </p>
        <div className="y-splash__bar">
          <span />
        </div>
      </div>
    </div>
  );
}

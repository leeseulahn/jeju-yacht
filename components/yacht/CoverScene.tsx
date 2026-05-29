"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* MYCEL-style cover hero.
   – Five-panel image collage (LT / LB / CB / RT / RB).
   – Headline overlaid at center with eyebrow + lead + CTA.
   – Three "hotspots" (purple dots) with captions for editorial detail.
   – On scroll-in: split-line reveal of the headline via CSS animation.
*/

type Hotspot = {
  top: string;
  left: string;
  label: string;
  tone: "default" | "soft";
};

const PANELS = [
  { className: "y-cover2__panel y-cover2__panel--lt", src: "/assets/yacht/gallery-2.svg", alt: "" },
  { className: "y-cover2__panel y-cover2__panel--lb", src: "/assets/yacht/gallery-4.svg", alt: "" },
  { className: "y-cover2__panel y-cover2__panel--cb", src: "/assets/yacht/gallery-1.svg", alt: "" },
  { className: "y-cover2__panel y-cover2__panel--rt", src: "/assets/yacht/gallery-3.svg", alt: "" },
  { className: "y-cover2__panel y-cover2__panel--rb", src: "/assets/yacht/gallery-5.svg", alt: "" },
];

const HOTSPOTS: Hotspot[] = [
  { top: "26%", left: "18%", label: "한림항 출발", tone: "default" },
  { top: "62%", left: "78%", label: "이호테우 피니시", tone: "default" },
  { top: "44%", left: "52%", label: "메인 코스", tone: "soft" },
];

export function CoverScene() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Subtle parallax: as the user scrolls through the hero, panels drift
  // at slightly different speeds. Editorial, not gimmicky.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(rect.top / window.innerHeight, 1));
      stage.style.setProperty("--scroll-progress", String(progress));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="y-cover2" aria-label="JEJU SAILING GRAND PRIX 2026">
      <div ref={stageRef} className="y-cover2__stage">
        <div className="y-cover2__collage" aria-hidden="true">
          {PANELS.map((panel) => (
            <div className={panel.className} key={panel.className}>
              <img src={panel.src} alt={panel.alt} loading="eager" />
            </div>
          ))}
          {HOTSPOTS.map((h, i) => (
            <button
              key={i}
              type="button"
              className={`y-cover2__hotspot y-cover2__hotspot--${h.tone}`}
              style={{ top: h.top, left: h.left }}
              aria-label={h.label}
            >
              <span className="y-cover2__hotspot-dot" />
              <span className="y-cover2__hotspot-caption">{h.label}</span>
            </button>
          ))}
        </div>
        <div className="y-cover2__copy">
          <p className="y-cover2__eyebrow">JEJU SAILING GRAND PRIX 2026</p>
          <h1 className="y-cover2__headline">
            <span className="y-cover2__line">바람을 읽는 사람들의</span>
            <span className="y-cover2__line">
              <em>가장 푸른</em> 무대
            </span>
          </h1>
          <p className="y-cover2__lead">
            2026.09.18 — 09.20 · 제주 한림항 & 이호테우 앞바다
            <br />
            세계 16개국 48팀이 펼치는 사흘간의 국제 세일링 그랑프리.
          </p>
          <div className="y-cover2__cta">
            <Link href="/tickets" className="y-btn y-btn--primary">
              관람권 예매
            </Link>
            <Link href="#about" className="y-btn y-btn--outline">
              대회 소개 보기
            </Link>
          </div>
        </div>
      </div>
      <Link href="#about" className="y-cover2__scroll" aria-label="아래로 스크롤">
        <span className="y-cover2__scroll-text">SCROLL</span>
        <span className="y-cover2__scroll-line" />
      </Link>
    </section>
  );
}

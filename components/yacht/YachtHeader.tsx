"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Close, ArrowRight } from "@/components/yacht/icons";

/* MYCEL-pattern single-tier header.
   – Transparent over the hero video.
   – As the user scrolls down, the bar gains a frosted-white surface,
     a hairline shadow and a tiny lift via CSS custom properties
     (--header-surface-opacity / --header-shadow-opacity / --header-surface-blur).
   – Over a section flagged with [data-nav-dark] the inline text flips white. */

const NAV = [
  { href: "/#why", label: "Why" },
  { href: "/#program", label: "Schedule" },
  { href: "/#sustain", label: "Festival" },
  { href: "/#tickets", label: "Tickets" },
];

const UTILITY = [
  { href: "/admin/login", label: "Admin" },
];

export function YachtHeader() {
  const [dark, setDark] = useState(false);
  const [surface, setSurface] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only ramp the surface on pages that begin with a full-screen hero
    // (so the bar can sit transparent over the hero video). On regular
    // pages the bar is opaque from the first paint.
    const hasHero = !!document.querySelector(".y-mhero");
    if (!hasHero) setSurface(1);

    const update = () => {
      if (hasHero) {
        const t = Math.max(0, Math.min(window.scrollY / (window.innerHeight * 0.55), 1));
        setSurface(t);
      }

      // Dark mode while header overlaps a [data-nav-dark] section.
      const header = document.querySelector<HTMLElement>(".y-mh");
      const headerBottom = window.scrollY + (header?.offsetHeight ?? 0);
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-dark]"));
      let isDark = false;
      for (const section of sections) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (headerBottom >= top && headerBottom < bottom) {
          isDark = true;
          break;
        }
      }
      setDark(isDark);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Until the surface fades in, text on the header reads against the hero
  // video — force it light. Past that, follow the dark-section rule.
  const hostLight = surface < 0.5 ? true : dark;

  return (
    <header
      className="y-mh"
      data-light={hostLight ? "true" : undefined}
      data-open={open ? "true" : undefined}
      style={{
        // CSS variables drive the surface treatment (parallel to MYCEL's
        // --header-surface-opacity etc.).
        ["--y-mh-surface" as never]: String(surface),
        ["--y-mh-shadow" as never]: String(Math.min(surface * 1.1, 1) * 0.08),
      }}
    >
      <div className="y-mh__inner">
        <Link href="/" className="y-mh__logo" aria-label="제주 세일링 그랑프리 홈">
          <span className="y-mh__logo-mark" aria-hidden="true">⛵</span>
          <span className="y-mh__logo-text font-en">JSGP</span>
        </Link>

        <nav className="y-mh__nav" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="y-mh__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="y-mh__right">
          {UTILITY.map((item) => (
            <Link key={item.href} href={item.href} className="y-mh__utility">
              {item.label}
            </Link>
          ))}
          <Link href="/tickets" className="y-mh__cta">
            <span className="y-mh__cta-text">관람권 예매</span>
            <span className="y-mh__cta-circle" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </Link>
          <button
            type="button"
            className="y-mh__burger"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="y-mh__dim"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <div className="y-mh__drawer" data-open={open}>
        <div className="y-mh__drawer-top">
          <span className="y-mh__logo-text font-en">JSGP</span>
          <button
            type="button"
            className="y-mh__drawer-close"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          >
            <Close />
          </button>
        </div>
        <nav className="y-mh__drawer-nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/tickets"
          className="y-mh__cta y-mh__cta--block"
          onClick={() => setOpen(false)}
        >
          <span className="y-mh__cta-text">관람권 예매</span>
          <span className="y-mh__cta-circle" aria-hidden="true">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </header>
  );
}

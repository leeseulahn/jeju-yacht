"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

/* FLATTEN-style cover hero.
   – Per-letter mask wipe in the title.
   – Two inline media "windows" containing autoplay videos.
   – The second window is the focus video. As the user scrolls the
     cover out of view, the focus video grows from its inline rect to
     fill the entire viewport (sticky + scroll-driven transform). */

const HERO_VIDEO_INLINE =
  "https://assets.mixkit.co/videos/preview/mixkit-sailing-boat-crossing-the-ocean-7905-large.mp4";
const HERO_VIDEO_FOCUS =
  "https://assets.mixkit.co/videos/preview/mixkit-sunset-with-sailing-boats-2166-large.mp4";

function Letters({
  text,
  base,
  step = 70,
}: {
  text: string;
  base: number;
  step?: number;
}) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span
          key={`${text}-${i}`}
          className="y-cover__letter"
          style={{ animationDelay: `${base + i * step}ms` } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export function CoverScene() {
  const stackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    const pin = pinRef.current;
    const cover = coverRef.current;
    const anchor = anchorRef.current;
    const focus = focusRef.current;
    if (!stack || !pin || !cover || !anchor || !focus) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let anchorRect: { top: number; left: number; width: number; height: number } | null = null;

    const measure = () => {
      const pinRectBox = pin.getBoundingClientRect();
      const aRect = anchor.getBoundingClientRect();
      anchorRect = {
        top: aRect.top - pinRectBox.top,
        left: aRect.left - pinRectBox.left,
        width: aRect.width,
        height: aRect.height,
      };
    };

    const apply = (t: number) => {
      if (!anchorRect) return;
      const left = anchorRect.left * (1 - t);
      const top = anchorRect.top * (1 - t);
      const width = anchorRect.width + (window.innerWidth - anchorRect.width) * t;
      const height = anchorRect.height + (window.innerHeight - anchorRect.height) * t;
      focus.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      focus.style.width = `${width}px`;
      focus.style.height = `${height}px`;
      focus.style.borderRadius = `${8 * (1 - t)}px`;
      cover.style.opacity = `${Math.max(0, 1 - t * 1.25)}`;
    };

    const update = () => {
      const stackRectBox = stack.getBoundingClientRect();
      const stackTop = stackRectBox.top + window.scrollY;
      const distance = window.scrollY - stackTop;
      const phase = window.innerHeight;
      const progress = Math.max(0, Math.min(distance / phase, 1));
      apply(progress);
    };

    const ready = () => {
      measure();
      focus.style.opacity = "1";
      update();
    };

    // Wait for fonts so the anchor's text-line position is stable.
    if (document.fonts?.ready) {
      document.fonts.ready.then(ready);
    }
    // Belt-and-suspenders: also fire on next frame in case fonts.ready resolved before mount.
    requestAnimationFrame(ready);

    const onResize = () => {
      measure();
      update();
    };

    if (!reduced) {
      window.addEventListener("scroll", update, { passive: true });
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={stackRef} className="y-cover-stack">
      <div ref={pinRef} className="y-cover-pin">
        <section
          ref={coverRef}
          className="y-cover"
          aria-label="JEJU SAILING GRAND PRIX 2026"
        >
          <h1 className="y-cover__title">
            <p className="y-cover__line" aria-label="JEJU SAILING">
              <Letters text="JEJU" base={0} />
              <span
                className="y-cover__window"
                style={{ animationDelay: "440ms" } as CSSProperties}
              >
                <video
                  src={HERO_VIDEO_INLINE}
                  poster="/assets/yacht/gallery-1.svg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
              </span>
              <Letters text="SAILING" base={620} />
            </p>
            <p className="y-cover__line" aria-label="GRAND PRIX">
              <Letters text="GRAND" base={1180} />
              <Letters text="PRIX" base={1560} />
              <span
                ref={anchorRef}
                className="y-cover__window y-cover__window--anchor"
                aria-hidden="true"
              />
            </p>
          </h1>
          <Link href="#details" className="y-scroll-cue" aria-label="아래로 스크롤">
            SCROLL
            <i />
          </Link>
        </section>
        <div ref={focusRef} className="y-cover-focus" aria-hidden="true">
          <video
            src={HERO_VIDEO_FOCUS}
            poster="/assets/yacht/gallery-3.svg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}

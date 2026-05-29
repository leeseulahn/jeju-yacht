"use client";

import { useEffect, useRef } from "react";

/* MYCEL-style hero — full-screen autoplay video background with an
   oversized English headline ("WIND BACK TO WIND"), a short body
   subtitle and a mouse + "Scroll" cue at the bottom. Mirrors
   `#hero.no-main__hero` from mycel.earth. */

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-sailing-boat-crossing-the-ocean-7905-large.mp4";

export function CoverScene() {
  const ref = useRef<HTMLDivElement>(null);

  // Make sure the video starts playing once it's loaded (some mobile
  // browsers require an explicit play call even with autoplay+muted).
  useEffect(() => {
    const video = ref.current?.querySelector<HTMLVideoElement>("video");
    if (!video) return;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("loadeddata", tryPlay, { once: true });
  }, []);

  return (
    <section id="hero" className="y-mhero" ref={ref}>
      <div className="y-mhero__video">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/yacht/hero-poster.svg"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="y-mhero__veil" aria-hidden="true" />
        <hgroup className="y-mhero__title">
          <div className="y-mhero__inner">
            <h1 className="y-mhero__h font-en">
              <span className="y-mhero__word">WIND</span>{" "}
              <span className="y-mhero__word">BACK</span>{" "}
              <span className="y-mhero__word">TO</span>{" "}
              <span className="y-mhero__word">WIND</span>
            </h1>
            <p className="y-mhero__sub">
              A sailing grand prix from harbor to horizon.
              <br />
              제주 한림항에서 이호테우까지, 사흘간의 항해.
            </p>
          </div>
        </hgroup>
        <div className="y-mhero__scroll" aria-hidden="true">
          <span className="y-mhero__scroll-mouse" />
          <span className="y-mhero__scroll-text">Scroll</span>
        </div>
      </div>
    </section>
  );
}

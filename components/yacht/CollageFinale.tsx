"use client";

import { useEffect, useRef } from "react";

/* MYCEL `mycelium-finale-collage` — five images that fly in from
   off-screen and settle into a rotated cluster around a centered
   title. Mirrors the final beat of the pinned Mycelium section. */

const PIECES = [
  { className: "y-collage__piece--lt", src: "/assets/yacht/gallery-1.svg" },
  { className: "y-collage__piece--lb", src: "/assets/yacht/gallery-2.svg" },
  { className: "y-collage__piece--cb", src: "/assets/yacht/gallery-3.svg" },
  { className: "y-collage__piece--rt", src: "/assets/yacht/gallery-4.svg" },
  { className: "y-collage__piece--rb", src: "/assets/yacht/gallery-5.svg" },
];

export function CollageFinale() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.revealed = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.dataset.revealed = "true";
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="y-collage" id="collage" data-revealed="false">
      <div className="y-collage__pieces" aria-hidden="true">
        {PIECES.map((p) => (
          <div className={`y-collage__piece ${p.className}`} key={p.className}>
            <img src={p.src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="y-collage__center">
        <p className="y-collage__eyebrow font-en">SAIL · WIND · WAVE</p>
        <h2 className="y-collage__title font-en">Sailing</h2>
        <p className="y-collage__sub">
          돛 하나, 바람 하나, 그리고 사람.
          <br />
          제주 바다 위에서 가장 단순하고 강렬한 항해를.
        </p>
      </div>
    </section>
  );
}

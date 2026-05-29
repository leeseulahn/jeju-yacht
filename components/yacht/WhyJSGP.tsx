"use client";

import { useEffect, useRef, useState } from "react";

/* MYCEL `no-main__why` — intro headline above a pinned multi-step
   content shell. As the user scrolls through a tall section, the
   stack of steps cross-fades between them, the same way MYCEL
   reveals `data-why-step="1|2|3"` content under a sticky frame. */

type Step =
  | { kind: "icons"; title: string; items: { label: string }[] }
  | { kind: "copy"; title: string; copy: string; quote?: string }
  | { kind: "copy"; title: string; copy: string };

const STEPS: Step[] = [
  {
    kind: "icons",
    title: "Performance\nwithout compromise.",
    items: [
      { label: "16 nations\non one start line" },
      { label: "48 teams\nracing for the trophy" },
      { label: "Zero compromise\non human + wind" },
    ],
  },
  {
    kind: "copy",
    title: "High craft,\nwithout shortcuts.",
    copy: "JSGP delivers world-class racing on the cleanest stretch of Korean coastline — every wind, every wave, every wake earned, not given.",
    quote: "“What looks like a race is, at the same time, a love letter to the sea.”",
  },
  {
    kind: "copy",
    title: "Built for\nthe coming generation.",
    copy: "Around the racecourse a family-friendly festival unfolds — harbor concerts, food truck row, sailing clinics, late-night fireworks. The race is the spine, the festival is the body.",
  },
];

export function WhyJSGP() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(-rect.top / total, 1));
      const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      setActive(next);
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
    <section ref={ref} className="y-whypin" id="why">
      <article className="y-whypin__intro">
        <div className="y-whypin__container">
          <h2 className="font-en y-whypin__heading">Why JSGP</h2>
          <p className="y-whypin__lead">
            Because sailing is the only stage where
            <br />
            wind, water, and human read each other at once.
          </p>
        </div>
      </article>

      <article className="y-whypin__content">
        <div className="y-whypin__sticky">
          <div className="y-whypin__container">
            <div className="y-whypin__stage">
              {STEPS.map((step, i) => (
                <div className="y-whypin__step" data-active={i === active} key={i}>
                  <h3 className="font-en y-whypin__title">
                    {step.title.split("\n").map((line, j) => (
                      <span key={j}>{line}</span>
                    ))}
                  </h3>
                  {step.kind === "icons" && (
                    <ul className="y-whypin__icons" aria-label="Race indicators">
                      {step.items.map((ic, j) => (
                        <li key={j}>
                          <span className="y-whypin__dot" aria-hidden="true" />
                          <span className="y-whypin__icon-label">
                            {ic.label.split("\n").map((line, k) => (
                              <span key={k}>{line}</span>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.kind === "copy" && (
                    <>
                      <p className="y-whypin__copy">{step.copy}</p>
                      {"quote" in step && step.quote && (
                        <p className="y-whypin__quote">{step.quote}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <ol className="y-whypin__progress" aria-hidden="true">
              {STEPS.map((_, i) => (
                <li key={i} data-active={i === active} />
              ))}
            </ol>
          </div>
        </div>
      </article>
    </section>
  );
}

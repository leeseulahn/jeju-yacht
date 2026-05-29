"use client";

import { useEffect, useRef, useState } from "react";
import { program } from "@/lib/yacht/data";

/* MYCEL `no-main__material-pin` — numbered pin slides (01/03 → 02/03 →
   03/03) that swap as the user scrolls a tall pin section. Mirrors
   the System "MAT / FOAM / etc." material showcase, mapped onto the
   three race days. */

const IMAGES = [
  "/assets/yacht/gallery-1.svg",
  "/assets/yacht/gallery-3.svg",
  "/assets/yacht/gallery-5.svg",
];

export function ScheduleSlides() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(-rect.top / total, 1));
      const next = Math.min(program.length - 1, Math.floor(progress * program.length));
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
    <section ref={ref} className="y-pin" id="program">
      <article className="y-pin__intro">
        <div className="y-pin__container">
          <div className="y-pin__intro-row">
            <h2 className="font-en y-pin__heading">Schedule</h2>
            <p className="y-pin__lead">
              Three days.
              <br />
              One coastline. One champion.
            </p>
          </div>
        </div>
      </article>
      <div className="y-pin__sticky">
        <div className="y-pin__container">
          <div className="y-pin__viewport">
            {program.map((day, i) => (
              <article className="y-pin__slide" data-active={i === active} key={day.day}>
                <div className="y-pin__col y-pin__col--left">
                  <p className="font-en y-pin__idx" aria-hidden="true">
                    <span className="y-pin__idx-current">{String(i + 1).padStart(2, "0")}</span>
                    <span className="y-pin__idx-sep">/</span>
                    <span className="y-pin__idx-total">{String(program.length).padStart(2, "0")}</span>
                  </p>
                  <h3 className="font-en y-pin__title">
                    {day.title.split(/\s+&\s+/).map((part, j, arr) => (
                      <span key={j}>
                        {part}
                        {j < arr.length - 1 && " &"}
                        <br />
                      </span>
                    ))}
                  </h3>
                  <p className="y-pin__meta">
                    <span className="font-en">{day.day}</span>
                    <span className="y-pin__dot" aria-hidden="true" />
                    <span className="font-en">{day.date}</span>
                  </p>
                  <p className="y-pin__summary">{day.summary}</p>
                </div>
                <div className="y-pin__col y-pin__col--visual">
                  <figure className="y-pin__figure">
                    <img src={IMAGES[i % IMAGES.length]} alt="" loading="lazy" />
                  </figure>
                  <ul className="y-pin__schedule">
                    {day.schedule.map((slot) => (
                      <li key={slot.time}>
                        <b className="font-en">{slot.time}</b>
                        <span>{slot.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <ol className="y-pin__dots" aria-hidden="true">
            {program.map((_, i) => (
              <li key={i} data-active={i === active} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

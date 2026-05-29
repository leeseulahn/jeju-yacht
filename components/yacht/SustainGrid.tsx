import Link from "next/link";

/* Three-icon grid with a leading hgroup ("Sustainability" + lead) and
   a single circle-arrow CTA. Icons are inline SVGs — a sailboat over
   a horizon line, a wind swoosh, and a flag/pennant. */

const ITEMS = [
  {
    label: "From\nharbor to horizon",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M32 8 L32 38 L48 38 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M32 14 L20 38 L32 38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8 48 C16 44, 24 50, 32 48 C40 46, 48 50, 56 48"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 55 C22 51, 30 57, 38 55 C46 53, 54 57, 58 55"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    label: "From\nwind to wonder",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M8 22 C20 14, 36 30, 50 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M50 22 L56 18 M50 22 L56 26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 36 C20 28, 36 44, 50 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M8 50 C20 42, 36 58, 50 50"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    ),
  },
  {
    label: "From\nrace to ritual",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M16 8 L16 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M16 12 L48 12 L40 22 L48 32 L16 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="56" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function SustainGrid() {
  return (
    <section className="y-sustain" id="sustain">
      <article className="y-sustain__inner">
        <div className="y-sustain__container">
          <hgroup className="y-sustain__head">
            <h2 className="font-en y-sustain__heading">Sustainability</h2>
            <p className="y-sustain__lead">Sailing is not a claim. It is our system.</p>
          </hgroup>
          <h3 className="font-en y-sustain__sub">
            At JSGP, the festival is built
            <br />
            into how we race.
          </h3>
          <ul className="y-sustain__grid">
            {ITEMS.map((it, i) => (
              <li key={i}>
                <figure className="y-sustain__icon" aria-hidden="true">
                  {it.svg}
                </figure>
                <p>
                  {it.label.split("\n").map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <div className="y-sustain__cta">
            <Link href="/tickets" className="y-mbtn y-mbtn--brand">
              <span className="y-mbtn__text">View Tickets</span>
              <span className="y-mbtn__circle" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}

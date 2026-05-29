import Link from "next/link";

/* MYCEL `no-main__sustain--system` — three-icon grid with a leading
   hgroup ("Sustainability" + lead) and a single circle-arrow CTA. */

const ITEMS = [
  { label: "From\nharbor to horizon" },
  { label: "From\nwind to wonder" },
  { label: "From\nrace to ritual" },
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
                  <span className="y-sustain__icon-glyph" />
                </figure>
                <p>
                  {it.label.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < it.label.split("\n").length - 1 && <br />}
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

import Link from "next/link";
import { ClosingVideo } from "@/components/yacht/ClosingVideo";
import { CollageFinale } from "@/components/yacht/CollageFinale";
import { CoverScene } from "@/components/yacht/CoverScene";
import { ScheduleSlides } from "@/components/yacht/ScheduleSlides";
import { SustainGrid } from "@/components/yacht/SustainGrid";
import { TicketCard } from "@/components/yacht/TicketCard";
import { WhyJSGP } from "@/components/yacht/WhyJSGP";
import { getTicketTypes } from "@/lib/yacht/data";

export default function YachtLandingPage() {
  const tickets = getTicketTypes();

  return (
    <div className="y-home">
      {/* 1. HERO — full-screen video + "WIND BACK TO WIND" */}
      <CoverScene />

      {/* 2. COLLAGE FINALE — five pieces fly in around "Sailing" */}
      <CollageFinale />

      {/* 3. WHY JSGP — pinned multi-step content (3 steps) */}
      <WhyJSGP />

      {/* 4. SCHEDULE — numbered pin slides (DAY 1/2/3) */}
      <ScheduleSlides />

      {/* 5. SUSTAINABILITY — three-icon grid */}
      <SustainGrid />

      {/* 6. TICKETS — MYCEL-minimal card grid */}
      <section className="y-mtix" id="tickets">
        <div className="y-mtix__container">
          <div className="y-mtix__head">
            <h2 className="font-en y-mtix__heading">Join the race.</h2>
            <p className="y-mtix__lead">From the shoreline to the racing deck.</p>
          </div>
          <div className="y-mtix__grid">
            {tickets.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket.slug} />
            ))}
          </div>
          <div className="y-mtix__cta">
            <Link href="/tickets" className="y-mbtn y-mbtn--brand">
              <span className="y-mbtn__text">All tickets</span>
              <span className="y-mbtn__circle" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CLOSING — full-screen video with editorial outro */}
      <ClosingVideo />
    </div>
  );
}

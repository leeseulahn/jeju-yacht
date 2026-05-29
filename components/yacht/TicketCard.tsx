import Link from "next/link";
import type { TicketType } from "@/lib/yacht/data";
import { formatKRW } from "@/lib/yacht/format";
import { Check, ArrowRight } from "@/components/yacht/icons";

export function TicketCard({ ticket }: { ticket: TicketType }) {
  return (
    <article className="ticket-card" data-accent={ticket.accent}>
      {ticket.badge ? <span className="ticket-card__badge">{ticket.badge}</span> : null}
      <h3 className="ticket-card__name">{ticket.name}</h3>
      <p className="ticket-card__tag">{ticket.tagline}</p>

      <div className="ticket-card__price">
        <strong>{formatKRW(ticket.price)}</strong>
        {ticket.originalPrice ? <s>{formatKRW(ticket.originalPrice)}</s> : null}
        <em>/ 1매</em>
      </div>

      <ul className="ticket-card__perks">
        {ticket.perks.map((perk) => (
          <li key={perk}>
            <Check size={17} />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      <div className="ticket-card__foot">
        <Link href={`/tickets#${ticket.slug}`} className="y-btn y-btn--ghost y-btn--block">
          예매하기 <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { TicketType } from "@/lib/yacht/data";
import { formatKRW } from "@/lib/yacht/format";
import { Plus, Minus, ArrowRight } from "@/components/yacht/icons";

export type SelectableTicket = TicketType & { remaining: number | null };

const MAX_PER_TYPE = 10;

export function TicketSelector({ tickets }: { tickets: SelectableTicket[] }) {
  const router = useRouter();
  const [qty, setQty] = useState<Record<string, number>>({});

  const total = useMemo(
    () =>
      tickets.reduce((sum, ticket) => sum + ticket.price * (qty[ticket.slug] ?? 0), 0),
    [tickets, qty],
  );
  const count = useMemo(
    () => Object.values(qty).reduce((sum, n) => sum + n, 0),
    [qty],
  );

  function setTicketQty(slug: string, next: number, max: number) {
    const clamped = Math.max(0, Math.min(next, max));
    setQty((prev) => ({ ...prev, [slug]: clamped }));
  }

  function goToCheckout() {
    const items = tickets
      .filter((t) => (qty[t.slug] ?? 0) > 0)
      .map((t) => `${t.slug}:${qty[t.slug]}`)
      .join(",");
    if (!items) return;
    router.push(`/checkout?items=${encodeURIComponent(items)}`);
  }

  return (
    <div>
      {tickets.map((ticket) => {
        const soldOut = ticket.remaining !== null && ticket.remaining <= 0;
        const max = ticket.remaining === null ? MAX_PER_TYPE : Math.min(MAX_PER_TYPE, ticket.remaining);
        const current = qty[ticket.slug] ?? 0;
        return (
          <div className="y-select-row" id={ticket.slug} key={ticket.slug} data-soldout={soldOut}>
            <div>
              <div className="y-select-row__name">{ticket.name}</div>
              <div className="y-select-row__meta">{ticket.tagline} · {ticket.perks.join(" · ")}</div>
              <div className="y-select-row__price">
                {formatKRW(ticket.price)}
                {soldOut ? <span style={{ color: "var(--y-coral)", marginLeft: 10 }}>매진</span> : null}
                {!soldOut && ticket.remaining !== null && ticket.remaining <= 50 ? (
                  <span style={{ color: "var(--y-coral)", marginLeft: 10 }}>잔여 {ticket.remaining}석</span>
                ) : null}
              </div>
            </div>
            <div className="y-stepper" aria-label={`${ticket.name} 수량`}>
              <button
                type="button"
                aria-label="수량 감소"
                disabled={current <= 0}
                onClick={() => setTicketQty(ticket.slug, current - 1, max)}
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                inputMode="numeric"
                value={current}
                min={0}
                max={max}
                aria-label={`${ticket.name} 수량 입력`}
                onChange={(e) => setTicketQty(ticket.slug, Number(e.target.value) || 0, max)}
              />
              <button
                type="button"
                aria-label="수량 증가"
                disabled={soldOut || current >= max}
                onClick={() => setTicketQty(ticket.slug, current + 1, max)}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        );
      })}

      <div className="y-summary-bar">
        <div className="y-summary-bar__total">
          <small>선택 {count}매 · 결제 예정 금액</small>
          <strong>{formatKRW(total)}</strong>
        </div>
        <button
          type="button"
          className="y-btn y-btn--gold"
          disabled={count === 0}
          aria-disabled={count === 0}
          onClick={goToCheckout}
        >
          예매 정보 입력 <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

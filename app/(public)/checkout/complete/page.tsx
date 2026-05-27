import type { Metadata } from "next";
import Link from "next/link";
import { getOrder } from "@/lib/yacht/store";
import { eventInfo } from "@/lib/yacht/data";
import { formatKRW, formatDateTime } from "@/lib/yacht/format";
import { Check, ArrowRight, Calendar, Pin } from "@/components/yacht/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "예매 완료",
};

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  const order = orderId ? getOrder(orderId) : undefined;

  if (!order || order.status !== "paid") {
    return (
      <div className="y-page">
        <div className="y-container y-complete">
          <h1 className="y-heading">주문 정보를 찾을 수 없습니다</h1>
          <p className="y-lead" style={{ marginInline: "auto" }}>
            결제 내역을 확인할 수 없습니다. 결제가 완료되지 않았거나 주문 번호가 올바르지 않습니다.
          </p>
          <Link href="/tickets" className="y-btn y-btn--primary" style={{ marginTop: 20 }}>
            관람권 다시 예매하기 <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="y-page">
      <div className="y-container y-complete">
        <div className="y-complete__check">
          <Check size={40} />
        </div>
        <p className="y-eyebrow y-section__head--center" style={{ display: "inline-flex" }}>
          Payment Complete
        </p>
        <h1 className="y-heading" style={{ marginTop: 12 }}>
          예매가 완료되었습니다
        </h1>
        <p className="y-lead" style={{ marginInline: "auto" }}>
          {order.buyer.name}님, 결제가 정상적으로 처리되었습니다. 모바일 티켓이 <b style={{ color: "var(--y-ink)" }}>{order.buyer.email}</b>
          로 발송됩니다.
        </p>

        <div className="y-ticket-stub">
          <div className="y-receipt__row" style={{ borderTop: "none", paddingTop: 0 }}>
            <span>주문번호</span>
            <b>{order.id}</b>
          </div>
          {order.items.map((item) => (
            <div className="y-receipt__row" key={item.ticketSlug}>
              <span>
                {item.ticketName} × {item.quantity}
              </span>
              <b>{formatKRW(item.unitPrice * item.quantity)}</b>
            </div>
          ))}
          <div className="y-receipt__row">
            <span>결제수단</span>
            <b>{order.paymentMethod}</b>
          </div>
          <div className="y-receipt__row">
            <span>결제일시</span>
            <b>{order.paidAt ? formatDateTime(order.paidAt) : "-"}</b>
          </div>
          <div className="y-summary-total">
            <span>총 결제금액</span>
            <strong>{formatKRW(order.amount)}</strong>
          </div>
        </div>

        <div className="y-hero__meta" style={{ justifyContent: "center", marginTop: 28 }}>
          <span>
            <Calendar size={18} /> {eventInfo.dateLabel}
          </span>
          <span>
            <Pin size={18} /> {eventInfo.venue}
          </span>
        </div>

        <div className="y-hero__cta" style={{ justifyContent: "center" }}>
          <Link href="/" className="y-btn y-btn--ghost">
            홈으로
          </Link>
          <Link href="/tickets" className="y-btn y-btn--primary">
            추가 예매 <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

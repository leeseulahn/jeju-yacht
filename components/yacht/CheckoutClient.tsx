"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatKRW } from "@/lib/yacht/format";
import { ArrowRight } from "@/components/yacht/icons";

export type CheckoutLine = {
  ticketSlug: string;
  ticketName: string;
  unitPrice: number;
  quantity: number;
};

const METHODS = [
  { id: "card", label: "신용/체크카드" },
  { id: "kakaopay", label: "카카오페이" },
  { id: "transfer", label: "계좌이체" },
];

export function CheckoutClient({ items, total }: { items: CheckoutLine[]; total: number }) {
  const router = useRouter();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [method, setMethod] = useState("card");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methodLabel = METHODS.find((m) => m.id === method)?.label ?? "카드";

  async function handlePay() {
    setError(null);
    if (!buyer.name || !buyer.email || !buyer.phone) {
      setError("구매자 정보를 모두 입력해 주세요.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(buyer.email)) {
      setError("이메일 형식을 확인해 주세요.");
      return;
    }
    if (!agreed) {
      setError("결제 진행을 위해 약관에 동의해 주세요.");
      return;
    }

    setLoading(true);
    try {
      // 1) Create the order (pending).
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer,
          items: items.map((i) => ({ ticketSlug: i.ticketSlug, quantity: i.quantity })),
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error ?? "주문 생성에 실패했습니다.");
      const order = orderData.order as { id: string; amount: number };

      // 2) Demo payment confirmation. A real PG flow would open the provider's
      //    payment window here and confirm with the returned paymentKey.
      await new Promise((resolve) => setTimeout(resolve, 900));
      const payRes = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.amount,
          method: methodLabel,
          paymentKey: `demo_${Math.random().toString(36).slice(2, 12)}`,
        }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.error ?? "결제 승인에 실패했습니다.");

      router.push(`/checkout/complete?orderId=${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "결제 중 오류가 발생했습니다.");
      setLoading(false);
    }
  }

  return (
    <div className="y-checkout">
      <div>
        <div className="y-card" style={{ marginBottom: 24 }}>
          <h3>구매자 정보</h3>
          <div className="y-field">
            <label htmlFor="buyer-name">이름</label>
            <input
              id="buyer-name"
              className="y-input"
              placeholder="홍길동"
              value={buyer.name}
              onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
            />
          </div>
          <div className="y-field">
            <label htmlFor="buyer-email">이메일 (모바일 티켓 발송)</label>
            <input
              id="buyer-email"
              className="y-input"
              type="email"
              placeholder="you@example.com"
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
            />
          </div>
          <div className="y-field" style={{ marginBottom: 0 }}>
            <label htmlFor="buyer-phone">연락처</label>
            <input
              id="buyer-phone"
              className="y-input"
              inputMode="tel"
              placeholder="010-0000-0000"
              value={buyer.phone}
              onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="y-card">
          <h3>결제 수단</h3>
          <div className="y-pay-methods">
            {METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                className="y-pay-method"
                data-active={method === m.id}
                onClick={() => setMethod(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="y-note">
            본 사이트는 데모입니다. 실제 카드/계좌 정보를 입력하지 않으며, 결제 버튼을 누르면 모의 결제 승인이
            진행됩니다. 실 서비스 전환 시 이 단계에서 PG사 결제창이 호출됩니다.
          </p>
        </div>
      </div>

      <aside className="y-card" aria-label="결제 요약">
        <h3>주문 요약</h3>
        {items.map((item) => (
          <div className="y-summary-line" key={item.ticketSlug}>
            <span>
              {item.ticketName} × {item.quantity}
            </span>
            <span>{formatKRW(item.unitPrice * item.quantity)}</span>
          </div>
        ))}
        <div className="y-summary-total">
          <span>총 결제금액</span>
          <strong>{formatKRW(total)}</strong>
        </div>

        <label className="y-checkbox" style={{ marginTop: 18 }}>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>구매 조건 및 취소·환불 규정을 확인하였으며 결제에 동의합니다.</span>
        </label>

        {error ? <p className="y-error">{error}</p> : null}

        <button
          type="button"
          className="y-btn y-btn--gold y-btn--block"
          style={{ marginTop: 18 }}
          disabled={loading}
          aria-disabled={loading}
          onClick={handlePay}
        >
          {loading ? "결제 처리 중…" : `${formatKRW(total)} 결제하기`}
          {!loading ? <ArrowRight size={18} /> : null}
        </button>
      </aside>
    </div>
  );
}

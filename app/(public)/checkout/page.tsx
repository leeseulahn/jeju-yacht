import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutClient, type CheckoutLine } from "@/components/yacht/CheckoutClient";
import { getTicketType } from "@/lib/yacht/data";
import { ArrowRight } from "@/components/yacht/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "예매 정보 입력",
};

function parseItems(raw: string | undefined): CheckoutLine[] {
  if (!raw) return [];
  const lines: CheckoutLine[] = [];
  for (const part of raw.split(",")) {
    const [slug, qtyStr] = part.split(":");
    const ticket = getTicketType(slug);
    const qty = Math.floor(Number(qtyStr));
    if (!ticket || !Number.isFinite(qty) || qty <= 0) continue;
    lines.push({
      ticketSlug: ticket.slug,
      ticketName: ticket.name,
      unitPrice: ticket.price,
      quantity: Math.min(qty, 10),
    });
  }
  return lines;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ items?: string }>;
}) {
  const { items: rawItems } = await searchParams;
  const items = parseItems(rawItems);
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <div className="y-page">
      <div className="y-container">
        <div className="y-page__head">
          <p className="y-eyebrow">Checkout</p>
          <h1 className="y-heading">예매 정보 입력</h1>
        </div>

        {items.length === 0 ? (
          <div className="y-card" style={{ textAlign: "center", padding: "60px 24px" }}>
            <p className="y-lead" style={{ marginInline: "auto" }}>
              선택된 관람권이 없습니다. 관람권 페이지에서 수량을 선택해 주세요.
            </p>
            <Link href="/tickets" className="y-btn y-btn--primary" style={{ marginTop: 20 }}>
              관람권 선택하러 가기 <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <CheckoutClient items={items} total={total} />
        )}
      </div>
    </div>
  );
}

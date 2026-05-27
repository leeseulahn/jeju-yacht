import Link from "next/link";
import { AdminOrders } from "@/components/yacht/AdminOrders";
import { ArrowUpRight } from "@/components/yacht/icons";
import { getTicketTypes } from "@/lib/yacht/data";
import { formatKRW } from "@/lib/yacht/format";
import { listOrders, remainingStock, soldCount } from "@/lib/yacht/store";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const orders = listOrders();
  const tickets = getTicketTypes();

  const paid = orders.filter((o) => o.status === "paid");
  const revenue = paid.reduce((sum, o) => sum + o.amount, 0);
  const ticketsSold = tickets.reduce((sum, t) => sum + soldCount(t.slug), 0);
  const seatsLeft = tickets.reduce((sum, t) => sum + (remainingStock(t.slug) ?? 0), 0);

  const bars = tickets.map((t) => ({
    name: t.name,
    sold: soldCount(t.slug),
    capacity: t.capacity,
  }));

  const cards = [
    { label: "총 결제 매출", value: formatKRW(revenue) },
    { label: "결제 완료 주문", value: `${paid.length}건` },
    { label: "판매된 관람권", value: `${ticketsSold.toLocaleString("ko-KR")}매` },
    { label: "잔여 좌석", value: `${seatsLeft.toLocaleString("ko-KR")}석` },
  ];

  return (
    <>
      <div className="y-admin__topbar">
        <h1>대시보드</h1>
        <Link href="/" className="y-btn y-btn--ghost" target="_blank">
          사이트 보기 <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="y-admin-stats">
        {cards.map((card) => (
          <div className="y-admin-stat" key={card.label}>
            <small>{card.label}</small>
            <strong>{card.value}</strong>
          </div>
        ))}
      </div>

      <div className="y-card" style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18 }}>관람권별 판매 현황</h3>
        <div className="y-admin-bars">
          {bars.map((bar) => {
            const pct = bar.capacity > 0 ? Math.round((bar.sold / bar.capacity) * 100) : 0;
            return (
              <div className="y-admin-bar" key={bar.name}>
                <span>{bar.name}</span>
                <span className="y-admin-bar__track">
                  <span className="y-admin-bar__fill" style={{ width: `${Math.max(2, pct)}%` }} />
                </span>
                <span style={{ color: "var(--y-ink-soft)" }}>
                  {bar.sold.toLocaleString("ko-KR")} / {bar.capacity.toLocaleString("ko-KR")} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800 }}>최근 예매 주문</h3>
        <Link href="/admin/orders" style={{ color: "var(--y-aqua)", fontWeight: 700, fontSize: 14 }}>
          전체 보기
        </Link>
      </div>
      <AdminOrders orders={orders.slice(0, 8)} />
    </>
  );
}

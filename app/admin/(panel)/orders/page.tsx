import { AdminOrders } from "@/components/yacht/AdminOrders";
import { listOrders } from "@/lib/yacht/store";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  const orders = listOrders();
  const pending = orders.filter((o) => o.status === "pending").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;

  return (
    <>
      <div className="y-admin__topbar">
        <h1>예매 주문</h1>
        <span style={{ color: "var(--y-ink-dim)", fontSize: 14 }}>
          전체 {orders.length}건 · 대기 {pending}건 · 취소 {cancelled}건
        </span>
      </div>
      <AdminOrders orders={orders} />
    </>
  );
}

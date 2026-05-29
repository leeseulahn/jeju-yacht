"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Order, OrderStatus } from "@/lib/yacht/store";
import { formatKRW, formatDateTime } from "@/lib/yacht/format";

const STATUS_LABEL: Record<OrderStatus, string> = {
  paid: "결제완료",
  pending: "결제대기",
  cancelled: "취소",
};

export function AdminOrders({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function changeStatus(id: string, status: OrderStatus) {
    setBusy(id);
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  if (orders.length === 0) {
    return <div className="y-admin-empty">아직 접수된 예매 주문이 없습니다.</div>;
  }

  return (
    <div className="y-table-wrap">
      <table className="y-table">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>구매자</th>
            <th>티켓</th>
            <th>금액</th>
            <th>결제수단</th>
            <th>일시</th>
            <th>상태</th>
            <th>처리</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><b>{order.id}</b></td>
              <td>
                {order.buyer.name}
                <br />
                <span style={{ fontSize: 12, color: "var(--y-ink-dim)" }}>{order.buyer.email}</span>
              </td>
              <td>{order.orderName}</td>
              <td><b>{formatKRW(order.amount)}</b></td>
              <td>{order.paymentMethod ?? "-"}</td>
              <td style={{ fontSize: 12 }}>{formatDateTime(order.paidAt ?? order.createdAt)}</td>
              <td>
                <span className="y-pill" data-status={order.status}>
                  {STATUS_LABEL[order.status]}
                </span>
              </td>
              <td>
                <div className="y-admin-actions">
                  {order.status !== "paid" ? (
                    <button type="button" disabled={busy === order.id} onClick={() => changeStatus(order.id, "paid")}>
                      결제확인
                    </button>
                  ) : null}
                  {order.status !== "cancelled" ? (
                    <button type="button" disabled={busy === order.id} onClick={() => changeStatus(order.id, "cancelled")}>
                      취소
                    </button>
                  ) : null}
                  {order.status === "cancelled" ? (
                    <button type="button" disabled={busy === order.id} onClick={() => changeStatus(order.id, "pending")}>
                      복원
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

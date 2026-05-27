import { NextResponse } from "next/server";
import { confirmPayment } from "@/lib/yacht/store";

export const dynamic = "force-dynamic";

// Demo payment confirmation endpoint. Mirrors the shape of a real PG confirm
// call (orderId + amount + paymentKey). A production integration would verify
// the paymentKey/amount against the provider (e.g. Toss Payments) here.
export async function POST(request: Request) {
  let body: { orderId?: string; amount?: number; method?: string; paymentKey?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  if (!body.orderId || typeof body.amount !== "number") {
    return NextResponse.json({ error: "주문 정보가 올바르지 않습니다." }, { status: 400 });
  }

  // Simulate a small chance of gateway failure so the failure path is testable
  // via an explicit flag, not randomly.
  const result = confirmPayment({
    orderId: body.orderId,
    amount: body.amount,
    method: body.method,
    paymentKey: body.paymentKey,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ order: result.order });
}

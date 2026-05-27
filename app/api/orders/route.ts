import { NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/yacht/store";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ orders: listOrders() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { items, buyer } = (body ?? {}) as {
    items?: { ticketSlug: string; quantity: number }[];
    buyer?: { name: string; email: string; phone: string };
  };

  const result = createOrder({
    items: items ?? [],
    buyer: buyer ?? { name: "", email: "", phone: "" },
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ order: result.order }, { status: 201 });
}

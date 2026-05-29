import { NextResponse } from "next/server";
import { getTicketTypes } from "@/lib/yacht/data";
import { remainingStock, soldCount } from "@/lib/yacht/store";

export const dynamic = "force-dynamic";

export function GET() {
  const tickets = getTicketTypes().map((ticket) => ({
    ...ticket,
    sold: soldCount(ticket.slug),
    remaining: remainingStock(ticket.slug),
  }));
  return NextResponse.json({ tickets });
}

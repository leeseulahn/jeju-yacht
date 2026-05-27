import type { Metadata } from "next";
import { TicketSelector, type SelectableTicket } from "@/components/yacht/TicketSelector";
import { getTicketTypes } from "@/lib/yacht/data";
import { remainingStock } from "@/lib/yacht/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관람권 예매",
  description: "제주 세일링 그랑프리 2026 관람권을 온라인으로 예매하세요.",
};

export default function TicketsPage() {
  const tickets: SelectableTicket[] = getTicketTypes().map((ticket) => ({
    ...ticket,
    remaining: remainingStock(ticket.slug),
  }));

  return (
    <div className="y-page">
      <div className="y-container">
        <div className="y-page__head">
          <p className="y-eyebrow">Tickets</p>
          <h1 className="y-heading">관람권 예매</h1>
          <p className="y-lead">
            원하는 관람권의 수량을 선택한 뒤 예매 정보를 입력하세요. 모바일 티켓은 결제 완료 후 입력하신 이메일로
            발송됩니다.
          </p>
        </div>
        <TicketSelector tickets={tickets} />
      </div>
    </div>
  );
}

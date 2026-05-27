import { getTicketTypes } from "@/lib/yacht/data";
import { formatKRW } from "@/lib/yacht/format";
import { remainingStock, soldCount } from "@/lib/yacht/store";

export const dynamic = "force-dynamic";

export default function AdminTicketsPage() {
  const tickets = getTicketTypes();
  const totalRevenue = tickets.reduce((sum, t) => sum + soldCount(t.slug) * t.price, 0);

  return (
    <>
      <div className="y-admin__topbar">
        <h1>관람권 현황</h1>
        <span style={{ color: "var(--y-ink-dim)", fontSize: 14 }}>관람권별 누적 매출 {formatKRW(totalRevenue)}</span>
      </div>

      <div className="y-table-wrap">
        <table className="y-table">
          <thead>
            <tr>
              <th>관람권</th>
              <th>단가</th>
              <th>정원</th>
              <th>판매</th>
              <th>잔여</th>
              <th>판매율</th>
              <th>매출</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const sold = soldCount(ticket.slug);
              const remaining = remainingStock(ticket.slug) ?? 0;
              const pct = ticket.capacity > 0 ? Math.round((sold / ticket.capacity) * 100) : 0;
              return (
                <tr key={ticket.slug}>
                  <td>
                    <b>{ticket.name}</b>
                    <br />
                    <span style={{ fontSize: 12, color: "var(--y-ink-dim)" }}>{ticket.tagline}</span>
                  </td>
                  <td>{formatKRW(ticket.price)}</td>
                  <td>{ticket.capacity.toLocaleString("ko-KR")}</td>
                  <td><b>{sold.toLocaleString("ko-KR")}</b></td>
                  <td style={{ color: remaining <= 50 ? "var(--y-coral)" : undefined }}>
                    {remaining.toLocaleString("ko-KR")}
                  </td>
                  <td>{pct}%</td>
                  <td><b>{formatKRW(sold * ticket.price)}</b></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

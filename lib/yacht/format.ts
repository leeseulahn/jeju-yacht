const krw = new Intl.NumberFormat("ko-KR");

export function formatKRW(amount: number): string {
  return `${krw.format(Math.round(amount))}원`;
}

export function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

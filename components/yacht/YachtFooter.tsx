import Link from "next/link";
import { eventInfo } from "@/lib/yacht/data";

const FOOTER_NAV = [
  {
    title: "대회",
    links: [
      { href: "/#about", label: "대회 소개" },
      { href: "/#program", label: "경기 일정" },
      { href: "/#course", label: "코스 안내" },
      { href: "/#gallery", label: "갤러리" },
    ],
  },
  {
    title: "예매",
    links: [
      { href: "/tickets", label: "관람권 예매" },
      { href: "/#faq", label: "자주 묻는 질문" },
      { href: "/admin/login", label: "운영자 로그인" },
    ],
  },
];

export function YachtFooter() {
  return (
    <footer className="y-footer">
      <div className="y-footer__inner">
        <div className="y-footer__top">
          <div className="y-footer__brand">
            <div className="y-logo y-logo--footer">
              <span className="y-logo__mark">⛵</span>
              <span className="y-logo__text">
                JEJU SAILING
                <small>GRAND PRIX {eventInfo.edition}</small>
              </span>
            </div>
            <p className="y-footer__tag">{eventInfo.tagline}</p>
          </div>

          <div className="y-footer__nav">
            {FOOTER_NAV.map((column) => (
              <ul key={column.title}>
                <li className="y-footer__nav-head">{column.title}</li>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <hr className="y-footer__divider" />

        <div className="y-footer__bottom">
          <p className="y-footer__company">
            주최 {eventInfo.organizer} · {eventInfo.venue}
          </p>
          <p>
            {eventInfo.contactEmail} · {eventInfo.contactPhone}
          </p>
          <p>© {eventInfo.edition} JEJU SAILING GRAND PRIX. 본 사이트는 데모용으로 제작되었으며 실제 결제는 이루어지지 않습니다.</p>
        </div>
      </div>
    </footer>
  );
}

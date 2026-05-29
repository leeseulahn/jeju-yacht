"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dashboard, Ticket, Users, Logout } from "@/components/yacht/icons";

const LINKS = [
  { href: "/admin", label: "대시보드", icon: Dashboard, exact: true },
  { href: "/admin/orders", label: "예매 주문", icon: Users, exact: false },
  { href: "/admin/tickets", label: "관람권 현황", icon: Ticket, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="y-admin__side">
      <div className="y-admin__brand">
        <span className="y-logo__mark">⛵</span>
        <span style={{ fontSize: 14 }}>
          JSGP
          <small style={{ display: "block", fontSize: 10, color: "#888", letterSpacing: "0.2em" }}>
            ADMIN
          </small>
        </span>
      </div>
      <nav className="y-admin__nav" aria-label="관리자 메뉴">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} data-active={active}>
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
        <button type="button" className="y-admin__nav-logout" onClick={logout}>
          <Logout size={18} />
          로그아웃
        </button>
      </nav>
    </aside>
  );
}

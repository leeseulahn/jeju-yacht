"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Close, ArrowRight } from "@/components/yacht/icons";

const NAV = [
  { href: "/#about", label: "대회 소개" },
  { href: "/#program", label: "경기 일정" },
  { href: "/#course", label: "코스" },
  { href: "/#gallery", label: "갤러리" },
  { href: "/tickets", label: "관람권" },
];

export function YachtHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="y-header" data-scrolled={scrolled}>
      <div className="y-header__inner">
        <Link href="/" className="y-logo" aria-label="제주 세일링 그랑프리 홈">
          <span className="y-logo__mark">⛵</span>
          <span>
            JEJU SAILING
            <small>GRAND PRIX 2026</small>
          </span>
        </Link>

        <nav className="y-nav" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="y-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="y-header__actions">
          <Link href="/tickets" className="y-btn y-btn--primary">
            관람권 예매 <ArrowRight size={18} />
          </Link>
          <button
            type="button"
            className="y-burger"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      <div className="y-mobile-menu" data-open={open}>
        <button type="button" className="y-mobile-close" aria-label="메뉴 닫기" onClick={() => setOpen(false)}>
          <Close />
        </button>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/tickets" className="y-btn y-btn--primary" onClick={() => setOpen(false)}>
          관람권 예매 <ArrowRight size={18} />
        </Link>
      </div>
    </header>
  );
}

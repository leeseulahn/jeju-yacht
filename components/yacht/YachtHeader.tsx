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

const UTILITY = [
  { href: "/#faq", label: "FAQ" },
  { href: "/admin/login", label: "운영자" },
];

export function YachtHeader() {
  const [dark, setDark] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setVisible(true);

    // Toggle the header into dark mode while it overlaps a section
    // flagged with [data-nav-dark]; mirrors FLATTEN's header color logic.
    const update = () => {
      const header = document.querySelector<HTMLElement>(".y-header");
      const headerBottom = window.scrollY + (header?.offsetHeight ?? 0);
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-dark]"),
      );
      let isDark = false;
      for (const section of sections) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (headerBottom >= top && headerBottom < bottom) {
          isDark = true;
          break;
        }
      }
      setDark(isDark);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="y-header"
      data-dark={dark}
      data-visible={visible}
      data-open={open}
    >
      <div className="y-gnav">
        <div className="y-gnav__inner">
          <ul>
            {UTILITY.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="y-lnav">
        <div className="y-lnav__inner">
          <Link href="/" className="y-logo" aria-label="제주 세일링 그랑프리 홈">
            <span className="y-logo__mark">⛵</span>
            <span className="y-logo__text">
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
            <Link href="/tickets" className="y-btn y-btn--primary y-btn--sm">
              관람권 예매 <ArrowRight size={16} />
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
      </div>

      <button
        type="button"
        className="y-mobile-dim"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <div className="y-mobile-menu" data-open={open}>
        <div className="y-mobile-menu__top">
          <span className="y-logo__text y-logo__text--menu">
            JEJU SAILING
            <small>GRAND PRIX 2026</small>
          </span>
          <button
            type="button"
            className="y-mobile-close"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          >
            <Close />
          </button>
        </div>
        <nav className="y-mobile-nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/tickets"
          className="y-btn y-btn--primary y-btn--block"
          onClick={() => setOpen(false)}
        >
          관람권 예매 <ArrowRight size={18} />
        </Link>
      </div>
    </header>
  );
}

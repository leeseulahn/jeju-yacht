"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISIBLE_ATTR = "data-aos-visible";
const HYDRATION_GRACE_MS = 250;

function revealAll() {
  if (typeof document === "undefined") return () => {};

  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-aos]"));
  if (!elements.length) return () => {};

  if (typeof IntersectionObserver === "undefined") {
    elements.forEach((el) => el.setAttribute(VISIBLE_ATTR, "true"));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        const delay = Number(target.getAttribute("data-aos-delay") ?? "0") || 0;
        if (delay > 0) {
          window.setTimeout(() => target.setAttribute(VISIBLE_ATTR, "true"), delay);
        } else {
          target.setAttribute(VISIBLE_ATTR, "true");
        }
        observer.unobserve(target);
      }
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );

  for (const el of elements) {
    if (el.getAttribute(VISIBLE_ATTR) === "true") continue;
    observer.observe(el);
  }
  return () => observer.disconnect();
}

function deferReveal() {
  if (typeof window === "undefined") return () => {};

  let cancelled = false;
  let cleanup: (() => void) | null = null;

  const timer = window.setTimeout(() => {
    if (cancelled) return;
    cleanup = revealAll();
  }, HYDRATION_GRACE_MS);

  return () => {
    cancelled = true;
    window.clearTimeout(timer);
    cleanup?.();
  };
}

export function AosProvider() {
  const pathname = usePathname();

  useEffect(() => {
    return deferReveal();
  }, [pathname]);

  return null;
}

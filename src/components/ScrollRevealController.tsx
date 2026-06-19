"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  "main section",
  "main article",
  'main [class*="shadow-card"]',
].join(",");

const EXCLUDED_SELECTOR = [
  "form",
  "[role='dialog']",
  "[data-scroll-reveal='off']",
].join(",");

export function ScrollRevealController() {
  const pathname = usePathname();

  // Lenis smooth scroll — single instance, lives for the whole session.
  // Dynamic import avoids any SSR module-level browser-API access.
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let destroyed = false;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId = 0;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
      const tick = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  // Scroll reveals — re-run on each route change.
  // Outermost-element filter prevents parent+child double-animation.
  // Above-fold elements get [data-revealed] before [data-reveal-ready] lands
  // on <html>, so the CSS never hides them (no above-fold flash).
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !("IntersectionObserver" in window)) return;

    const all = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    ).filter(
      (el) => !el.matches(EXCLUDED_SELECTOR) && !el.closest(EXCLUDED_SELECTOR)
    );

    const targets = all.filter(
      (el) => !all.some((other) => other !== el && other.contains(el))
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 60px 0px" }
    );

    const vh = window.innerHeight;

    targets.forEach((el) => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((s) =>
            targets.includes(s as HTMLElement)
          )
        : [];
      const delay = Math.min(siblings.indexOf(el), 4) * 80;

      el.dataset.reveal = "";
      if (delay > 0) el.style.setProperty("--reveal-delay", `${delay}ms`);

      if (el.getBoundingClientRect().top < vh) {
        el.dataset.revealed = "";
      } else {
        observer.observe(el);
      }
    });

    document.documentElement.dataset.revealReady = "";

    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.revealReady;
      targets.forEach((el) => {
        delete el.dataset.reveal;
        delete el.dataset.revealed;
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}

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

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const all = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    ).filter(
      (el) => !el.matches(EXCLUDED_SELECTOR) && !el.closest(EXCLUDED_SELECTOR)
    );

    // Keep only the outermost matched elements. Without this, a <section> and
    // every <article> inside it all animate simultaneously — the parent
    // translating up while each child also independently translates up,
    // producing a chaotic double-motion effect.
    const targets = all.filter(
      (el) => !all.some((other) => other !== el && other.contains(el))
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element fully enters the viewport so the
      // animation is already running smoothly when the eye reaches it.
      { threshold: 0.08, rootMargin: "0px 0px 40px 0px" }
    );

    const viewportH = window.innerHeight;

    targets.forEach((el) => {
      // Stagger siblings that share the same parent (e.g. cards in a grid).
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((s) =>
            targets.includes(s as HTMLElement)
          )
        : [];
      const sibIdx = siblings.indexOf(el);
      const delay = Math.min(sibIdx, 4) * 100;

      el.classList.add("scroll-reveal");
      if (delay > 0) el.style.setProperty("--scroll-reveal-delay", `${delay}ms`);

      if (el.getBoundingClientRect().top < viewportH) {
        // Element is already in view. Mark it visible NOW — before
        // scroll-reveal-enabled is added to <html> — so the CSS never
        // hides it and there is no above-fold flash on page load.
        el.classList.add("scroll-reveal-visible");
      } else {
        observer.observe(el);
      }
    });

    // Enable CSS only after above-fold elements already have both classes.
    // Elements with scroll-reveal + scroll-reveal-visible resolve to
    // opacity:1 immediately; off-screen elements resolve to opacity:0
    // but are invisible to the user anyway.
    document.documentElement.classList.add("scroll-reveal-enabled");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-reveal-enabled");
      targets.forEach((el) => {
        el.classList.remove("scroll-reveal", "scroll-reveal-visible");
        el.style.removeProperty("--scroll-reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}

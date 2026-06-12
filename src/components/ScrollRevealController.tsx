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
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      return;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    ).filter((element, index, elements) => {
      if (element.matches(EXCLUDED_SELECTOR) || element.closest(EXCLUDED_SELECTOR)) {
        return false;
      }

      return elements.indexOf(element) === index;
    });

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const initiallyVisible: HTMLElement[] = [];

    targets.forEach((element) => {
      const siblings = element.parentElement
        ? Array.from(element.parentElement.children).filter((sibling) =>
            sibling.matches(REVEAL_SELECTOR),
          )
        : [];
      const siblingIndex = siblings.indexOf(element);
      const delayIndex = siblingIndex >= 0 ? Math.min(siblingIndex, 4) : 0;

      element.classList.add("scroll-reveal");
      element.style.setProperty("--scroll-reveal-delay", `${delayIndex * 70}ms`);

      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        initiallyVisible.push(element);
      } else {
        observer.observe(element);
      }
    });

    document.documentElement.classList.add("scroll-reveal-enabled");
    const initialRevealFrame = window.requestAnimationFrame(() => {
      initiallyVisible.forEach((element) => {
        element.classList.add("scroll-reveal-visible");
      });
    });

    return () => {
      window.cancelAnimationFrame(initialRevealFrame);
      observer.disconnect();
      document.documentElement.classList.remove("scroll-reveal-enabled");
      targets.forEach((element) => {
        element.classList.remove("scroll-reveal", "scroll-reveal-visible");
        element.style.removeProperty("--scroll-reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}

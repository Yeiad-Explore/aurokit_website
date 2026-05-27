"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function applyMagneticEffect(el: HTMLElement, strength = 0.35) {
  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const maxDist = Math.max(rect.width, rect.height) * 1.25;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < maxDist) {
      const pull = 1 - dist / maxDist;
      gsap.to(el, {
        x: dx * strength * pull,
        y: dy * strength * pull,
        duration: 0.45,
        ease: "expo.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1.1, 0.45)",
        overwrite: "auto",
      });
    }
  };

  window.addEventListener("pointermove", onMove, { passive: true });

  return () => {
    window.removeEventListener("pointermove", onMove);
    gsap.killTweensOf(el);
    gsap.set(el, { x: 0, y: 0 });
  };
}

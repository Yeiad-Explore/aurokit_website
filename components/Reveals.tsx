"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Reveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Subtle parallax on any element with [data-parallax]
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        gsap.to(el, {
          yPercent: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return null;
}

"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  as?: "div" | "article" | "section";
  hoverable?: boolean;
  spotlight?: boolean;
  tilt?: boolean;
  tiltStrength?: number;
};

const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  {
    children,
    className = "",
    hoverable = true,
    spotlight = true,
    tilt = true,
    tiltStrength = 5,
    onPointerMove,
    onPointerEnter,
    onPointerLeave,
    ...rest
  },
  ref
) {
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (tilt && innerRef.current) {
      innerRef.current.dataset.tilt = "on";
      gsap.set(innerRef.current, {
        transformPerspective: 1100,
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      });
    }
  }, [tilt]);

  const active = spotlight || tilt;

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (innerRef.current && active && !reducedMotionRef.current) {
      const el = innerRef.current;
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const nx = (clientX - rect.left) / rect.width;
        const ny = (clientY - rect.top) / rect.height;

        el.style.setProperty("--spot-x", `${nx * 100}%`);
        el.style.setProperty("--spot-y", `${ny * 100}%`);

        if (tilt) {
          const ry = (nx - 0.5) * 2 * tiltStrength;
          const rx = (0.5 - ny) * 2 * tiltStrength;
          gsap.to(el, {
            rotationX: rx,
            rotationY: ry,
            y: -4,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    }
    onPointerMove?.(e);
  };

  const handleEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (innerRef.current && active) {
      innerRef.current.dataset.spot = "on";
    }
    onPointerEnter?.(e);
  };

  const handleLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (innerRef.current && active) {
      innerRef.current.dataset.spot = "off";
      if (tilt && !reducedMotionRef.current) {
        gsap.to(innerRef.current, {
          rotationX: 0,
          rotationY: 0,
          y: 0,
          duration: 1.1,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      }
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    onPointerLeave?.(e);
  };

  return (
    <div
      ref={innerRef}
      className={`glass-chromatic ${hoverable ? "" : "pointer-events-none"} ${className}`}
      onPointerMove={active ? handleMove : onPointerMove}
      onPointerEnter={active ? handleEnter : onPointerEnter}
      onPointerLeave={active ? handleLeave : onPointerLeave}
      {...rest}
    >
      {spotlight && <span className="glass-spot" aria-hidden />}
      {tilt && <span className="glass-glare" aria-hidden />}
      {children}
      {spotlight && <span className="glass-spot-edge" aria-hidden />}
    </div>
  );
});

export default GlassCard;

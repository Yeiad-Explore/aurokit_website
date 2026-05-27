"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  as?: "div" | "article" | "section";
  hoverable?: boolean;
  spotlight?: boolean;
};

const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  {
    children,
    className = "",
    hoverable = true,
    spotlight = true,
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

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (spotlight && innerRef.current) {
      const el = innerRef.current;
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spot-x", `${x}%`);
        el.style.setProperty("--spot-y", `${y}%`);
      });
    }
    onPointerMove?.(e);
  };

  const handleEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (spotlight && innerRef.current) {
      innerRef.current.dataset.spot = "on";
    }
    onPointerEnter?.(e);
  };

  const handleLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (spotlight && innerRef.current) {
      innerRef.current.dataset.spot = "off";
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
      onPointerMove={spotlight ? handleMove : onPointerMove}
      onPointerEnter={spotlight ? handleEnter : onPointerEnter}
      onPointerLeave={spotlight ? handleLeave : onPointerLeave}
      {...rest}
    >
      {spotlight && <span className="glass-spot" aria-hidden />}
      {children}
      {spotlight && <span className="glass-spot-edge" aria-hidden />}
    </div>
  );
});

export default GlassCard;

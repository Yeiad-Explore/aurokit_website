"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  as?: "div" | "article" | "section";
  hoverable?: boolean;
};

const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { children, className = "", hoverable = true, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={`glass-chromatic ${hoverable ? "" : "pointer-events-none"} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
});

export default GlassCard;

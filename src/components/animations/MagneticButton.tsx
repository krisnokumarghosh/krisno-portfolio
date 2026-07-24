"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({ children, strength = 0.4, className = "" }: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    // overwrite: "auto" kills only the conflicting properties (x, y) of any
    // tween already running on this target before starting the new one, so
    // fast mouse movement doesn't queue up a backlog of tweens and lag.
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
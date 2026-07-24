"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PHRASES = [
  "Open to work worldwide",
  "Next.js and React Developer",
  "MERN Stack Developer",
  "Frontend Developer",
];

interface RotatingTaglineProps {
  className?: string;
  interval?: number;
}

export default function RotatingTagline({ className = "", interval = 2800 }: RotatingTaglineProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const id = setInterval(() => {
      const tl = gsap.timeline();

      tl.to(el, {
        yPercent: -30,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.35,
        ease: "power2.in",
        overwrite: "auto",
      })
        .call(() => {
          indexRef.current = (indexRef.current + 1) % PHRASES.length;
          el.textContent = PHRASES[indexRef.current];
          gsap.set(el, { yPercent: 30 });
        })
        .to(el, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        });
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span ref={textRef} className="block whitespace-nowrap">
        {PHRASES[0]}
      </span>
    </span>
  );
}
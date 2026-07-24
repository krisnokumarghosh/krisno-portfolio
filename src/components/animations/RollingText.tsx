"use client";

import { useRef } from "react";
import gsap from "gsap";

interface RollingTextProps {
  text: string;
  className?: string;
}

export default function RollingText({ text, className = "" }: RollingTextProps) {
  const topRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bottomRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words = text.split(" ");
  let charIndex = 0;

  const handleEnter = () => {
    gsap.to(topRefs.current, {
      yPercent: -100,
      duration: 0.35,
      ease: "power3.out",
      stagger: 0.02,
    });
    gsap.to(bottomRefs.current, {
      yPercent: -100,
      duration: 0.35,
      ease: "power3.out",
      stagger: 0.02,
    });
  };

  const handleLeave = () => {
    gsap.to(topRefs.current, {
      yPercent: 0,
      duration: 0.35,
      ease: "power3.out",
      stagger: 0.02,
    });
    gsap.to(bottomRefs.current, {
      yPercent: 0,
      duration: 0.35,
      ease: "power3.out",
      stagger: 0.02,
    });
  };

  return (
    <span
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`inline-flex flex-wrap justify-center gap-x-[0.28em] cursor-default ${className}`}
    >
      {words.map((word, wi) => (
        // Each word stays on one line (inline-flex, no wrap inside it);
        // wrapping between words happens on the parent instead.
        <span key={wi} className="inline-flex">
          {word.split("").map((char) => {
            const i = charIndex++;
            return (
              <span key={i} className="relative inline-block overflow-hidden align-top">
                <span
                  ref={(el) => {
                    topRefs.current[i] = el;
                  }}
                  className="block"
                >
                  {char}
                </span>
                <span
                  ref={(el) => {
                    bottomRefs.current[i] = el;
                  }}
                  className="absolute left-0 top-0 block"
                  style={{ transform: "translateY(100%)" }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
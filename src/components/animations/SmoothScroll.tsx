"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // scroll koto "smooth/slow" lagbe — 1 to 1.5 valo range
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease-out
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Lenis-er scroll update-er sathe ScrollTrigger-ke sync kora —
    // eita na korle pin/scrub animation gula lag/desync hoye jabe
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP-r nijer ticker diye Lenis-ke drive kora (rAF conflict avoid korার jonno)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // GSAP-r built-in lag smoothing off kore dao, Lenis nijeই eita handle kore
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
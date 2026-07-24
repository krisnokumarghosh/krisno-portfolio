"use client";

import { useEffect, useRef } from "react";
import { grotesk } from "@/lib/font";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RollingText from "./animations/RollingText";
import MagneticButton from "./animations/MagneticButton";
import RotatingTagline from "./animations/RotatingTagline";
import { FaGithub, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroEl = sectionRef.current;
      const nextEl = heroEl?.nextElementSibling as HTMLElement | null;
      if (!heroEl || !nextEl) return;

      // WhoAmI-r nijer [data-reveal] children ekhane query kore
      // Hero-i eder animation-er full control nibe, WhoAmI-r nijer
      // ScrollTrigger r lagbe na (oita e conflict/flicker hocchilo)
      const revealEls = nextEl.querySelectorAll("[data-reveal]");

      gsap.set(nextEl, {
        position: "relative",
        zIndex: 20,
        marginTop: "-100vh",
        yPercent: 100,
        borderTopLeftRadius: "2.5rem",
        borderTopRightRadius: "2.5rem",
      });

      gsap.set(heroEl, { position: "relative", zIndex: 1 });

      // initial hidden state — ekhon eita Hero-r responsibility
      gsap.set(revealEls, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      tl.to(nextEl, { yPercent: 0, ease: "none" }).to(
        revealEls,
        { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" },
        "-=0.35", // section slide-up shesh howar age-i content fade-in shuru hobe
      );
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const raf = requestAnimationFrame(refresh);

    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#E9E7E1] px-6 py-15 md:py-32 text-center min-h-screen flex flex-col items-center justify-center"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9C7C0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <h1
          className={`${grotesk.className} font-extrabold uppercase tracking-tight text-[#161513] text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95]`}
        >
          <RollingText text="Krisno Kumar Ghosh" />
        </h1>

        <p className="mt-5 md:mt-10 text-[#8A8A85] text-base text-[15px] md:text-xl leading-relaxed max-w-2xl mx-auto">
          Open to job opportunities worldwide. Passionate about building
          polished, intuitive, and thoughtful digital experiences that leave a
          mark.
        </p>
        
          <p className="mt-7 md:mt-10 text-[10px] md:text-[12px] tracking-[0.25em] font-bold text-[#8A8A85] uppercase">
            <RotatingTagline />
          </p>
        

        <div className="mt-7 md:mt-12 flex items-center justify-center gap-6">
          <MagneticButton strength={0.35}>
            <Link
              href="#contact"
              className="rounded-full bg-[#161513] text-[#EDEBE5] text-xs md:text-[16px] font-semibold tracking-wide px-8 py-3.5 hover:bg-[#2a2825] transition-colors"
            >
              <RollingText text="Contact" />
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.35}>
            <Link
              href="/resume.pdf"
              className="rounded-full border border-[#C9C7C0] text-[#8A8A85] text-xs md:text-[16px] font-semibold tracking-wide px-8 py-3.5 hover:border-[#A69C7C] hover:text-[#A69C7C] transition-colors"
            >
              <RollingText text="Resume" />
            </Link>
          </MagneticButton>
        </div>
        
        <div className="mt-10 flex gap-5 justify-center items-center">
          <Link href={"https://github.com/krisnokumarghosh"} className="rounded-full  border border-[#C9C7C0] text-[#8A8A85]  font-semibold    hover:border-[#A69C7C] hover:text-[#A69C7C] p-3 transition-colors">
         <FaGithub />
          </Link>
          <Link href={"https://www.linkedin.com/in/krisno-ghosh/"} className="rounded-full  border border-[#C9C7C0] text-[#8A8A85]  font-semibold    hover:border-[#A69C7C] hover:text-[#A69C7C] p-3 transition-colors">
         <FaLinkedin />
          </Link>
        </div>
      </div>
    </section>
  );
}

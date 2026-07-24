import { grotesk } from "@/lib/font";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#E9E7E1] px-6 py-24 sm:py-32 text-center min-h-screen flex flex-col items-center justify-center">
      {/* subtle dotted background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, #C9C7C0 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative max-w-5xl mx-auto">
        <h1 className= {`${grotesk.className} font-extrabold uppercase tracking-tight text-[#161513] text-4xl sm:text-6xl md:text-8xl leading-[0.95]`}>
          Krisno Kumar Ghosh
        </h1>

        <p className="mt-8 text-[#8A8A85] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
          Open to job opportunities worldwide. Passionate about building polished, intuitive, and thoughtful digital experiences that leave a mark.
        </p>

        <p className="mt-10 text-[12px] tracking-[0.25em] font-medium text-[#8A8A85] uppercase">
          Open to work worldwide
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="#contact" className="rounded-full bg-[#161513] text-[#EDEBE5] text-xs font-semibold tracking-wide px-8 py-3.5 hover:bg-[#2a2825] transition-colors">
            CONTACT
          </Link>
          <Link href="/resume.pdf" className="rounded-full border border-[#C9C7C0] text-[#8A8A85] text-xs font-semibold tracking-wide px-8 py-3.5 hover:border-[#A69C7C] hover:text-[#A69C7C] transition-colors">
            RESUME
          </Link>
        </div>
      </div>

     
    </section>
  );
}
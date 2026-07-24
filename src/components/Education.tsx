"use client";

import { grotesk } from "@/lib/font";
import { LuGraduationCap, LuMapPin, LuCalendar } from "react-icons/lu";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Education() {
  return (
    <section className="relative bg-[#161513] px-6 sm:px-12 py-15 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${grotesk.className} font-extrabold uppercase tracking-tight text-[#EDEBE5] text-4xl sm:text-5xl md:text-6xl leading-[0.95]`}
        >
          Education
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ transformOrigin: "left center" }}
          className="mt-6 h-0.5 w-24 bg-[#A69C7C]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-sm sm:text-base text-[#9A968E] max-w-2xl tracking-wide"
        >
          My academic background and the foundation behind my discipline for learning.
        </motion.p>

        {/* timeline entry */}
        <div className="mt-16 relative">
          {/* vertical line */}
          <div className="absolute left-6.75 top-2 bottom-2 w-px bg-white/10 hidden sm:block" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex flex-col sm:flex-row gap-6 sm:gap-10"
          >
            {/* icon node */}
            <div className="relative z-10 shrink-0">
              <div className="w-14 h-14 rounded-full bg-[#1F1D1A] border border-[#A69C7C]/40 flex items-center justify-center">
                <LuGraduationCap size={22} className="text-[#A69C7C]" />
              </div>
            </div>

            {/* content card */}
            <motion.div
              whileHover={{ y: -3, borderColor: "rgba(166,156,124,0.5)" }}
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 sm:px-8 sm:py-7 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3
                  className={`${grotesk.className} font-bold uppercase tracking-tight text-[#EDEBE5] text-xl sm:text-2xl`}
                >
                  BSc in Soil Science
                </h3>

                <span className="text-[11px] tracking-[0.2em] font-medium uppercase text-[#A69C7C] border border-[#A69C7C]/30 rounded-full px-3 py-1">
                  Ongoing
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#DCD2C3] font-medium mb-4">
                Dhamrai Govt. College
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5 text-xs sm:text-sm text-[#9A968E]">
                <span className="flex items-center gap-1.5">
                  <LuCalendar size={14} className="text-[#A69C7C]" />
                  Session: 2024 – 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <LuMapPin size={14} className="text-[#A69C7C]" />
                  Dhamrai, Dhaka, Bangladesh
                </span>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[#9A968E]">
                Currently pursuing a Bachelor of Science in Soil Science, building a strong foundation in
                analytical thinking, research methodology, and data-driven problem solving. This scientific
                background complements my approach to software developmen— applying the same structured,
                evidence-based mindset to writing clean code and designing reliable systems.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
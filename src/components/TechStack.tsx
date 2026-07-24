"use client";

import { grotesk } from "@/lib/font";
import {
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiFigma,
  SiGreensock,
  SiFramer,
} from "react-icons/si";
import { LuShieldCheck, LuLayoutPanelLeft } from "react-icons/lu";
import { motion, type Variants } from "framer-motion";

type TechItem = {
  name: string;
  icon: React.ElementType;
  color: string;
};

type Category = {
  label: string;
  items: TechItem[];
};

const CATEGORIES: Category[] = [
  {
    label: "FRONTEND",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#EDEBE5" },
      { name: "HeroUI", icon: LuLayoutPanelLeft, color: "#A69C7C" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
      { name: "Framer Motion", icon: SiFramer, color: "#EDEBE5" },
       { name: "Better Auth", icon: LuShieldCheck, color: "#A69C7C" },
    ],
  },
  {
    label: "BACKEND",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#EDEBE5" },
     
    ],
  },
  {
    label: "DATABASE",
    items: [{ name: "MongoDB", icon: SiMongodb, color: "#47A248" }],
  },
  {
    label: "TOOLS",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Figma", icon: SiFigma, color: "#A259FF" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TechStack() {
  return (
    <section className="relative bg-[#161513] px-6 sm:px-12 pb-15 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${grotesk.className} font-extrabold uppercase tracking-tight text-[#EDEBE5] text-4xl sm:text-5xl md:text-6xl leading-[0.95]`}
        >
          My Tech Stack
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
            delay: 0.2,
          }}
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
          A selection of technologies I use to design, build, and deploy
          full-stack web applications.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 space-y-14"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.label}
              variants={rowVariants}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 items-start"
            >
              <h3
                className={`${grotesk.className} font-bold uppercase tracking-tight text-[#DCD2C3] text-xl sm:text-2xl`}
              >
                {category.label}
              </h3>

              <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-wrap gap-x-8 gap-y-5"
              >
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      whileHover={{
                        y: -3,
                        borderColor: "rgba(166,156,124,0.5)",
                      }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition-colors"
                    >
                      <Icon size={18} style={{ color: item.color }} />
                      <span className="text-sm text-[#9A968E] whitespace-nowrap">
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

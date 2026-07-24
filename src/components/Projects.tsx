"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { grotesk } from "@/lib/font";
import { motion, type Variants } from "framer-motion";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";

type TechStack = {
  Frontend: string[];
  Backend: string[];
  Database: string[];
};

type Project = {
  id: string;
  name: string;
  description: string;
  techStack: TechStack;
  liveLink: string;
  githubRepo: string;
  image: string;
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://krisno-portfolio.vercel.app/data.json")
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="relative bg-[#161513] px-6 sm:px-12 py-15 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${grotesk.className} font-extrabold uppercase tracking-tight text-[#EDEBE5] text-4xl sm:text-5xl md:text-6xl leading-[0.95]`}
        >
          Projects
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
          A selection of full-stack applications I&apos;ve designed, built, and
          shipped end-to-end.
        </motion.p>

        {loading ? (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-2/3 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-3/4 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => {
              const allTech = [
                ...project.techStack.Frontend,
                ...project.techStack.Backend,
                ...project.techStack.Database,
              ];

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#A69C7C]/40 transition-colors duration-300 flex flex-col"
                >
                  {/* image */}
                  <div className="relative aspect-video overflow-hidden bg-[#1F1D1A]">
                    <Image
                      src={`${project.image}.png`}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#161513] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* content */}
                  <div className="flex flex-col flex-1 p-6 sm:p-7">
                    <h3
                      className={`${grotesk.className} font-bold uppercase tracking-tight text-[#EDEBE5] text-xl`}
                    >
                      {project.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#9A968E] leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* tech badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {allTech.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] tracking-wide text-[#DCD2C3] border border-white/10 rounded-full px-2.5 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* buttons */}
                    <div className="mt-6 flex items-center gap-3">
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#EDEBE5] text-[#161513] text-xs font-semibold tracking-wide px-5 py-2.5 hover:bg-white transition-colors"
                      >
                        LIVE
                        <LuArrowUpRight size={14} />
                      </Link>
                      <Link
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 text-[#9A968E] text-xs font-semibold tracking-wide px-5 py-2.5 hover:border-[#A69C7C] hover:text-[#A69C7C] transition-colors"
                      >
                        REPO
                        <LuGithub size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

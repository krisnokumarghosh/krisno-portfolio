"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { grotesk } from "@/lib/font";
import { motion, type Variants } from "framer-motion";
import { LuArrowUp } from "react-icons/lu";

const MENU_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/krisno-ghosh/"},
  { label: "INSTAGRAM", href: "https://www.instagram.com/_krishnoexists/" },
  { label: "GITHUB", href: "https://github.com/krisnokumarghosh" },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Dhaka",
      }).format(new Date());
      setTime(`${formatted} BDT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#E9E7E1] px-6 sm:px-12 pt-20 pb-10 overflow-hidden">
      {/* top center dot marker — matches hero/section pattern */}
      

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8"
      >
        {/* Menu */}
        <motion.div variants={colVariants}>
          <h3 className={`${grotesk.className} font-bold text-[#161513] text-lg mb-5`}>
            Menu
          </h3>
          <ul className="space-y-3">
            {MENU_LINKS.map((link) => (
              <motion.li key={link.label} variants={linkVariants}>
                <Link
                  href={link.href}
                  className="text-xs md:text-[16px] tracking-wide font-medium text-[#8A8A85] hover:text-[#A69C7C] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div variants={colVariants}>
          <h3 className={`${grotesk.className} font-bold text-[#161513] text-lg mb-5`}>
            Socials
          </h3>
          <ul className="space-y-3">
            {SOCIAL_LINKS.map((link) => (
              <motion.li key={link.label} variants={linkVariants}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-[16px] tracking-wide font-medium text-[#A69C7C] hover:text-[#8A6A3E] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Local Time */}
        <motion.div variants={colVariants}>
          <h3 className={`${grotesk.className} font-bold text-[#161513] text-lg mb-5`}>
            Local Time
          </h3>
          <motion.p
            key={time}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-[16px] tracking-wide font-medium text-[#8A8A85] tabular-nums"
          >
            {time}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        whileHover={{ scale: 1.08, backgroundColor: "#DCD2C3" }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Scroll to top"
        className="absolute bottom-10 right-6 sm:right-12 w-11 h-11 rounded-full bg-[#DCD2C3]/60 flex items-center justify-center text-[#161513]"
      >
        <LuArrowUp size={18} />
      </motion.button>

     
    </footer>
  );
}
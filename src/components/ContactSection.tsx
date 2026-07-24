"use client";

import { useRef, useState, FormEvent } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { TextArea } from "@heroui/react";
import { grotesk } from "@/lib/font";

/**
 * Contact Section
 * ----------------
 * Matches the Hero's light theme:
 *  - Section background: #E9E7E1 (same as Hero)
 *  - Heading text: #161513 (same as Hero h1)
 *  - Body / subtext: #8A8A85 (same as Hero paragraph)
 *  - Pill outline / borders: #C9C7C0
 *  - Filled button: #161513 bg, hover #2a2825 (same as Hero's "Contact" button)
 *  - Outline hover accent: #A69C7C (same as Hero's "Resume" button)
 *  - Dot-grid backdrop: #C9C7C0 radial dots, same pattern as Hero
 *
 * Stack assumed: Next.js (TS) + Tailwind. Swap the <input>/<textarea>
 * elements for HeroUI's <Input>/<Textarea> if you want HeroUI's own
 * styling — the layout, motion and validation logic stay identical.
 */

const MIN_MESSAGE_LENGTH = 30;

const EMAIL = "krishnokumarghosh112@gmail.com";
const PHONE: string = "01929999831"; // TODO: add your number here, e.g. "+880 1XXX-XXXXXX"

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: EASE_OUT },
  }),
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const messageLen = form.message.trim().length;
  const canSubmit =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    messageLen >= MIN_MESSAGE_LENGTH &&
    status !== "submitting";

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    try {
      // Replace with your actual endpoint / API route / email service call.
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      await new Promise((res) => setTimeout(res, 1200));
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#E9E7E1] px-6 py-20 sm:px-10 md:py-32"
    >
      {/* dot-grid backdrop, same pattern as Hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9C7C0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <h2 className={`${grotesk.className} font-extrabold uppercase tracking-tight text-[#161513] text-4xl sm:text-5xl md:text-6xl leading-[0.95]`}>
            Contact
          </h2>
          <motion.span
            className="mt-5 block h-0.75 w-16 origin-left bg-[#161513]"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          />
          <p className="mt-8 text-sm sm:text-base text-[#8A8A85] max-w-2xl tracking-wide">
            Have a project in mind or just want to say hello? Feel free to reach
            out.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          className="mt-12 rounded-2xl border border-[#C9C7C0] bg-[#161513] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6">
            {/* Name */}
            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#E9E7E1]"
              >
                Your Name <span className="text-[#A6675A]">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-[#E9E7E1] placeholder:text-[#9E9E98] outline-none transition-colors duration-200 focus:border-[#C9C7C0]"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#E9E7E1]"
              >
                Your Email <span className="text-[#A6675A]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
               className="w-full rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-[#E9E7E1] placeholder:text-[#9E9E98] outline-none transition-colors duration-200 focus:border-[#C9C7C0]"
              />
            </motion.div>

            {/* Phone (optional) */}
            <motion.div
              custom={2}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#E9E7E1]"
              >
                Phone Number{" "}
                <span className="text-xs font-normal text-[#9E9E98]">
                  (optional)
                </span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-[#E9E7E1] placeholder:text-[#9E9E98] outline-none transition-colors duration-200 focus:border-[#C9C7C0]"
              />
            </motion.div>

            {/* Message */}
            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-[#E9E7E1]"
              >
                Message <span className="text-[#A6675A]">*</span>
              </label>
              <TextArea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                className="w-full resize-none rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-[#E9E7E1] placeholder:text-[#9E9E98] outline-none transition-colors duration-200 focus:border-[#C9C7C0]"
              />
             
            </motion.div>

            {/* Submit */}
            <motion.div
              custom={4}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mt-1"
            >
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.03 } : {}}
                whileTap={canSubmit ? { scale: 0.97 } : {}}
                className="relative overflow-hidden rounded-full bg-[#EDEBE5] text-[#161513] px-7 py-3.5 text-xs font-semibold uppercase tracking-wide hover:bg-white transition-colors duration-200  "
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "submitting" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="block"
                    >
                      Sending...
                    </motion.span>
                  ) : status === "success" ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="block"
                    >
                      Message Sent ✓
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="block"
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </motion.form>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#9E9E98]">
            Or reach out directly
          </p>

          <motion.p
            
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
            
            className="mt-4 block wrap-break-word font-sans text-3xl font-extrabold uppercase tracking-tight text-[#161513] transition-colors duration-300 hover:text-[#A69C7C] sm:text-5xl"
          >
            {EMAIL}
          </motion.p>

          {PHONE && (
            <motion.p
             
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-3 block md:text-xl text-[#8A8A85] transition-colors duration-300 hover:text-[#161513]"
            >
              {PHONE}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

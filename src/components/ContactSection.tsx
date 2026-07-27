"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import { grotesk } from "@/lib/font";
import { errorToast, successToast } from "@/lib/toasts";

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
 */

const EMAIL = "krishnokumarghosh112@gmail.com";
const PHONE: string = "01929999831"; // TODO: add your number here, e.g. "+880 1XXX-XXXXXX"

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  const [isSending, setIsSending] = useState(false);

  const handleEmailCopy = () => {
     navigator.clipboard.writeText("krishnokumarghosh112@gmail.com");
     successToast("Email copied to clipboard!");
  }
  const handlePhoneCopy = () => {
     navigator.clipboard.writeText("01929999831");
     successToast("Email copied to clipboard!");
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSending(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");
      successToast("Thanks for reaching out — I'll get back to you soon.");
      form.reset();
    } catch (err) {
      console.error(err);
      errorToast(
        "Something went wrong. Please try again or email me directly.",
      );
    } finally {
      setIsSending(false);
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
          <h2
            className={`${grotesk.className} font-extrabold uppercase tracking-tight text-[#161513] text-4xl sm:text-5xl md:text-6xl leading-[0.95]`}
          >
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
              <TextField isRequired name="name" type="text">
                <Label className="mb-2 block text-sm font-medium text-[#E9E7E1]">
                  Your Name
                </Label>
                <Input
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-[#E9E7E1] placeholder:text-[#9E9E98] outline-none transition-colors duration-200 focus:border-[#C9C7C0]"
                />
              </TextField>
            </motion.div>

            {/* Email */}
            <motion.div
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="mb-2 block text-sm font-medium text-[#E9E7E1]">
                  Your Email
                </Label>
                <Input
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-[#E9E7E1] placeholder:text-[#9E9E98] outline-none transition-colors duration-200 focus:border-[#C9C7C0]"
                />
              </TextField>
            </motion.div>

            {/* Message */}
            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <TextField isRequired type="text" name="message">
                <Label className="mb-2 block text-sm font-medium text-[#E9E7E1]">
                  Message
                </Label>
                <TextArea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-[#E9E7E1] placeholder:text-[#9E9E98] outline-none transition-colors duration-200 focus:border-[#C9C7C0]"
                />
              </TextField>
            </motion.div>

            {/* Submit */}
            <motion.div
              custom={4}
              variants={fieldVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mt-1"
            >
              <Button
                type="submit"
                isDisabled={isSending}
                className="relative overflow-hidden rounded-full bg-[#EDEBE5] text-[#161513] px-7 py-3.5 text-xs font-semibold uppercase tracking-wide hover:bg-white transition-colors duration-200"
              >
                {isSending ? "Sending..." : "Send Message"}
              </Button>
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
            onClick={handleEmailCopy}
            className="mt-4 block wrap-break-word font-sans text-3xl font-extrabold  tracking-tight text-[#161513] transition-colors duration-300 hover:text-[#A69C7C] sm:text-5xl"
          >
            {EMAIL}
          </motion.p>

          {PHONE && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              onClick={handlePhoneCopy}
              className="mt-6 block md:text-xl text-[#8A8A85] transition-colors duration-300 hover:text-[#161513]"
            >
              {PHONE}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

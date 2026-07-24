"use client";

import Image from "next/image";
import { grotesk } from "@/lib/font";

const PARAGRAPHS = [
  "I am a MERN Stack Developer with a strong focus on building modern, responsive, and high-performance web applications using Next.js, React, Node.js, Express.js, and MongoDB. I enjoy transforming ideas into clean, intuitive, and scalable digital experiences while following best practices in frontend and backend development. I have experience working with TypeScript, Tailwind CSS, authentication, REST APIs, and MongoDB. As a fresher, I am committed to continuous learning, improving my problem-solving skills, and building projects that reflect real-world development practices. I am currently looking for Frontend or MERN Stack Developer opportunities where I can contribute, learn from experienced developers, and grow as a software engineer."
];

export default function WhoAmI() {
  return (
    <section id="about" className="relative bg-[#161513] px-6 sm:px-12 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 data-reveal="heading" className={`${grotesk.className} font-extrabold uppercase tracking-tight text-[#EDEBE5] text-5xl sm:text-6xl md:text-7xl leading-[0.95]`}>
          Who am I
        </h2>

        <div data-reveal="underline" className="mt-6 h-0.5 w-24 bg-[#A69C7C]" />

        <p data-reveal="tagline" className="mt-8 text-sm sm:text-base text-[#9A968E] max-w-2xl tracking-wide">
          I&apos;m a MERN Stack Developer with hands-on experience building full-stack web applications from concept to deployment.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12 md:gap-16 items-start">
          <div data-reveal="image" className="relative w-full max-w-sm mx-auto md:mx-0 aspect-4/5 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/images/IMG_me3.png"
              alt="Krisno Kumar Ghosh"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 380px, 90vw"
            />
          </div>

          <div>
            <p data-reveal="label" className="text-[11px] tracking-[0.3em] font-medium text-[#A69C7C] uppercase">
              (About me)
            </p>

            <div className="relative mt-6 space-y-6">
              {PARAGRAPHS.map((text, i) => (
                <p key={i} data-reveal="paragraph" className="text-sm sm:text-base leading-relaxed text-[#9A968E]">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
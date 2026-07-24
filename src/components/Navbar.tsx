"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Person,
  Gear,
  Briefcase,
  Envelope,
} from "@gravity-ui/icons";
import { grotesk } from "@/lib/font";
import RollingText from "./animations/RollingText";
import RollingText2 from "./animations/RollingText2";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about", icon: Person },
  { label: "SERVICES", href: "#services", icon: Gear },
  { label: "WORK", href: "#work", icon: Briefcase },
  { label: "CONTACT", href: "#contact", icon: Envelope },
];

export default function SiteNavbar() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop / tablet top bar — floats over the page, doesn't add to document height */}
      <header className="absolute top-0 inset-x-0 z-50 bg-transparent px-6 sm:px-12">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between h-16">
          <Link
            href="/"
            className= {`${grotesk.className} text-xl tracking-wide text-[#A69C7C] hover:text-[#8f8567] transition-colors`}
          >
            Krisno.
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-[0.15em] font-bold text-[#8A8A85] hover:text-[#A69C7C] transition-colors"
                
              >
                 <RollingText2 text={item.label}/>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile floating glass capsule nav */}
      {/* <nav
        className="sm:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm rounded-full border border-white/40 bg-[#E9E7E1]/50 backdrop-blur-xl shadow-[0_8px_30px_rgba(22,21,19,0.12)] px-2 py-2"
        aria-label="Primary"
      >
        <ul className="flex items-center justify-between">
          {NAV_LINKS.map((item, i) => {
            const Icon = item.icon;
            const isActive = active === i;
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  onClick={() => setActive(i)}
                  className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-full transition-colors ${
                    isActive ? "bg-white/50" : ""
                  }`}
                >
                  <Icon
                    width={18}
                    height={18}
                    className={
                      isActive ? "text-[#161513]" : "text-[#8A8A85]"
                    }
                  />
                  <span
                    className={`text-[9px] tracking-wide ${
                      isActive
                        ? "text-[#161513] font-semibold"
                        : "text-[#8A8A85] font-medium"
                    }`}
                  >
                    {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav> */}
    </>
  );
}
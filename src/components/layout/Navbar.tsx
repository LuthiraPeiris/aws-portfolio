"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Volunteering", href: "/volunteering" },
    { name: "Articles", href: "/articles" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-white/70 bg-white/75 px-4 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-slate-900 to-slate-700 text-sm font-bold text-white shadow-sm">
              LP
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">
                {siteConfig.name}
              </p>
              <p className="text-xs text-slate-500">{siteConfig.role}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 transition hover:-translate-y-0.5 hover:scale-110 hover:text-slate-900"
            >
              <FaLinkedin size={17} />
            </a>

            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 transition hover:-translate-y-0.5 hover:scale-110 hover:text-slate-900"
            >
              <FaGithub size={17} />
            </a>

            <a
              href={siteConfig.social.medium}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 transition hover:-translate-y-0.5 hover:scale-110 hover:text-slate-900"
            >
              <FaMedium size={17} />
            </a>

            <a
              href={siteConfig.social.sitescraftsolutions}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SitesCraftSolutions"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 transition hover:-translate-y-0.5 hover:scale-110 hover:text-slate-900"
            >
              <Image
                src="/icons/sitescraftsolutions.png"
                alt="SitesCraftSolutions"
                width={17}
                height={17}
                className="object-contain"
              />
            </a>
          </div>

          <button
  onClick={() => setOpen(!open)}
  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
  aria-label="Toggle menu"
  aria-expanded={open}
  aria-controls="mobile-navigation"
>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div id="mobile-navigation" className="mt-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
              >
                <FaLinkedin size={17} />
              </a>

              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
              >
                <FaGithub size={17} />
              </a>

              <a
                href={siteConfig.social.medium}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
              >
                <FaMedium size={17} />
              </a>

              <a
                href={siteConfig.social.sitescraftsolutions}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SitesCraftSolutions"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
              >
                <Image
                  src="/icons/sitescraftsolutions.png"
                  alt="SitesCraftSolutions"
                  width={17}
                  height={17}
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
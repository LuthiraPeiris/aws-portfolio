import Image from "next/image";
import { siteConfig } from "@/data/site";
import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
      <div className="container-custom flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm font-medium text-slate-900">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {siteConfig.role}
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-900 hover:scale-110 transition"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-900 hover:scale-110 transition"
          >
            <FaGithub size={18} />
          </a>

          <a
            href={siteConfig.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-900 hover:scale-110 transition"
          >
            <FaMedium size={18} />
          </a>

          <a
            href={siteConfig.social.sitescraftsolutions}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SitesCraftSolutions"
            className="p-2 text-slate-600 hover:text-slate-900 hover:scale-110 transition"
          >
            <Image
              src="/icons/sitescraftsolutions.png"
              alt="SitesCraftSolutions"
              width={18}
              height={18}
              className="object-contain"
            />
          </a>
        </div>

      </div>
    </footer>
  );
}
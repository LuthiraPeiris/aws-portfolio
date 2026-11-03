"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  Download,
  Code2,
  Cpu,
  Cloud,
  Database,
  BrainCircuit,
  Server,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { SitesCraftSolutionsPopup } from "@/components/ui/SitesCraftSolutionsPopup";

function InfinityIcon({
  icon: Icon,
  progress,
  offset = 0,
}: {
  icon: React.ElementType;
  progress: MotionValue<number>;
  offset?: number;
}) {
  const x = useTransform(progress, (v) => {
    const loop = (v + offset) % 1;
    const angle = loop * Math.PI * 2;
    return Math.sin(angle) * 260;
  });

  const y = useTransform(progress, (v) => {
    const loop = (v + offset) % 1;
    const angle = loop * Math.PI * 2;
    return Math.sin(angle * 2) * 95;
  });

  const scale = useTransform(progress, (v) => {
    const loop = (v + offset) % 1;
    const angle = loop * Math.PI * 2;
    return 0.85 + ((Math.cos(angle) + 1) / 2) * 0.35;
  });

  const opacity = useTransform(progress, (v) => {
    const loop = (v + offset) % 1;
    const angle = loop * Math.PI * 2;
    return 0.35 + ((Math.cos(angle) + 1) / 2) * 0.65;
  });

  const zIndex = useTransform(progress, (v) => {
    const loop = (v + offset) % 1;
    const angle = loop * Math.PI * 2;
    return Math.cos(angle) > 0 ? 30 : 0;
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className="pointer-events-none absolute left-1/2 top-1/2 hidden md:block"
    >
      <div className="flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur-md">
        <Icon className="h-5 w-5" />
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const roles = [
    "Aspiring DevOps Engineer",
    "Cloud & CI/CD Enthusiast",
    "Full-Stack Developer",
    "IoT & Automation Builder",
  ];

  const techIcons = [Code2, Cpu, Cloud, Database, BrainCircuit, Server];

  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const orbitProgress = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const controls = animate(orbitProgress, 1, {
      duration: 16,
      repeat: Infinity,
      ease: "linear",
    });

    return () => controls.stop();
  }, [mounted, orbitProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="section relative overflow-hidden">
      <SitesCraftSolutionsPopup />
      {/* subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute left-[20%] top-1/3 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute right-[18%] top-1/4 h-52 w-52 rounded-full bg-slate-200/30 blur-3xl" />
      </div>

      <div className="container-custom flex min-h-[72vh] items-center justify-center">
        <div className="relative w-full max-w-5xl">
          {/* animation only renders after client mount */}
          {mounted && (
            <>
              {/* infinity loop guide lines */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-47.5 w-140 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-slate-200/60 md:block"
                style={{ rotate: 18 }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-47.5 w-140 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-slate-200/60 md:block"
                style={{ rotate: -18 }}
              />

              {/* infinity moving tech icons */}
              {techIcons.map((Icon, index) => (
                <InfinityIcon
                  key={index}
                  icon={Icon}
                  progress={orbitProgress}
                  offset={index / techIcons.length}
                />
              ))}
            </>
          )}

          {/* center content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 mx-auto max-w-4xl text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
            >
              {siteConfig.name}
            </motion.h1>

            <div className="mt-4 min-h-10 md:min-h-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="text-xl font-semibold text-slate-800 md:text-2xl"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-10 flex justify-center"
            >
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
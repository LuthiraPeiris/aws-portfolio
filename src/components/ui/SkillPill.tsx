"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export function SkillPill({ children }: Props) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm"
    >
      {children}
    </motion.div>
  );
}
"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";

export function SitesCraftSolutionsPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show popup 3 seconds after the page loads
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="relative w-full max-w-5xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close advertisement"
              className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white text-slate-700 shadow-xl transition hover:scale-105 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Only the advertisement image is clickable */}
            <a
              href={siteConfig.social.sitescraftsolutions}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SitesCraftSolutions"
              className="block overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/sitescraftsolutions-ad.webp"
                alt="SitesCraftSolutions advertisement"
                width={1600}
                height={900}
                priority
                className="h-auto w-full object-contain transition duration-300 hover:scale-[1.01]"
              />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
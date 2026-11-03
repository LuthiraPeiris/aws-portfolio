"use client";

import { useState } from "react";
import { volunteeringActivities } from "@/data/volunteering";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryState = {
  images: string[];
  index: number;
  title: string;
} | null;

export function VolunteeringSection() {
  const [gallery, setGallery] = useState<GalleryState>(null);

  const openGallery = (images: string[], index: number, title: string) => {
    setGallery({ images, index, title });
  };

  const closeGallery = () => {
    setGallery(null);
  };

  const showPrev = () => {
    if (!gallery) return;
    setGallery({
      ...gallery,
      index:
        gallery.index === 0 ? gallery.images.length - 1 : gallery.index - 1,
    });
  };

  const showNext = () => {
    if (!gallery) return;
    setGallery({
      ...gallery,
      index:
        gallery.index === gallery.images.length - 1 ? 0 : gallery.index + 1,
    });
  };

  // ✅ Added sorting logic (descending by numeric id)
  const sortedActivities = [...volunteeringActivities].sort((a, b) => {
    const idA = parseInt(String(a.id).replace(/\D/g, ""), 10);
    const idB = parseInt(String(b.id).replace(/\D/g, ""), 10);
    return idB - idA;
  });

  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Volunteering"
          title="Community and leadership"
          description="Activities and contributions beyond projects that reflect teamwork, leadership, and community involvement."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedActivities.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="bg-slate-100 p-3">
                <button
                  type="button"
                  onClick={() => openGallery(item.images, 0, item.title)}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                    />

                    {item.images.length > 1 && (
                      <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur">
                        {item.images.length}+
                      </div>
                    )}
                  </div>
                </button>
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {item.organization}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  {item.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {gallery && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <div
                className="relative w-full max-w-5xl rounded-3xl bg-white p-4 shadow-[0_25px_80px_rgba(15,23,42,0.25)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeGallery}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:scale-110"
                  aria-label="Close image preview"
                >
                  <X size={18} />
                </button>

                {gallery.images.length > 1 && (
                  <>
                    <button
                      onClick={showPrev}
                      className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={showNext}
                      className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={gallery.images[gallery.index]}
                    alt={`${gallery.title} ${gallery.index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {gallery.images.length > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {gallery.images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setGallery({
                            ...gallery,
                            index,
                          })
                        }
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          gallery.index === index
                            ? "bg-slate-900"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
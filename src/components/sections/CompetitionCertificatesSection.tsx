"use client";

import { useEffect, useState } from "react";
import { competitionCertificates } from "@/data/certificates";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";

export function CompetitionCertificatesSection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const initialCount = 6;

  const sortedCertificates = [...competitionCertificates].sort((a, b) => {
    const idA = parseInt(String(a.id).replace(/\D/g, ""), 10);
    const idB = parseInt(String(b.id).replace(/\D/g, ""), 10);
    return idB - idA;
  });

  const visible = showAll
    ? sortedCertificates
    : sortedCertificates.slice(0, initialCount);

  const hasMore = sortedCertificates.length > initialCount;

  const openGallery = (images: string[], index = 0) => {
    if (!images.length) return;
    setSelectedImages(images);
    setSelectedIndex(index);
  };

  const closeGallery = () => {
    setSelectedImages(null);
    setSelectedIndex(0);
  };

  const showPrev = () => {
    if (!selectedImages?.length) return;
    setSelectedIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    if (!selectedImages?.length) return;
    setSelectedIndex((prev) =>
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImages) return;

      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImages]);

  return (
    <>
      <section className="section">
        <div className="container-custom">
          <SectionTitle
            eyebrow="Competitions"
            title="Competition certificates"
            description="Certificates from competitions I've participated in, showcasing my achievements and skills in various domains."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => {
              const previewImage = item.images[0];

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div
                    className="relative aspect-3/2 w-full cursor-pointer overflow-hidden rounded-xl bg-slate-100"
                    onClick={() => openGallery(item.images, 0)}
                  >
                    <img
                      src={previewImage}
                      alt="Competition Certificate"
                      className="h-full w-full object-contain transition duration-300"
                    />

                    <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-slate-900/80 via-slate-900/35 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                      <p className="text-sm leading-6 text-white">
                        {item.description}
                      </p>
                    </div>

                    {item.images.length > 1 && (
                      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-slate-900/75 px-3 py-1 text-xs font-medium text-white">
                        +{item.images.length - 1} more
                      </div>
                    )}
                  </div>

                  <div className="px-1 pt-4 pb-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900"
              >
                {showAll ? "Show Less" : "See More"}
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImages && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGallery}
                className="absolute right-0 top-0 z-20 -translate-y-12 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                ✕
              </button>

              <div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-2xl">
                <div className="relative flex items-center justify-center rounded-xl bg-slate-100">
                  <img
                    src={selectedImages[selectedIndex]}
                    alt={`Certificate ${selectedIndex + 1}`}
                    className="max-h-[75vh] w-full object-contain"
                  />

                  {selectedImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/75 px-3 py-2 text-white transition hover:bg-slate-900"
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        onClick={showNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/75 px-3 py-2 text-white transition hover:bg-slate-900"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {selectedImages.length > 1 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {selectedImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`overflow-hidden rounded-lg border ${
                          selectedIndex === index
                            ? "border-slate-900"
                            : "border-slate-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-16 w-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {selectedImages.length > 1 && (
                  <div className="mt-3 text-center text-sm text-slate-600">
                    {selectedIndex + 1} / {selectedImages.length}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
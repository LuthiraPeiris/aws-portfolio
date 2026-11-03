"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [project]);

  const images =
    project?.images && project.images.length > 0
      ? project.images
      : project
      ? [project.image]
      : [];

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (images.length <= 1) return;

      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }

      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, images, onClose]);

  if (!project) {
    return null;
  }

  const showPrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-[0_25px_80px_rgba(15,23,42,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:scale-110"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="grid lg:grid-cols-2">
                <div className="relative bg-slate-100 lg:min-h-full">
                  <div className="relative aspect-3/2">
                    <img
                      src={images[selectedImageIndex]}
                      alt={`${project.title} preview ${selectedImageIndex + 1}`}
                      className="h-full w-full object-contain"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPrevImage}
                          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/75 px-3 py-2 text-white transition hover:bg-slate-900"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>

                        <button
                          type="button"
                          onClick={showNextImage}
                          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/75 px-3 py-2 text-white transition hover:bg-slate-900"
                          aria-label="Next image"
                        >
                          ›
                        </button>

                        <div className="absolute bottom-4 right-4 rounded-full bg-slate-900/75 px-3 py-1 text-xs font-medium text-white">
                          {selectedImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div className="flex flex-wrap gap-2 p-4">
                      {images.map((img, index) => (
                        <button
                          key={`${img}-${index}`}
                          type="button"
                          onClick={() => setSelectedImageIndex(index)}
                          className={`overflow-hidden rounded-xl border ${
                            selectedImageIndex === index
                              ? "border-slate-900"
                              : "border-slate-200"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${project.title} thumbnail ${index + 1}`}
                            className="h-16 w-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {project.category}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                    {project.title}
                  </h2>

                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {project.fullDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      GitHub
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
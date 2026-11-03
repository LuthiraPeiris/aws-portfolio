"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

type Props = {
  project: Project;
  onClick?: (project: Project) => void;
};

export function ProjectCard({ project, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onClick?.(project)}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-sm transition-all duration-300 group-hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
        {/* Image */}
        <div className="relative aspect-3/2 w-full overflow-hidden bg-slate-100">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-slate-900/0 transition duration-300 group-hover:bg-slate-900/3" />

          <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm font-medium text-slate-500">
              Click to view details
            </span>

            <span className="inline-flex items-center text-sm font-semibold text-slate-800 transition-transform duration-300 group-hover:translate-x-1">
              View Project →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
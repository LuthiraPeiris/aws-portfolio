"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechStacksSection } from "@/components/sections/TechStacksSection";
import { SelectedProjectsSection } from "@/components/sections/SelectedProjectsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { CompetitionCertificatesSection } from "@/components/sections/CompetitionCertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Project } from "@/data/projects";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "competitions", label: "Competitions" },
  { id: "contact", label: "Contact" },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SectionProgress activeSection={activeSection} />

      <div id="hero">
        <HeroSection />
      </div>

      <div id="tech-stack">
        <TechStacksSection />
      </div>

      <div id="projects">
        <SelectedProjectsSection onProjectClick={setSelectedProject} />
      </div>

      <div id="certifications">
        <CertificationsSection />
      </div>

      <div id="competitions">
        <CompetitionCertificatesSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

function SectionProgress({ activeSection }: { activeSection: string }) {
  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-px bg-linear-to-b from-transparent to-slate-300" />

        {sections.map((section, index) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="group pointer-events-auto relative flex h-5 w-5 items-center justify-center"
              aria-label={`Go to ${section.label} section`}
            >
              <span
                className={
                  isActive
                    ? "absolute h-5 w-5 rounded-full border border-slate-900/20 bg-slate-900/10 transition-all duration-300"
                    : "absolute h-5 w-5 rounded-full border border-transparent transition-all duration-300"
                }
              />

              <span
                className={
                  isActive
                    ? "h-2.5 w-2.5 rounded-full bg-slate-900 transition-all duration-300"
                    : "h-2 w-2 rounded-full bg-slate-300 transition-all duration-300 group-hover:bg-slate-500"
                }
              />

              <span className="absolute right-7 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 opacity-0 shadow-sm transition duration-200 group-hover:opacity-100">
                {String(index + 1).padStart(2, "0")} / {section.label}
              </span>
            </button>
          );
        })}

        <span className="h-8 w-px bg-linear-to-b from-slate-300 to-transparent" />
      </div>
    </div>
  );
}
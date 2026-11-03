"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

export function ProjectsGridSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allProjects = projects.filter((project) => project.showInAll);

  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Projects"
          title="All projects"
          description="Explore a collection of my work across IoT devices, cloud systems, and software applications."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

export function IoTProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const iotProjects = projects.filter((project) => project.showInIoT);

  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          eyebrow="IoT Projects"
          title="IoT device projects"
          description="A dedicated section for hardware-driven and connected device projects that reflect my core engineering interest."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {iotProjects.map((project) => (
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
"use client";

import { projects, Project } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Props = {
  onProjectClick?: (project: Project) => void;
};

export function SelectedProjectsSection({ onProjectClick }: Props) {
  const featuredProjects = projects.filter(
    (project) => project.showInSelected
  );

  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Featured Projects"
          title="Selected projects"
          description="A few selected works that reflect my focus on IoT, cloud systems, and practical engineering."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
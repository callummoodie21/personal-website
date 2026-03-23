"use client";

import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/lib/motion";
import { projects } from "@/data/projects";
import SectionWrapper from "./SectionWrapper";

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass glass-hover group rounded-2xl p-6 transition-colors duration-300"
    >
      {/* Gradient accent line */}
      <div
        className="mb-4 h-1 w-12 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${
            index % 3 === 0
              ? "#fdcf58, #ff6b35"
              : index % 3 === 1
              ? "#ff6b35, #ff0040"
              : "#ff0040, #fdcf58"
          })`,
        }}
      />

      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {project.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-foreground/50">
        {project.description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground/40 transition-colors hover:text-cyan"
          >
            GitHub →
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground/40 transition-colors hover:text-magenta"
          >
            Live Demo →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-foreground/50">
            A selection of things I&apos;ve built and experimented with.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Play } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Live Badge */}
        {project.liveurl && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
              Live
            </span>
          </div>
        )}

        {/* Video Badge */}
        {project.video && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Play size={12} />
              Demo Video
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-4 p-5">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="rounded-md border border-border bg-secondary px-3 py-1 text-xs text-violet-300"
            >
              {tech}
            </span>
          ))}

          {project.technologies.length > 5 && (
            <span className="rounded-md border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Features */}
        {project.features?.length > 0 && (
          <div className="space-y-1">
            {project.features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-green-500">✓</span>
                <span>{feature}</span>
              </div>
            ))}

            {project.features.length > 3 && (
              <p className="text-xs text-primary">
                +{project.features.length - 3} more
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <Link
            href={project.githubLink}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={16} />
            Code
          </Link>

          <Link
            href={project.liveurl}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
          >
            Live Demo
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

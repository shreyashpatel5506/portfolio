"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Play } from "lucide-react";

const GitHubIcon = ({ size = 19 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard = ({ project }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/projects/${project._id}`)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]"
    >
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
        {/* Title and Category */}
        <div>
          {project.category && (
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase">
              {project.category}
            </span>
          )}
          <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
            {project.title}
          </h3>
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

          {project.technologies.length > 3 && (
            <span className="rounded-md border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              +{project.technologies.length - 3}
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
          {/* GitHub */}
          <Link
            href={project.githubLink}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon size={16} />
            Code
          </Link>

          {/* Live Demo */}
          <Link
            href={project.liveurl}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
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

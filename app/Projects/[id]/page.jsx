"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExternalLink, Play, CheckCircle2 } from "lucide-react";
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

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  async function fetchProject() {
    try {
      const res = await fetch(`/api/projects/${id}`);

      const data = await res.json();

      setProject(data.project);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        Project not found
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Breadcrumb */}

      <p className="mb-4 text-sm text-primary">← All Projects</p>

      {/* Title */}

      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
        FULL STACK
      </span>

      <h1 className="mt-5 text-5xl font-bold">{project.title}</h1>

      <p className="mt-4 max-w-3xl text-muted-foreground">
        {project.description}
      </p>

      {/* Buttons */}

      <div className="mt-8 flex gap-4">
        <Link
          href={project.liveurl}
          target="_blank"
          className="rounded-lg bg-primary px-5 py-3 text-white transition hover:opacity-90"
        >
          Live Demo
        </Link>

        <Link
          href={project.githubLink}
          target="_blank"
          className="flex items-center gap-2 rounded-lg border px-5 py-3 hover:bg-muted"
        >
          <GitHubIcon size={18} />
          View Code
        </Link>
      </div>

      {/* Hero */}

      <div className="mt-12">
        <div className="relative h-[500px] overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            fill
            alt={project.title}
            className="object-cover"
          />
        </div>
      </div>

      {/* Main */}

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {/* Left */}

        <div className="space-y-10 lg:col-span-2">
          {/* Overview */}

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Overview</h2>

            <p className="leading-8 text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Features */}

          <div>
            <h2 className="mb-5 text-2xl font-semibold">Features</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border p-4"
                >
                  <CheckCircle2 className="mt-1 text-green-500" size={18} />

                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}

          {project.video && (
            <div>
              <h2 className="mb-5 text-2xl font-semibold">Project Demo</h2>

              <video controls className="w-full rounded-xl">
                <source src={project.video} />
              </video>
            </div>
          )}
        </div>

        {/* Sidebar */}

        <div>
          <div className="sticky top-24 rounded-2xl border bg-card p-6">
            <h3 className="mb-6 text-xl font-semibold">Tech Stack</h3>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-md bg-secondary px-3 py-2 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <hr className="my-6" />

            <div className="space-y-3">
              <Link
                href={project.liveurl}
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-white"
              >
                <ExternalLink size={18} />
                Live Demo
              </Link>

              <Link
                href={project.githubLink}
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-lg border px-4 py-3"
              >
                <GitHubIcon size={18} />
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

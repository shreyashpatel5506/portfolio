"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectSkeleton from "@/components/ProjectSkeleton";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);

  const fetchProjects = async (pageNo) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/projects?page=${pageNo}&limit=3`);

      const data = await res.json();

      setProjects((prev) => [...prev, ...data.projects]);
      setHasMore(data.hasMore);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects(1);
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProjects(nextPage);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h1 className="text-5xl font-bold">My Projects</h1>

        <p className="mt-3 text-muted-foreground">
          A collection of projects built using modern web technologies.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}

        {loading &&
          Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={i} />)}
      </div>

      <div ref={observerRef} className="h-20" />

      {!hasMore && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          You've reached the end 🎉
        </p>
      )}
    </section>
  );
}

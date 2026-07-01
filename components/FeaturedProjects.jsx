"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";
import SectionHeader from "./ui/SectionHeader";
import AnimatedSection from "./ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects?featured=true&limit=3");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <AnimatedSection className="bg-[#0b0f19]">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of my best work, focusing on full-stack applications with real-world utility."
          badge="Portfolio"
        />
        <Link 
          href="/projects" 
          className="hidden lg:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium pb-16 transition-colors"
        >
          View all projects <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={i} />)
        ) : projects.length > 0 ? (
          projects.map((project) => <ProjectCard key={project._id} project={project} />)
        ) : (
          <p className="text-slate-400 col-span-full text-center py-10">No featured projects found.</p>
        )}
      </div>

      <div className="mt-12 flex justify-center lg:hidden">
        <Link 
          href="/projects" 
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors border border-indigo-500/30 px-6 py-3 rounded-xl bg-indigo-500/10"
        >
          View all projects <ArrowRight size={18} />
        </Link>
      </div>
    </AnimatedSection>
  );
}

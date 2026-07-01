"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ExternalLink, CheckCircle2, ArrowLeft, Layers, Database, Code2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const GitHubIcon = ({ size = 19 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-indigo-400">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-[#030712] text-white">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <button onClick={() => router.push("/projects")} className="text-indigo-400 hover:underline">
          Return to projects
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 pt-6 md:pt-10 pb-20 w-full overflow-x-hidden">
      <AnimatedSection>
        {/* Navigation */}
        <button 
          onClick={() => router.push("/projects")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 md:mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to all projects
        </button>

        {/* Header */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-mono text-indigo-400 uppercase tracking-wider">
              {project.category || "Project"}
            </span>
            {project.projectSection && (
              <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-mono text-purple-400 uppercase tracking-wider">
                {project.projectSection}
              </span>
            )}
            {project.featured && (
              <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-mono text-amber-500 uppercase tracking-wider flex items-center gap-1">
                ★ Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 md:mb-6 leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl mb-8 md:mb-10">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {project.liveurl && (
              <Link
                href={project.liveurl}
                target="_blank"
                className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-600 hover:-translate-y-0.5"
              >
                View Live Demo <ExternalLink size={16} />
              </Link>
            )}
            
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:-translate-y-0.5"
              >
                <GitHubIcon size={16} /> Source Code
              </Link>
            )}
          </div>
        </div>

        {/* Hero Section (Video or Image) */}
        <div className="mt-10 md:mt-16 relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl bg-black">
          {project.video ? (
            <video 
              autoPlay 
              muted 
              loop 
              controls 
              className="w-full h-full object-cover outline-none" 
              poster={project.image}
            >
              <source src={project.video} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <Image
                src={project.image}
                fill
                alt={project.title}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60"></div>
            </>
          )}
        </div>

        {/* Content Layout */}
        <div className="mt-12 md:mt-20 grid gap-8 md:gap-12 lg:grid-cols-12 min-w-0">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16 min-w-0 break-words">
            
            {/* Overview / Problem */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Layers size={20} />
                </div>
                The Challenge
              </div>
              <div className="prose prose-invert prose-slate max-w-none">
                <p className="text-slate-300 leading-relaxed text-base">
                  {project.problemStatement || project.description}
                </p>
              </div>
            </div>

            {/* Solution */}
            {project.solution && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Code2 size={20} />
                  </div>
                  The Solution
                </div>
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed text-base">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Architecture */}
            {project.architecture && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Database size={20} />
                  </div>
                  Architecture & Implementation
                </div>
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed text-base">
                    {project.architecture}
                  </p>
                </div>
              </div>
            )}

            {/* Database Design */}
            {project.databaseDesign && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                    <Layers size={20} />
                  </div>
                  Database Design
                </div>
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed text-base">
                    {project.databaseDesign}
                  </p>
                </div>
              </div>
            )}

            {/* API Flow */}
            {project.apiFlow && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                    <Code2 size={20} />
                  </div>
                  API Flow
                </div>
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed text-base">
                    {project.apiFlow}
                  </p>
                </div>
              </div>
            )}

            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">Screenshots</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.screenshots.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group">
                      <Image src={img} fill alt={`${project.title} screenshot ${index + 1}`} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">Key Features</h2>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2.5 sm:gap-3 rounded-2xl border border-slate-800 bg-[#0b0f19]/50 p-4 sm:p-5 hover:border-indigo-500/30 transition-colors">
                      <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5 w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed break-words break-all">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Learnings */}
            {(project.challenges?.length > 0 || project.learnings?.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-800">
                {project.challenges?.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Challenges Overcome</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {project.challenges.map((challenge, i) => (
                        <li key={i} className="flex gap-2 text-xs sm:text-sm text-slate-300">
                          <span className="text-rose-400 mt-0.5 sm:mt-1">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.learnings?.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">What I Learned</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {project.learnings.map((learning, i) => (
                        <li key={i} className="flex gap-2 text-xs sm:text-sm text-slate-300">
                          <span className="text-emerald-400 mt-0.5 sm:mt-1">•</span>
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Main Image View (shown here if Video is at the top) */}
            {project.video && project.image && (
              <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-slate-800">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">Project Image</h2>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                  <Image 
                    src={project.image} 
                    fill 
                    alt={`${project.title} Main Image`} 
                    className="object-cover" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 mt-4 md:mt-0 min-w-0 break-words">
            <div className="sticky top-24 space-y-6 md:space-y-8">
              
              {/* Tech Stack Card */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19]/80 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
                <h3 className="text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-widest mb-4 sm:mb-6">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-slate-800/80 border border-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Steps / Future */}
              {project.futureImprovements?.length > 0 && (
                <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-indigo-500/5 p-5 sm:p-6 border-l-4 border-l-indigo-500">
                  <h3 className="text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-widest mb-3 sm:mb-4">
                    Future Roadmap
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {project.futureImprovements.map((improvement, i) => (
                      <li key={i} className="flex gap-2 text-xs sm:text-sm text-slate-300">
                        <span className="text-indigo-500/50 mt-0.5 sm:mt-1">→</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

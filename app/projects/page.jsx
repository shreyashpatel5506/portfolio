"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectSkeleton from "@/components/ProjectSkeleton";
import { Search, Filter, Code } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const CATEGORIES = ["All", "Full Stack", "Frontend", "Backend", "Mobile", "Open Source", "Tool"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const observerRef = useRef(null);

  const fetchProjects = useCallback(
    async (pageNo, reset = false) => {
      if ((loading || !hasMore) && !reset) return;

      setLoading(true);

      try {
        const queryParams = new URLSearchParams({
          page: pageNo,
          limit: 6,
        });

        if (search) queryParams.append("search", search);
        if (category !== "All") queryParams.append("category", category);
        if (featuredOnly) queryParams.append("featured", "true");

        const res = await fetch(`/api/projects?${queryParams.toString()}`);
        const data = await res.json();

        setProjects((prev) => (reset ? data.projects : [...prev, ...data.projects]));
        setHasMore(data.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [search, category, featuredOnly, hasMore, loading]
  );

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProjects(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, featuredOnly]); // Depend on filters

  // Intersection Observer for Infinite Scroll
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
      { threshold: 0.2 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [page, hasMore, loading, fetchProjects]);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10">
      <AnimatedSection>
        <div className="mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            My Projects
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm md:text-base">
            A collection of applications, tools, and open-source contributions I've built to solve problems and learn new technologies.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 pb-6 border-b border-slate-800">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0b0f19] border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-slate-100 placeholder:text-slate-600 text-sm"
            />
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex bg-[#0b0f19] rounded-xl p-1 border border-slate-800">
              {CATEGORIES.slice(0, 3).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    category === cat
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-400 outline-none px-2 cursor-pointer hover:text-slate-200"
              >
                <option value="All" className="bg-[#0b0f19]">More...</option>
                {CATEGORIES.slice(3).map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0b0f19]">{cat}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.target.checked)}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${featuredOnly ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${featuredOnly ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                Featured
              </span>
            </label>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {initialLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-4">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-slate-400">Try adjusting your filters or search term.</p>
              <button 
                onClick={() => { setSearch(""); setCategory("All"); setFeaturedOnly(false); }}
                className="mt-6 px-4 py-2 bg-indigo-500/10 text-indigo-400 font-medium rounded-lg hover:bg-indigo-500/20 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Loading indicator for infinite scroll */}
          {loading && !initialLoading && (
            Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={`more-${i}`} />)
          )}
        </div>

        <div ref={observerRef} className="h-10 w-full" />

        {!hasMore && projects.length > 0 && (
          <div className="mt-12 flex items-center justify-center">
            <div className="px-4 py-2 rounded-full border border-slate-800 bg-[#0b0f19] text-xs font-medium text-slate-500">
              You've reached the end
            </div>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}

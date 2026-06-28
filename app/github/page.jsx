"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GitHubStats from "@/components/GitHubStats";

export default function GitHubPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = "shreyashpatel5506"; // Move to env in prod

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10">
      <AnimatedSection>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            GitHub Dashboard
          </h1>
          <p className="text-slate-400 leading-relaxed">
            My open-source footprint. Tracking repositories, contributions, and top technologies.
          </p>
        </div>

        <GitHubStats />

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            Recent Repositories
            <span className="text-sm font-normal text-slate-500 bg-slate-900 px-3 py-1 rounded-full">Top 6</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="text-slate-400">Loading repositories...</p>
            ) : repos.length > 0 ? (
              repos.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex flex-col p-6 rounded-2xl border border-slate-800 bg-[#0b0f19] hover:border-slate-600 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-blue-400 group-hover:text-blue-300 mb-2 truncate">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-2">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      🍴 {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-slate-400">No recent repositories found.</p>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

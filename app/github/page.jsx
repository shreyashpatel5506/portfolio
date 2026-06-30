"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BookOpen, Star, Users, GitBranch, Terminal, ExternalLink, GitCommit, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function GitHubPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Default to env or fallback
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "shreyashpatel5506";

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = await fetch(`/api/github?username=${username}`);
        if (res.ok) {
          const json = await res.json();
          if (!json.error) {
            setData(json);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, [username]);

  // Language colors mapping
  const languageColors = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-blue-400",
    Java: "bg-orange-500",
    HTML: "bg-orange-600",
    CSS: "bg-blue-600",
    "C++": "bg-pink-500",
    Go: "bg-cyan-500",
    Rust: "bg-orange-700",
  };

  const getLanguageColor = (lang) => languageColors[lang] || "bg-slate-400";

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10 pb-20">
      <AnimatedSection showGrid={true}>
        <div className="mb-10 md:mb-16 max-w-4xl mx-auto text-center px-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono mb-3 md:mb-4">
            Open Source
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 md:mb-4">
            GitHub Dashboard
          </h1>
          <p className="text-slate-400 leading-relaxed text-xs md:text-base max-w-2xl mx-auto">
            My open-source footprint. Exploring repositories, contributions, top languages, and community engagement.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : data ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">

            {/* Profile Overview */}
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0b0f19] to-[#030712] shadow-xl text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-0">
                {data.profile.avatar_url ? (
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-slate-800 shadow-[0_0_20px_rgba(59,130,246,0.15)] flex-shrink-0">
                    <Image src={data.profile.avatar_url} fill alt="GitHub Avatar" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-500/10 flex items-center justify-center border-4 border-slate-800 flex-shrink-0">
                    <Users size={28} className="text-blue-500 md:w-8 md:h-8" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{username}</h2>
                  <p className="text-slate-400 text-sm max-w-md line-clamp-2 px-2 md:px-0">
                    {data.profile.bio || "Building robust software and contributing to the open source community."}
                  </p>
                </div>
              </div>
              <a
                href={data.profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto px-6 py-3 justify-center bg-white hover:bg-slate-200 text-black font-bold rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
              >
                View GitHub <ExternalLink size={18} />
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2 sm:gap-3 hover:border-slate-600 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
                  <BookOpen size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-4xl font-black text-white">{data.profile.public_repos}</div>
                  <div className="text-[10px] sm:text-sm font-medium text-slate-500 mt-1">Public Repositories</div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2 sm:gap-3 hover:border-amber-500/30 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Star size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-4xl font-black text-white">{data.totalStars}</div>
                  <div className="text-[10px] sm:text-sm font-medium text-slate-500 mt-1">Total Stars Earned</div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2 sm:gap-3 hover:border-blue-500/30 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Users size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-4xl font-black text-white">{data.profile.followers}</div>
                  <div className="text-[10px] sm:text-sm font-medium text-slate-500 mt-1">Followers</div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2 sm:gap-3 hover:border-emerald-500/30 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <GitCommit size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  {/* Since GitHub API doesn't easily expose total commits across all repos, we use a placeholder or derived stat. Here we just show a static visual or generic label */}
                  <div className="text-2xl sm:text-4xl font-black text-white">Active</div>
                  <div className="text-[10px] sm:text-sm font-medium text-slate-500 mt-1">Contribution Status</div>
                </div>
              </div>
            </div>

            {/* Layout for Languages and Repos */}
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Top Languages */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19]">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                    <Terminal size={18} className="text-blue-500 sm:w-5 sm:h-5" /> Top Languages
                  </h3>

                  {data.topLanguages.length > 0 ? (
                    <div className="space-y-4 sm:space-y-5">
                      {data.topLanguages.map((lang, index) => {
                        const totalCount = data.topLanguages.reduce((acc, curr) => acc + curr.count, 0);
                        const percentage = ((lang.count / totalCount) * 100).toFixed(1);

                        return (
                          <div key={index} className="space-y-1.5 sm:space-y-2">
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="font-medium text-slate-300">{lang.name}</span>
                              <span className="text-slate-500">{percentage}%</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 sm:h-2">
                              <div
                                className={`h-1.5 sm:h-2 rounded-full ${getLanguageColor(lang.name)}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">No language data available.</p>
                  )}
                </div>

                {/* GitHub Contribution Graph Image (Fallback to a generated image or external service if desired) */}
                <div className="hidden sm:flex p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] flex-col items-center justify-center text-center">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Contributions</h3>
                  <img
                    src={`https://ghchart.rshah.org/3b82f6/${username}`}
                    alt="GitHub Contribution Chart"
                    className="w-full opacity-80 mix-blend-screen hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              {/* Recent Repositories */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    Recent Repositories
                  </h2>
                  <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    View all <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {data.recentRepos.length > 0 ? (
                    data.recentRepos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col p-6 rounded-2xl border border-slate-800 bg-[#0b0f19] hover:border-slate-600 transition-all hover:-translate-y-1 group shadow-lg"
                      >
                        <h3 className="text-lg font-bold text-blue-400 group-hover:text-blue-300 mb-2 truncate flex items-center gap-2">
                          <BookOpen size={16} /> {repo.name}
                        </h3>
                        <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-2">
                          {repo.description || "No description provided."}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`}></span>
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={14} className={repo.stargazers_count > 0 ? "text-amber-400" : ""} /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch size={14} /> {repo.forks_count}
                          </span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-slate-400 col-span-2">No recent repositories found.</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="p-12 border border-slate-800 rounded-3xl bg-[#0b0f19] text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              GitHub stats temporarily unavailable
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We couldn't fetch the latest GitHub data. The API limit might be reached.
            </p>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              className="px-8 py-4 bg-white hover:bg-slate-200 text-black font-bold rounded-xl transition-all inline-flex items-center gap-2"
            >
              <ExternalLink size={18} /> Visit GitHub Profile
            </a>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}

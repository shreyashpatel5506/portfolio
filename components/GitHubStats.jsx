"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import AnimatedSection from "./ui/AnimatedSection";
import { GitBranch, Star, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // You can move this to .env.local later
  const username = "shreyashpatel5506";

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHub();
  }, []);

  return (
    <AnimatedSection>
      <SectionHeader
        title="Open Source & GitHub"
        subtitle="I love building in public and contributing to the open-source community."
        badge="Code"
      />

      <div className="grid gap-6 md:grid-cols-4">
        {loading ? (
          <p className="text-slate-400 col-span-full">Loading stats...</p>
        ) : stats ? (
          <>
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0b0f19]/60 flex flex-col items-center justify-center text-center gap-3 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                <BookOpen size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.public_repos}</div>
                <div className="text-sm text-slate-400 mt-1">Repositories</div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0b0f19]/60 flex flex-col items-center justify-center text-center gap-3 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Star size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">12+</div> {/* Placeholder, hard to get total stars without extra API call */}
                <div className="text-sm text-slate-400 mt-1">Total Stars</div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0b0f19]/60 flex flex-col items-center justify-center text-center gap-3 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Users size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.followers}</div>
                <div className="text-sm text-slate-400 mt-1">Followers</div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0b0f19]/60 flex flex-col items-center justify-center text-center gap-3 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <GitBranch size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4+</div>
                <div className="text-sm text-slate-400 mt-1">Merged PRs</div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-slate-400 col-span-full">Failed to load GitHub stats.</p>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <Link 
          href={`https://github.com/${username}`} 
          target="_blank"
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Follow on GitHub
        </Link>
      </div>
    </AnimatedSection>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { GitPullRequest, ExternalLink, GitMerge, GitCommit, GitBranch, Terminal } from "lucide-react";

export default function OpenSourcePage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOS = async () => {
      try {
        const res = await fetch("/api/opensource");
        const data = await res.json();
        setContributions(data.opensource || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOS();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "merged": 
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400 capitalize">
            <GitMerge size={14} /> Merged
          </div>
        );
      case "open": 
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 capitalize">
            <GitPullRequest size={14} /> Open
          </div>
        );
      case "closed": 
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 capitalize">
            <GitCommit size={14} /> Closed
          </div>
        );
      default: 
        return null;
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10 pb-20">
      <AnimatedSection>
        <div className="mb-16 text-center max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono mb-4">
            Community
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Open Source
          </h1>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            Giving back to the developer ecosystem by contributing to the tools, libraries, and frameworks I use every day.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {loading ? (
             <div className="flex justify-center py-32">
               <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : contributions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contributions.map((item) => (
                <div key={item._id} className="group flex flex-col p-8 rounded-3xl border border-slate-800 bg-[#0b0f19] hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all cursor-default transform hover:-translate-y-1 relative overflow-hidden">
                  
                  {/* Subtle Background Icon */}
                  <div className="absolute -right-6 -bottom-6 text-slate-800/30 group-hover:text-cyan-900/20 transition-colors pointer-events-none">
                    <GitBranch size={160} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      {getStatusBadge(item.status)}
                      <span className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        {formatDate(item.contributionDate)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyan-400 transition-colors">
                      {item.prTitle}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-4">
                      <Terminal size={14} className="text-cyan-500" /> {item.repo}
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                      {item.description}
                    </p>

                    <div className="pt-6 border-t border-slate-800/60 mt-auto">
                      <Link 
                        href={item.prUrl}
                        target="_blank"
                        className="inline-flex items-center justify-between w-full text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors"
                      >
                        <span className="flex items-center gap-2"><GitPullRequest size={16} /> View Pull Request</span> 
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-3xl max-w-2xl mx-auto">
               <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-6 shadow-inner">
                 <GitPullRequest size={40} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">No contributions logged</h3>
               <p className="text-slate-400 text-lg">Admin can add PRs from the dashboard.</p>
             </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}

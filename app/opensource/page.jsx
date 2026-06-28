"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { GitPullRequest, ExternalLink, GitMerge, CircleDot, XCircle } from "lucide-react";

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
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "merged": return <GitMerge size={16} className="text-purple-400" />;
      case "open": return <CircleDot size={16} className="text-emerald-400" />;
      case "closed": return <XCircle size={16} className="text-rose-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10 pb-20">
      <AnimatedSection>
        <div className="mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono mb-4">
            Community
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Open Source
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm md:text-base">
            My contributions to the open-source ecosystem. Giving back to the tools and libraries I use every day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-slate-400 col-span-full">Loading contributions...</p>
          ) : contributions.length > 0 ? (
            contributions.map((item) => (
              <div key={item._id} className="flex flex-col p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] hover:border-blue-500/30 transition-all shadow-lg shadow-black/50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 capitalize">
                    <StatusIcon status={item.status} /> {item.status}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{formatDate(item.contributionDate)}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 leading-tight">{item.prTitle}</h3>
                <p className="text-sm font-medium text-blue-400 mb-4">{item.repo}</p>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-slate-800/50">
                  <Link 
                    href={item.prUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    <GitPullRequest size={16} /> View Pull Request <ExternalLink size={14} className="ml-1 opacity-50" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-3xl">
               <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-4">
                 <GitPullRequest size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No contributions logged yet</h3>
               <p className="text-slate-400">Admin can add PRs from the dashboard.</p>
             </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}

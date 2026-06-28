"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Code2, Trophy, Target, Zap } from "lucide-react";

export default function DSAPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "shreyash_5506";

  useEffect(() => {
    // LeetCode doesn't have an official open REST API, but there are reliable public wrappers.
    // Using a popular free leetcode API wrapper for this example
    const fetchDSAStats = async () => {
      try {
        const res = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`,
        );
        if (res.ok) {
          const data = await res.json();
          if (data.status === "success") {
            setStats(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch LeetCode stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDSAStats();
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10 pb-20">
      <AnimatedSection>
        <div className="mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono mb-4">
            Problem Solving
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Data Structures & Algorithms
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm md:text-base">
            My progress and statistics on LeetCode. Consistent problem solving
            helps me write optimized, efficient, and scalable code.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : stats ? (
          <div className="space-y-8">
            {/* Top Cards */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <Code2 size={18} className="text-orange-500" /> Total Solved
                </div>
                <div className="text-4xl font-black text-white">
                  {stats.totalSolved}
                </div>
                <div className="text-sm font-medium text-slate-500">
                  out of {stats.totalQuestions}
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                  <Target size={18} /> Easy
                </div>
                <div className="text-4xl font-black text-white">
                  {stats.easySolved}
                </div>
                <div className="text-sm font-medium text-slate-500">
                  out of {stats.totalEasy}
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <Zap size={18} /> Medium
                </div>
                <div className="text-4xl font-black text-white">
                  {stats.mediumSolved}
                </div>
                <div className="text-sm font-medium text-slate-500">
                  out of {stats.totalMedium}
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-2">
                <div className="flex items-center gap-3 text-rose-500 mb-2">
                  <Trophy size={18} /> Hard
                </div>
                <div className="text-4xl font-black text-white">
                  {stats.hardSolved}
                </div>
                <div className="text-sm font-medium text-slate-500">
                  out of {stats.totalHard}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-8 rounded-3xl border border-slate-800 bg-[#0b0f19]">
                <h3 className="text-xl font-bold text-white mb-6">
                  Acceptance Rate
                </h3>
                <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-slate-800 border-t-orange-500">
                    <span className="text-2xl font-bold text-white">
                      {stats.acceptanceRate}%
                    </span>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-2">
                      A high acceptance rate shows attention to edge cases and
                      optimal logic on the first try.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-slate-800 bg-[#0b0f19]">
                <h3 className="text-xl font-bold text-white mb-6">Ranking</h3>
                <div className="text-5xl font-black text-orange-400 mb-2">
                  #{stats.ranking.toLocaleString()}
                </div>
                <p className="text-slate-400">Global Rank on LeetCode</p>
                <div className="mt-8">
                  <a
                    href={`https://leetcode.com/${username}`}
                    target="_blank"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    View LeetCode Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 border border-slate-800 rounded-3xl bg-[#0b0f19] text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Stats temporarily unavailable
            </h3>
            <p className="text-slate-400 mb-6">
              Please visit my LeetCode profile directly.
            </p>
            <a
              href={`https://leetcode.com/${username}`}
              target="_blank"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Go to LeetCode
            </a>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Code2, Trophy, Target, Zap, Activity, Flame, Award, Clock, CalendarDays, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DSAPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "shreyash_5506"; // Default or load from env

  useEffect(() => {
    const fetchDSAStats = async () => {
      try {
        const res = await fetch(`/api/leetcode?username=${username}`);
        if (res.ok) {
          const data = await res.json();
          if (!data.error) {
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
  }, [username]);

  // Generate heatmap data
  const renderHeatmap = () => {
    if (!stats || !stats.submissionCalendar) return null;
    
    // Sort timestamps and get last 90 days roughly
    const timestamps = Object.keys(stats.submissionCalendar).map(Number).sort((a, b) => a - b);
    if (timestamps.length === 0) return <p className="text-slate-500">No recent activity.</p>;
    
    // Simplistic representation for the portfolio
    // A real heatmap would use a grid of 52 weeks x 7 days
    const latestTime = timestamps[timestamps.length - 1];
    const ninetyDaysAgo = latestTime - (90 * 24 * 60 * 60);
    
    const recentActivity = timestamps.filter(t => t >= ninetyDaysAgo);
    let activeDays = recentActivity.length;

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 font-medium">{activeDays} active days in last 3 months</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Less</span>
            <span className="w-3 h-3 rounded-sm bg-slate-800"></span>
            <span className="w-3 h-3 rounded-sm bg-emerald-900"></span>
            <span className="w-3 h-3 rounded-sm bg-emerald-600"></span>
            <span className="w-3 h-3 rounded-sm bg-emerald-400"></span>
            <span>More</span>
          </div>
        </div>
        
        {/* Fake heatmap blocks for aesthetic purposes representing density */}
        <div className="flex flex-wrap gap-1.5 p-4 bg-[#030712] rounded-xl border border-slate-800/50">
          {Array.from({ length: 84 }).map((_, i) => {
            // Generate a visually pleasing random-ish pattern weighted towards the end
            const isLatest = i > 60;
            const rand = Math.random();
            let intensity = "bg-slate-800"; // none
            if (rand > 0.8 || (isLatest && rand > 0.5)) intensity = "bg-emerald-900"; // low
            if (rand > 0.9 || (isLatest && rand > 0.7)) intensity = "bg-emerald-600"; // medium
            if (rand > 0.95 || (isLatest && rand > 0.9)) intensity = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"; // high
            
            return (
              <div 
                key={i} 
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm ${intensity} transition-all duration-300 hover:scale-125 hover:z-10`}
                title="Activity representation"
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10 pb-20">
      <AnimatedSection>
        <div className="mb-10 md:mb-16 max-w-4xl mx-auto text-center px-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono mb-3 md:mb-4">
            Problem Solving
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 md:mb-4">
            Algorithms & Data Structures
          </h1>
          <p className="text-slate-400 leading-relaxed text-xs md:text-base max-w-2xl mx-auto">
            My progress and statistics on LeetCode. Consistent problem solving
            helps me write optimized, efficient, and scalable code.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : stats ? (
          <div className="space-y-8 max-w-6xl mx-auto">
            
            {/* Header Profile Summary */}
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0b0f19] to-[#030712] shadow-xl text-center md:text-left mx-4 sm:mx-0">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] flex-shrink-0">
                  <Code2 size={32} className="text-orange-500 md:w-10 md:h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    {username}
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-slate-800 text-slate-400 font-mono tracking-widest">
                      Rank {stats.ranking.toLocaleString()}
                    </span>
                  </h2>
                  <div className="text-slate-400 mt-2 flex items-center justify-center md:justify-start gap-4 text-xs sm:text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Activity size={14} className="text-blue-400" /> {stats.reputation} Rep</span>
                    <span className="flex items-center gap-1.5"><Flame size={14} className="text-rose-400" /> {stats.contributionPoints} Contribs</span>
                  </div>
                </div>
              </div>
              <a
                href={`https://leetcode.com/${username}`}
                target="_blank"
                className="w-full md:w-auto px-6 py-3 justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                View Profile
              </a>
            </div>

            {/* Top Cards: Solved */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-4 sm:px-0">
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-1 sm:gap-2 hover:border-orange-500/30 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 text-slate-400 mb-1 sm:mb-2 text-xs sm:text-sm">
                  <Code2 size={16} className="text-orange-500 sm:w-[18px] sm:h-[18px]" /> Total
                </div>
                <div className="text-2xl sm:text-4xl font-black text-white">
                  {stats.totalSolved}
                </div>
                <div className="text-[10px] sm:text-sm font-medium text-slate-500">
                  out of {stats.totalQuestions}
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-1 sm:h-1.5 mt-2 sm:mt-3">
                  <div className="bg-orange-500 h-1 sm:h-1.5 rounded-full" style={{ width: `${Math.min(100, (stats.totalSolved / stats.totalQuestions) * 100)}%` }}></div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-1 sm:gap-2 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 text-emerald-400 mb-1 sm:mb-2 text-xs sm:text-sm">
                  <Target size={16} className="sm:w-[18px] sm:h-[18px]" /> Easy
                </div>
                <div className="text-2xl sm:text-4xl font-black text-white">
                  {stats.easySolved}
                </div>
                <div className="text-[10px] sm:text-sm font-medium text-slate-500">
                  out of {stats.totalEasy}
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1 sm:h-1.5 mt-2 sm:mt-3">
                  <div className="bg-emerald-500 h-1 sm:h-1.5 rounded-full" style={{ width: `${Math.min(100, (stats.easySolved / stats.totalEasy) * 100)}%` }}></div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-1 sm:gap-2 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 text-amber-400 mb-1 sm:mb-2 text-xs sm:text-sm">
                  <Zap size={16} className="sm:w-[18px] sm:h-[18px]" /> Medium
                </div>
                <div className="text-2xl sm:text-4xl font-black text-white">
                  {stats.mediumSolved}
                </div>
                <div className="text-[10px] sm:text-sm font-medium text-slate-500">
                  out of {stats.totalMedium}
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1 sm:h-1.5 mt-2 sm:mt-3">
                  <div className="bg-amber-400 h-1 sm:h-1.5 rounded-full" style={{ width: `${Math.min(100, (stats.mediumSolved / stats.totalMedium) * 100)}%` }}></div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0b0f19] flex flex-col gap-1 sm:gap-2 hover:border-rose-500/30 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 text-rose-500 mb-1 sm:mb-2 text-xs sm:text-sm">
                  <Trophy size={16} className="sm:w-[18px] sm:h-[18px]" /> Hard
                </div>
                <div className="text-2xl sm:text-4xl font-black text-white">
                  {stats.hardSolved}
                </div>
                <div className="text-[10px] sm:text-sm font-medium text-slate-500">
                  out of {stats.totalHard}
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1 sm:h-1.5 mt-2 sm:mt-3">
                  <div className="bg-rose-500 h-1 sm:h-1.5 rounded-full" style={{ width: `${Math.min(100, (stats.hardSolved / stats.totalHard) * 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Middle Section: Heatmap & Stats */}
            <div className="grid gap-6 lg:grid-cols-3">
              
              {/* Acceptance Rate & Contest */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-8 rounded-3xl border border-slate-800 bg-[#0b0f19]">
                  <h3 className="text-xl font-bold text-white mb-6">Acceptance Rate</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-8 border-slate-800 border-t-orange-500 border-r-orange-500">
                      <span className="text-2xl font-black text-white">
                        {stats.acceptanceRate}%
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Precision in submissions. High acceptance indicates optimal logic on the first try.
                      </p>
                    </div>
                  </div>
                </div>

                {stats.contest && (
                  <div className="p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] bg-gradient-to-br from-indigo-500/10 to-[#0b0f19]">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Award size={18} className="text-indigo-400" /> Contest Rating</h3>
                    <div className="text-4xl font-black text-indigo-400 mb-2">
                      {Math.round(stats.contest.rating)}
                    </div>
                    <p className="text-slate-400 text-sm mb-4">Top {stats.contest.topPercentage}% Globally</p>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 pt-4 border-t border-slate-800">
                      <span>{stats.contest.attendedContestsCount} Contests</span>
                      <span>Rank #{stats.contest.globalRanking}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Heatmap & Recent */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="p-6 rounded-3xl border border-slate-800 bg-[#0b0f19]">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CalendarDays size={20} className="text-orange-500" /> Submission Activity
                  </h3>
                  {renderHeatmap()}
                </div>

                <div className="p-6 rounded-3xl border border-slate-800 bg-[#0b0f19] flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Clock size={20} className="text-orange-500" /> Recent Submissions
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {stats.recentSubmissions.length > 0 ? (
                      stats.recentSubmissions.slice(0, 5).map((sub, i) => (
                        <a 
                          key={i} 
                          href={`https://leetcode.com/problems/${sub.titleSlug}/`} 
                          target="_blank"
                          className="flex items-center justify-between p-4 rounded-2xl bg-[#030712] border border-slate-800 hover:border-slate-600 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{sub.title}</span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">
                            {new Date(sub.timestamp * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </a>
                      ))
                    ) : (
                      <p className="text-slate-400">No recent submissions found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Badges */}
            {stats.badges && stats.badges.length > 0 && (
              <div className="p-8 rounded-3xl border border-slate-800 bg-[#0b0f19]">
                <h3 className="text-xl font-bold text-white mb-6">Badges & Achievements</h3>
                <div className="flex flex-wrap gap-4">
                  {stats.badges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#030712] border border-slate-800">
                      {badge.icon.startsWith('http') ? (
                        <img src={badge.icon} alt={badge.displayName} className="w-8 h-8 object-contain" />
                      ) : (
                        <Award size={24} className="text-yellow-500" />
                      )}
                      <div>
                        <div className="text-sm font-bold text-white">{badge.displayName}</div>
                        <div className="text-xs text-slate-500">{new Date(badge.creationDate).getFullYear()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        ) : (
          <div className="p-12 border border-slate-800 rounded-3xl bg-[#0b0f19] text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              Stats temporarily unavailable
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We couldn't fetch the latest LeetCode stats right now. This usually happens if the LeetCode API is rate-limiting requests. Please try again later or visit my profile directly.
            </p>
            <a
              href={`https://leetcode.com/${username}`}
              target="_blank"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25 inline-flex items-center gap-2"
            >
              <ExternalLink size={18} /> Go to LeetCode Profile
            </a>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}


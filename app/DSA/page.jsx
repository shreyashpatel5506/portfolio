"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  MapPin,
  Building2,
  Link as LinkIcon,
  Eye,
  CheckCircle2,
  MessageSquare,
  Star,
  ChevronRight,
  List,
  FileCheck2,
  MessageCircle,
  Activity,
  X,
  ThumbsUp
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function DSAPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recent");
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const username = "shreyash_5506";

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

  const timeAgo = (timestamp) => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const getFullIconUrl = (iconUrl) => {
    if (!iconUrl) return "";
    if (iconUrl.startsWith("http")) return iconUrl;
    return `https://leetcode.com${iconUrl}`;
  };

  const renderHeatmap = () => {
    const cols = 52;
    const rows = 7;

    return (
      <div className="flex flex-col gap-2 overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex gap-1 min-w-max">
          {Array.from({ length: cols }).map((_, cIndex) => (
            <div key={cIndex} className="flex flex-col gap-1">
              {Array.from({ length: rows }).map((_, rIndex) => {
                const rand = Math.random();
                let bgClass = "bg-[#3e3e3e]";
                if (rand > 0.95) bgClass = "bg-[#39d353]";
                else if (rand > 0.85) bgClass = "bg-[#26a641]";
                else if (rand > 0.75) bgClass = "bg-[#006d32]";
                else if (rand > 0.65) bgClass = "bg-[#0e4429]";

                return (
                  <div
                    key={rIndex}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] ${bgClass}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 min-w-max mt-1">
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
          <span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
          <span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex justify-center items-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profile Unavailable</h2>
          <p className="text-gray-400 mb-6">Could not load LeetCode data.</p>
        </div>
      </div>
    );
  }

  // Group badges by category
  const badgeCategories = {
    "ANNUAL": "Annual Medals",
    "DCC": "Daily Medals",
    "COMPETITION": "Competition Medals",
    "STUDY_PLAN": "Study Plan",
    "OTHER": "Other Badges"
  };

  const groupedBadges = (stats.badges || []).reduce((acc, badge) => {
    const cat = badge.category || "OTHER";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(badge);
    return acc;
  }, {});

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-[#eff2f6] w-full font-sans">
      <AnimatedSection>
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row gap-6">

          {/* Left Column */}
          <div className="w-full lg:w-[300px] flex flex-col gap-4">

            {/* Profile Info */}
            <div className="bg-[#282828] rounded-xl p-4 shadow-sm">
              <div className="flex gap-4 items-center">
                <img
                  src={stats.profile?.userAvatar || "https://assets.leetcode.com/users/default_avatar.jpg"}
                  alt="Profile"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-[#eff2f6] font-semibold text-lg leading-tight">
                    {stats.profile?.realName || username}
                  </h1>
                  <p className="text-gray-400 text-sm">{username}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Rank <span className="font-bold text-[#eff2f6] text-sm">{stats.ranking?.toLocaleString() || "N/A"}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6 text-sm">
                <div className="flex-1">
                  <div className="text-gray-400 text-xs">Following</div>
                  <div className="font-semibold mt-0.5 text-[#eff2f6]">2</div>
                </div>
                <div className="flex-1">
                  <div className="text-gray-400 text-xs">Followers</div>
                  <div className="font-semibold mt-0.5 text-[#eff2f6]">2</div>
                </div>
              </div>

              <button className="w-full mt-4 bg-[#2cbb5d]/10 text-[#2cbb5d] hover:bg-[#2cbb5d]/20 font-medium rounded-lg py-2 text-sm transition-colors">
                Edit Profile
              </button>

              <div className="mt-6 space-y-3 text-sm text-gray-400">
                {stats.profile?.countryName && (
                  <div className="flex items-center gap-3">
                    <MapPin size={16} /> <span className="text-[#eff2f6]">{stats.profile.countryName}</span>
                  </div>
                )}
                {stats.profile?.school && (
                  <div className="flex items-center gap-3">
                    <Building2 size={16} /> <span className="text-[#eff2f6] truncate">{stats.profile.school}</span>
                  </div>
                )}
                {stats.profile?.websites?.[0] && (
                  <div className="flex items-center gap-3">
                    <LinkIcon size={16} />
                    <a href={stats.profile.websites[0]} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate">
                      {stats.profile.websites[0]}
                    </a>
                  </div>
                )}
                {stats.githubUrl && (
                  <div className="flex items-center gap-3">
                    <FaGithub size={16} />
                    <a href={stats.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors truncate">
                      {stats.githubUrl.replace("https://github.com/", "")}
                    </a>
                  </div>
                )}
                {stats.linkedinUrl && (
                  <div className="flex items-center gap-3">
                    <FaLinkedin size={16} />
                    <a href={stats.linkedinUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors truncate">
                      {stats.linkedinUrl.replace("https://linkedin.com/in/", "")}
                    </a>
                  </div>
                )}
              </div>

              {stats.profile?.skillTags && stats.profile.skillTags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {stats.profile.skillTags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#3e3e3e] text-[#eff2f6] text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Community Stats */}
            <div className="bg-[#282828] rounded-xl p-4 shadow-sm">
              <h2 className="text-[#eff2f6] font-semibold mb-4 text-sm">Community Stats</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-gray-400">
                  <Eye size={16} className="text-blue-500" />
                  <span>Views</span>
                  <span className="ml-auto font-medium text-[#eff2f6]">6.8K</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <CheckCircle2 size={16} className="text-teal-500" />
                  <span>Solution</span>
                  <span className="ml-auto font-medium text-[#eff2f6]">87</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MessageSquare size={16} className="text-green-500" />
                  <span>Discuss</span>
                  <span className="ml-auto font-medium text-[#eff2f6]">1</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Star size={16} className="text-yellow-500" />
                  <span>Reputation</span>
                  <span className="ml-auto font-medium text-[#eff2f6]">{stats.reputation}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-[#282828] rounded-xl p-4 shadow-sm">
              <h2 className="text-[#eff2f6] font-semibold mb-4 text-sm">Languages</h2>
              <div className="space-y-3 text-sm">
                {stats.languageProblemCount?.slice(0, 3).map((lang, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="bg-[#3e3e3e] px-2.5 py-1 rounded-full text-xs text-[#eff2f6]">{lang.languageName}</span>
                    <span className="text-gray-400"><span className="text-[#eff2f6] font-semibold">{lang.problemsSolved}</span> <span className="text-xs">problems solved</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-[#282828] rounded-xl p-4 shadow-sm">
              <h2 className="text-[#eff2f6] font-semibold mb-4 text-sm">Skills</h2>

              <div className="mb-5">
                <div className="text-xs text-[#eff2f6] font-medium mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Advanced
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.tagProblemCounts?.advanced?.slice(0, 3).map(tag => (
                    <span key={tag.tagName} className="px-2.5 py-1 bg-[#3e3e3e] text-[#eff2f6] text-xs rounded-full">
                      {tag.tagName} <span className="text-gray-400 ml-1">x{tag.problemsSolved}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <div className="text-xs text-[#eff2f6] font-medium mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Intermediate
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.tagProblemCounts?.intermediate?.slice(0, 3).map(tag => (
                    <span key={tag.tagName} className="px-2.5 py-1 bg-[#3e3e3e] text-[#eff2f6] text-xs rounded-full">
                      {tag.tagName} <span className="text-gray-400 ml-1">x{tag.problemsSolved}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#eff2f6] font-medium mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Fundamental
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.tagProblemCounts?.fundamental?.slice(0, 3).map(tag => (
                    <span key={tag.tagName} className="px-2.5 py-1 bg-[#3e3e3e] text-[#eff2f6] text-xs rounded-full">
                      {tag.tagName} <span className="text-gray-400 ml-1">x{tag.problemsSolved}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4 w-full">

            {/* Top Section */}
            <div className="bg-[#282828] rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden">
              <div className="flex gap-8 z-10 relative">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Contest Rating</div>
                  <div className="text-[28px] text-[#eff2f6] font-semibold">{Math.round(stats.contest?.rating || 0).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Global Ranking</div>
                  <div className="text-[28px] text-gray-500 font-semibold">{stats.contest?.globalRanking?.toLocaleString() || '🔒'}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Attended</div>
                  <div className="text-[28px] text-[#eff2f6] font-semibold">{stats.contest?.attendedContestsCount || 0}</div>
                </div>
              </div>

              {/* Fake contest graph curve on the right */}
              <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-yellow-500">
                  <path d="M0,80 Q20,60 40,70 T80,30 T100,20 L100,100 L0,100 Z" fill="currentColor" opacity="0.3" />
                  <path d="M0,80 Q20,60 40,70 T80,30 T100,20" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Middle Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Solved Stats Card */}
              <div className="bg-[#282828] rounded-xl p-6 shadow-sm flex items-center justify-between sm:justify-evenly gap-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#3e3e3e" strokeWidth="4" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4743" strokeWidth="4"
                      strokeDasharray={`${(stats.totalSolved / stats.totalQuestions) * 283} 283`} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ffc01e" strokeWidth="4"
                      strokeDasharray={`${((stats.easySolved + stats.mediumSolved) / stats.totalQuestions) * 283} 283`} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#00b8a3" strokeWidth="4"
                      strokeDasharray={`${(stats.easySolved / stats.totalQuestions) * 283} 283`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-[#eff2f6] text-2xl font-semibold flex items-baseline">
                      {stats.totalSolved}<span className="text-gray-500 text-xs ml-0.5">/{stats.totalQuestions}</span>
                    </div>
                    <div className="text-gray-400 text-[10px] mt-0.5 flex items-center gap-1">
                      <CheckCircle2 size={10} className="text-green-500" /> Solved
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="bg-[#3e3e3e]/40 rounded-lg px-4 py-2 w-full max-w-[120px]">
                    <div className="text-[#00b8a3] text-xs font-medium mb-0.5">Easy</div>
                    <div className="text-[#eff2f6] font-semibold text-sm">
                      {stats.easySolved}<span className="text-gray-500 font-normal">/{stats.totalEasy}</span>
                    </div>
                  </div>
                  <div className="bg-[#3e3e3e]/40 rounded-lg px-4 py-2 w-full max-w-[120px]">
                    <div className="text-[#ffc01e] text-xs font-medium mb-0.5">Med.</div>
                    <div className="text-[#eff2f6] font-semibold text-sm">
                      {stats.mediumSolved}<span className="text-gray-500 font-normal">/{stats.totalMedium}</span>
                    </div>
                  </div>
                  <div className="bg-[#3e3e3e]/40 rounded-lg px-4 py-2 w-full max-w-[120px]">
                    <div className="text-[#ef4743] text-xs font-medium mb-0.5">Hard</div>
                    <div className="text-[#eff2f6] font-semibold text-sm">
                      {stats.hardSolved}<span className="text-gray-500 font-normal">/{stats.totalHard}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges Card */}
              <div
                className="bg-[#282828] rounded-xl p-6 shadow-sm relative overflow-hidden flex flex-col cursor-pointer hover:bg-[#2c2c2c] transition-colors"
                onClick={() => setShowBadgeModal(true)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Badges</div>
                    <div className="text-3xl font-semibold text-[#eff2f6]">{stats.badges?.length || 0}</div>
                  </div>
                  <ChevronRight className="text-gray-500" />
                </div>

                <div className="mt-auto">
                  <div className="text-gray-400 text-xs mb-3">Most Recent Badge</div>
                  {stats.badges?.length > 0 ? (
                    <div className="flex items-center gap-3">
                      <img src={getFullIconUrl(stats.badges[0].icon)} alt="Badge" className="w-14 h-14 object-contain drop-shadow-md" />
                      <div className="text-[#eff2f6] text-sm font-semibold truncate max-w-[150px]">
                        {stats.badges[0].displayName}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No badges earned yet</div>
                  )}
                </div>

                {stats.badges?.length > 0 && stats.badges[1] && (
                  <img src={getFullIconUrl(stats.badges[1].icon)} className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 object-contain pointer-events-none" />
                )}
              </div>
            </div>

            {/* Heatmap Card */}
            <div className="bg-[#282828] rounded-xl p-6 shadow-sm">
              <div className="text-gray-400 text-sm mb-6 flex items-center">
                <span className="text-[#eff2f6] font-semibold mr-1">454</span> submissions in the past one year
                <span className="ml-auto text-xs text-gray-500 flex gap-4">
                  <span>Total active days: <span className="text-[#eff2f6]">113</span></span>
                  <span>Max streak: <span className="text-[#eff2f6]">41</span></span>
                </span>
              </div>
              {renderHeatmap()}
            </div>

            {/* Submissions & Solutions List */}
            <div className="bg-[#282828] rounded-xl shadow-sm overflow-hidden flex flex-col">

              {/* Tabs */}
              <div className="flex gap-2 p-2 bg-[#2c2c2c] border-b border-[#3e3e3e] overflow-x-auto custom-scrollbar">
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium whitespace-nowrap transition-colors ${activeTab === "recent" ? "text-[#eff2f6] bg-[#3e3e3e]" : "text-gray-400 hover:bg-[#3e3e3e]/50 hover:text-[#eff2f6]"
                    }`}
                >
                  <Activity size={16} /> Recent AC
                </button>
                <button
                  onClick={() => setActiveTab("list")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium whitespace-nowrap transition-colors ${activeTab === "list" ? "text-[#eff2f6] bg-[#3e3e3e]" : "text-gray-400 hover:bg-[#3e3e3e]/50 hover:text-[#eff2f6]"
                    }`}
                >
                  <List size={16} /> List
                </button>
                <button
                  onClick={() => setActiveTab("solutions")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium whitespace-nowrap transition-colors ${activeTab === "solutions" ? "text-[#eff2f6] bg-[#3e3e3e]" : "text-gray-400 hover:bg-[#3e3e3e]/50 hover:text-[#eff2f6]"
                    }`}
                >
                  <FileCheck2 size={16} /> Solutions
                </button>
                <button
                  onClick={() => setActiveTab("discuss")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium whitespace-nowrap transition-colors ${activeTab === "discuss" ? "text-[#eff2f6] bg-[#3e3e3e]" : "text-gray-400 hover:bg-[#3e3e3e]/50 hover:text-[#eff2f6]"
                    }`}
                >
                  <MessageCircle size={16} /> Discuss
                </button>

                {activeTab === "solutions" && (
                  <div className="ml-auto text-xs text-gray-500 flex items-center gap-4 px-2 whitespace-nowrap">
                    <span className="text-[#eff2f6] flex items-center gap-1 cursor-pointer"><Activity size={12} /> Most Recent</span>
                    <span className="hover:text-[#eff2f6] flex items-center gap-1 cursor-pointer"><ThumbsUp size={12} /> Most Votes</span>
                  </div>
                )}
                {activeTab !== "solutions" && (
                  <a href={`https://leetcode.com/${username}/`} target="_blank" rel="noreferrer" className="ml-auto text-xs text-blue-400 hover:text-blue-300 flex items-center self-center px-2 whitespace-nowrap">
                    View all {activeTab === "recent" ? "submissions" : activeTab} <ChevronRight size={14} />
                  </a>
                )}
              </div>

              {/* List Content */}
              <div className="flex flex-col min-h-[300px]">
                {activeTab === "recent" && (
                  stats.recentSubmissions?.length > 0 ? (
                    stats.recentSubmissions.slice(0, 10).map((sub, i) => (
                      <a
                        key={i}
                        href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 border-b border-[#3e3e3e]/50 last:border-0 hover:bg-[#3e3e3e]/30 transition-colors group"
                      >
                        <span className="text-[#eff2f6] font-medium text-sm group-hover:text-blue-400 transition-colors">
                          {sub.title}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {timeAgo(sub.timestamp)}
                        </span>
                      </a>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500 text-sm">No recent submissions found.</div>
                  )
                )}

                {activeTab === "solutions" && (
                  stats.solutions?.length > 0 ? (
                    stats.solutions.map((sol, i) => (
                      <a
                        key={i}
                        href={`https://leetcode.com${sol.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 border-b border-[#3e3e3e]/50 last:border-0 hover:bg-[#3e3e3e]/30 transition-colors group"
                      >
                        <span className="text-[#eff2f6] font-medium text-sm group-hover:text-blue-400 transition-colors">
                          <span className="font-semibold">{sol.questionTitle}</span> - {sol.title}
                        </span>
                        <div className="flex items-center gap-4 text-gray-500 text-xs shrink-0">
                          <span>{timeAgo(sol.post?.creationDate)}</span>
                          <span className="flex items-center gap-1.5"><ThumbsUp size={12} /> {sol.post?.voteCount || 0}</span>
                          <span className="flex items-center gap-1.5"><Eye size={14} /> {sol.viewCount || 0}</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500 text-sm">No solutions published yet.</div>
                  )
                )}

                {(activeTab === "list" || activeTab === "discuss") && (
                  <div className="p-8 text-center text-gray-500 text-sm flex flex-col items-center justify-center h-full flex-1">
                    <p>This tab is currently empty or under construction.</p>
                    <a href={`https://leetcode.com/${username}/`} target="_blank" rel="noreferrer" className="text-blue-400 mt-2 hover:underline">View on LeetCode</a>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </AnimatedSection>

      {/* Badge Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#282828] border border-[#3e3e3e] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-[#3e3e3e]">
              <h2 className="text-[#eff2f6] text-xl font-bold">Badge List</h2>
              <button
                onClick={() => setShowBadgeModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8">
              {Object.keys(groupedBadges).length > 0 ? (
                Object.keys(groupedBadges).map(category => (
                  <div key={category}>
                    <h3 className="text-gray-400 text-sm mb-4">
                      {badgeCategories[category] || category}
                    </h3>
                    <div className="flex flex-wrap gap-x-8 gap-y-6">
                      {groupedBadges[category].map((badge, idx) => (
                        <div key={idx} className="flex flex-col items-center group w-24">
                          <div className="w-16 h-16 relative flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                            <img
                              src={getFullIconUrl(badge.medal?.config?.icon || badge.icon)}
                              alt={badge.displayName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-[#eff2f6] text-xs font-semibold text-center w-full truncate">
                            {badge.displayName || badge.shortName}
                          </div>
                          <div className="text-gray-500 text-[10px] mt-1">
                            {badge.creationDate}
                          </div>
                          {badge.category === "DCC" && (
                            <div className="text-[#2cbb5d] text-[10px] mt-1 flex items-center gap-1">
                              <CheckCircle2 size={10} /> Active
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No badges found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}


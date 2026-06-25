
import React from "react";
import { Code2, GitPullRequest, Hash, Terminal, Zap } from "lucide-react";

export default function ActiveTracks() {
  const tracks = [
    {
      id: 1,
      title: "Full Stack Development",
      description: "Building production MERN and Next.js apps with TypeScript. Currently: DevFlow and CodeTrack.",
      icon: <Code2 size={16} className="text-blue-400" />,
      iconBg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      id: 2,
      title: "Open Source",
      description: "Contributing to Next.js, Prisma, shadcn-ui — giving back to tools I use every day. 4 PRs merged.",
      icon: <GitPullRequest size={16} className="text-emerald-400" />,
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: 3,
      title: "DSA Preparation",
      description: "120+ day streak on LeetCode, 340+ problems. Currently working through graph algorithms and advanced DP.",
      icon: <Hash size={16} className="text-amber-500" />,
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      id: 4,
      title: "Interview Preparation",
      description: "System design sessions, behavioral mock interviews, and FAANG-pattern problems with peers.",
      icon: <Terminal size={16} className="text-rose-400" />,
      iconBg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      id: 5,
      title: "Learning New Tech",
      description: "Currently: Rust basics, Cloudflare Workers edge computing, and AI-integrated application patterns.",
      icon: <Zap size={16} className="text-purple-400" />,
      iconBg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <section
      className="relative min-h-screen w-full bg-[#030712] text-white overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="space-y-4 mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono">
            Currently
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What are you working on?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
            Five tracks I'm actively running in parallel — because staying still
            feels wrong.
          </p>
        </div>

        {/* Responsive Flex/Grid Layout Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group p-6 rounded-2xl bg-[#0b0f19]/60 border border-slate-800/80 hover:border-slate-700/80 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Circular Framework Icon Badge */}
                <div
                  className={`w-9 h-9 rounded-xl border ${track.iconBg} flex items-center justify-center shrink-0`}
                >
                  {track.icon}
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-normal">
                    {track.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


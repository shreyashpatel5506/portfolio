import React from "react";

export default function QuestionAnswer() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#030712] text-white overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 items-start">
          {/* Left Sticky Column - Title Panel */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-widest uppercase border border-violet-500/25 text-violet-400 bg-violet-500/[0.07] font-mono">
              Interview Room
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Tell me
              <br />
              about
              <br />
              yourself.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed pt-1">
              The question every recruiter asks first. Here's my honest,
              unscripted answer.
            </p>
          </div>

          {/* Right Column - Q&A Interactive Thread */}
          <div className="space-y-5">
            {/* Question Card */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-bold text-indigo-400 font-mono">
                  Q
                </span>
              </div>
              <div className="flex-1 p-5 rounded-2xl bg-[#0b0f19]/60 border border-slate-800">
                <p className="text-slate-200 font-medium text-sm md:text-base">
                  Tell me about yourself and your journey into software
                  development.
                </p>
              </div>
            </div>

            {/* Answer Card */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  A
                </span>
              </div>
              <div className="flex-1 p-5 rounded-2xl bg-[#0b0f19]/60 border border-slate-800/60 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  I'm Shreyash Patel — a Full Stack Developer based in India who
                  genuinely loves the craft of building software. My journey
                  started in 2021 when I built my first webpage and realized
                  that turning ideas into working products is one of the most
                  satisfying things you can do.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I went from HTML basics to production MERN stack applications
                  in about two years. Along the way, I became obsessed with
                  understanding the full stack — why a database query is slow,
                  how Next.js hydration actually works, what makes a UI feel
                  instant even when it isn't. I want to understand things, not
                  just use them.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Outside building projects, I solve DSA problems daily on
                  LeetCode (340+ problems, 120+ day streak), contribute to open
                  source tools I actually use, and stay deep in the Node.js and
                  React ecosystems. I'm looking for a team where I can ship real
                  features, learn from strong engineers, and grow into a senior
                  developer role.
                </p>

                {/* Tech Tags Container */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "MERN Stack",
                    "Next.js",
                    "TypeScript",
                    "System Design",
                    "Open Source",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-violet-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Metrics Sub-Grid Row */}
            <div className="grid grid-cols-3 gap-4 pl-0 sm:pl-12 pt-3">
              <div className="p-4 rounded-xl bg-[#0b0f19]/40 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-indigo-400">3+</div>
                <div className="text-xs text-slate-500 mt-1">
                  Years building
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b0f19]/40 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-indigo-400">340+</div>
                <div className="text-xs text-slate-500 mt-1">LC problems</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b0f19]/40 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-indigo-400">4</div>
                <div className="text-xs text-slate-500 mt-1">
                  OSS PRs merged
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

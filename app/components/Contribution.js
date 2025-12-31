"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function ContributionSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/contributions")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="relative z-10 pt-10 pb-32 px-4 md:px-10 bg-[#0F1629] text-white">
      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl text-center pb-12 font-semibold
        bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Open Source Contributions
      </h1>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {items.map(item => (
          <ContributionCard key={item._id || item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function ContributionCard({ item }) {
  return (
    <div className="relative group w-full max-w-sm cursor-pointer
      bg-gradient-to-br from-[#1B233A] to-[#151B2E]
      rounded-2xl overflow-hidden shadow-lg
      transition-all duration-300 hover:-translate-y-1">

      {/* CONTENT */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm font-medium">
          {item.type}
        </p>

        <p className="text-gray-500 text-xs mt-1">
          {new Date(item.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        {item.description && (
          <p className="text-gray-300 text-sm mt-4 line-clamp-3">
            {item.description}
          </p>
        )}
      </div>

      {/* HOVER OVERLAY */}
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center
        gap-5 opacity-0 group-hover:opacity-100 transition-all duration-300">

        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/10 hover:bg-cyan-600 transition"
          >
            <GitHubIcon />
            <span className="text-sm">GitHub</span>
          </a>
        )}

        {item.websiteUrl && (
          <a
            href={item.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/10 hover:bg-purple-600 transition"
          >
            <ExternalLink size={16} />
            <span className="text-sm">Website</span>
          </a>
        )}
      </div>
    </div>
  );
}

/* ================= ICON ================= */

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56v-2.1c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 012.86-.38c.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.64.41.36.77 1.07.77 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

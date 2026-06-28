"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import AnimatedSection from "./ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export default function ExperiencePreview() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/expierence");
        const data = await res.json();
        setExperiences(data.experiences?.slice(0, 3) || []); // Get top 3
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col lg:flex-row justify-between items-end mb-8">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional journey and the companies I've helped build."
          badge="Career"
        />
        <Link
          href="/experience"
          className="hidden lg:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium pb-16 transition-colors"
        >
          View full timeline <ArrowRight size={18} />
        </Link>
      </div>

      <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-12">
        {loading ? (
          <p className="text-slate-400 pl-6">Loading experience...</p>
        ) : experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={exp._id} className="relative pl-8 md:pl-10 group">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1 h-[10px] w-[10px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)] group-hover:scale-150 transition-transform"></div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h3 className="text-xl font-bold text-slate-100">{exp.position}</h3>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <Briefcase size={14} /> {exp.company}
                </span>
              </div>

              <p className="text-slate-400 text-sm font-mono mb-4">
                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-3xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.skills?.slice(0, 5).map((skill, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 pl-6">No experience added yet.</p>
        )}
      </div>

      <div className="mt-12 flex justify-center lg:hidden">
        <Link
          href="/experience"
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors border border-emerald-500/30 px-6 py-3 rounded-xl bg-emerald-500/10"
        >
          View full timeline <ArrowRight size={18} />
        </Link>
      </div>
    </AnimatedSection>
  );
}

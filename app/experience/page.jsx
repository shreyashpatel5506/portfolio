"use client";
import React, { useEffect, useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/expierence");
        const data = await res.json();
        setExperiences(data.experiences || []);
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
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10">
      <AnimatedSection>
        <div className="mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono mb-4">
            Career
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Work Experience
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm md:text-base">
            My professional journey, roles I've held, and the impact I've made across different organizations.
          </p>
        </div>

        <div className="max-w-4xl">
          {loading ? (
            <p className="text-slate-400">Loading timeline...</p>
          ) : experiences.length > 0 ? (
            <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-16 pb-10">
              {experiences.map((exp, index) => (
                <div key={exp._id} className="relative pl-8 md:pl-12 group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-1 h-[16px] w-[16px] rounded-full border-4 border-[#030712] bg-emerald-500 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.4)]"></div>
                  
                  {/* Date Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 mb-4">
                    <Calendar size={12} />
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </div>

                  <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-emerald-500/30 transition-colors shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-1 group-hover:text-emerald-400 transition-colors">{exp.position}</h3>
                        <div className="text-lg text-emerald-500 font-medium flex items-center gap-2">
                          <Briefcase size={18} /> {exp.company}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-wrap">
                      {exp.description}
                    </p>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="pt-6 border-t border-slate-800/60">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Skills & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <span key={i} className="text-sm px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-3xl">
               <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-4">
                 <Briefcase size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No experience found</h3>
               <p className="text-slate-400">Timeline will be populated soon.</p>
             </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}

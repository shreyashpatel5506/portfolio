"use client";
import React, { useEffect, useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

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
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10 pb-24 overflow-hidden">
      <AnimatedSection>
        <div className="mb-20 text-center max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono mb-4">
            Career
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Work Experience
          </h1>
          <p className="mt-4 text-slate-400 leading-relaxed text-sm md:text-base">
            My professional journey, roles I've held, and the impact I've made across different organizations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {loading ? (
             <div className="flex justify-center py-20">
               <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : experiences.length > 0 ? (
            <div className="relative">
              {/* Central Timeline Line (Desktop) / Left Line (Mobile) */}
              <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 md:-translate-x-1/2"></div>

              <div className="space-y-12 md:space-y-24 pt-8">
                {experiences.map((exp, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div 
                      key={exp._id || index} 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                      className="relative flex flex-col md:flex-row items-start md:items-center w-full group"
                    >
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-[13px] md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full border-4 border-[#030712] bg-emerald-500 md:-translate-x-1/2 md:-translate-y-1/2 group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10"></div>

                      {/* Content Card container - alternating sides on md+ */}
                      <div className={`w-full md:w-1/2 pl-12 md:px-12 flex ${isEven ? "md:justify-end" : "md:justify-start md:ml-auto"}`}>
                        
                        {/* The Card */}
                        <div className={`w-full max-w-xl bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-emerald-500/30 transition-all shadow-xl group-hover:shadow-emerald-900/10 ${isEven ? "md:text-right" : "md:text-left"}`}>
                          
                          {/* Date Badge */}
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 mb-5 ${isEven ? "md:ml-auto" : ""}`}>
                            <Calendar size={12} className="text-emerald-500/70" />
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                          </div>

                          <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                            {exp.position}
                          </h3>
                          
                          <div className={`text-lg text-emerald-500 font-medium flex items-center gap-2 mb-5 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                            <Briefcase size={18} className="opacity-80" /> 
                            {exp.company}
                          </div>
                          
                          <p className={`text-slate-300 leading-relaxed text-sm md:text-base mb-6 ${isEven ? "md:ml-auto" : ""}`}>
                            {exp.description}
                          </p>

                          {exp.skills && exp.skills.length > 0 && (
                            <div className={`pt-6 border-t border-slate-800/60 ${isEven ? "md:text-right" : "md:text-left"}`}>
                              <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                                {exp.skills.map((skill, i) => (
                                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
             <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-3xl max-w-2xl mx-auto">
               <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
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


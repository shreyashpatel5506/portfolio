"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiVercel,
  SiRender,
  SiRedux,
  SiCss,
  SiJsonwebtokens,
  SiSupabase,
  SiC,
  SiCloudinary
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";

import { FaDatabase, FaJava, FaPython } from "react-icons/fa";

// Ensure all commonly requested icons are covered
const iconMap = {
  c: SiC,
  java: FaJava,
  python: FaPython,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  redux: SiRedux,
  nodejs: SiNodedotjs,
  expressjs: SiExpress,
  mongodb: SiMongodb,
  sql: SiMysql,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  postman: SiPostman,
  vercel: SiVercel,
  render: SiRender,
  vscode: VscVscode,
  database: FaDatabase,
  jwt: SiJsonwebtokens,
  cloudinary: SiCloudinary,
  supabase: SiSupabase,
};

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills/getskills");
        if (res.ok) {
          const data = await res.json();
          if (data.skills && data.skills.length > 0) {
            setSkills(data.skills);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-16 relative w-full bg-[#030712] text-white overflow-hidden flex flex-col justify-center" id="skills">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono mb-4">
            Arsenal
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Technical Arsenal
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm">
            Technologies and tools I use to build scalable web applications.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center text-slate-500 py-10 text-sm">
            No skills have been added yet. Add them in the admin dashboard.
          </div>
        ) : (
          <div className="space-y-10">
            {skills.map((category, index) => (
              <motion.div
                key={category._id || index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-bold tracking-tight text-slate-200">
                    {category.category}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-slate-800 to-transparent flex-1"></div>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  className="flex flex-wrap gap-3"
                >
                  {category.skills.map((skill, i) => {
                    const normalizedIconKey = skill.icon ? skill.icon.toLowerCase() : skill.name.toLowerCase();
                    const Icon = iconMap[normalizedIconKey] || iconMap[skill.name.toLowerCase()];

                    return (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b0f19] border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 shadow-sm"
                      >
                        {/* Hover Gradient Background */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />

                        {Icon ? (
                          <div className="text-slate-400 group-hover:text-indigo-400 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(99,102,241,0)] group-hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                            <Icon size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">
                            {'</>'}
                          </div>
                        )}
                        <h4 className="font-medium text-xs text-slate-300 group-hover:text-slate-100 transition-colors">
                          {skill.name}
                        </h4>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


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
import { FaDatabase, FaJava, FaPython, FaLaptopCode, FaServer, FaCode, FaTools } from "react-icons/fa";

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

const iconColors = {
  react: "text-[#61DAFB]",
  nextjs: "text-white",
  html: "text-[#E34F26]",
  html5: "text-[#E34F26]",
  css: "text-[#1572B6]",
  css3: "text-[#1572B6]",
  javascript: "text-[#F7DF1E]",
  typescript: "text-[#3178C6]",
  tailwindcss: "text-[#06B6D4]",
  redux: "text-[#764ABC]",
  nodejs: "text-[#339933]",
  expressjs: "text-white",
  mongodb: "text-[#47A248]",
  sql: "text-[#4479A1]",
  java: "text-[#007396]",
  python: "text-[#3776AB]",
  c: "text-[#A8B9CC]",
  git: "text-[#F05032]",
  github: "text-white",
  docker: "text-[#2496ED]",
  postman: "text-[#FF6C37]",
  vercel: "text-white",
  render: "text-[#46E3B7]",
  cloudinary: "text-[#3448C5]",
  jwt: "text-white",
  supabase: "text-[#3ECF8E]",
};

const getCategoryMeta = (categoryName) => {
  const lower = categoryName.toLowerCase();
  if (lower.includes("front")) {
    return {
      icon: <FaLaptopCode size={24} />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      gradientColor: "via-blue-500/50",
      desc: "Building interactive and responsive user interfaces",
    };
  }
  if (lower.includes("back")) {
    return {
      icon: <FaServer size={24} />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      borderColor: "border-emerald-400/20",
      gradientColor: "via-emerald-500/50",
      desc: "Server-side logic, APIs and authentication",
    };
  }
  if (lower.includes("data")) {
    return {
      icon: <FaDatabase size={24} />,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
      gradientColor: "via-orange-500/50",
      desc: "Storing and managing application data",
    };
  }
  if (lower.includes("lang") || lower.includes("program")) {
    return {
      icon: <FaCode size={24} />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      gradientColor: "via-blue-500/50",
      desc: "Languages I use to build powerful applications",
    };
  }
  if (lower.includes("tool") || lower.includes("plat")) {
    return {
      icon: <FaTools size={24} />,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
      gradientColor: "via-purple-500/50",
      desc: "Tools that enhance my development workflow",
    };
  }
  return {
    icon: <FaCode size={24} />,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    borderColor: "border-indigo-400/20",
    gradientColor: "via-indigo-500/50",
    desc: "Technical skills and technologies",
  };
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
    <section className="py-20 relative w-full bg-[#030712] text-white overflow-hidden flex flex-col justify-center" id="skills">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            My Skills
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base">
            Technologies and tools I use to build scalable web applications.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center text-slate-500 py-20 text-base">
            No skills have been added yet. Add them in the admin dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skills.map((category, index) => {
              const catMeta = getCategoryMeta(category.category);
              
              const isFullWidth = category.category.toLowerCase().includes("tool") || (skills.length % 2 !== 0 && index === skills.length - 1);

              return (
                <motion.div
                  key={category._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-[#0c1220] border border-slate-800/60 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col group hover:border-slate-700 transition-colors ${isFullWidth ? 'lg:col-span-2' : ''}`}
                >
                  {/* Subtle top gradient line */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${catMeta.gradientColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                    <div className={`p-4 rounded-xl ${catMeta.bgColor} border ${catMeta.borderColor} flex-shrink-0 w-fit`}>
                      <div className={`${catMeta.color}`}>
                        {catMeta.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${catMeta.color} mb-1`}>
                        {category.category}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {catMeta.desc}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4 mt-auto"
                  >
                    {category.skills.map((skill) => {
                      const normalizedIconKey = skill.icon ? skill.icon.toLowerCase() : skill.name.toLowerCase();
                      const Icon = iconMap[normalizedIconKey] || iconMap[skill.name.toLowerCase()];
                      const colorClass = iconColors[normalizedIconKey] || "text-slate-300";

                      return (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          whileHover={{ y: -5, scale: 1.05 }}
                          className="flex flex-col items-center justify-center w-[90px] h-[90px] rounded-2xl bg-[#111827] border border-slate-800/80 hover:bg-[#1f2937] hover:border-slate-600 transition-all duration-300 shadow-sm cursor-default"
                        >
                          {Icon ? (
                            <Icon size={34} className={`${colorClass} mb-3`} />
                          ) : (
                            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-mono text-slate-400 mb-3">
                              {'</>'}
                            </div>
                          )}
                          <span className="text-[11px] font-medium text-slate-300 text-center w-full truncate px-2">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}


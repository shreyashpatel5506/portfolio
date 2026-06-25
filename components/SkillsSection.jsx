"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  SiHtml5,
  SiCss,
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
} from "react-icons/si";

import { FaDatabase } from "react-icons/fa";
import { TbBrandRedux } from "react-icons/tb";

const iconMap = {
  html5: SiHtml5,
  css3: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  redux: TbBrandRedux,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  postman: SiPostman,
  vercel: SiVercel,
  database: FaDatabase,
};

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch("/api/skills/getskills");
      const data = await res.json();

      setSkills(data.skills || []);
    };

    fetchSkills();
  }, []);

  return (
    <section className="py-24">
      {" "}
      <div className="max-w-7xl mx-auto px-5">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16"
        >
          Skills
        </motion.h2>

        <div className="space-y-16">
          {skills.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <h3 className="text-3xl font-bold mb-8">{category.category}</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, i) => {
                  const Icon = iconMap[skill.icon];

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.05,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                      }}
                      className="group rounded-2xl border border-zinc-700 bg-zinc-900/50 backdrop-blur-sm p-6 text-center shadow-lg"
                    >
                      {Icon && (
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="flex justify-center text-5xl mb-4"
                        >
                          <Icon />
                        </motion.div>
                      )}

                      <h4 className="font-semibold text-lg">{skill.name}</h4>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

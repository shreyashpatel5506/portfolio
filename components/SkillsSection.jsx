"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-16">Skills</h2>

        <div className="space-y-12">
          {skills.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold">{category.category}</h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: i * 0.05,
                    }}
                    className="px-4 py-2 rounded-full border"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

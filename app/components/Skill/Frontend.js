"use client";

import React from "react";
import { motion } from "motion/react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

const frontendSkills = [
    { icon: <FaHtml5 className="text-[#E44D26]" />, level: 90, name: "HTML5" },
    { icon: <FaCss3Alt className="text-[#1572B6]" />, level: 90, name: "CSS3" },
    { icon: <FaJsSquare className="text-[#F7DF1E]" />, level: 88, name: "JavaScript" },
    { icon: <FaReact className="text-[#61DBFB]" />, level: 88, name: "React.js" },
    { icon: <SiNextdotjs className="text-white" />, level: 70, name: "Next.js" },
    { icon: <SiTailwindcss className="text-[#38BDF8]" />, level: 75, name: "Tailwind CSS" },
];

export default function Frontend() {
    return (
        <section className="w-full py-12 bg-[#0F1629] text-white flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Frontend Skills
            </h2>

            {/* Responsive grid */}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
        gap-6 sm:gap-8 justify-items-center px-4 sm:px-6 md:px-10 max-w-6xl"
            >
                {frontendSkills.map((skill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1.10,
                            rotate: 4,
                            boxShadow: "0 0 15px rgba(48,165,133,0.6)",
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            scale: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 2,
                                ease: "easeInOut",
                            },
                            rotate: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 2,
                                ease: "easeInOut",
                            },
                            boxShadow: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 2,
                                ease: "easeInOut",
                            },
                        }}
                        className="flex flex-col items-center justify-center gap-2 
            bg-[#0F172A] p-5 sm:p-6 rounded-xl 
            w-28 h-28 sm:w-32 sm:h-32 
            shadow-md hover:scale-105 transition-transform duration-300"
                    >
                        <div className="text-4xl sm:text-5xl">{skill.icon}</div>
                        <span className="text-xs sm:text-sm text-[#30A585] font-semibold">
                            {skill.level}%
                        </span>
                        <span className="text-xs sm:text-sm text-gray-300 text-center">
                            {skill.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

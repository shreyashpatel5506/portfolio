"use client";

import React from "react";
import { motion } from "motion/react";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress, SiJsonwebtokens, SiPostman } from "react-icons/si";

const backendSkills = [
    { icon: <FaNodeJs className="text-[#3C873A]" />, name: "Node.js", level: 85 },
    { icon: <SiExpress className="text-gray-200" />, name: "Express.js", level: 90 },
    { icon: <SiJsonwebtokens className="text-[#F7B731]" />, name: "JWT Auth", level: 80 },
    { icon: <SiPostman className="text-[#FF6C37]" />, name: "Postman", level: 75 },
];

export default function Backend() {
    return (
        <section className="w-full py-12 bg-[#0F1629] text-white flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Backend Skills
            </h2>

            {/* Responsive grid layout */}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        gap-6 sm:gap-8 justify-items-center px-4 sm:px-6 md:px-10 max-w-5xl"
            >
                {backendSkills.map((skill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1.05,
                            rotate: 3,
                            boxShadow: "0 0 15px rgba(48,165,133,0.6)",
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            scale: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 3.5,
                                ease: "easeInOut",
                            },
                            rotate: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 3.5,
                                ease: "easeInOut",
                            },
                            boxShadow: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 3.5,
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

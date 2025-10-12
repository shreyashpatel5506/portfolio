"use client";

import React from "react";
import { motion } from "motion/react";
import { SiMongodb, SiMongoose, SiMysql } from "react-icons/si";

const databaseSkills = [
    { icon: <SiMongodb className="text-[#4DB33D]" />, name: "MongoDB", level: 85 },
    { icon: <SiMongoose className="text-[#880000]" />, name: "Mongoose", level: 85 },
    { icon: <SiMysql className="text-[#00758F]" />, name: "MySQL", level: 70 },
];

export default function Database() {
    return (
        <section className="w-full py-12 bg-[#0F1629] text-white flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Database Skills
            </h2>

            {/* Responsive Grid Layout */}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        gap-6 sm:gap-8 justify-items-center px-4 sm:px-6 md:px-10 max-w-5xl"
            >
                {databaseSkills.map((skill, i) => (
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

import React from "react";
import { FaGitAlt, FaGithub } from "react-icons/fa";
import { SiVercel, SiRender } from "react-icons/si";
import { motion } from "motion/react"
const tools = [
    { icon: <FaGitAlt className="text-[#F05032]" />, name: "Git", level: 90 },
    { icon: <FaGithub className="text-white" />, name: "GitHub", level: 90 },
    { icon: <SiVercel className="text-white" />, name: "Vercel", level: 75 },
    { icon: <SiRender className="text-[#46E3B7]" />, name: "Render", level: 75 }
];

export default function Tools() {
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, i) => (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    key={i}
                    className="group relative flex flex-col items-center gap-2 bg-[#0F172A] p-5 rounded-xl w-28 h-28 shadow-md cursor-pointer"
                    whileHover={{
                        scale: 1.15,
                        rotate: 5, // slight rotation
                        skew: "5deg, 5deg", // skew effect
                        boxShadow: "0 0 20px #30A585",
                    }}
                    whileTap={{ scale: 0.95 }} // click feedback
                >
                    <div className="group relative flex flex-col items-center gap-2 bg-[#0F172A] p-5 rounded-xl w-28 h-32 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_#30A585]">
                        <div className="text-5xl">{tool.icon}</div>
                        <span className="text-sm text-[#30A585] font-semibold">{tool.level}%</span>
                        <span className="text-sm text-gray-300">{tool.name}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

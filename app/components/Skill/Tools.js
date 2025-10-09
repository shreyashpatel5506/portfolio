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
                    className="group relative flex flex-col items-center gap-2 bg-[#0F172A] p-5 rounded-xl w-28 h-28 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_#30A585]"
                >
                    <div className="text-5xl">{tool.icon}</div>
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[#30A585] font-semibold text-lg rounded-xl transition">
                        {tool.level}%
                    </div>
                    <span className="text-sm text-gray-300">{tool.name}</span>
                </motion.div>
            ))}
        </div>
    );
}

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
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: 1,
                        y: 0,

                        scale: 1.09,
                        rotate: 3,
                        skew: "5deg, 5deg",
                        boxShadow: "0 0 20px #30A585",
                    }}
                    transition={{

                        duration: 0.6,
                        ease: "easeOut",
                        scale: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 3.5,
                            ease: "easeInOut"
                        },
                        rotate: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 3.5,
                            ease: "easeInOut"
                        },
                        skew: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 3.5,
                            ease: "easeInOut"
                        },
                        boxShadow: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 3.5,
                            ease: "easeInOut"
                        },
                    }}
                    className="flex flex-col items-center gap-2 bg-[#0F172A] p-5 rounded-xl w-32 h-32 shadow-md"
                >
                    {/* I've also simplified the inner content slightly */}
                    <div className="text-5xl">{tool.icon}</div>
                    <span className="text-sm text-[#30A585] font-semibold">{tool.level}%</span>
                    <span className="text-sm text-gray-300">{tool.name}</span>
                </motion.div>
            ))}
        </div>
    );
}

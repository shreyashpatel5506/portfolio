import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { motion } from "motion/react"
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
        <div className="flex  gap-8 justify-center items-center flex-wrap">
            {frontendSkills.map((skill, i) => (
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


                    {/* Hover overlay with percentage */}
                    <div className="group relative flex flex-col items-center gap-2 bg-[#0F172A] p-5 rounded-xl w-28 h-32 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_#30A585]">
                        <div className="text-5xl">{skill.icon}</div>
                        <span className="text-sm text-[#30A585] font-semibold">{skill.level}%</span>
                        <span className="text-sm text-gray-300">{skill.name}</span>
                    </div>
                </motion.div>
            ))
            }
        </div >
    );
}

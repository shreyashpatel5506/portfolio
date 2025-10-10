import React from "react";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress, SiJsonwebtokens, SiPostman } from "react-icons/si";
import { motion } from "motion/react"
const backendSkills = [
    { icon: <FaNodeJs className="text-[#3C873A]" />, name: "Node.js", level: 85 },
    { icon: <SiExpress className="text-gray-200" />, name: "Express.js", level: 90 },
    { icon: <SiJsonwebtokens className="text-[#F7B731]" />, name: "JWT Auth", level: 80 },
    { icon: <SiPostman className="text-[#FF6C37]" />, name: "Postman", level: 75 },
];

export default function Backend() {
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {backendSkills.map((skill, i) => (
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
                        <div className="text-5xl">{skill.icon}</div>
                        <span className="text-sm text-[#30A585] font-semibold">{skill.level}%</span>
                        <span className="text-sm text-gray-300">{skill.name}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

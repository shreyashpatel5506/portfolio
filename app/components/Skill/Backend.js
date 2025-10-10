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
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        // These are the properties that will loop
                        scale: 1.15,
                        rotate: 5,
                        skew: "5deg, 5deg",
                        boxShadow: "0 0 20px #30A585",
                    }}
                    transition={{
                        // Default transition for the initial animation (opacity, y)
                        duration: 0.6,
                        ease: "easeOut",

                        // We define specific, repeating transitions for the looping properties.
                        // "repeatType: 'reverse'" makes the animation go back and forth smoothly.
                        scale: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            ease: "easeInOut"
                        },
                        rotate: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            ease: "easeInOut"
                        },
                        skew: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            ease: "easeInOut"
                        },
                        boxShadow: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            ease: "easeInOut"
                        },
                    }}
                    className="flex flex-col items-center gap-2 bg-[#0F172A] p-5 rounded-xl w-32 h-32 shadow-md"
                >
                    {/* I've also simplified the inner content slightly */}
                    <div className="text-5xl">{skill.icon}</div>
                    <span className="text-sm text-[#30A585] font-semibold">{skill.level}%</span>
                    <span className="text-sm text-gray-300">{skill.name}</span>
                </motion.div>
            ))}
        </div>
    );
}

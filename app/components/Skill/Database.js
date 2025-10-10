import React from "react";
import { SiMongodb, SiMongoose, SiMysql } from "react-icons/si";
import { motion } from "motion/react"
const databaseSkills = [
    { icon: <SiMongodb className="text-[#4DB33D]" />, name: "MongoDB", level: 85 },
    { icon: <SiMongoose className="text-[#880000]" />, name: "Mongoose", level: 85 },
    { icon: <SiMysql className="text-[#00758F]" />, name: "MySQL", level: 70 },
];

export default function Database() {
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {databaseSkills.map((skill, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        // These are the properties that will loop
                        scale: 1.09,
                        rotate: 3,
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
                    <div className="text-5xl">{skill.icon}</div>
                    <span className="text-sm text-[#30A585] font-semibold">{skill.level}%</span>
                    <span className="text-sm text-gray-300">{skill.name}</span>
                </motion.div>
            ))}
        </div>
    );
}

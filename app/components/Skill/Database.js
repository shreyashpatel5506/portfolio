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

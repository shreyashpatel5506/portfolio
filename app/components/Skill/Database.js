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
                    className="group relative flex flex-col items-center gap-2 bg-[#0F172A] p-5 rounded-xl w-28 h-28 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_#30A585]"
                >
                    <div className="text-5xl">{skill.icon}</div>
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[#30A585] font-semibold text-lg rounded-xl transition">
                        {skill.level}%
                    </div>
                    <span className="text-sm text-gray-300">{skill.name}</span>
                </motion.div>
            ))}
        </div>
    );
}

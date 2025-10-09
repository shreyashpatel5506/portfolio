import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

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
        <div className="flex  gap-8 justify-center items-center">
            {frontendSkills.map((skill, i) => (
                <div
                    key={i}
                    className="group relative flex flex-col items-center gap-2 bg-[#1E293B] p-5 rounded-xl w-28 h-28 transition-all duration-300  hover:scale-110 hover:shadow-lg"
                >
                    <div className="text-5xl">{skill.icon}</div>

                    {/* Hover overlay with percentage */}
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[#30A585] font-semibold text-lg rounded-xl transition">
                        {skill.level}%
                    </div>

                    <span className="text-sm text-gray-300">{skill.name}</span>
                </div>
            ))}
        </div>
    );
}

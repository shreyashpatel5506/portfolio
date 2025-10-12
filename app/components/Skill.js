"use client";

import React, { useState } from "react";
import Frontend from "./Skill/Frontend";
import Backend from "./Skill/Backend";
import Database from "./Skill/Database";
import Tools from "./Skill/Tools";
import { motion, AnimatePresence } from "framer-motion";

const Skill = () => {
    const [activeTab, setActiveTab] = useState("frontend");

    const tabs = [
        { key: "frontend", label: "Frontend", component: <Frontend /> },
        { key: "backend", label: "Backend", component: <Backend /> },
        { key: "database", label: "Database", component: <Database /> },
        { key: "tools", label: "Tools", component: <Tools /> },
    ];

    return (
        <section className="py-16 px-4  sm:px-8 md:px-12 lg:px-20 bg-[#0F1629] text-white">
            {/* Section Title */}
            <h1 className="text-4xl sm:text-5xl text-center font-semibold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Skills
            </h1>

            {/* Tab Buttons */}
            <div className="flex justify-center flex-wrap z-50 gap-3 sm:gap-5 mb-7">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 sm:px-6 py-2  mb-8 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 
              ${activeTab === tab.key
                                ? "bg-[#30A585] text-white shadow-lg scale-105"
                                : "bg-[#0F3460] text-gray-300 hover:bg-[#16213E]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Animated Content Area */}
            <div className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[380px] flex justify-center items-center">
                <AnimatePresence mode="wait">
                    {tabs.map(
                        (tab) =>
                            activeTab === tab.key && (
                                <motion.div
                                    key={tab.key}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute w-full flex justify-center"
                                >
                                    {tab.component}
                                </motion.div>
                            )
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skill;

'use client';

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
        <section className="pt-16 pb-20 md:pb-12 px-4 sm:px-8 md:px-6 lg:px-20 bg-[#0F1629] text-white flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl font-semibold mb-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
                Skills
            </h1>

            {/* Tab Buttons */}
            <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300
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
            <div className="relative w-full flex justify-center flex-wrap md:min-h-[400px]">
                <AnimatePresence mode="wait">
                    {tabs.map(
                        (tab) =>
                            activeTab === tab.key && (
                                <motion.div
                                    key={tab.key}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="w-full flex justify-center px-2 sm:px-4 flex-wrap md:absolute"
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
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
        <div className="pt-10 pb-10 px-6 md:px-10 bg-[#1A1A2E] text-white">
            <h1 className="text-5xl text-center pb-10 font-semibold">Skills</h1>

            {/* Tab Buttons */}
            <div className="flex justify-center gap-4 flex-wrap mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === tab.key
                            ? "bg-[#30A585] text-white shadow-lg scale-105"
                            : "bg-[#0F3460] text-gray-300 hover:bg-[#16213E]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Animated Content */}
            <div className="relative min-h-[200px]">
                <AnimatePresence mode="wait">
                    {tabs.map(
                        (tab) =>
                            activeTab === tab.key && (
                                <motion.div
                                    key={tab.key}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute w-full"
                                >

                                    {tab.component}
                                </motion.div>
                            )
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Skill;

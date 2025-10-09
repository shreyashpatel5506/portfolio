"use client";
import React, { useState } from "react";
import Frontend from "./Skill/Frontend";
import Backend from "./Skill/Backend";
import Database from "./Skill/Database";
import Tools from "./Skill/Tools";

const Skill = () => {
    const [activeTab, setActiveTab] = useState("Frontend");

    const renderTab = () => {
        switch (activeTab) {
            case "Frontend":
                return <Frontend />;
            case "Backend":
                return <Backend />;
            case "Database":
                return <Database />;
            case "Tools":
                return <Tools />;
            default:
                return <Frontend />;
        }
    };

    const tabs = ["Frontend", "Backend", "Database", "Tools"];

    return (
        <section
            id="skills"
            className="min-h-screen bg-[#0F172A] text-white py-16 px-6 md:px-12 border-t border-[#30A585]"
        >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-wide">
                <span className="text-[#30A585]">My</span> Skills
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 max-w-6xl mx-auto">
                {/* Left Side Tabs */}
                <div className="md:col-span-1 flex md:flex-col flex-row justify-center md:justify-start items-center md:items-start gap-5">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative group text-lg font-semibold px-4 py-2 transition-all duration-300 ${activeTab === tab
                                ? "text-[#30A585]"
                                : "text-gray-400 hover:text-[#30A585]"
                                }`}
                        >
                            {tab}
                            <span
                                className={`absolute bottom-0 left-0 h-[2px] bg-[#30A585] transition-all duration-300 ${activeTab === tab ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </button>
                    ))}
                </div>

                {/* Right Side Skills Display */}
                <div className="md:col-span-4 bg-[#1E293B] rounded-2xl p-6 md:p-10 shadow-xl shadow-black/40">
                    {renderTab()}
                </div>
            </div>
        </section>
    );
};

export default Skill;

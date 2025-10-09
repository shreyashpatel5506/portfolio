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
        <div className="pt-10 pb-10 px-6 md:px-10 bg-[#1A1A2E]">
            <h1 className="text-2xl text-center pb-10 text-white font-semibold">Skills</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Left Side Buttons */}
                <div className="flex flex-col gap-4 items-start justify-start md:col-span-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`ghost-button text-lg font-semibold transition-all duration-300 ${activeTab === tab
                                ? "text-[#30A585] border-l-4 border-[#30A585] pl-2"
                                : "text-gray-400 hover:text-[#30A585]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Right Side Display */}
                <div className="md:col-span-3 min-w-3/4">{renderTab()}</div>
            </div>
        </div>
    );
};

export default Skill;

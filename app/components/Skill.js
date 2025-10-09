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
        <div className=" pt-10 pb-10  px-6 md:px-10">
            <h1 className="text-2xl text-center items-center pb-25">Skills</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center justify-evenly">
                {/* Left Side Buttons */}
                <div className="flex flex-col gap-5 items-start justify-center  width-1/4" >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`ghost-button text-lg font-semibold transition-all duration-300 ${activeTab === tab
                                ? "text-[#30A585] border-b-2 border-[#30A585]"
                                : "text-gray-400 hover:text-[#30A585]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Right Side Display */}
                <div className="width-3/4 mt-8 md:mt-0">{renderTab()}</div>
            </div>
        </div>
    );
};

export default Skill;

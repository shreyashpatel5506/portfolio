"use client";
import React from "react";
import Frontend from "./Skill/Frontend";
import Backend from "./Skill/Backend";
import Database from "./Skill/Database";
import Tools from "./Skill/Tools";

const Skill = () => {
    return (
        <div className="pt-10 pb-10 px-6 md:px-10 bg-[#1A1A2E]">
            <h1 className="text-2xl text-center pb-10 text-white font-semibold">Skills</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Frontend */}
                <div>
                    <h2 className="text-xl text-[#30A585] font-semibold mb-4">Frontend</h2>
                    <Frontend />
                </div>

                {/* Backend */}
                <div>
                    <h2 className="text-xl text-[#30A585] font-semibold mb-4">Backend</h2>
                    <Backend />
                </div>

                {/* Database */}
                <div>
                    <h2 className="text-xl text-[#30A585] font-semibold mb-4">Database</h2>
                    <Database />
                </div>

                {/* Tools */}
                <div>
                    <h2 className="text-xl text-[#30A585] font-semibold mb-4">Tools</h2>
                    <Tools />
                </div>
            </div>
        </div>
    );
};

export default Skill;

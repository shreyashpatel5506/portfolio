'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Award, BadgeCheck, ExternalLink, School } from "lucide-react";
import { Drawer } from 'vaul';

const Button = ({ children, className = "", onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300 flex items-center justify-center ${className}`}
    >
        {children}
    </button>
);

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [filteredExperiences, setFilteredExperiences] = useState([]);
    const [selected, setSelected] = useState(null);
    const [activeTab, setActiveTab] = useState("All");

    const categories = ["All", "Certificate", "Training", "Award", "Course"];

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
                const res = await fetch(`${baseUrl}/api/experience`);
                const data = await res.json();
                if (data.success) {
                    setExperiences(data.experiences);
                    setFilteredExperiences(data.experiences);
                }
            } catch (err) {
                console.error("Error loading experiences:", err);
            }
        };
        fetchExperiences();
    }, []);

    // Handle filtering when activeTab changes
    useEffect(() => {
        if (activeTab === "All") {
            setFilteredExperiences(experiences);
        } else {
            const filtered = experiences.filter(exp => exp.category === activeTab);
            setFilteredExperiences(filtered);
        }
    }, [activeTab, experiences]);


    // Helper to format dates
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };


    return (
        <div className="relative z-10 pt-10 md:pt-5 pb-32 md:pb-24 px-4 md:px-10 bg-[#0F1629] text-white">
            <h1 className="text-4xl md:text-5xl text-center mt-10 md:mt-4 pb-10 font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Experience & Certificates
            </h1>

            {/* Filter Tabs */}
            <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300
                            ${activeTab === category
                                ? "bg-[#30A585] text-white shadow-lg scale-105"
                                : "bg-[#0F3460] text-gray-300 hover:bg-[#16213E]"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>


            {/* Experience Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
                {filteredExperiences.map((exp) => (
                    <div
                        key={exp._id}
                        onClick={() => setSelected(exp)}
                        className="relative group bg-gradient-to-br from-[#1B233A] to-[#151B2E] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 w-full max-w-xs sm:max-w-sm sm:hover:-translate-y-1"
                    >
                        {/* Experience Image */}
                        <div className="h-48 sm:h-52 w-full relative overflow-hidden">
                            <Image
                                src={exp.image || "https://placehold.co/600x400/1f1f38/ffffff?text=Certificate"}
                                alt={exp.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Experience Info */}
                        <div className="p-5 text-center">
                            <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300 break-words">
                                {exp.title}
                            </h2>
                            <p className="text-gray-400 text-sm font-semibold break-words">
                                Issued by {exp.issuer}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                {formatDate(exp.issueDate)}
                            </p>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Button className="rounded-full bg-white/10 hover:bg-cyan-600 transition">
                                View Details
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Drawer */}
            <Drawer.Root open={!!selected} onOpenChange={setSelected}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />

                    <Drawer.Content
                        className="fixed z-50 bottom-0 left-0 right-0 bg-[#121C33] outline-none rounded-t-2xl shadow-xl transition-all duration-300 md:max-h-[85vh] md:h-auto h-[65vh] sm:h-[70vh] overflow-auto data-[state=open]:animate-slideUp data-[state=closed]:animate-slideDown"
                    >
                        {selected && (
                            <div className="p-6 md:p-10 w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
                                <Drawer.Title className="sr-only">
                                    {selected.title} Details
                                </Drawer.Title>

                                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent break-words">
                                    {selected.title}
                                </h2>
                                <p className="text-gray-300 text-md mt-2">
                                    Issued by <span className="font-semibold">{selected.issuer}</span>
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Issued on: {formatDate(selected.issueDate)}
                                </p>

                                <p className="text-gray-300 text-sm md:text-base mt-4 leading-relaxed break-words">
                                    {selected.description}
                                </p>

                                {selected.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {selected.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}


                                <div className="flex flex-wrap gap-4 mt-6">
                                    {selected.credentialURL && (
                                        <a href={selected.credentialURL} target="_blank" rel="noreferrer">
                                            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                                                <BadgeCheck size={16} className="mr-2" /> Show Credential
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}
'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Linkedin } from "lucide-react";
import { Drawer } from 'vaul';

const Button = ({ children, className = "", onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300 flex items-center justify-center ${className}`}
    >
        {children}
    </button>
);

export default function Project() {
    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true); // <--- loading state

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
                const res = await fetch(`${baseUrl}/api/Project`);
                const data = await res.json();
                if (data.success) setProjects(data.projects);
            } catch (err) {
                console.error("Error loading projects:", err);
            } finally {
                setLoading(false); // stop loading when fetch is done
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="relative z-10 pt-10 md:pt-5 pb-32 md:pb-24 px-4 md:px-10 bg-[#0F1629] text-white">
            <h1 className="text-4xl md:text-5xl text-center mt-10 md:mt-4 pb-10 font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Projects
            </h1>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
                    {projects.map((proj) => (
                        <div
                            key={proj._id}
                            onClick={() => setSelected(proj)}
                            className="relative group bg-gradient-to-br from-[#1B233A] to-[#151B2E] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 w-full max-w-xs sm:max-w-sm sm:hover:-translate-y-1"
                        >
                            {/* Project Image */}
                            <div className="h-48 sm:h-52 w-full relative overflow-hidden">
                                <Image
                                    src={proj.PostImage}
                                    alt={proj.ProjectName}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            </div>

                            {/* Project Info */}
                            <div className="p-5 text-center">
                                <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300 break-words">
                                    {proj.ProjectName}
                                </h2>
                                <p className="text-gray-400 text-sm line-clamp-3 break-words">
                                    {proj.ProjectDescription}
                                </p>
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    {proj.Technologies?.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-base bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold px-4 py-1.5 rounded-full shadow-lg"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                {proj.GithubURL && (
                                    <a href={proj.GithubURL} target="_blank" rel="noreferrer">
                                        <Button className="rounded-full bg-white/10 hover:bg-cyan-600 transition">
                                            <Github size={18} />
                                        </Button>
                                    </a>
                                )}
                                {proj.LiveSiteURL && (
                                    <a href={proj.LiveSiteURL} target="_blank" rel="noreferrer">
                                        <Button className="rounded-full bg-white/10 hover:bg-cyan-600 transition">
                                            <ExternalLink size={18} />
                                        </Button>
                                    </a>
                                )}
                                {proj.LinkedinPostURL && (
                                    <a href={proj.LinkedinPostURL} target="_blank" rel="noreferrer">
                                        <Button className="rounded-full bg-white/10 hover:bg-cyan-600 transition">
                                            <Linkedin size={18} />
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Drawer code remains the same */}
            <Drawer.Root open={!!selected} onOpenChange={setSelected}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />
                    <Drawer.Content
                        className="fixed z-50 bottom-0 left-0 right-0 bg-[#121C33] outline-none rounded-t-2xl shadow-xl transition-all duration-300 md:max-h-[85vh] md:h-auto h-[65vh] sm:h-[70vh] overflow-hidden data-[state=open]:animate-slideUp data-[state=closed]:animate-slideDown"
                    >
                        {selected && (
                            <div className="flex flex-col md:flex-row w-full h-full">
                                <Drawer.Title className="sr-only">{selected.ProjectName} Details</Drawer.Title>
                                <div className="p-6 md:p-10 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
                                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent break-words">
                                        {selected.ProjectName}
                                    </h2>
                                    <p className="text-gray-300 text-sm md:text-base mt-2 leading-relaxed break-words">
                                        {selected.ProjectDescription}
                                    </p>
                                    {selected.ProjectFeatures?.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="font-semibold text-lg text-cyan-400 mb-1">Features</h3>
                                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                                {selected.ProjectFeatures.map((feature, i) => (
                                                    <li key={i}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {selected.Technologies?.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-6">
                                        {selected.GithubURL && (
                                            <a href={selected.GithubURL} target="_blank" rel="noreferrer">
                                                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                                                    <Github size={16} className="mr-2" /> GitHub
                                                </Button>
                                            </a>
                                        )}
                                        {selected.LiveSiteURL && (
                                            <a href={selected.LiveSiteURL} target="_blank" rel="noreferrer">
                                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                                    <ExternalLink size={16} className="mr-2" /> Live Demo
                                                </Button>
                                            </a>
                                        )}
                                        {selected.LinkedinPostURL && (
                                            <a href={selected.LinkedinPostURL} target="_blank" rel="noreferrer">
                                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                    <Linkedin size={16} className="mr-2" /> LinkedIn
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="hidden md:block relative w-full md:w-1/2 h-64 md:h-auto">
                                    <Image
                                        src={selected.PostImage}
                                        alt={selected.ProjectName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
}

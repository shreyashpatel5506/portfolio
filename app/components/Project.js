"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog"; // <- local dialog component

// Simple reusable button component
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

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/Project");
                const data = await res.json();
                if (data.success) setProjects(data.projects);
            } catch (err) {
                console.error("Error loading projects:", err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="pt-16 pb-20 px-6 md:px-10 bg-[#0F1629] text-white min-h-screen">
            <h1 className="text-5xl text-center pb-12 font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Projects
            </h1>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
                {projects.map((proj) => (
                    <div
                        key={proj._id}
                        onClick={() => setSelected(proj)}
                        className="relative group bg-[#1E2A47] rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-cyan-500/30 transition duration-300 max-w-sm w-full"
                    >
                        {/* Image */}
                        <div className="h-52 w-full relative overflow-hidden">
                            <Image
                                src={proj.PostImage}
                                alt="projectImage"
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h2 className="text-xl font-bold mb-2">{proj.ProjectName}</h2>
                            <p className="text-gray-400 text-sm line-clamp-3">
                                {proj.ProjectDescription}
                            </p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {proj.Technologies?.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-2 py-1 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Hover overlay buttons */}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">
                            {proj.GithubURL && (
                                <a href={proj.GithubURL} target="_blank" rel="noreferrer">
                                    <Button>
                                        <Github size={18} />
                                    </Button>
                                </a>
                            )}
                            {proj.LinkedinPostURL && (
                                <a href={proj.LinkedinPostURL} target="_blank" rel="noreferrer">
                                    <Button>
                                        <Linkedin size={18} />
                                    </Button>
                                </a>
                            )}
                            {proj.LiveSiteURL && (
                                <a href={proj.LiveSiteURL} target="_blank" rel="noreferrer">
                                    <Button>
                                        <ExternalLink size={18} />
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for project details */}
            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                {selected && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selected.ProjectName}</DialogTitle>
                            <DialogDescription>{selected.ProjectDescription}</DialogDescription>
                        </DialogHeader>

                        <div className="mt-4">
                            <Image
                                src={selected.PostImage}
                                alt="projectImage"
                                width={600}
                                height={400}
                                className="rounded-xl mb-4 object-cover w-full"
                            />

                            <h3 className="font-semibold text-lg mb-2">Features:</h3>
                            <ul className="list-disc list-inside text-gray-300 mb-4">
                                {selected.ProjectFeatures?.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {selected.Technologies?.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-2 py-1 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                {selected.GithubURL && (
                                    <a href={selected.GithubURL} target="_blank" rel="noreferrer">
                                        <Button>
                                            <Github size={16} className="mr-2" /> GitHub
                                        </Button>
                                    </a>
                                )}
                                {selected.LinkedinPostURL && (
                                    <a href={selected.LinkedinPostURL} target="_blank" rel="noreferrer">
                                        <Button>
                                            <Linkedin size={16} className="mr-2" /> LinkedIn Post
                                        </Button>
                                    </a>
                                )}
                                {selected.LiveSiteURL && (
                                    <a href={selected.LiveSiteURL} target="_blank" rel="noreferrer">
                                        <Button>
                                            <ExternalLink size={16} className="mr-2" /> Live Demo
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}

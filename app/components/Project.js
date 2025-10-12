"use client";
import React from 'react'
import motion from 'motion'
import { useEffect, useState } from "react";
import Image from 'next/image';
const Project = () => {
    const [projects, setProjects] = useState([]);
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
        <div className="pt-10 pb-10 px-6 md:px-10 bg-[#1A1A2E] text-white">
            <h1 className="text-5xl text-center pb-10 font-semibold">Projects</h1>
            <div className='flex flex-row flex-wrap justify-evenly items-baseline'>
                {projects.map((proj) => (
                    <div key={proj._id} >
                        <Image
                            src={proj.PostImage}
                            width={200}
                            height={200}
                            quality={100}
                            alt='projectImage'
                        />
                        {proj.ProjectName}
                        <br />x
                        {proj.GithubURL}
                        <br />
                        {proj.LinkedinPostURL}
                        <br />
                        {proj.LiveSiteURL}
                        <br />
                        {proj.Technologies}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Project
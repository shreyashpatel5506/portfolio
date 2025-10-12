"use client";
import React, { useState } from "react";

export default function ProjectFormPage() {
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        ProjectName: "",
        ProjectDescription: "",
        ProjectFeatures: "",
        GithubURL: "",
        LinkedinPostURL: "",
        LiveSiteURL: "",
        Technologies: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append("file", file);
        formData.append("ProjectName", form.ProjectName);
        formData.append('ProjectDescription', formData.ProjectDescription);
        formData.append('ProjectFeatures', (formData.ProjectFeatures.split(",")));
        formData.append("GithubURL", form.GithubURL);
        formData.append("LinkedinPostURL", form.LinkedinPostURL);
        formData.append("LiveSiteURL", form.LiveSiteURL);
        formData.append("Technologies", JSON.stringify(form.Technologies.split(",")));

        const res = await fetch("/api/Project", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (data.success) {
            alert("✅ Project created successfully!");
        } else {
            alert("❌ Failed: " + data.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md text-black w-full max-w-md"
            >
                <h2 className="text-xl font-semibold mb-4 text-center">Add New Project</h2>

                <input
                    name="ProjectName"
                    placeholder="Project Name"
                    value={form.ProjectName}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                    required
                />
                <input
                    name="ProjectDescription"
                    placeholder="ProjectDescription"
                    value={form.ProjectDescription}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                    required
                />
                <input
                    name="ProjectFeatures"
                    placeholder="ProjectFeatures"
                    value={form.ProjectFeatures}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                    required
                />

                <input
                    name="GithubURL"
                    placeholder="GitHub URL"
                    value={form.GithubURL}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                <input
                    name="LinkedinPostURL"
                    placeholder="LinkedIn Post URL"
                    value={form.LinkedinPostURL}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                <input
                    name="LiveSiteURL"
                    placeholder="Live Site URL"
                    value={form.LiveSiteURL}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                <input
                    name="Technologies"
                    placeholder="Technologies (comma-separated)"
                    value={form.Technologies}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full mb-3"
                    accept="image/*"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

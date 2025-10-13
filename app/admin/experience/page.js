"use client";
import React, { useState } from "react";

export default function ExperienceFormPage() {
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        title: "",
        issuer: "",
        issueDate: "",
        expirationDate: "",
        description: "",
        credentialURL: "",
        skills: "",
        category: "Certificate", // Default category
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append("file", file);

        formData.append("title", form.title);
        formData.append("issuer", form.issuer);
        formData.append("issueDate", form.issueDate);
        formData.append("expirationDate", form.expirationDate);
        formData.append("description", form.description);
        formData.append("credentialURL", form.credentialURL);
        formData.append("skills", JSON.stringify(form.skills.split(",").map(skill => skill.trim())));
        formData.append("category", form.category);

        const res = await fetch("/api/experience", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (data.success) {
            alert("✅ Experience added successfully!");
            // Optionally reset form
            setForm({
                title: "", issuer: "", issueDate: "", expirationDate: "",
                description: "", credentialURL: "", skills: "", category: "Certificate",
            });
            setFile(null);
        } else {
            alert("❌ Failed: " + data.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md text-black w-full max-w-lg"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">Add New Experience</h2>

                <input name="title" placeholder="Title (e.g., Certified React Developer)" value={form.title} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
                <input name="issuer" placeholder="Issuer (e.g., Vercel)" value={form.issuer} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
                <textarea name="description" placeholder="Description..." value={form.description} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                        <input type="date" name="issueDate" value={form.issueDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date (Optional)</label>
                        <input type="date" name="expirationDate" value={form.expirationDate} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                </div>

                <input name="credentialURL" placeholder="Credential URL" value={form.credentialURL} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
                <input name="skills" placeholder="Skills (comma-separated, e.g., React, Node.js)" value={form.skills} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded mb-4" required>
                        <option value="Certificate">Certificate</option>
                        <option value="Training">Training</option>
                        <option value="Award">Award</option>
                        <option value="Course">Course</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Image (Optional)</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full mb-4 p-2 border rounded" accept="image/*" />
                </div>


                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
                    Submit Experience
                </button>
            </form>
        </div>
    );
}
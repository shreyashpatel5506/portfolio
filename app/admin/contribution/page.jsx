"use client";
import React, { useState } from "react";

export default function ContributionFormPage() {
  const [form, setForm] = useState({
    title: "",
    type: "Open Source",
    description: "",
    githubUrl: "",
    websiteUrl: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      type: form.type,
      description: form.description,
      githubUrl: form.githubUrl,
      websiteUrl: form.websiteUrl,
      notes: form.notes
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean),
    };

    const res = await fetch("/api/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Contribution added successfully!");
      setForm({
        title: "",
        type: "Open Source",
        description: "",
        githubUrl: "",
        websiteUrl: "",
        notes: "",
      });
    } else {
      alert("❌ Failed: " + (data.error || "Something went wrong"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Contribution
        </h2>

        <input
          name="title"
          placeholder="Title (e.g., Fixed Navbar Bug)"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          name="type"
          placeholder="Type (e.g., Open Source, Feature, Bug Fix)"
          value={form.type}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description..."
          value={form.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          rows={3}
        />

        <input
          name="githubUrl"
          placeholder="GitHub PR / Repo URL"
          value={form.githubUrl}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          name="websiteUrl"
          placeholder="Live Website URL (optional)"
          value={form.websiteUrl}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <textarea
          name="notes"
          placeholder={`Notes (one per line)\nMerged PR #451\nReviewed by maintainer`}
          value={form.notes}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          rows={3}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit Contribution
        </button>
      </form>
    </div>
  );
}

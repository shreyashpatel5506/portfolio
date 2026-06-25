"use client";

import SkillsSection from "@/components/SkillsSection";
import React, { useEffect, useState } from "react";

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Programming Languages",
  "Tools",
  "DevOps",
];

export default function SkillPage() {
  const [allSkills, setAllSkills] = useState([]);
  const [category, setCategory] = useState("Frontend");
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills/getskills");
      const data = await res.json();

      setAllSkills(data.skills || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!skillInput.trim()) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("category", category);

      formData.append(
        "skills",
        JSON.stringify(
          skillInput
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        ),
      );

      const res = await fetch("/api/skills/addskills", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSkillInput("");
        fetchSkills();
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8">Skills Management</h1>

      <form
        onSubmit={handleSubmit}
        className="border rounded-xl p-6 mb-10 space-y-4"
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="React, Next.js, Tailwind CSS"
          className="w-full border p-3 rounded-lg"
        />

        <button disabled={loading} className="px-5 py-3 border rounded-lg">
          {loading ? "Adding..." : "Add Skills"}
        </button>
      </form>
      <SkillsSection allSkills={allSkills} />
      <div className="grid gap-5">
        {allSkills.map((item) => (
          <div key={item._id} className="border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">{item.category}</h2>

            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full border">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

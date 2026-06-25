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
  const [skillName, setSkillName] = useState("");
  const [skillIcon, setSkillIcon] = useState("");
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

    if (!skillName.trim() || !skillIcon.trim()) {
      alert("Skill name and icon are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("category", category);

      formData.append(
        "skills",
        JSON.stringify([
          {
            name: skillName.trim(),
            icon: skillIcon.trim(),
          },
        ]),
      );

      const res = await fetch("/api/skills/addskills", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSkillName("");
        setSkillIcon("");
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
    <div className=" mx-auto py-10 px-5 bg-[#030712] w-full min-h-screen text-slate-200">
      {" "}
      <h1 className="text-4xl font-bold mb-8">Skills Management </h1>
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
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="React"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          value={skillIcon}
          onChange={(e) => setSkillIcon(e.target.value)}
          placeholder="react"
          className="w-full border p-3 rounded-lg"
        />

        <button disabled={loading} className="px-5 py-3 border rounded-lg">
          {loading ? "Adding..." : "Add Skill"}
        </button>
      </form>
      <SkillsSection />
      <div className="grid gap-5 mt-10">
        {allSkills.map((item) => (
          <div key={item._id} className="border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">{item.category}</h2>

            <div className="flex flex-wrap gap-3">
              {item.skills.map((skill) => (
                <div key={skill.name} className="px-4 py-2 rounded-lg border">
                  <p className="font-medium">{skill.name}</p>

                  <p className="text-xs opacity-70">Icon: {skill.icon}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

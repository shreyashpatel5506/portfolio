"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: "",
  });

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/expierence");
      const data = await res.json();
      setExperiences(data.experiences || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/expierence/addexpirence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills: skillsArray
        }),
      });

      if (res.ok) {
        setFormData({ company: "", position: "", startDate: "", endDate: "", description: "", skills: "" });
        fetchExperience();
      } else {
        alert("Failed to add experience");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await fetch(`/api/expierence/${id}`, { method: "DELETE" });
      fetchExperience();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Manage Experience</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Add New Role</h2>
              
              <input type="text" placeholder="Company Name" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2" />
              <input type="text" placeholder="Position / Role" required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">End Date (Opt)</label>
                  <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 text-sm" />
                </div>
              </div>

              <textarea placeholder="Job description..." required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 resize-none"></textarea>
              
              <input type="text" placeholder="Skills (comma separated)" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2" />

              <button type="submit" disabled={submitting} className="w-full py-3 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                {submitting ? "Saving..." : <><Plus size={18} /> Add Experience</>}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Experience Timeline</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-4">
                  {experiences.map(exp => (
                    <div key={exp._id} className="flex items-center justify-between p-4 bg-[#030712] border border-slate-800 rounded-2xl">
                      <div>
                        <h3 className="font-bold text-white">{exp.position}</h3>
                        <p className="text-sm text-emerald-400 font-medium">{exp.company}</p>
                      </div>
                      <button onClick={() => handleDelete(exp._id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

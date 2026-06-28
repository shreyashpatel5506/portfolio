"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function AdminJourney() {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "milestone",
    icon: "star",
  });

  const fetchJourneys = async () => {
    try {
      const res = await fetch("/api/journey");
      const data = await res.json();
      setJourneys(data.journeys || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ title: "", description: "", date: "", type: "milestone", icon: "star" });
        fetchJourneys();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/journey/${id}`, { method: "DELETE" });
      fetchJourneys();
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
          <h1 className="text-3xl font-bold text-white">Manage Journey</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Add Milestone</h2>
              
              <input type="text" placeholder="Title (e.g. Learned React)" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Date</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 text-sm">
                    <option value="milestone">Milestone</option>
                    <option value="learning">Learning</option>
                    <option value="project">Project</option>
                    <option value="work">Work</option>
                  </select>
                </div>
              </div>

              <textarea placeholder="Description..." required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 resize-none"></textarea>
              
              <button type="submit" disabled={submitting} className="w-full py-3 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                {submitting ? "Saving..." : <><Plus size={18} /> Add Event</>}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Timeline Events</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-4">
                  {journeys.map(item => (
                    <div key={item._id} className="flex items-center justify-between p-4 bg-[#030712] border border-slate-800 rounded-2xl">
                      <div>
                        <h3 className="font-bold text-white text-sm">{item.title}</h3>
                        <p className="text-xs text-orange-400 font-medium capitalize">{item.type}</p>
                      </div>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
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

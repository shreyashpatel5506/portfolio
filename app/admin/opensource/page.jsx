"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function AdminOpenSource() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    repo: "",
    prTitle: "",
    prUrl: "",
    status: "merged",
    description: "",
    contributionDate: "",
  });

  const fetchOS = async () => {
    try {
      const res = await fetch("/api/opensource");
      const data = await res.json();
      setContributions(data.opensource || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOS();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/opensource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ repo: "", prTitle: "", prUrl: "", status: "merged", description: "", contributionDate: "" });
        fetchOS();
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
      await fetch(`/api/opensource/${id}`, { method: "DELETE" });
      fetchOS();
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
          <h1 className="text-3xl font-bold text-white">Manage Open Source</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Add Contribution</h2>
              
              <input type="text" placeholder="Repository (e.g. facebook/react)" required value={formData.repo} onChange={e => setFormData({...formData, repo: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2" />
              <input type="text" placeholder="PR Title" required value={formData.prTitle} onChange={e => setFormData({...formData, prTitle: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2" />
              <input type="url" placeholder="PR URL" required value={formData.prUrl} onChange={e => setFormData({...formData, prUrl: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2" />
              
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2">
                <option value="merged">Merged</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">Contribution Date</label>
                <input type="date" required value={formData.contributionDate} onChange={e => setFormData({...formData, contributionDate: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 text-sm" />
              </div>

              <textarea placeholder="Description of changes..." required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 resize-none"></textarea>
              
              <button type="submit" disabled={submitting} className="w-full py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                {submitting ? "Saving..." : <><Plus size={18} /> Add PR</>}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Contributions</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-4">
                  {contributions.map(item => (
                    <div key={item._id} className="flex items-center justify-between p-4 bg-[#030712] border border-slate-800 rounded-2xl">
                      <div>
                        <h3 className="font-bold text-white text-sm">{item.prTitle}</h3>
                        <p className="text-xs text-blue-400 font-medium">{item.repo} • {item.status}</p>
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

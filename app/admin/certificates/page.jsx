"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    issuer: "",
    issueDate: "",
    expirationDate: "",
    credentialId: "",
    credentialUrl: "",
    image: null,
  });

  const fetchCerts = async () => {
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      setCertificates(data.certificates || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("issuer", formData.issuer);
    data.append("issueDate", formData.issueDate);
    if (formData.expirationDate)
      data.append("expirationDate", formData.expirationDate);
    if (formData.credentialId)
      data.append("credentialId", formData.credentialId);
    if (formData.credentialUrl)
      data.append("credentialUrl", formData.credentialUrl);
    if (formData.image) data.append("image", formData.image);

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        body: data, // Note: fetch automatically sets the correct multipart boundary
      });

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          issuer: "",
          issueDate: "",
          expirationDate: "",
          credentialId: "",
          credentialUrl: "",
          image: null,
        });
        fetchCerts();
      } else {
        alert("Failed to add certificate");
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
      await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Manage Certificates</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-white mb-6">Add New</h2>

              <input
                type="text"
                placeholder="Certificate Title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2"
              />
              <textarea
                placeholder="Description (Optional)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 h-24 resize-none"
              />
              <input
                type="text"
                placeholder="Issuer (e.g. AWS, Meta)"
                required
                value={formData.issuer}
                onChange={(e) =>
                  setFormData({ ...formData, issuer: e.target.value })
                }
                className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.issueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, issueDate: e.target.value })
                    }
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">
                    Exp. Date (Opt)
                  </label>
                  <input
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expirationDate: e.target.value,
                      })
                    }
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2 text-sm"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Credential ID (Optional)"
                value={formData.credentialId}
                onChange={(e) =>
                  setFormData({ ...formData, credentialId: e.target.value })
                }
                className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2"
              />
              <input
                type="url"
                placeholder="Credential URL (Optional)"
                value={formData.credentialUrl}
                onChange={(e) =>
                  setFormData({ ...formData, credentialUrl: e.target.value })
                }
                className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2"
              />

              <div className="pt-2">
                <label className="text-xs text-slate-500 mb-1 block">
                  Certificate Image
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {submitting ? (
                  "Uploading..."
                ) : (
                  <>
                    <Plus size={18} /> Add Certificate
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Existing Certificates
              </h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert._id}
                      className="flex items-center justify-between p-4 bg-[#030712] border border-slate-800 rounded-2xl"
                    >
                      <div>
                        <h3 className="font-bold text-white">{cert.title}</h3>
                        <p className="text-sm text-slate-400">{cert.issuer}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(cert._id)}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {certificates.length === 0 && (
                    <p className="text-slate-500">No certificates found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import AnimatedSection from "./ui/AnimatedSection";
import { Mail, Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <Section className="bg-[#030712] relative" id="contact">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <SectionHeader
          title="Let's build together"
          subtitle="Looking for a developer to join your team or build your next idea? I'm currently open for new opportunities."
          badge="Contact"
        />

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 bg-[#0b0f19]/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#030712] border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-slate-100 placeholder:text-slate-600"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#030712] border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-slate-100 placeholder:text-slate-600"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-[#030712] border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-slate-100 placeholder:text-slate-600 resize-none"
              placeholder="Tell me about your project or opportunity..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/25 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
            {!status.loading && <Send size={18} />}
          </button>
          
          {status === "success" && (
            <p className="text-emerald-400 text-sm text-center font-medium mt-4">
              Message sent successfully! I'll get back to you soon.
            </p>
          )}
          
          {status === "error" && (
            <p className="text-red-400 text-sm text-center font-medium mt-4">
              Failed to send message. Please try again or email directly.
            </p>
          )}
        </form>

        <div className="mt-12 flex flex-col items-center justify-center text-center gap-4">
          <p className="text-slate-500 text-sm">Or reach out directly via email</p>
          <a 
            href="mailto:shreyashpatel5506@gmail.com" 
            className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors text-lg font-medium"
          >
            <Mail size={20} />
            shreyashpatel5506@gmail.com
          </a>
        </div>
      </div>
    </Section>
  );
}

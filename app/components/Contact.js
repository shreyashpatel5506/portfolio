'use client';

import React, { useState } from 'react';
import { Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Contact() {
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' }); // Clear form
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-[#0F1629] text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl text-center font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
                    Get in Touch
                </h2>
                <p className="text-center text-gray-400 mb-12">
                    Have a question or want to work together? Leave your details and I&apos;ll get back to you.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-[#1B233A] p-8 rounded-2xl shadow-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#151B2E] border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#151B2E] border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            value={form.message}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#151B2E] border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="ghost-button inline-flex items-center gap-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' && <Loader className="animate-spin w-5 h-5" />}
                            {status !== 'loading' && <Send className="w-5 h-5" />}
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>

                {/* --- Status Messages --- */}
                {status === 'success' && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-green-400">
                        <CheckCircle />
                        <p>Message sent successfully! Thanks for reaching out.</p>
                    </div>
                )}
                {status === 'error' && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-red-400">
                        <AlertTriangle />
                        <p>Something went wrong. Please try again later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

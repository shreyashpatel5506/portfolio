"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Award,
  X,
  Maximize2,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
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
    fetchCerts();
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10 pb-20">
      <AnimatedSection showGrid={true}>
        <div className="mb-16 text-center max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono mb-4">
            Credentials
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Certifications
          </h1>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            Professional certifications and verified achievements in software
            engineering, cloud computing, and full-stack development.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {certificates.map((cert) => (
                <div
                  key={cert._id}
                  onClick={() => setSelectedCert(cert)}
                  className="group flex flex-col rounded-3xl border border-slate-800 bg-[#0b0f19] overflow-hidden hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#030712]/80 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:text-violet-400 group-hover:bg-[#030712] border border-slate-700/50 shadow-xl transition-all">
                      <Maximize2 size={18} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative">
                    <div className="absolute -top-6 left-6 w-12 h-12 rounded-xl bg-violet-500/20 border-2 border-[#0b0f19] backdrop-blur-xl flex items-center justify-center text-violet-400">
                      <Award size={20} />
                    </div>

                    <div className="flex-grow mt-6">
                      <h3 className="text-xl font-bold text-slate-100 mb-2 leading-snug group-hover:text-violet-400 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-slate-400 mb-3">
                        {cert.description || "No description provided."}
                      </p>
                      <p className="text-violet-300 text-sm font-medium mb-3">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono bg-[#030712] px-3 py-1.5 rounded-lg border border-slate-800/50 w-max">
                        <Calendar size={12} />
                        Issued {formatDate(cert.issueDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-3xl max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-6 shadow-inner">
                <Award size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No certificates found
              </h3>
              <p className="text-slate-400 text-lg">
                Check back later for new credentials.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#030712]/90 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0b0f19] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#030712]/50 hover:bg-[#030712] backdrop-blur text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700/50"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-[60%] h-64 md:h-auto min-h-[300px] md:min-h-[500px] relative bg-black flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-4xl max-h-full">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full md:w-[40%] p-6 md:p-8 flex flex-col bg-gradient-to-b from-[#0b0f19] to-[#030712] border-t md:border-t-0 md:border-l border-slate-800/50 overflow-y-auto max-h-[50vh] md:max-h-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="flex-1 flex flex-col min-h-max pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-6 shadow-inner shrink-0">
                    <ShieldCheck size={32} />
                  </div>

                  <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                    {selectedCert.title}
                  </h2>
                  <p className="text-slate-400 text-lg mb-6 whitespace-pre-wrap">
                    {selectedCert.description}
                  </p>
                  <p className="text-xl text-violet-400 font-medium mb-8">
                    {selectedCert.issuer}
                  </p>

                  <div className="space-y-6 mb-10">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                        Issue Date
                      </span>
                      <span className="text-slate-200 text-lg flex items-center gap-2">
                        <Calendar size={18} className="text-slate-400" />
                        {formatDate(selectedCert.issueDate)}
                      </span>
                    </div>

                    {selectedCert.expirationDate && (
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                          Expiration Date
                        </span>
                        <span className="text-slate-200 text-lg flex items-center gap-2">
                          <Calendar size={18} className="text-slate-400" />
                          {formatDate(selectedCert.expirationDate)}
                        </span>
                      </div>
                    )}

                    {selectedCert.credentialId && (
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                          Credential ID
                        </span>
                        <span className="text-slate-200 text-lg font-mono bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800 w-max mt-1">
                          {selectedCert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedCert.credentialUrl ? (
                    <div className="mt-auto pt-6">
                      <Link
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-900/20"
                      >
                        Verify Credential <ExternalLink size={18} />
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-auto pt-6">
                      <button
                        className="w-full py-4 bg-slate-800 text-slate-400 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-slate-700"
                        disabled
                      >
                        No Verification URL
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

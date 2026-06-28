"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Award } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 w-full pt-10">
      <AnimatedSection>
        <div className="mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono mb-4">
            Credentials
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Certifications
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm md:text-base">
            Professional certifications and verified achievements in software engineering, cloud computing, and full-stack development.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p className="text-slate-400 col-span-full">Loading certificates...</p>
          ) : certificates.length > 0 ? (
            certificates.map((cert) => (
              <div key={cert._id} className="group flex flex-col rounded-2xl border border-slate-800 bg-[#0b0f19] overflow-hidden hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5 transition-all">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0b0f19]/80 backdrop-blur flex items-center justify-center text-violet-400 border border-slate-700 shadow-xl">
                    <Award size={16} />
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-100 mb-2 leading-snug group-hover:text-violet-300 transition-colors">{cert.title}</h3>
                    <p className="text-slate-400 text-sm font-medium mb-1">{cert.issuer}</p>
                    <p className="text-slate-500 text-xs font-mono mb-4">
                      Issued {formatDate(cert.issueDate)}
                      {cert.expirationDate && ` • Expires ${formatDate(cert.expirationDate)}`}
                    </p>
                  </div>
                  
                  {cert.credentialUrl && (
                    <div className="pt-4 border-t border-slate-800/50 mt-2">
                      <Link 
                        href={cert.credentialUrl} 
                        target="_blank"
                        className="inline-flex items-center justify-between w-full text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Verify Credential <ExternalLink size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No certificates found</h3>
              <p className="text-slate-400">Check back later for new credentials.</p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}

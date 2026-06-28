"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import AnimatedSection from "./ui/AnimatedSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function CertificatesPreview() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await fetch("/api/certificates");
        const data = await res.json();
        setCertificates(data.certificates?.slice(0, 3) || []); // Get top 3
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  return (
    <AnimatedSection className="bg-[#0b0f19]">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-8">
        <SectionHeader
          title="Certifications"
          subtitle="Verified achievements and technical certifications."
          badge="Credentials"
        />
        <Link 
          href="/certificates" 
          className="hidden lg:flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium pb-16 transition-colors"
        >
          View all certificates <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {loading ? (
          <p className="text-slate-400 col-span-full">Loading certificates...</p>
        ) : certificates.length > 0 ? (
          certificates.map((cert) => (
            <div key={cert._id} className="group rounded-2xl border border-slate-800 bg-[#030712] overflow-hidden hover:border-violet-500/50 transition-all">
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-100 mb-1">{cert.title}</h3>
                <p className="text-slate-400 text-sm font-medium mb-4">{cert.issuer}</p>
                {cert.credentialUrl && (
                  <Link 
                    href={cert.credentialUrl} 
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300"
                  >
                    Verify Credential <ExternalLink size={12} />
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 col-span-full text-center py-10">No certificates found.</p>
        )}
      </div>
      
      <div className="mt-12 flex justify-center lg:hidden">
        <Link 
          href="/certificates" 
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors border border-violet-500/30 px-6 py-3 rounded-xl bg-violet-500/10"
        >
          View all certificates <ArrowRight size={18} />
        </Link>
      </div>
    </AnimatedSection>
  );
}

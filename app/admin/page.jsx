"use client";
import React from "react";
import Link from "next/link";
import { FolderGit2, Code2, Briefcase, Award, GitPullRequest, ArrowRight, Home, Activity, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminHub() {
  const router = useRouter();
  const adminModules = [
    { name: "Projects", path: "/admin/Project", icon: FolderGit2, desc: "Manage portfolio case studies" },
    { name: "Skills", path: "/admin/skill", icon: Code2, desc: "Manage tech stack categories" },
    { name: "Experience", path: "/admin/experience", icon: Briefcase, desc: "Manage work history" },
    { name: "Certificates", path: "/admin/certificates", icon: Award, desc: "Manage credentials" },
    { name: "Open Source", path: "/admin/opensource", icon: GitPullRequest, desc: "Manage PRs and contributions" },
    { name: "Extra Activities", path: "/admin/activity", icon: Activity, desc: "Manage posts, ideas, and talks" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your portfolio content dynamically.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium bg-indigo-500/10 px-4 py-2 rounded-xl transition-colors">
              <Home size={18} /> View Site
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-slate-200 hover:text-white font-medium bg-slate-800 px-4 py-2 rounded-xl transition-colors">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-100 mb-8">
          <p className="font-semibold">Protected admin dashboard</p>
          <p className="text-sm text-emerald-100/80 mt-1">
            You are signed in with a cookie-based session.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.name} href={module.path}>
                <div className="group bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 hover:bg-[#0f1423] transition-all cursor-pointer h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 mb-6 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{module.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{module.desc}</p>
                  <div className="flex justify-between items-center text-sm font-medium text-slate-500 group-hover:text-indigo-400 transition-colors">
                    Manage {module.name}
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

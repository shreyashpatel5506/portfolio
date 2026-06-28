"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="space-y-4 mb-16 text-center lg:text-left bg-[#030712]">
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed mx-auto lg:mx-0"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

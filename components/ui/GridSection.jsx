"use client";
import React from "react";
import AnimatedSection from "./AnimatedSection";

export default function GridSection({ children, delay = 0, className = "" }) {
  return (
    <AnimatedSection delay={delay} className={className} showGrid={true}>
      {children}
    </AnimatedSection>
  );
}

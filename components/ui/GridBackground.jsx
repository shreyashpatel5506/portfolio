"use client";

import React from "react";

export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-transparent">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
    </div>
  );
}

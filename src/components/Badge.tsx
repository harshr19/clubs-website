import React from "react";

export default function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full border border-blue-700 bg-blue-50 text-xs font-bold tracking-wide text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 transition ${className}`}>
      {children}
    </span>
  );
} 
"use client";
import { motion } from "framer-motion";
import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.025, boxShadow: "0 8px 32px 0 rgba(60,60,60,0.10)", boxShadowColor: "#2563eb33" }}
      className={`bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
} 
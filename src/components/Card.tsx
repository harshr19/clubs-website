import { motion } from "framer-motion";
import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 8px 32px 0 rgba(30,30,30,0.18)" }}
      className={`bg-white border border-gray-300 rounded-xl p-6 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-700 ${className}`}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
} 
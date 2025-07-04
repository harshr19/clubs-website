"use client";
import { motion } from "framer-motion";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "filled",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 inline-flex items-center justify-center";
  const filled =
    "bg-gray-900 text-white shadow hover:bg-gray-800 hover:scale-[1.04]";
  const outlined =
    "border border-gray-900 text-gray-900 bg-white hover:bg-gray-100 hover:scale-[1.04]";
  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={[
        base,
        variant === "filled" ? filled : outlined,
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </motion.button>
  );
} 
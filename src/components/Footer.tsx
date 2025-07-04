import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center py-8 mt-16 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="mb-4 text-xs text-gray-400">&copy; 2025 Team  ByteBenders | Created by Harsh Rajpal. All rights reserved.</div>
      <div className="flex gap-4 text-xs text-gray-400">
        <a
          href="https://instagram.com/harshrajpal1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors"
          aria-label="Instagram"
        >
          Instagram
        </a>
        <span>|</span>
        <a
          href="https://www.linkedin.com/in/harshrajpal1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 transition-colors"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
} 
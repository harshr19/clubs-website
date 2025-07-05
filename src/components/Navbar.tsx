import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./Button";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/clubs", label: "Clubs" },
  { href: "/you", label: "My Page", role: "student" },
];

export default function Navbar() {
  // Dummy user state (replace with context/auth later)
  const [user, setUser] = useState<{ loggedIn: boolean; role: "student" | "admin" | null }>({ loggedIn: false, role: null });
  const location = useLocation();
  const pathname = location.pathname;
  const [search, setSearch] = useState("");

  // Remove theme state, useEffect, and theme toggle button

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white/90 backdrop-blur shadow-sm rounded-b-2xl px-6 py-3 flex items-center justify-between sticky top-0 z-30 border-b border-gray-100"
    >
      {/* Logo + Icon */}
      <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-gray-900 mr-8 focus:outline-none focus:ring-2 focus:ring-blue-200">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13" stroke="#2563eb" strokeWidth="2"/><circle cx="14" cy="14" r="6" fill="#2563eb"/></svg>
        Campus Connect
      </Link>
      {/* Centered nav links */}
      <div className="flex-1 flex justify-center gap-6">
        {navLinks.map(link => {
          if (link.role && (!user.loggedIn || user.role !== link.role)) return null;
          if (!user.loggedIn && ["/you"].includes(link.href)) return null;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`relative text-base font-medium px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              {link.label}
              {isActive && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>
      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by club name or activity"
            className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition w-48 md:w-64 placeholder-gray-400 pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search clubs or activities"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          </span>
        </div>
        <Link to={user.loggedIn ? "/you" : "/login"} className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
          </svg>
        </Link>
      </div>
    </motion.nav>
  );
} 
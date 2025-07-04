"use client";
import { motion } from "framer-motion";
import Button from "../components/Button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Blurred SVG background shape */}
      <svg className="absolute -top-32 left-1/2 -translate-x-1/2 blur-2xl opacity-30 z-0" width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="300" cy="150" rx="250" ry="100" fill="#2563eb" />
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl flex flex-col items-center gap-8 pt-32 pb-40 z-10"
      >
        <span className="hero-caption text-blue-600">Discover Your Community</span>
        <h1 className="hero-title text-center">CLUBS</h1>
        <p className="text-lg text-gray-500 text-center max-w-xl mb-4">Browse, join, and participate in the best student clubs and events on campus. Connect, create, and grow with Campus Connect.</p>
        <div className="flex gap-4 mt-2">
          <Button size="lg" variant="filled">Browse Clubs</Button>
          <Button size="lg" variant="outlined">See Events</Button>
        </div>
      </motion.div>
      <div className="w-full max-w-2xl mx-auto border-b border-gray-100 mt-8 z-10" />
      {/* Meet the Team Section */}
      <section className="w-full max-w-2xl mx-auto mt-16 mb-8 z-10 flex flex-col items-center">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 border border-gray-100">
          <span className="text-lg font-semibold text-blue-700 tracking-wide mb-2">Meet the Team</span>
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Harsh Rajpal"
            className="w-20 h-20 rounded-full border-4 border-blue-200 shadow-md object-cover"
          />
          <div className="text-xl font-bold text-gray-800">Harsh Rajpal</div>
          <div className="text-sm text-gray-500 mb-2">Founder & Developer</div>
          <div className="flex gap-4 mt-2">
            <a
              href="https://instagram.com/harshrajpal1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.75a5.75 5.75 0 1 1 0 11.5a5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5a4.25 4.25 0 0 0 0-8.5zm5.25 1.25a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/harshrajpal1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.76-1.76c0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07c-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54c3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { Typewriter } from 'react-simple-typewriter';

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
        <span className="hero-caption text-blue-600">Discover Your  </span>
        <h1 className="hero-title text-center">
          <Typewriter
            words={["CLUBS", "COMMUNITY", "VIBE", "SPARK",]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={90}
            deleteSpeed={90}
            delaySpeed={2500}
          />
        </h1>
        <p className="text-lg text-gray-500 text-center max-w-xl mb-4">Browse, join, and participate in the best student clubs and events on campus. Connect, create, and grow with Campus Connect.</p>
        <div className="flex gap-4 mt-2">
          <Button size="lg" variant="filled">Browse Clubs</Button>
          <Button size="lg" variant="outlined">See Events</Button>
        </div>
      </motion.div>
      <div className="w-full max-w-2xl mx-auto border-b border-gray-100 mt-8 z-10" />
    </main>
  );
}

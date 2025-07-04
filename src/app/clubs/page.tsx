"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import clubs from "../../data/clubs";

export default function ClubsPage() {
  const [search, setSearch] = useState("");
  const filtered = clubs.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="section-title">All Clubs</h1>
      <div className="mb-8 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search clubs..."
          className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-base focus:outline-none focus:ring-2 focus:ring-gray-200 transition w-full max-w-xs placeholder-gray-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button size="md" variant="outlined">Filter</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((club, i) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            <Card className="flex flex-col gap-3 items-start">
              <h3 className="card-title mb-1">{club.name}</h3>
              <p className="card-caption mb-2">{club.description}</p>
              <Link href={`/clubs/${club.id}`}>
                <Button size="md" variant="filled">View Details</Button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
} 
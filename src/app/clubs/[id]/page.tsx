"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Card from "../../../components/Card";
import Tabs from "../../../components/Tabs";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import { motion } from "framer-motion";
import clubs from "../../../data/clubs";
import Link from "next/link";

export default function ClubDetailPage() {
  const { id } = useParams();
  const club = clubs.find(c => c.id === id);
  const [tab, setTab] = useState<"Past" | "Present" | "Upcoming">("Upcoming");

  if (!club) return <div className="p-8 text-center">Club not found.</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <div className="flex flex-col items-center mb-8">
          <img src={club.banner} alt={club.name + ' banner'} className="w-full h-48 object-cover rounded-2xl mb-4" />
          <img src={club.logo} alt={club.name + ' logo'} className="w-20 h-20 object-cover rounded-full border-4 border-white -mt-12 mb-2 shadow" />
          <h1 className="section-title mb-2 text-center">{club.name}</h1>
          <p className="card-caption mb-4 text-center">{club.description}</p>
          <div className="flex gap-4 text-sm text-gray-500 mb-2">
            <span>Founded: {club.founded}</span>
            <span>|</span>
            <span>{club.memberCount} Members</span>
            <span>|</span>
            <span className="capitalize">{club.category}</span>
          </div>
          <div className="flex gap-2 flex-wrap mb-2">
            {club.tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="flex gap-3 mt-2">
            {club.socialLinks.instagram && (
              <a href={club.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors" aria-label="Instagram">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.75a5.75 5.75 0 1 1 0 11.5a5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5a4.25 4.25 0 0 0 0-8.5zm5.25 1.25a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg>
              </a>
            )}
            {club.socialLinks.linkedin && (
              <a href={club.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-colors" aria-label="LinkedIn">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.76-1.76c0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07c-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54c3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg>
              </a>
            )}
            {club.socialLinks.website && <a href={club.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Website</a>}
          </div>
        </div>
      </motion.div>
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
        <h2 className="section-caption mb-2">Key Members</h2>
        <div className="flex gap-4 flex-wrap">
          {club.keyMembers.map(m => (
            <Card key={m.id} className="flex flex-col items-center w-32 p-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-2 overflow-hidden">
                <img src={m.avatar} alt={m.name} className="object-cover w-full h-full" />
              </div>
              <span className="font-bold text-sm">{m.name}</span>
              <Badge className="mt-1">{m.role}</Badge>
              <span className="text-xs text-gray-400 mt-1">{m.year} year, {m.major}</span>
            </Card>
          ))}
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-8">
        <h2 className="section-caption mb-2">Activities</h2>
        {Array.isArray(club.activities) && club.activities.length > 0 ? (
          <ul className="space-y-2">
            {club.activities.map((a: any, i: number) => (
              <Card key={i} className="p-3">{a}</Card>
            ))}
          </ul>
        ) : (
          <div className="text-gray-400 text-sm">No activities yet.</div>
        )}
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <h2 className="section-caption mb-2">Open Positions</h2>
        {Array.isArray(club.openPositions) && club.openPositions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {club.openPositions.map(pos => (
              <Card key={pos.title} className="flex flex-col gap-2">
                <span className="font-bold">{pos.title}</span>
                <span className="text-gray-500 text-sm">{pos.requirements}</span>
                <span className="text-xs text-gray-400">Apply by {pos.deadline}</span>
                <Link href={`/clubs/${id}/apply`}>
                  <Button size="md" variant="filled" className="mt-2">Apply</Button>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">No open positions.</div>
        )}
      </motion.section>
    </main>
  );
} 
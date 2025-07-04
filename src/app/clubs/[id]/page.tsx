"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Card from "../../../components/Card";
import Tabs from "../../../components/Tabs";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import { motion } from "framer-motion";
import clubs from "../../../data/clubs";

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
            {club.socialLinks.instagram && <a href={club.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Instagram</a>}
            {club.socialLinks.linkedin && <a href={club.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a>}
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
                <Button size="md" variant="filled" className="mt-2">Apply</Button>
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
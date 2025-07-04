"use client";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import { motion } from "framer-motion";

const joinedClubs = [
  { name: "Robotics Club", since: "2023-09-01" },
  { name: "Coding Club", since: "2024-01-15" },
];

const activities = [
  { title: "Robo Wars 2023", club: "Robotics Club" },
  { title: "Code Sprint 2023", club: "Coding Club" },
];

const certificates = [
  { title: "Participation: Robo Wars", date: "2023-10-01" },
  { title: "Winner: Code Sprint", date: "2023-11-15" },
];

const badges = [
  { title: "Club Enthusiast", date: "2023-12-01" },
  { title: "Event Winner", date: "2023-11-15" },
];

export default function YouPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="section-title">My Page</h1>
      <section className="mb-8">
        <h2 className="section-caption mb-2">Clubs Joined</h2>
        <div className="flex gap-4 flex-wrap">
          {joinedClubs.map((club, i) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card className="w-48 flex flex-col items-start">
                <span className="font-bold text-lg mb-1">{club.name}</span>
                <span className="text-xs text-gray-500 mt-1">Since {club.since}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="section-caption mb-2">Activities Participated</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activities.map((act, i) => (
            <motion.div
              key={act.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card>
                <span className="font-bold">{act.title}</span>
                <div className="text-sm text-gray-500">{act.club}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="section-caption mb-2">Certificates</h2>
        <div className="flex gap-4 flex-wrap">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card className="w-56 flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="font-bold text-lg mb-1">{cert.title}</span>
                <span className="text-xs text-gray-700">Issued: {cert.date}</span>
                <div className="mt-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-2xl">🏅</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-caption mb-2">Badges</h2>
        <div className="flex gap-4 flex-wrap">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card className="w-40 flex flex-col items-center bg-yellow-100">
                <span className="font-bold text-md mb-1">{badge.title}</span>
                <span className="text-xs text-gray-700">Unlocked: {badge.date}</span>
                <div className="mt-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-xl">🎖️</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
} 
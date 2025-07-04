"use client";
import { useState } from "react";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { motion } from "framer-motion";

const club = {
  name: "Robotics Club",
  description: "Build and program robots.",
  members: [
    { name: "Alice", role: "President" },
    { name: "Bob", role: "Vice President" },
  ],
};

const initialEvents = [
  { id: 1, title: "Robo Wars", date: "2024-07-10" },
  { id: 2, title: "Tech Talk", date: "2024-07-18" },
];

const registeredStudents = [
  { name: "Charlie", email: "charlie@email.com" },
  { name: "Dana", email: "dana@email.com" },
];

export default function AdminDashboard() {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const openModal = (event?: any) => {
    setEditEvent(event || null);
    setTitle(event?.title || "");
    setDate(event?.date || "");
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditEvent(null);
    setTitle("");
    setDate("");
  };
  const saveEvent = () => {
    if (editEvent) {
      setEvents(events.map(e => e.id === editEvent.id ? { ...e, title, date } : e));
    } else {
      setEvents([...events, { id: Date.now(), title, date }]);
    }
    closeModal();
  };
  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="section-title">Admin Dashboard</h1>
      <section className="mb-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <Card className="mb-6">
            <h2 className="section-caption mb-2">Manage Club Info</h2>
            <div className="mb-2"><span className="font-bold">{club.name}</span></div>
            <div className="text-gray-500 mb-2">{club.description}</div>
            <div className="flex flex-wrap gap-2">
              {club.members.map(m => (
                <span key={m.name} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">{m.name} ({m.role})</span>
              ))}
            </div>
          </Card>
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-caption">Events</h2>
              <Button size="md" variant="filled" onClick={() => openModal()}>Create Event</Button>
            </div>
            <ul className="space-y-3">
              {events.map(event => (
                <li key={event.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2">
                  <div>
                    <span className="font-bold">{event.title}</span> <span className="text-gray-500">({event.date})</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outlined" onClick={() => openModal(event)}>Edit</Button>
                    <Button size="sm" variant="outlined" className="text-red-500 border-red-300 hover:bg-red-50" onClick={() => deleteEvent(event.id)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="section-caption mb-2">Registered Students</h2>
            <ul className="space-y-2">
              {registeredStudents.map(s => (
                <li key={s.email} className="flex justify-between items-center">
                  <span>{s.name}</span>
                  <span className="text-gray-500 text-sm">{s.email}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </section>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={closeModal}>&times;</button>
            <h3 className="text-lg font-bold mb-4">{editEvent ? "Edit Event" : "Create Event"}</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Event Title"
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <input
                type="date"
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <Button size="md" variant="filled" onClick={saveEvent}>{editEvent ? "Save Changes" : "Create Event"}</Button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
} 
import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const clubs = [
  { id: 1, name: "Robotics Club", description: "Build and program robots.", joined: false },
  { id: 2, name: "Drama Club", description: "Theater, acting, and more.", joined: false },
  { id: 3, name: "Coding Club", description: "Hackathons and coding fun!", joined: false },
];

const events = [
  { id: 1, title: "Robo Wars", club: "Robotics Club", date: "2024-07-10", registered: false },
  { id: 2, title: "Annual Play", club: "Drama Club", date: "2024-07-15", registered: false },
  { id: 3, title: "Code Sprint", club: "Coding Club", date: "2024-07-20", registered: false },
];

export default function Dashboard() {
  const [clubList, setClubList] = useState(clubs);
  const [eventList, setEventList] = useState(events);

  const handleJoinClub = (id: number) => {
    setClubList(clubList.map(c => c.id === id ? { ...c, joined: !c.joined } : c));
  };
  const handleRegisterEvent = (id: number) => {
    setEventList(eventList.map(e => e.id === id ? { ...e, registered: !e.registered } : e));
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="section-title">Student Dashboard</h1>
      <section className="mb-10">
        <h2 className="section-caption mb-4">Browse Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {clubList.map((club, i) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card className="flex flex-col gap-2 items-start">
                <h3 className="card-title mb-1">{club.name}</h3>
                <p className="card-caption mb-2">{club.description}</p>
                <Button
                  size="md"
                  variant={club.joined ? "outlined" : "filled"}
                  className="mt-2"
                  onClick={() => handleJoinClub(club.id)}
                >
                  {club.joined ? "Joined" : "Join Club"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-caption mb-4">Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {eventList.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card className="flex flex-col gap-2 items-start">
                <h3 className="card-title mb-1">{event.title}</h3>
                <p className="card-caption mb-2">{event.club} &middot; {event.date}</p>
                <Button
                  size="md"
                  variant={event.registered ? "outlined" : "filled"}
                  className="mt-2"
                  onClick={() => handleRegisterEvent(event.id)}
                >
                  {event.registered ? "Registered" : "Register"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
} 
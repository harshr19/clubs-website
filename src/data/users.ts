const users = [
  {
    id: 1,
    name: "Harsh Rajpal",
    email: "harshrajpal@gmail.com",
    role: "student",
    joinedClubs: [1, 2, 3],
    activities: ["Robo Wars 2023", "Code Sprint 2023"],
    certificates: [
      { title: "Participation: Robo Wars", date: "2023-10-01" },
      { title: "Winner: Code Sprint", date: "2023-11-15" },
    ],
    badges: [
      { title: "Club Enthusiast", date: "2023-12-01" },
      { title: "Event Winner", date: "2023-11-15" },
    ],
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@email.com",
    role: "admin",
    club: 1,
  },
];

export default users; 
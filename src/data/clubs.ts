const clubs = [
  {
    id: 'gfg-mits',
    name: 'GeeksForGeeks MITS Chapter',
    description: 'Geeks for Geeks Student Chapter for MITS-DU Gwalior ',
    category: 'tech',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-N2txYkG5LiwtDjiWULV1F_lISs_LAJ5xRA&s',
    banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoimtvHJCEy00jEoFqKl5fhcD3N6dXkOJJ2w&s',
    memberCount: 15,
    founded: '2020',
    tags: ['coding', 'development'],
    keyMembers: [
      {
        id: '1',
        name: 'Harsh Rajpal',
        role: 'President',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        year: '3rd',
        major: 'ECE'
      },
      {
        id: '2',
        name: 'Krisna Kant',
        role: 'Vice President',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        year: '3rd',
        major: 'ECE'
      }
    ],
    activities: [
      'Weekly Coding Contests',
      'DSA Bootcamp',
      'Hackathon Prep Sessions',
      'Tech Talk Series'
    ],
    openPositions: [],
    socialLinks: {
      instagram: 'https://instagram.com/gfgmits',
      linkedin: 'https://linkedin.com/company/gfgmits',
      website: 'https://gfgmits.com'
    }
  },
  {
    id: 'nritya',
    name: 'Nritya - Dance Club',
    description: 'The official cultural dance club of MITS.',
    category: 'cultural',
    logo: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
    banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    memberCount: 30,
    founded: '2015',
    tags: ['dance', 'performance', 'culture'],
    keyMembers: [
      {
        id: '1',
        name: 'Arpit Gupta',
        role: 'President',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        year: '3rd',
        major: 'ECE'
      },
      {
        id: '2',
        name: 'Abhay Bhadoriya',
        role: 'Mujra Head',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        year: '3rd',
        major: 'ECE'
      }
    ],
    activities: [
      'Annual Dance Showcase',
      'Inter-College Dance Competition',
      'Flash Mob Performances',
      'Dance Workshops'
    ],
    openPositions: [],
    socialLinks: {
      instagram: 'https://instagram.com/nritya_mits',
      linkedin: '',
      website: ''
    }
  },
  {
    id: 'strikers',
    name: 'Strikers Football Club',
    description: 'Official football club for sports enthusiasts at MITS.',
    category: 'sports',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
    banner: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    memberCount: 22,
    founded: '2012',
    tags: ['football', 'sports', 'team'],
    keyMembers: [
      {
        id: '1',
        name: 'Lionel Masti',
        role: 'Captain',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        year: '3rd',
        major: 'ECE'
      },
      {
        id: '2',
        name: 'Cristiano Rolando "sui" ',
        role: 'Vice Captain',
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
        year: '3rd',
        major: 'EEE'
      }
    ],
    activities: [
      'Weekly Practice Matches',
      'Inter-College Football Tournament',
      'Fitness and Strategy Sessions',
      'Friendly Matches with Alumni'
    ],
    openPositions: [],
    socialLinks: {
      instagram: 'https://instagram.com/strikers_mits',
      linkedin: '',
      website: ''
    }
  },
  {
    id: 'gdg-mits',
    name: 'Google Developers Group MITS -DU',
    description: 'A community of developers and tech enthusiasts at MITS-DU, part of the global GDG network.',
    category: 'tech',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Developers_logo.png',
    banner: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    memberCount: 40,
    founded: '2021',
    tags: ['google', 'developers', 'community'],
    keyMembers: [
      { id: '1', name: 'Amit Sharma', role: 'Lead', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', year: '2nd', major: 'CSE' },
      { id: '2', name: 'Sneha Patel', role: 'Co-Lead', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', year: '3rd', major: 'IT' },
      { id: '3', name: 'Rahul Mehra', role: 'Event Manager', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', year: '2nd', major: 'CSE' }
    ],
    activities: [
      'Google I/O Extended Viewing Party',
      'Flutter Workshop',
      'Cloud Study Jam',
      'Monthly Tech Talks'
    ],
    openPositions: [
      { title: 'Social Media Manager', requirements: 'Experience with social media and content creation.', deadline: '2024-08-10' },
      { title: 'Event Volunteer', requirements: 'Interest in event management and teamwork.', deadline: '2024-08-15' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/gdg_mits',
      linkedin: 'https://linkedin.com/company/gdg-mits',
      website: 'https://gdg.community.dev/'
    }
  },
  {
    id: 'dlg',
    name: 'Digital Learning Group DLG',
    description: 'A club dedicated to digital learning, online courses, and peer-to-peer knowledge sharing.',
    category: 'education',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    banner: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    memberCount: 25,
    founded: '2019',
    tags: ['digital', 'learning', 'education'],
    keyMembers: [
      { id: '1', name: 'Priya Verma', role: 'Coordinator', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', year: '3rd', major: 'IT' },
      { id: '2', name: 'Rohit Sinha', role: 'Content Lead', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', year: '2nd', major: 'CSE' }
    ],
    activities: [
      'Coursera Learning Challenge',
      'Peer-to-Peer Tutoring Sessions',
      'Digital Skills Bootcamp'
    ],
    openPositions: [
      { title: 'Workshop Facilitator', requirements: 'Good communication skills and subject expertise.', deadline: '2024-08-12' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/dlg_mits',
      linkedin: 'https://linkedin.com/company/dlg-mits',
      website: ''
    }
  },
  {
    id: 'querencia',
    name: 'querencia (book reading club)',
    description: 'A haven for book lovers to read, discuss, and share their passion for literature.',
    category: 'literary',
    logo: 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
    banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    memberCount: 18,
    founded: '2022',
    tags: ['books', 'reading', 'literature'],
    keyMembers: [
      { id: '1', name: 'Riya Singh', role: 'President', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', year: '2nd', major: 'English' },
      { id: '2', name: 'Ankit Joshi', role: 'Vice President', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', year: '2nd', major: 'English' }
    ],
    activities: [
      'Monthly Book Discussions',
      'Author Meetups',
      'Poetry Evenings',
      'Book Exchange Drives'
    ],
    openPositions: [
      { title: 'Event Coordinator', requirements: 'Organizational skills and love for books.', deadline: '2024-08-20' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/querencia_mits',
      linkedin: '',
      website: ''
    }
  }
];

export default clubs; 
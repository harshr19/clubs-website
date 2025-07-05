import { useParams } from 'react-router-dom';
import clubs from '../data/clubs';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

export default function ClubDetail() {
  const { id } = useParams();
  const club = clubs.find(c => c.id === id);

  if (!club) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Club Not Found</h2>
          <p className="text-center text-gray-600">No club found for ID: {id}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-8">
        <div className="mb-6 relative">
          <img src={club.banner} alt={club.name + ' banner'} className="w-full h-48 object-cover rounded-2xl mb-4" />
          <img src={club.logo} alt={club.name + ' logo'} className="w-20 h-20 object-cover rounded-full border-4 border-white -mt-12 mb-2 shadow absolute left-1/2 -translate-x-1/2 top-32" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">{club.name}</h2>
        <p className="text-center text-gray-600 mb-4">{club.description}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-2">
          <span>Founded: {club.founded}</span>
          <span>|</span>
          <span>{club.memberCount} Members</span>
          <span>|</span>
          <span className="capitalize">{club.category}</span>
        </div>
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {club.tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="flex gap-3 justify-center mb-6">
          {club.socialLinks.instagram && (
            <a href={club.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors" aria-label="Instagram">
              Instagram
            </a>
          )}
          {club.socialLinks.linkedin && (
            <a href={club.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-colors" aria-label="LinkedIn">
              LinkedIn
            </a>
          )}
          {club.socialLinks.website && (
            <a href={club.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Website</a>
          )}
        </div>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Key Members</h3>
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
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Activities</h3>
          {Array.isArray(club.activities) && club.activities.length > 0 ? (
            <ul className="space-y-2">
              {club.activities.map((a, i) => (
                <Card key={i} className="p-3">{a}</Card>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 text-sm">No activities yet.</div>
          )}
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">Open Positions</h3>
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
        </section>
      </div>
    </main>
  );
} 
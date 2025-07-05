import { useParams } from 'react-router-dom';

export default function ClubApply() {
  const { id } = useParams();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Apply to Club</h2>
        <p className="text-center text-gray-600">Application form for club ID: {id}</p>
      </div>
    </main>
  );
} 
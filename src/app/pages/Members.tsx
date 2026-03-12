import { Link } from "react-router";
import { members } from "../data/mockData";

export function Members() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">Lab Members</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member) => (
          <Link
            key={member.id}
            to={`/members/${member.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl mb-2">{member.name}</h2>
              <p className="text-blue-600 mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm line-clamp-3">{member.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

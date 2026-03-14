import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../tina/__generated__/client";

export function Members() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.membersConnection();
        const memberData = res.data.membersConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || [];
        // Sort by order field
        memberData.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setMembers(memberData);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const currentMembers = members.filter(m => !m.isAlumni);
  const alumniMembers = members.filter(m => m.isAlumni);

  const MemberCard = ({ member }: { member: any }) => (
    <Link
      to={`/members/${member._sys.relativePath}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 flex-grow">
        <h2 className="text-2xl mb-2">{member.name}</h2>
        <p className="text-blue-600 mb-3">{member.role}</p>
        <div className="text-gray-600 text-sm line-clamp-3 prose prose-sm">
          <TinaMarkdown content={member.bio} />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">Lab Members</h1>

      {/* Current Members */}
      <section className="mb-20">
        <h2 className="text-3xl mb-8 pb-2 border-b-2 border-gray-100">Current Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Alumni */}
      {alumniMembers.length > 0 && (
        <section>
          <h2 className="text-3xl mb-8 pb-2 border-b-2 border-gray-100">Alumni</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumniMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

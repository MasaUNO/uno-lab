import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { BlockRenderer } from "../components/BlockRenderer";

const imagePath = (src: string) => {
  if (!src) return src;
  if (src.startsWith('http')) return src;
  try {
    return encodeURI(decodeURIComponent(src));
  } catch (e) {
    return encodeURI(src);
  }
};

export function MemberDetail() {
  const { id } = useParams();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await client.queries.members({ relativePath: id });
        setMember(res.data.members);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl mb-4">Member Not Found</h1>
        <Link to="/members" className="text-blue-600 hover:text-blue-700">
          Back to Members
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        to="/members"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Members
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <img
            src={imagePath(member.image)}
            alt={member.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl mb-4">{member.name}</h1>
          <p className="text-xl text-blue-600 mb-6">{member.role}</p>
          
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Mail size={20} />
            <a
              href={`mailto:${member.email}`}
              className="hover:text-blue-600"
            >
              {member.email}
            </a>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl mb-3">Research Interests</h2>
            <p className="text-gray-700">{member.research}</p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        {/* Flexible Blocks */}
        <BlockRenderer blocks={member.blocks} />

        {member.role?.includes("Professor") && (
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl mb-4">For Prospective Students</h2>
            <p className="text-gray-700 mb-4">
              I am always looking for motivated students to join our research group. 
              If you are interested in pursuing graduate studies in our lab, please feel free to contact me.
            </p>
            <Link
              to="/prospective-students"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn More
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

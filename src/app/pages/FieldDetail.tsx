import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";

const imagePath = (src: string) => {
  if (!src) return src;
  if (src.startsWith('http')) return src;
  try {
    return encodeURI(decodeURIComponent(src));
  } catch (e) {
    return encodeURI(src);
  }
};

export function FieldDetail() {
  const { id } = useParams();
  const [field, setField] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await client.queries.fields({ relativePath: id });
        setField(res.data.fields);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16">Loading...</div>;
  if (!field) return <div className="max-w-7xl mx-auto px-4 py-16">Field area not found.</div>;

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={imagePath(field.image || "https://images.unsplash.com/photo-1531870856481-49a0ce6d0698?auto=format&fit=crop&q=80")}
          alt={field.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/fields"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} /> Back to Fields
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {field.title}
            </h1>
            <div className="flex items-center text-white/90">
              <MapPin className="mr-2" size={20} />
              <span className="text-lg">Observation Site</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">About this Area</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <TinaMarkdown content={field.description} />
            </div>
          </div>

          {/* Sidebar - Related Topics */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Related Research Topics</h3>
              <div className="space-y-4">
                {field.relatedTopics?.length > 0 ? (
                  field.relatedTopics.map((item: any, index: number) => {
                    const topic = item.topic;
                    if (!topic) return null;
                    return (
                      <Link
                        key={index}
                        to={`/research/topic/${topic._sys.relativePath}`}
                        className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group"
                      >
                        <h4 className="font-bold group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {topic.description}
                        </p>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-gray-500 italic">No topics linked to this area yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

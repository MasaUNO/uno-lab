import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { BlockRenderer } from "../components/BlockRenderer";

export function ResearchTopicDetail() {
  const { id } = useParams();
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await client.queries.research_topics({ relativePath: id });
        setTopic(res.data.research_topics);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl mb-4">Research Topic Not Found</h1>
        <Link to="/research" className="text-blue-600 hover:text-blue-700">
          Back to Research
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        to="/research"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Research
      </Link>

      <h1 className="text-4xl mb-8">{topic.title}</h1>

      <img
        src={topic.image}
        alt={topic.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-xl text-gray-700 mb-6">{topic.description}</p>
        
        <TinaMarkdown content={topic.content} />
      </div>

      {/* Flexible Blocks */}
      <BlockRenderer blocks={topic.blocks} />

      <section className="mt-16 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Interested in This Research?</h2>
        <p className="text-gray-700 mb-4">
          If you are interested in pursuing research in this area, please contact us for more information about graduate student opportunities.
        </p>
        <Link
          to="/prospective-students"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Learn More
        </Link>
      </section>
    </div>
  );
}

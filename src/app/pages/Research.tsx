import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";

export function Research() {
  const [topics, setTopics] = useState<any[]>([]);
  const [methods, setMethods] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsRes, methodsRes] = await Promise.all([
          client.queries.research_topicsConnection(),
          client.queries.research_methodsConnection()
        ]);
        
        setTopics(topicsRes.data.research_topicsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || []);
        setMethods(methodsRes.data.research_methodsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || []);

        try {
          const pageRes = await client.queries.pages({ relativePath: "research.json" });
          setPageData(pageRes.data.pages);
        } catch (err) {
          console.warn("Research page summary data not found", err);
        }
      } catch (error) {
        console.error("Error fetching Research connection data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">Research</h1>

      {/* Research Topics */}
      <section className="mb-16">
        <h2 className="text-3xl mb-4">Research Topics</h2>
        {pageData?.topicsExplanation && (
          <div className="prose prose-lg mb-8 text-gray-700">
            <TinaMarkdown content={pageData.topicsExplanation} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/research/topic/${topic._sys.relativePath}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 font-bold">{topic.title}</h3>
                <div className="text-gray-600 text-sm line-clamp-3">
                  <TinaMarkdown content={topic.description} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Research Methods */}
      <section>
        <h2 className="text-3xl mb-4">Research Methods</h2>
        {pageData?.methodsExplanation && (
          <div className="prose prose-lg mb-8 text-gray-700">
            <TinaMarkdown content={pageData.methodsExplanation} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methods.map((method) => (
            <Link
              key={method.id}
              to={`/research/method/${method._sys.relativePath}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={method.image}
                alt={method.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 font-bold">{method.title}</h3>
                <div className="text-gray-600 text-sm line-clamp-3">
                  <TinaMarkdown content={method.description} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

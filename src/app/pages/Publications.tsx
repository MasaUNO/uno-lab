import { useEffect, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../tina/__generated__/client";

export function Publications() {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.publicationsConnection({ sort: "year" });
        const pubData = res.data.publicationsConnection.edges?.map(e => e?.node) || [];
        // Sort descending by year
        pubData.sort((a, b) => (b?.year || 0) - (a?.year || 0));
        setPublications(pubData);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">Publications</h1>

      <div className="space-y-12">
        {publications.map((yearGroup) => (
          <section key={yearGroup.year || yearGroup.id}>
            <h2 className="text-3xl mb-6 pb-2 border-b-2 border-gray-200">
              {yearGroup.year}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <TinaMarkdown content={yearGroup.items} />
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Publication Guidelines</h2>
        <p className="text-gray-700 mb-4">
          For a complete list of publications and preprints, please visit our profiles on:
        </p>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Google Scholar
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              ResearchGate
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              ORCID
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

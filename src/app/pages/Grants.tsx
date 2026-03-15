import { useEffect, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { ResearchOutputNav } from "../components/ResearchOutputNav";

export function Grants() {
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.grantsConnection();
        const grantsData = res.data.grantsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || [];
        // Sort descending by yearStart
        grantsData.sort((a, b) => (b?.yearStart || 0) - (a?.yearStart || 0));
        setGrants(grantsData);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-8 font-bold">Research Outputs</h1>
      
      <ResearchOutputNav />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">Grants & Funding</h2>
          <div className="space-y-8">
            {grants.length > 0 ? (
              grants.map((grant) => (
                <article key={grant.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium text-sm">
                      {grant.yearStart}{grant.yearEnd ? ` – ${grant.yearEnd}` : ""}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{grant.fundName}</h3>
                  </div>
                  {grant.researchTitle && (
                    <p className="text-xl text-gray-700 leading-relaxed italic">
                      {grant.researchTitle}
                    </p>
                  )}
                </article>
              ))
            ) : (
              <p className="text-gray-500 italic">No grants or funding listed yet.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}


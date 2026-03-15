import { useEffect, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { ResearchOutputNav } from "../components/ResearchOutputNav";

export function Awards() {
  const [awards, setAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.awardsConnection({ sort: "year" });
        const awardsData = res.data.awardsConnection.edges?.map(e => e?.node) || [];
        awardsData.sort((a, b) => (b?.year || 0) - (a?.year || 0));
        setAwards(awardsData);
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
          <h2 className="text-3xl font-bold mb-12">Awards</h2>
          <div className="space-y-12">
            {awards.length > 0 ? (
              awards.map((yearGroup) => (
                <section key={yearGroup.year || yearGroup.id}>
                  <h3 className="text-2xl mb-6 pb-2 border-b-2 border-gray-200 font-bold">
                    {yearGroup.year}
                  </h3>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <TinaMarkdown content={yearGroup.items} />
                  </div>
                </section>
              ))
            ) : (
              <p className="text-gray-500 italic">No awards listed yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


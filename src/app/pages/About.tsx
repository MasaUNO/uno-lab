import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { BlockRenderer } from "../components/BlockRenderer";

export function About() {
  const [pageData, setPageData] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageRes, topicsRes, methodsRes] = await Promise.all([
          client.queries.pages({ relativePath: "about.json" }),
          client.queries.research_topicsConnection(),
          client.queries.research_methodsConnection()
        ]);
        setPageData(pageRes.data.pages);
        setTopics(topicsRes.data.research_topicsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || []);
        setMethods(methodsRes.data.research_methodsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || []);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!pageData) return <div>Data not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-8 font-bold">{pageData.title || "About us"}</h1>

      <div className="space-y-12">
        <BlockRenderer 
          blocks={pageData.blocks} 
          researchTopics={topics} 
          researchMethods={methods}
        />
      </div>
    </div>
  );
}
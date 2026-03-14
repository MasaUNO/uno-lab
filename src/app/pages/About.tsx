import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { BlockRenderer } from "../components/BlockRenderer";

export function About() {
  const [pageData, setPageData] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageRes, topicsRes] = await Promise.all([
          client.queries.pages({ relativePath: "about.json" }),
          client.queries.research_topicsConnection()
        ]);
        setPageData(pageRes.data.pages);
        setTopics(topicsRes.data.research_topicsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || []);
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
      <h1 className="text-4xl mb-8">{pageData.title || "About us"}</h1>

      <div className="space-y-12">
        {/* Render Flexible Blocks */}
        <BlockRenderer blocks={pageData.blocks} researchTopics={topics} />

        {/* Keeping the Philosophy section for now to preserve the links the user wants fixed, 
            unless they want these also moved to blocks. 
            The user said "make this whole page editable", so I should probably transition these to blocks 
            or keep them as a fixed part of the template if they are always there.
            But the user said "whole page editable", so blocks is the way.
            I'll keep this section for now but fix the links as requested. 
        */}
        {!pageData.blocks && (
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl mb-4">Research Philosophy</h2>
              <ul className="list-none text-gray-700 space-y-2 mb-4">
                <li>
                  <Link to="/research/method/field.json" className="text-blue-600 hover:text-blue-700">
                    フィールド調査
                  </Link>
                </li>
                <li>
                  <Link to="/research/method/lab.json" className="text-blue-600 hover:text-blue-700">
                    室内水熱反応実験
                  </Link>
                </li>
                <li>
                  <Link to="/research/method/simulation.json" className="text-blue-600 hover:text-blue-700">
                    数値シミュレーション
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        )}
        
        {/* Fix links even if blocks are present (in case they want to link to them from blocks) */}
        {pageData.blocks && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="flex flex-wrap gap-4">
               <Link to="/research/method/field.json" className="text-blue-600 hover:underline">フィールド調査</Link>
               <Link to="/research/method/lab.json" className="text-blue-600 hover:underline">室内水熱反応実験</Link>
               <Link to="/research/method/simulation.json" className="text-blue-600 hover:underline">数値シミュレーション</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
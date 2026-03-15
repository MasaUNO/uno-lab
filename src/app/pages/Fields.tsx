import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { BlockRenderer } from "../components/BlockRenderer";

export function Fields() {
  const [fields, setFields] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fieldsRes, pageRes] = await Promise.all([
          client.queries.fieldsConnection(),
          client.queries.pages({ relativePath: "fields_page.json" })
        ]);
        setFields(fieldsRes.data.fieldsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || []);
        setPageData(pageRes.data.pages);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-8">{pageData?.title || "Field Survey Areas"}</h1>
      </div>

      <BlockRenderer blocks={pageData?.blocks} fields={fields} />
    </div>
  );
}


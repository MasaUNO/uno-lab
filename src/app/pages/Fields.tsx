import { useEffect, useState } from "react";
import { Link } from "react-router";
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
        <h1 className="text-4xl font-bold mb-4">{pageData?.title || "Field Survey Areas"}</h1>
        {pageData?.description ? (
          <div className="text-xl text-gray-600 prose prose-lg max-w-none">
            <TinaMarkdown content={pageData.description} />
          </div>
        ) : (
          <p className="text-xl text-gray-600">Exploring geological phenomena across the globe.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fields.map((field) => (
          <Link
            key={field.id}
            to={`/fields/${field._sys.relativePath}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={imagePath(field.image || "https://images.unsplash.com/photo-1531870856481-49a0ce6d0698?auto=format&fit=crop&q=80")}
                alt={field.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                {field.title}
              </h3>
              <div className="text-gray-600 line-clamp-3 text-sm">
                <TinaMarkdown content={field.description} />
              </div>
              <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                View Research Topics →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

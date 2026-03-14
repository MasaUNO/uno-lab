import { useEffect, useState } from "react";
import { Link } from "react-router";
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

export function News() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.newsConnection({ sort: "date" });
        const newsData = res.data.newsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || [];
        // Sort descending by date
        newsData.sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime());
        setNewsList(newsData);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">News & Updates</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsList.map((news) => (
          <Link
            key={news.id}
            to={`/news/${news._sys.relativePath}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={imagePath(news.image)}
              alt={news.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{news.date ? new Date(news.date).toLocaleDateString() : ""}</div>
              <h2 className="text-2xl mb-3">{news.title}</h2>
              <p className="text-gray-600">{news.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

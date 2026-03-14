import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";
import { BlockRenderer } from "../components/BlockRenderer";

export function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await client.queries.news({ relativePath: id });
        setNews(res.data.news);

        const allRes = await client.queries.newsConnection({ first: 3 });
        const allNews = allRes.data.newsConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || [];
        setRelated(allNews.filter(n => n.id !== res.data.news.id).slice(0, 2));
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl mb-4">News Not Found</h1>
        <Link to="/news" className="text-blue-600 hover:text-blue-700">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        to="/news"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeft size={20} />
        Back to News
      </Link>

      <article>
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Calendar size={18} />
          <time dateTime={news.date}>{news.date ? new Date(news.date).toLocaleDateString() : ""}</time>
        </div>

        <h1 className="text-4xl mb-8">{news.title}</h1>

        <img
          src={news.image}
          alt={news.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            {news.excerpt}
          </p>

          <TinaMarkdown content={news.content} />
        </div>

        {/* Flexible Blocks */}
        <BlockRenderer blocks={news.blocks} />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl mb-4">Related Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/research" className="text-blue-600 hover:text-blue-700">
                View our research topics
              </Link>
            </li>
            <li>
              <Link to="/publications" className="text-blue-600 hover:text-blue-700">
                See our publications
              </Link>
            </li>
            <li>
              <Link to="/members" className="text-blue-600 hover:text-blue-700">
                Meet our team members
              </Link>
            </li>
          </ul>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">More News</h3>
            <Link to="/news" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All News
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((relatedNews) => (
              <Link
                key={relatedNews.id}
                to={`/news/${relatedNews._sys.relativePath}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={relatedNews.image}
                  alt={relatedNews.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    {relatedNews.date ? new Date(relatedNews.date).toLocaleDateString() : ""}
                  </div>
                  <h4 className="text-lg mb-2">{relatedNews.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {relatedNews.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

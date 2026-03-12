import { Link } from "react-router";
import { newsData } from "../data/mockData";

export function News() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">News & Updates</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsData.map((news) => (
          <Link
            key={news.id}
            to={`/news/${news.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{news.date}</div>
              <h2 className="text-2xl mb-3">{news.title}</h2>
              <p className="text-gray-600">{news.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

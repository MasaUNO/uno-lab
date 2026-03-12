import { useParams, Link } from "react-router";
import { newsData } from "../data/mockData";
import { ArrowLeft, Calendar } from "lucide-react";

export function NewsDetail() {
  const { id } = useParams();
  const news = newsData.find((n) => n.id === id);

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
          <time dateTime={news.date}>{news.date}</time>
        </div>

        <h1 className="text-4xl mb-8">{news.title}</h1>

        <img
          src={news.image}
          alt={news.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            {news.excerpt}
          </p>

          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>{news.content}</p>
            
            <p>
              This achievement represents a significant milestone for our laboratory and demonstrates 
              the dedication and hard work of our research team. We continue to push the boundaries 
              of knowledge in fluid-rock interaction research and contribute to the scientific community.
            </p>

            <h2 className="text-2xl mt-8 mb-4">Background</h2>
            <p>
              Our research group has been investigating these phenomena for several years, combining 
              field observations, laboratory experiments, and numerical simulations. This 
              multidisciplinary approach allows us to gain comprehensive insights into complex 
              geological processes.
            </p>

            <h2 className="text-2xl mt-8 mb-4">Implications</h2>
            <p>
              The findings from this work have important implications for understanding natural 
              hazards, resource exploration, and environmental processes. We are excited to continue 
              building on these results in our future research.
            </p>

            <h2 className="text-2xl mt-8 mb-4">Acknowledgments</h2>
            <p>
              This work was supported by grants from the Japan Society for the Promotion of Science 
              (JSPS) and the Ministry of Education, Culture, Sports, Science and Technology (MEXT). 
              We thank our collaborators and all members of the Uno Laboratory for their contributions.
            </p>
          </div>

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
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl mb-6">More News</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsData
            .filter((n) => n.id !== news.id)
            .slice(0, 2)
            .map((relatedNews) => (
              <Link
                key={relatedNews.id}
                to={`/news/${relatedNews.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={relatedNews.image}
                  alt={relatedNews.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    {relatedNews.date}
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
    </div>
  );
}

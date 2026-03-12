import { Link } from "react-router";
import { researchTopics, researchMethods } from "../data/mockData";

export function Research() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">Research</h1>

      {/* Research Topics */}
      <section className="mb-16">
        <h2 className="text-3xl mb-8">Research Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/research/topic/${topic.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Research Methods */}
      <section>
        <h2 className="text-3xl mb-8">Research Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchMethods.map((method) => (
            <Link
              key={method.id}
              to={`/research/method/${method.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={method.image}
                alt={method.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

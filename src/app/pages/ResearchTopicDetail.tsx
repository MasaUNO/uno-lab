import { useParams, Link } from "react-router";
import { researchTopics } from "../data/mockData";
import { ArrowLeft } from "lucide-react";

export function ResearchTopicDetail() {
  const { id } = useParams();
  const topic = researchTopics.find((t) => t.id === id);

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl mb-4">Research Topic Not Found</h1>
        <Link to="/research" className="text-blue-600 hover:text-blue-700">
          Back to Research
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        to="/research"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Research
      </Link>

      <h1 className="text-4xl mb-8">{topic.title}</h1>

      <img
        src={topic.image}
        alt={topic.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-6">{topic.description}</p>
        
        <div className="text-gray-700 leading-relaxed">
          {topic.content}
        </div>

        <section className="mt-12">
          <h2 className="text-3xl mb-4">Research Objectives</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Understand the fundamental mechanisms of fluid-rock interactions</li>
            <li>Quantify reaction rates and transport processes</li>
            <li>Develop predictive models for natural systems</li>
            <li>Apply findings to societal challenges</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl mb-4">Methodology</h2>
          <p className="text-gray-700">
            Our approach combines multiple techniques to provide comprehensive insights:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Field Studies</h3>
              <p className="text-sm text-gray-600">
                Direct observation and sampling from natural settings
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Laboratory Experiments</h3>
              <p className="text-sm text-gray-600">
                Controlled experiments under various conditions
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Numerical Modeling</h3>
              <p className="text-sm text-gray-600">
                Computer simulations and data analysis
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl mb-4">Key Publications</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Uno, M., et al. (2026). Recent advances in this research area. Nature Geoscience.</li>
            <li>Tanaka, Y., & Uno, M. (2025). Experimental constraints on reaction kinetics. GCA.</li>
            <li>Yamamoto, H., & Uno, M. (2024). Field observations and implications. EPSL.</li>
          </ol>
        </section>

        <section className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Interested in This Research?</h2>
          <p className="text-gray-700 mb-4">
            If you are interested in pursuing research in this area, please contact us for more information about graduate student opportunities.
          </p>
          <Link
            to="/prospective-students"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More
          </Link>
        </section>
      </div>
    </div>
  );
}

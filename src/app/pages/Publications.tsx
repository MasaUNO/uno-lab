import { publications } from "../data/mockData";

export function Publications() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">Publications</h1>

      <div className="space-y-12">
        {publications.map((yearGroup) => (
          <section key={yearGroup.year}>
            <h2 className="text-3xl mb-6 pb-2 border-b-2 border-gray-200">
              {yearGroup.year}
            </h2>
            <ol className="space-y-4 list-decimal list-inside">
              {yearGroup.items.map((publication, index) => (
                <li key={index} className="text-gray-700 leading-relaxed pl-2">
                  {publication}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Publication Guidelines</h2>
        <p className="text-gray-700 mb-4">
          For a complete list of publications and preprints, please visit our profiles on:
        </p>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Google Scholar
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              ResearchGate
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              ORCID
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

import { useParams, Link } from "react-router";
import { members } from "../data/mockData";
import { ArrowLeft, Mail } from "lucide-react";

export function MemberDetail() {
  const { id } = useParams();
  const member = members.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl mb-4">Member Not Found</h1>
        <Link to="/members" className="text-blue-600 hover:text-blue-700">
          Back to Members
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        to="/members"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Members
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <img
            src={member.image}
            alt={member.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl mb-4">{member.name}</h1>
          <p className="text-xl text-blue-600 mb-6">{member.role}</p>
          
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Mail size={20} />
            <a
              href={`mailto:${member.email}`}
              className="hover:text-blue-600"
            >
              {member.email}
            </a>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl mb-3">Research Interests</h2>
            <p className="text-gray-700">{member.research}</p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-3xl mb-4">Biography</h2>
          <p className="text-gray-700">{member.bio}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Education</h2>
          <ul className="space-y-3">
            <li className="text-gray-700">
              <strong>Ph.D.</strong> in Earth and Planetary Science, University of Tokyo (2015)
            </li>
            <li className="text-gray-700">
              <strong>M.Sc.</strong> in Geochemistry, University of Tokyo (2010)
            </li>
            <li className="text-gray-700">
              <strong>B.Sc.</strong> in Earth Science, University of Tokyo (2008)
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Selected Publications</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              {member.name.split(" ")[1]}, {member.name.split(" ")[0].charAt(0)}., et al. (2026). 
              Recent research findings in geochemistry. Nature Geoscience, 19(3), 234-241.
            </li>
            <li>
              {member.name.split(" ")[1]}, {member.name.split(" ")[0].charAt(0)}., et al. (2025). 
              Experimental studies on mineral reactions. Geochimica et Cosmochimica Acta, 298, 112-125.
            </li>
            <li>
              {member.name.split(" ")[1]}, {member.name.split(" ")[0].charAt(0)}., et al. (2024). 
              Field observations and implications. Earth and Planetary Science Letters, 589, 117834.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Awards and Honors</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Outstanding Paper Award, Geochemical Society of Japan (2025)</li>
            <li>Young Scientist Award, Japan Geoscience Union (2023)</li>
            <li>JSPS Research Fellowship for Young Scientists (2012-2014)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Professional Activities</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Member, Geochemical Society of Japan</li>
            <li>Member, Japan Geoscience Union</li>
            <li>Member, American Geophysical Union</li>
            <li>Reviewer for Nature Geoscience, GCA, EPSL</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Teaching</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Advanced Geochemistry (Graduate course)</li>
            <li>Field Geology Practicum (Undergraduate course)</li>
            <li>Earth Science Laboratory (Undergraduate course)</li>
          </ul>
        </section>

        {member.role.includes("Professor") && (
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl mb-4">For Prospective Students</h2>
            <p className="text-gray-700 mb-4">
              I am always looking for motivated students to join our research group. 
              If you are interested in pursuing graduate studies in our lab, please feel free to contact me.
            </p>
            <Link
              to="/prospective-students"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn More
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

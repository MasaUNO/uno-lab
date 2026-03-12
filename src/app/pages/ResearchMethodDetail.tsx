import { useParams, Link } from "react-router";
import { researchMethods } from "../data/mockData";
import { ArrowLeft } from "lucide-react";

export function ResearchMethodDetail() {
  const { id } = useParams();
  const method = researchMethods.find((m) => m.id === id);

  if (!method) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl mb-4">Research Method Not Found</h1>
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

      <h1 className="text-4xl mb-8">{method.title}</h1>

      <img
        src={method.image}
        alt={method.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-6">{method.description}</p>
        
        <div className="text-gray-700 leading-relaxed mb-8">
          {method.content}
        </div>

        {method.id === "field" && (
          <>
            <section className="mb-12">
              <h2 className="text-3xl mb-4">Field Equipment</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Portable GPS and mapping tools</li>
                <li>Rock sampling equipment (hammers, chisels, core drills)</li>
                <li>Fluid sampling devices</li>
                <li>Portable gas analyzers</li>
                <li>Temperature and pH measurement devices</li>
                <li>Digital cameras and field notebooks</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl mb-4">Field Locations</h2>
              <p className="text-gray-700 mb-4">
                Our research group conducts field work in various geological settings across Japan and internationally:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Active volcanic regions (Mt. Fuji, Izu-Oshima)</li>
                <li>Fault zones in central Japan</li>
                <li>Metamorphic terrains in the Japanese Alps</li>
                <li>Geothermal fields</li>
                <li>International collaborations (New Zealand, USA, Iceland)</li>
              </ul>
            </section>
          </>
        )}

        {method.id === "lab" && (
          <>
            <section className="mb-12">
              <h2 className="text-3xl mb-4">Laboratory Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl mb-3">High-Pressure Apparatus</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Piston-cylinder press</li>
                    <li>Diamond anvil cells</li>
                    <li>Hydrothermal autoclaves</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl mb-3">Analytical Instruments</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>SEM-EDS</li>
                    <li>EPMA</li>
                    <li>XRD</li>
                    <li>ICP-MS</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl mb-3">Fluid Analysis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Gas chromatography</li>
                    <li>Ion chromatography</li>
                    <li>pH/conductivity meters</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl mb-3">Sample Preparation</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Rock cutting and polishing</li>
                    <li>Thin section preparation</li>
                    <li>Chemical separation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl mb-4">Experimental Conditions</h2>
              <p className="text-gray-700 mb-4">
                Our experiments can simulate a wide range of geological conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Pressure: 0.1 MPa to 10 GPa</li>
                <li>Temperature: Room temperature to 1500°C</li>
                <li>Various fluid compositions (H₂O, CO₂, mixed fluids)</li>
                <li>Different rock types and mineral assemblages</li>
              </ul>
            </section>
          </>
        )}

        {method.id === "simulation" && (
          <>
            <section className="mb-12">
              <h2 className="text-3xl mb-4">Computational Resources</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>High-performance computing cluster with 100+ cores</li>
                <li>GPU acceleration for intensive calculations</li>
                <li>Large storage capacity for data archiving</li>
                <li>Access to national supercomputing facilities</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl mb-4">Modeling Approaches</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl mb-2">Thermodynamic Modeling</h3>
                  <p className="text-gray-700">
                    Calculating phase equilibria and chemical equilibrium in fluid-rock systems using software such as Perple_X and THERMOCALC.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl mb-2">Kinetic Modeling</h3>
                  <p className="text-gray-700">
                    Simulating time-dependent processes including mineral dissolution/precipitation, diffusion, and reactive transport.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl mb-2">Computational Fluid Dynamics</h3>
                  <p className="text-gray-700">
                    Modeling fluid flow in porous media and fracture networks using finite element and finite difference methods.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl mb-4">Software and Tools</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Python (NumPy, SciPy, Pandas) for data analysis</li>
                <li>MATLAB for numerical modeling</li>
                <li>Perple_X for thermodynamic calculations</li>
                <li>COMSOL Multiphysics for coupled processes</li>
                <li>Custom-developed codes for specific applications</li>
              </ul>
            </section>
          </>
        )}

        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Training Opportunities</h2>
          <p className="text-gray-700 mb-4">
            Graduate students in our lab receive comprehensive training in these research methods through hands-on experience and formal coursework.
          </p>
          <Link
            to="/prospective-students"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Our Lab
          </Link>
        </section>
      </div>
    </div>
  );
}

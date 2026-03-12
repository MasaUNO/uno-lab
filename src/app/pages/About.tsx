import { Link } from "react-router";

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-8">About us</h1>

      <div className="prose prose-lg max-w-none">
        <div className="mb-12">
          <img
            src="https://images.unsplash.com/photo-1627892541952-ba3e1604a44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdG9reW8lMjBjYW1wdXN8ZW58MXx8fHwxNzczMzI0Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="University of Tokyo"
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            地震波観測やGPSなど地下の観測技術の進んだ現代ほど，人類が大地の変動を実感している時代はありません．地震，火山，鉱床，地熱資源．CO2岩石固定，沈み込み帯に住む我々には大地の変動と恵みがもたらされます．こうした地殻現象を予測したり，活用したりして人類が持続可能な社会を築くためには，この地球内部の変動を理解し予測する，動的な現象を扱う新たな地球内部の物質科学が必要です．
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            いま，地球内部で，あるいは日本列島の地下でなにが起きているのか？我々はそれを理解・予測し，活用することができるのか？　岩石を様々な方法で観察・分析するとその答えが見えてきます．私たちは，野外地質調査，化学分析，水熱反応実験，数値シミュレーション，統計・機械学習を駆使して，地球内部の動的な変動現象を深く理解し，予測・活用することを目指しています．
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Research Philosophy</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            複雑な地球内部の自然現象を理解したり予測・活用するためには，自然の観察から問題を提起し，その本質を実験で確かめ，理論計算からその妥当性と予測性を探求することが大事です．私たちの研究室では，フィールド調査，独自の水熱反応実験，数値シミュレーションや機械学習を駆使しています．
          </p>
          <ul className="list-none text-gray-700 space-y-2 mb-4">
            <li>
              <Link to="/research/method/field-survey" className="text-blue-600 hover:text-blue-700">
                フィールド調査
              </Link>
            </li>
            <li>
              <Link to="/research/method/hydrothermal-experiment" className="text-blue-600 hover:text-blue-700">
                室内水熱反応実験
              </Link>
            </li>
            <li>
              <Link to="/research/method/numerical-simulation" className="text-blue-600 hover:text-blue-700">
                数値シミュレーション
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Laboratory Facility</h2>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Link
              to="/research/method/hydrothermal-permeability"
              className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl mb-3">高温高圧反応透水試験機</h3>
              <p className="text-gray-700">
                詳細はこちらをご覧ください
              </p>
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">History</h2>
          <p className="text-gray-700 mb-4">
            The laboratory was established in 2015 by Dr. Masaki Uno with a focus on experimental geochemistry and fluid-rock interactions. Since then, we have grown to include multiple research staff and graduate students, and have published numerous peer-reviewed papers in leading international journals.
          </p>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Collaborations</h2>
          <p className="text-gray-700 mb-4">
            We maintain active collaborations with research institutions worldwide, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Stanford University, USA</li>
            <li>ETH Zurich, Switzerland</li>
            <li>JAMSTEC (Japan Agency for Marine-Earth Science and Technology)</li>
            <li>Geological Survey of Japan</li>
            <li>Australian National University</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
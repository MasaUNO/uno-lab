import { Link } from "react-router";

export function ProspectiveStudents() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-8">Prospective Students</h1>

      <div className="prose prose-lg max-w-none">
        <div className="mb-12">
          <img
            src="https://images.unsplash.com/photo-1627892541952-ba3e1604a44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdG9reW8lMjBjYW1wdXN8ZW58MXx8fHwxNzczMzI0Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="University campus"
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Message to Prospective Students</h2>
          <p className="text-gray-700 mb-4">
            私たちの研究室では、地球内部における流体と岩石の相互作用について、フィールドワーク、実験、数値シミュレーションを組み合わせた総合的なアプローチで研究を行っています。
          </p>
          <p className="text-gray-700 mb-4">
            地球科学に情熱を持ち、自然現象の本質を理解したいという強い意欲を持つ学生を歓迎します。また、研究を通じて論理的思考力や問題解決能力を養い、将来的に学術界や産業界で活躍できる人材の育成を目指しています。
          </p>
          <p className="text-gray-700 mb-4">
            研究室のメンバーは互いに協力し合い、活発な議論を通じて切磋琢磨する環境があります。国際学会での発表や海外の研究機関との共同研究にも積極的に参加しています。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">We are Looking For</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>地球科学、化学、物理学、または関連分野のバックグラウンドを持つ方</li>
            <li>実験やフィールドワークに意欲的に取り組める方</li>
            <li>論文執筆やプレゼンテーション能力を向上させたい方</li>
            <li>国際的な研究活動に興味がある方</li>
            <li>チームワークを大切にし、他のメンバーと協力できる方</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Application Process</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl mb-3">Master's Program</h3>
            <p className="text-gray-700 mb-2">
              東京大学大学院理学系研究科地球惑星科学専攻の入学試験を受験してください。
            </p>
            <p className="text-gray-700">
              出願期間: 例年6月頃<br />
              試験日: 例年8月頃<br />
              入学時期: 4月または10月
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl mb-3">Doctoral Program</h3>
            <p className="text-gray-700 mb-2">
              修士課程と同様に、地球惑星科学専攻の入学試験を受験してください。
            </p>
            <p className="text-gray-700">
              出願期間: 例年12月頃<br />
              試験日: 例年1月頃<br />
              入学時期: 4月または10月
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl mb-3">Research Students (研究生)</h3>
            <p className="text-gray-700">
              正規課程への入学前に研究生として研究室での研究活動に参加することも可能です。詳細については直接お問い合わせください。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl mb-4">Contact Before Applying</h2>
          <p className="text-gray-700 mb-4">
            入学を希望される方は、出願前に必ず宇野教授にメールでご連絡ください。研究室訪問も歓迎します。
          </p>
          <p className="text-gray-700 mb-4">
            メールには以下の情報を含めてください：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>氏名と所属</li>
            <li>学歴と研究経験</li>
            <li>興味のある研究テーマ</li>
            <li>希望する入学時期</li>
            <li>履歴書（PDF形式）</li>
          </ul>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Funding Opportunities</h2>
          <p className="text-gray-700 mb-4">
            大学院生向けの奨学金や研究費支援制度がいくつか利用可能です：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>日本学術振興会 特別研究員 (DC1, DC2)</li>
            <li>東京大学 博士課程研究遂行協力制度</li>
            <li>各種財団奨学金</li>
            <li>国費外国人留学生制度 (留学生の場合)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

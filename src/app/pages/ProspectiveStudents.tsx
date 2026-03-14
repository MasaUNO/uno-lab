import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../tina/__generated__/client";
import { BlockRenderer } from "../components/BlockRenderer";

export function ProspectiveStudents() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.pages({ relativePath: "prospective_students.json" });
        setPageData(res.data.pages);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-8">{pageData?.title || "Prospective Students"}</h1>

      <div className="space-y-12">
        {/* Render Flexible Blocks */}
        {pageData?.blocks ? (
          <BlockRenderer blocks={pageData.blocks} />
        ) : (
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
            </section>
            
            <section className="mb-12">
              <h2 className="text-3xl mb-4">Contact Before Applying</h2>
              <p className="text-gray-700 mb-6">
                入学を希望される方は、出願前に必ず宇野教授にメールでご連絡ください。研究室訪問も歓迎します。
              </p>
              <Link
                to="/contact"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </Link>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

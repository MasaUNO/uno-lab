import { useEffect, useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../client";

export function Contact() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.pages({ relativePath: "contact.json" });
        setPageData(res.data.pages);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      }
    };
    fetchData();
  }, []);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">{pageData.title || "Contact"}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl mb-6">Get in Touch</h2>
          <div className="text-gray-700 mb-8 prose prose-lg max-w-none">
            <TinaMarkdown content={pageData.description} />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <div className="text-gray-700 prose prose-sm max-w-none">
                  <TinaMarkdown content={pageData.address} />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {Array.isArray(pageData.email) ? pageData.email.join("\n") : pageData.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Office Hours</h3>
            <div className="text-gray-700 prose prose-sm max-w-none">
              <TinaMarkdown content={pageData.officeHours} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl mb-6">Contact Form</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">
                Name / 氏名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="affiliation" className="block mb-2">
                Affiliation / 所属
              </label>
              <input
                type="text"
                id="affiliation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2">
                Subject / 件名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2">
                Message / メッセージ <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>

            <p className="text-sm text-gray-600">
              ※このフォームはデモ版です。実際の送信機能を実装する場合は、
              バックエンドAPIとの連携が必要です。
            </p>
          </form>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-12">
        <h2 className="text-2xl mb-6">Location</h2>
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">
            Google Maps integration would go here
          </p>
        </div>
      </div>
    </div>
  );
}
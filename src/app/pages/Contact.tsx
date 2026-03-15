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
                <div className="text-gray-700 prose prose-sm max-w-none whitespace-pre-line">
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


        </div>
      </div>

      {/* Map */}
      <div className="mt-12">
        <h2 className="text-2xl mb-6 font-bold">Location</h2>
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.507048707741!2d139.7634147755751!3d35.713746478759724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c2fc33dd137%3A0xef984c2eff28848e!2z55CG5a2m6YOoMeWPt-mkqA!5e0!3m2!1sja!2sjp!4v1773565627078!5m2!1sja!2sjp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
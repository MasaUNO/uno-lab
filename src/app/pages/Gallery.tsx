import { useEffect, useState } from "react";
import { X } from "lucide-react";
import client from "../client";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{url: string, caption: string} | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.galleryConnection();
        setImages(res.data.galleryConnection.edges?.map(e => ({ id: e?.node?.id, ...e?.node })) || []);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12 font-bold">Photo Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage({ url: img.url, caption: img.caption })}
          >
            <img
              src={img.url}
              alt={img.caption || ""}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full flex flex-col items-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.caption || "Full size"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mb-6"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImage.caption && (
              <p className="text-white text-xl font-medium text-center bg-black bg-opacity-40 px-6 py-3 rounded-full backdrop-blur-sm">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

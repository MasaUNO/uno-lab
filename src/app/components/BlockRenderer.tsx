import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Link } from "react-router";

const imagePath = (src: string) => {
  if (!src) return src;
  if (src.startsWith('http')) return src;
  // Handle local public paths that might have special characters
  // decodeURI first to avoid double encoding if Tina already partially encoded it
  try {
    return encodeURI(decodeURIComponent(src));
  } catch (e) {
    return encodeURI(src);
  }
};

export function BlockRenderer({ 
  blocks, 
  researchTopics,
  researchMethods,
  fields
}: { 
  blocks: any[]; 
  researchTopics?: any[];
  researchMethods?: any[];
  fields?: any[];
}) {
  if (!blocks) return null;

  return (
    <div className="space-y-16">
      {blocks.map((block, i) => {
        const type = block.__typename || "";
        
        if (type.endsWith("BlocksHero")) {
          return <HeroBlock key={i} images={block.images} />;
        }
        
        if (type.endsWith("BlocksImageGrid")) {
          return <ImageGridBlock key={i} images={block.images} />;
        }
        
        if (type.endsWith("BlocksVideo")) {
          return <VideoBlock key={i} url={block.url} />;
        }
        
        if (type.endsWith("BlocksRichText")) {
          return (
            <div key={i} className="prose prose-lg max-w-none">
              <TinaMarkdown content={block.body} />
            </div>
          );
        }
        
        if (type.endsWith("BlocksResearchCards")) {
          return <ResearchCardsBlock key={i} title={block.title} topics={researchTopics} />;
        }
        
        if (type.endsWith("BlocksMethodCards")) {
          return <MethodCardsBlock key={i} title={block.title} methods={researchMethods} />;
        }
        
        if (type.endsWith("BlocksFieldCards")) {
          return <FieldCardsBlock key={i} title={block.title} fields={fields} />;
        }

        return null;
      })}
    </div>
  );
}

function HeroBlock({ images }: { images: string[] }) {
  const validImages = images?.filter(img => !!img) || [];
  if (validImages.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-4">
      {validImages.map((img, i) => (
        <img key={i} src={imagePath(img)} className="w-full h-[500px] object-cover rounded-xl shadow-lg" alt="" />
      ))}
    </div>
  );
}

function ImageGridBlock({ images }: { images: string[] }) {
  const validImages = images?.filter(img => !!img) || [];
  if (validImages.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {validImages.map((img, i) => (
        <img key={i} src={imagePath(img)} className="w-full h-64 object-cover rounded-lg" alt="" />
      ))}
    </div>
  );
}

function VideoBlock({ url }: { url: string }) {
  if (!url) return null;
  // Basic YouTube/Vimeo embed logic
  let embedUrl = url;
  if (url.includes("youtube.com/watch?v=")) {
    embedUrl = url.replace("watch?v=", "embed/");
  } else if (url.includes("youtu.be/")) {
    embedUrl = url.replace("youtu.be/", "youtube.com/embed/");
  }
  
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
function ResearchCardsBlock({ title, topics }: { title?: string; topics?: any[] }) {
  if (!topics || topics.length === 0) return null;
  return (
    <div className="my-12">
      {title && <h2 className="text-3xl mb-8 font-bold">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/research/topic/${topic._sys.relativePath}`}
            className="flex gap-6 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-4 group"
          >
            {topic.image && (
              <img
                src={imagePath(topic.image)}
                alt={topic.title}
                className="w-24 h-24 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {topic.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MethodCardsBlock({ title, methods }: { title?: string; methods?: any[] }) {
  if (!methods || methods.length === 0) return null;
  return (
    <div className="my-12">
      {title && <h2 className="text-3xl mb-8 font-bold">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {methods.map((method) => (
          <Link
            key={method.id}
            to={`/research/method/${method._sys.relativePath}`}
            className="flex gap-6 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-4 group"
          >
            {method.image && (
              <img
                src={imagePath(method.image)}
                alt={method.title}
                className="w-24 h-24 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {method.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {method.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FieldCardsBlock({ title, fields }: { title?: string; fields?: any[] }) {
  if (!fields || fields.length === 0) return null;
  return (
    <div className="my-12">
      {title && <h2 className="text-3xl mb-8 font-bold">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fields.map((field) => (
          <Link
            key={field.id}
            to={`/fields/${field._sys.relativePath}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={imagePath(field.image || "https://images.unsplash.com/photo-1531870856481-49a0ce6d0698?auto=format&fit=crop&q=80")}
                alt={field.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                {field.title}
              </h3>
              <div className="text-gray-600 line-clamp-3 text-sm">
                <TinaMarkdown content={field.description} />
              </div>
              <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                View Research Topics →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


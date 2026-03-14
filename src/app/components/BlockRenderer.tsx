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

export function BlockRenderer({ blocks, researchTopics }: { blocks: any[]; researchTopics?: any[] }) {
  if (!blocks) return null;

  return (
    <div className="space-y-16">
      {blocks.map((block, i) => {
        switch (block.__typename) {
          case "NewsBlocksHero":
          case "Research_topicsBlocksHero":
          case "Research_methodsBlocksHero":
          case "MembersBlocksHero":
          case "PagesAboutBlocksHero":
          case "PagesProspective_studentsBlocksHero":
            return <HeroBlock key={i} images={block.images} />;
          case "NewsBlocksImageGrid":
          case "Research_topicsBlocksImageGrid":
          case "Research_methodsBlocksImageGrid":
          case "MembersBlocksImageGrid":
            return <ImageGridBlock key={i} images={block.images} />;
          case "NewsBlocksVideo":
          case "Research_topicsBlocksVideo":
          case "Research_methodsBlocksVideo":
          case "MembersBlocksVideo":
            return <VideoBlock key={i} url={block.url} />;
          case "NewsBlocksRichText":
          case "Research_topicsBlocksRichText":
          case "Research_methodsBlocksRichText":
          case "MembersBlocksRichText":
          case "PagesAboutBlocksRichText":
          case "PagesProspective_studentsBlocksRichText":
            return (
              <div key={i} className="prose prose-lg max-w-none">
                <TinaMarkdown content={block.body} />
              </div>
            );
          case "PagesAboutBlocksResearchCards":
            return <ResearchCardsBlock key={i} title={block.title} topics={researchTopics} />;
          default:
            return null;
        }
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
      {title && <h2 className="text-3xl mb-8">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/research/topic/${topic._sys.relativePath}`}
            className="flex gap-6 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-4"
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


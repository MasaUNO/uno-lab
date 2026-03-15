import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import client from "../client";

const imagePath = (src: string) => {
  if (!src) return src;
  if (src.startsWith('http')) return src;
  try {
    return encodeURI(decodeURIComponent(src));
  } catch (e) {
    return encodeURI(src);
  }
};

const heroImages = [
  "https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBzY2llbmNlJTIwbWljcm9zY29wZXxlbnwxfHx8fDE3NzMzMjQzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1713470093936-d45b536f486b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9sb2d5JTIwcm9jayUyMGZvcm1hdGlvbiUyMGZpZWxkJTIwd29ya3xlbnwxfHx8fDE3NzMzMjQzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1627892541952-ba3e1604a44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdG9reW8lMjBjYW1wdXN8ZW58MXx8fHwxNzczMzI0Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
];

export function Home() {
  const [showScrollContent, setShowScrollContent] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const [pageData, setPageData] = useState<any>(null);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [topicsList, setTopicsList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageRes = await client.queries.pages({ relativePath: "home.json" });
        setPageData(pageRes.data.pages);

        const newsRes = await client.queries.newsConnection({ first: 3, sort: "date" });
        setNewsList(newsRes.data.newsConnection.edges?.map((e: any) => ({ id: e?.node?.id, ...e?.node })) || []);

        const topicsRes = await client.queries.research_topicsConnection({ first: 3 });
        setTopicsList(topicsRes.data.research_topicsConnection.edges?.map((e: any) => ({ id: e?.node?.id, ...e?.node })) || []);

        const galleryRes = await client.queries.galleryConnection({ first: 10 });
        setGalleryList(galleryRes.data.galleryConnection.edges?.map((e: any) => ({ id: e?.node?.id, ...e?.node })).filter((img: any) => !!img.url) || []);
      } catch (error) {
        console.error("Error fetching Tina data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollContent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gallery auto-rotation
  useEffect(() => {
    if (galleryList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % galleryList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryList]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  if (!pageData) return <div>Loading...</div>;

  const imagesToDisplay = (pageData.heroImages && pageData.heroImages.length > 0 
    ? pageData.heroImages 
    : heroImages).filter((img: string) => !!img);

  return (
    <div>
      {/* Full Screen Hero Section with Auto-rotation */}
      <div className="h-screen relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          {imagesToDisplay.length > 0 && (
            <Slider {...{ ...sliderSettings, dots: false, arrows: false }} className="h-full w-full">
              {imagesToDisplay.map((image: string, index: number) => (
                <div key={index} className="h-screen w-full relative">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover transition-opacity duration-1000"
                    onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1713470093936-d45b536f486b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10" />
                </div>
              ))}
            </Slider>
          )}
        </div>
        
        <div className="relative h-full flex items-center justify-center z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-black bg-opacity-60 backdrop-blur-sm px-8 py-12 rounded-lg text-center max-w-3xl mx-4 pointer-events-auto"
          >
            <h1 className="text-white text-5xl md:text-6xl mb-4 whitespace-pre-line leading-tight">
              {pageData.heroTitle || "Welcome"}
            </h1>
            <p className="text-white text-xl md:text-2xl opacity-90">
              {pageData.heroSubtitle || "Fluid-rock Interaction Laboratory"}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">About us</h2>
          <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
            <TinaMarkdown content={pageData.aboutText} />
          </div>
        </section>

        {/* Latest News */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl">Latest News</h2>
            <Link
              to="/news"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsList.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news._sys.relativePath}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={imagePath(news.image)}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{news.date ? new Date(news.date).toLocaleDateString() : ""}</div>
                  <h3 className="text-xl mb-2">{news.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{news.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Research Themes */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl">Research Themes</h2>
            <Link
              to="/research"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topicsList.map((topic) => (
              <Link
                key={topic.id}
                to={`/research/topic/${topic._sys.relativePath}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={imagePath(topic.image)}
                  alt={topic.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-2">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Photo Gallery - Auto-rotating */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl">Gallery</h2>
            <Link
              to="/gallery"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>
          {galleryList.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryList.slice(currentGalleryIndex, currentGalleryIndex + 4).map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={imagePath(img.url)}
                    alt={img.caption || ""}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl mb-4 font-semibold">Address</h3>
                <div className="prose text-gray-700 max-w-none whitespace-pre-line">
                  <TinaMarkdown content={pageData.contactInfo?.address} />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl mb-4 font-semibold">Get in Touch</h3>
                <p className="text-gray-700 mb-4">
                  Email: {pageData.contactInfo?.email}
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
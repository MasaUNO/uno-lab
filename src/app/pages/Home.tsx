import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { newsData, researchTopics, galleryImages } from "../data/mockData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const heroImages = [
  "https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBzY2llbmNlJTIwbWljcm9zY29wZXxlbnwxfHx8fDE3NzMzMjQzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1713470093936-d45b536f486b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9sb2d5JTIwcm9jayUyMGZvcm1hdGlvbiUyMGZpZWxkJTIwd29ya3xlbnwxfHx8fDE3NzMzMjQzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1627892541952-ba3e1604a44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdG9reW8lMjBjYW1wdXN8ZW58MXx8fHwxNzczMzI0Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
];

export function Home() {
  const [showScrollContent, setShowScrollContent] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

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
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div>
      {/* Full Screen Hero Section */}
      <div className="h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImages[0]})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-black bg-opacity-50 backdrop-blur-sm px-8 py-12 rounded-lg text-center max-w-3xl mx-4"
          >
            <h1 className="text-white text-5xl md:text-6xl mb-4">
              Welcome to Uno Lab,
              <br />
              Univ. Tokyo
            </h1>
            <p className="text-white text-xl md:text-2xl opacity-90">
              Fluid-rock Interaction Laboratory
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Auto-rotating Hero Slider */}
      {showScrollContent && (
        <section className="mb-16">
          <Slider {...sliderSettings}>
            {heroImages.map((image, index) => (
              <div key={index}>
                <div
                  className="h-[70vh] bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30" />
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">About us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            いま，地球内部で，あるいは日本列島の地下でなにが起きているのか？我々はそれを理解・予測し，活用することができるのか？　岩石を様々な方法で観察・分析するとその答えが見えてきます．私たちは，野外地質調査，化学分析，水熱反応実験，数値シミュレーション，統計・機械学習を駆使して，地球内部の動的な変動現象を深く理解し，予測・活用することを目指しています．
          </p>
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
            {newsData.slice(0, 3).map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{news.date}</div>
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
            {researchTopics.slice(0, 3).map((topic) => (
              <Link
                key={topic.id}
                to={`/research/topic/${topic.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={topic.image}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.slice(currentGalleryIndex, currentGalleryIndex + 4).map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">Address</h3>
              <p className="text-gray-700">
                Uno Laboratory
                <br />
                Department of Earth and Planetary Science
                <br />
                Graduate School of Science
                <br />
                The University of Tokyo
                <br />
                7-3-1 Hongo, Bunkyo-ku
                <br />
                Tokyo 113-0033, Japan
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4">Get in Touch</h3>
              <p className="text-gray-700 mb-4">
                Email: contact@unolab.u-tokyo.ac.jp
              </p>
              <Link
                to="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button";

const CampusSlider = () => {
  const images = [
    {
      src: "/images/TU-gate.png",
      alt: "Tezpur University Main Gate at Night",
      caption: "Where memories begin - The iconic gateway of Tezpur University"
    },
    {
      src: "/images/Assamese_department.png",
      alt: "Campus with Pink Flowering Trees",
      caption: "Spring blossoms painting the campus in nostalgic hues"
    },
    {
      src: "/images/SOE-Night.png",
      alt: "Tree-lined Campus Pathway",
      caption: "Pathways that led to lifelong friendships and discoveries"
    },
    {
      src: "/images/Cherry-Blossom.png",
      alt: "Sunset Through Campus Trees",
      caption: "Golden hours of learning and growing together"
    },
    {
      src: "/images/Basket-Ball.png",
      alt: "Campus Sports Facility",
      caption: "Where champions were made and teamwork was forged"
    },
    {
      src: "/images/DSW-Sunset.png",
      alt: "Campus Road at Sunset",
      caption: "The roads that shaped our journey and future"
    },
    {
      src: "/images/Proctor-Office.png",
      alt: "Flowering Trees Along Campus Road",
      caption: "Nature's classroom where every season taught us something new"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-pearl-white to-powder-blue/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
            Memories from Our Beautiful Campus
          </h2>
          <p className="text-xl text-warm-slate max-w-2xl mx-auto">
            Take a nostalgic journey through the places that shaped our dreams and aspirations
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Image Container */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-[var(--shadow-memory)]">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-contain transition-all duration-700 ease-in-out bg-gradient-to-b from-pearl-white/50 to-powder-blue/20"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/50 via-transparent to-transparent"></div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <p className="text-base md:text-lg lg:text-xl font-medium text-center leading-relaxed drop-shadow-lg">
                {images[currentIndex].caption}
              </p>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 
             bg-white/80 text-black 
             border border-white/60 shadow-lg 
             rounded-full p-2 
             transition-transform duration-300 
             hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 
             bg-white/80 text-black 
             border border-white/60 shadow-lg 
             rounded-full p-2 
             transition-transform duration-300 
             hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>


          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-6 gap-2 md:gap-3 flex-wrap px-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex
                  ? 'ring-2 md:ring-3 ring-vintage-gold shadow-[var(--shadow-glow)] scale-105 md:scale-110'
                  : 'ring-1 ring-powder-blue hover:ring-memory-blue hover:scale-105'
                  }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                />
                {index !== currentIndex && (
                  <div className="absolute inset-0 bg-lavender-mist/30"></div>
                )}
              </button>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-4 md:mt-6 gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-vintage-gold w-8'
                  : 'bg-memory-blue/60 hover:bg-memory-blue'
                  }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusSlider;
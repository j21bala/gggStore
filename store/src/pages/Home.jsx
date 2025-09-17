import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const slides = [
    {
      title: "Travis Scott",
      subtitle: "Astroworld Collection",
      image: "https://i.imgur.com/y1v2gM1.jpg",
      description: "Explora la colección exclusiva del universo de Travis Scott"
    },
    {
      title: "The Weeknd",
      subtitle: "After Hours Series",
      image: "https://i.imgur.com/i9zM1zN.jpg",
      description: "Sumérgete en la estética nocturna de The Weeknd"
    },
    {
      title: "Charlie García",
      subtitle: "Rock Legendario",
      image: "https://i.imgur.com/83p7U7x.jpg",
      description: "La esencia del rock argentino en cada diseño"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-between px-8 lg:px-16">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0.8) 50%)`
          }}
        />
        
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Left Content */}
        <div className="relative z-10 flex-1 max-w-2xl">
          {/* Logo with glow effect */}
          <div className="mb-8">
            <h1 className="text-7xl lg:text-9xl font-black leading-none relative">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                N*GGG*R
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 bg-clip-text text-transparent relative">
                VERSE
                <div className="absolute -inset-1 bg-purple-600 opacity-20 blur-2xl rounded-full"></div>
              </span>
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-xl lg:text-2xl text-gray-300 font-light max-w-lg leading-relaxed">
              Tu destino para la merch de los{' '}
              <span className="text-purple-400 font-medium">artistas más icónicos</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/products"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold rounded-lg shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-purple-500/25"
              >
                <span className="relative z-10">Explora la Colección</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity duration-500"></div>
                <svg className="inline-block ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>

              <button className="px-8 py-4 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                Ver Trailer
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-8 mt-12 pt-8 border-t border-gray-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">500+</div>
              <div className="text-sm text-gray-400">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">50K+</div>
              <div className="text-sm text-gray-400">Fans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">25+</div>
              <div className="text-sm text-gray-400">Artistas</div>
            </div>
          </div>
        </div>

        {/* Right Content - Carousel */}
        <div className="relative z-10 flex-1 flex justify-center items-center max-w-2xl">
          <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
            {/* Circular background with glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-purple-800/20 blur-3xl animate-pulse"></div>
            
            {/* Main circle frame */}
            <div className="absolute inset-8 rounded-full border border-purple-600/30 bg-gradient-to-br from-purple-900/10 to-transparent backdrop-blur-sm">
              {/* Inner rotating ring */}
              <div className="absolute inset-4 rounded-full border border-purple-400/50 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-600 rounded-full transform -translate-x-1/2 translate-y-1"></div>
              </div>

              {/* Artist image */}
              <div className="absolute inset-8 rounded-full overflow-hidden">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Artist info overlay */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-white mb-1">
                {slides[currentSlide].title}
              </h3>
              <p className="text-purple-400 text-sm font-medium">
                {slides[currentSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-purple-800/50 hover:bg-purple-600/70'
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-purple-600/20 hover:bg-purple-600/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-purple-600/20 hover:bg-purple-600/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-purple-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Featured Artists Section */}
      <section className="relative py-20 px-8 lg:px-16 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Artistas Destacados
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Descubre las colecciones exclusivas de los artistas más influyentes del momento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {slides.map((artist, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-purple-900/20 hover:border-purple-600/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {artist.title}
                  </h3>
                  <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {artist.description}
                  </p>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    Ver Colección
                  </button>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-16 px-8 lg:px-16 bg-gradient-to-r from-purple-950 via-black to-purple-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
              Únete al N*ggg*rVerse
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sé parte de una comunidad exclusiva y obtén acceso anticipado a drops limitados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Crear Cuenta
            </Link>
            <button className="px-8 py-4 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-bold rounded-lg transition-all duration-300">
              Saber Más
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
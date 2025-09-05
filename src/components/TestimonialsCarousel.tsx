import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, MapPin, Star, CheckCircle } from 'lucide-react';
import { Testimonial, getActiveTestimonials } from '../lib/testimonials';

// VTurb video configurations with real video IDs
const vTurbVideos = [
  {
    id: 'vid-68af4b59040f0b0ec4ae0210',
    scriptSrc: 'https://scripts.converteai.net/f84805a4-2184-4076-90a5-aec239b74ab8/players/68af4b59040f0b0ec4ae0210/v4/player.js'
  },
  {
    id: 'vid-68af4b53040f0b0ec4ae0203', 
    scriptSrc: 'https://scripts.converteai.net/f84805a4-2184-4076-90a5-aec239b74ab8/players/68af4b53040f0b0ec4ae0203/v4/player.js'
  },
  {
    id: 'vid-68af4b4dc3d8b7bced8cfe19',
    scriptSrc: 'https://scripts.converteai.net/f84805a4-2184-4076-90a5-aec239b74ab8/players/68af4b4dc3d8b7bced8cfe19/v4/player.js'
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [scriptsLoaded, setScriptsLoaded] = React.useState<Set<string>>(new Set());

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1
  });

  React.useEffect(() => {
    const fetchTestimonials = () => {
      try {
        const data = getActiveTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
    
    // Listen for testimonials updates
    const handleTestimonialsUpdate = () => {
      fetchTestimonials();
    };
    
    window.addEventListener('testimonials-updated', handleTestimonialsUpdate);
    
    return () => {
      window.removeEventListener('testimonials-updated', handleTestimonialsUpdate);
    };
  }, []);

  // Load VTurb scripts dynamically
  const loadVTurbScript = useCallback((scriptSrc: string, videoId: string) => {
    if (scriptsLoaded.has(videoId)) {
      return;
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => {
      setScriptsLoaded(prev => new Set(prev).add(videoId));
    };
    document.head.appendChild(script);
  }, [scriptsLoaded]);

  // Load scripts when testimonials are available
  React.useEffect(() => {
    if (testimonials.length > 0) {
      testimonials.forEach((_, index) => {
        const videoConfig = vTurbVideos[index % vTurbVideos.length];
        if (videoConfig) {
          loadVTurbScript(videoConfig.scriptSrc, videoConfig.id);
        }
      });
    }
  }, [testimonials, loadVTurbScript]);

  const getVideoConfig = (index: number) => vTurbVideos[index % vTurbVideos.length];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (loading) {
    return (
      <div className="bg-white py-16 md:py-24 relative">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-magenta-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-magenta-100 via-transparent to-magenta-50"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-magenta-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-magenta-300 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-magenta-100 text-magenta-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Star className="w-4 h-4 fill-current" />
            CUSTOMER SUCCESS STORIES
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-inter tracking-tight">
            <span className="block">REAL MEN,</span>
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">REAL RESULTS</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch how PEAXION transformed the lives of thousands of men across America
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-visible">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-6 py-4">
                  <div className="group relative">
                    {/* Main Card */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                      
                      {/* Video Section */}
                      <div className="relative bg-gray-900 aspect-video">
                        {/* VTurb Video Container */}
                        {(() => {
                          const videoConfig = getVideoConfig(index);
                          return (
                            <vturb-smartplayer 
                              id={videoConfig.id}
                              style={{
                                display: 'block',
                                margin: '0 auto',
                                width: '100%',
                                height: '100%'
                              }}
                            />
                          );
                        })()}
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-magenta-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-white ml-1" fill="white" />
                          </div>
                        </div>

                        {/* Live Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            LIVE STORY
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* User Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <img
                              src={testimonial.avatar_url}
                              alt={testimonial.name}
                              className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-lg"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <MapPin className="w-4 h-4" />
                              {testimonial.city}, {testimonial.state}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>

                        {/* Quote */}

                        {/* Verified Badge */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-green-700 font-semibold text-sm">Verified Customer</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              Real Results • 2024
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-magenta-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-magenta-300 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] z-20 border border-gray-100"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] z-20 border border-gray-100"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
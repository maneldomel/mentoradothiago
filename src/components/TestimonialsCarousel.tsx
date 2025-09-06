import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, MapPin, Star, CheckCircle } from 'lucide-react';
import { Testimonial, getActiveTestimonials } from '../lib/testimonials';

// Global video control system
declare global {
  interface Window {
    vTurbPlayers: { [key: string]: any };
    pauseAllVTurbVideos: (exceptId?: string) => void;
  }
}

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
  const [visibleSlides, setVisibleSlides] = React.useState<Set<number>>(new Set([0]));
  const [loadedScripts, setLoadedScripts] = React.useState<Set<string>>(new Set());

  // Initialize global video control system
  React.useEffect(() => {
    if (!window.vTurbPlayers) {
      window.vTurbPlayers = {};
    }
    
    if (!window.pauseAllVTurbVideos) {
      window.pauseAllVTurbVideos = (exceptId?: string) => {
        Object.keys(window.vTurbPlayers).forEach(playerId => {
          if (playerId !== exceptId && window.vTurbPlayers[playerId]) {
            try {
              if (typeof window.vTurbPlayers[playerId].pause === 'function') {
                window.vTurbPlayers[playerId].pause();
              }
            } catch (error) {
              console.warn('Error pausing video:', playerId, error);
            }
          }
        });
      };
    }
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    dragFree: false,
    skipSnaps: false
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

  // Load VTurb script for specific video
  const loadVTurbScript = useCallback((scriptSrc: string, videoId: string) => {
    if (loadedScripts.has(videoId)) {
      return;
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => {
      setLoadedScripts(prev => new Set(prev).add(videoId));
      
      // Wait a bit for the player to initialize, then set up event listeners
      setTimeout(() => {
        const playerElement = document.getElementById(videoId);
        if (playerElement && (playerElement as any).player) {
          const player = (playerElement as any).player;
          window.vTurbPlayers[videoId] = player;
          
          // Add play event listener to pause other videos
          if (typeof player.on === 'function') {
            player.on('play', () => {
              window.pauseAllVTurbVideos(videoId);
            });
          }
        }
      }, 1000);
    };
    document.head.appendChild(script);
  }, [loadedScripts]);

  // Remove VTurb script for specific video
  const removeVTurbScript = useCallback((scriptSrc: string, videoId: string) => {
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Remove the video element if it exists
    const videoElement = document.getElementById(videoId);
    if (videoElement) {
      videoElement.innerHTML = '';
    }
    
    // Remove from global players registry
    if (window.vTurbPlayers && window.vTurbPlayers[videoId]) {
      delete window.vTurbPlayers[videoId];
    }
    
    setLoadedScripts(prev => {
      const newSet = new Set(prev);
      newSet.delete(videoId);
      return newSet;
    });
  }, []);

  // Track visible slides and load/unload scripts accordingly
  React.useEffect(() => {
    if (!emblaApi || testimonials.length === 0) return;

    const updateVisibleSlides = () => {
      const slidesInView = emblaApi.slidesInView();
      const newVisibleSlides = new Set(slidesInView);
      
      // Load scripts for visible slides
      slidesInView.forEach(index => {
        const videoConfig = vTurbVideos[index % vTurbVideos.length];
        if (videoConfig) {
          loadVTurbScript(videoConfig.scriptSrc, videoConfig.id);
        }
      });
      
      // Unload scripts for slides that are no longer visible
      visibleSlides.forEach(index => {
        if (!newVisibleSlides.has(index)) {
          const videoConfig = vTurbVideos[index % vTurbVideos.length];
          if (videoConfig) {
            removeVTurbScript(videoConfig.scriptSrc, videoConfig.id);
          }
        }
      });
      
      setVisibleSlides(newVisibleSlides);
    };

    // Initial load
    updateVisibleSlides();
    
    // Listen for slide changes
    emblaApi.on('slidesInView', updateVisibleSlides);
    emblaApi.on('select', updateVisibleSlides);
    
    return () => {
      emblaApi.off('slidesInView', updateVisibleSlides);
      emblaApi.off('select', updateVisibleSlides);
    };
  }, [emblaApi, testimonials, loadVTurbScript, removeVTurbScript, visibleSlides]);

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
        <div className="relative overflow-hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_60%] lg:flex-[0_0_50%] px-4 py-4">
                  <div className="group relative">
                    {/* Main Card */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] h-full">
                      
                      {/* Video Section */}
                      <div className="relative bg-gray-900 aspect-[9/16] sm:aspect-video">
                        {/* VTurb Video Container - Only render if visible */}
                        {visibleSlides.has(index) && (() => {
                          const videoConfig = getVideoConfig(index);
                          return (
                            <vturb-smartplayer 
                              id={videoConfig.id}
                             autoplay="false"
                              muted="false"
                              style={{
                                display: 'block',
                                margin: '0 auto',
                                width: '100%',
                                height: '100%'
                              }}
                            />
                          );
                        })()}
                        
                        {/* Loading placeholder for non-visible slides */}
                        {!visibleSlides.has(index) && (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-magenta-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg mb-2">
                                <Play className="w-6 h-6 text-white ml-1" fill="white" />
                              </div>
                              <p className="text-white text-sm">Loading video...</p>
                            </div>
                          </div>
                        )}
                        
                      </div>

                      {/* Content Section */}
                      <div className="p-4 sm:p-6">
                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-1 text-center">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">{testimonial.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <MapPin className="w-4 h-4" />
                              {testimonial.city}, {testimonial.state}
                            </div>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center justify-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                        </div>

                        {/* Quote - Adicionado */}
                        <div className="relative mb-4">
                          <div className="absolute -top-2 -left-2 text-3xl text-magenta-200 font-serif leading-none">"</div>
                          <p className="text-gray-700 leading-relaxed italic pl-6 pr-2 text-sm">
                            {testimonial.caption}
                          </p>
                          <div className="absolute -bottom-2 -right-2 text-3xl text-magenta-200 font-serif leading-none rotate-180">"</div>
                        </div>

                        {/* Verified Badge */}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-green-700 font-semibold text-xs sm:text-sm">Verified Customer</span>
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
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] z-20 border border-gray-100"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          
          <button
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] z-20 border border-gray-100"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  visibleSlides.has(index) 
                    ? 'bg-magenta-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, MapPin } from 'lucide-react';
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
    containScroll: 'trimSnaps'
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
    <div className="bg-white py-16 md:py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6 font-inter tracking-tight">
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">REAL MEN</span>, REAL RESULTS
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch authentic video testimonials from men who transformed their lives with PEAXION
          </p>
        </div>

        {/* Video Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                
                {/* Video Container */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
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
                  
                  {/* Video Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <img 
                        src={testimonial.avatar_url} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white/50"
                      />
                      <div>
                        <h3 className="font-bold text-sm">{testimonial.name}</h3>
                        <p className="text-xs text-white/80 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {testimonial.city}, {testimonial.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="p-6">
                  <blockquote className="text-gray-700 text-sm leading-relaxed italic">
                    "{testimonial.caption}"
                  </blockquote>
                  
                  {/* Verified Badge */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Verified Customer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 bg-gray-50 rounded-full px-8 py-4">
            <div className="flex items-center text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Real Customers</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Verified Results</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center text-gray-600">
              <div className="w-3 h-3 bg-magenta-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Authentic Stories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
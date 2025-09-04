import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial, getActiveTestimonials } from '../lib/testimonials';

// VTurb video configurations
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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Load VTurb scripts dynamically
  React.useEffect(() => {
    vTurbVideos.forEach((video) => {
      // Check if script is already loaded
      if (!document.querySelector(`script[src="${video.scriptSrc}"]`)) {
        const script = document.createElement('script');
        script.src = video.scriptSrc;
        script.async = true;
        document.head.appendChild(script);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 md:py-24 pb-20 md:pb-32 relative">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-magenta-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 md:py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 font-inter tracking-tight">
            <span className="block md:inline">REAL MEN</span><span className="hidden md:inline">, </span><span className="block md:inline text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">REAL RESULTS</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            See how Proaxion has transformed the lives of thousands of men across America
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                  <div className="bg-white rounded-2xl shadow-xl p-6 mx-4 my-8 transform transition-all duration-300 hover:scale-105">
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar_url} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800 font-inter">{testimonial.name}</h3>
                        <p className="text-gray-500 text-sm">{testimonial.city}, {testimonial.state}</p>
                      </div>
                    </div>

                    {/* VTurb Video Player */}
                    <div className="mb-4">
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: `<vturb-smartplayer id="${vTurbVideos[index % vTurbVideos.length].id}" style="display: block; margin: 0 auto; width: 100%; border-radius: 12px; overflow: hidden;"></vturb-smartplayer>`
                        }}
                      />
                    </div>

                    {/* Caption */}
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "{testimonial.caption}"
                    </p>

                    {/* Verified Badge */}
                    <div className="mt-4 flex items-center">
                      <div className="w-4 h-4 mr-2">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-green-600 text-xs font-medium">Verified Customer</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-10"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>


      </div>
    </div>
  );
};

export default TestimonialsCarousel;
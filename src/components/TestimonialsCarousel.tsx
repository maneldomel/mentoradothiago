import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, MapPin, Star, CheckCircle } from 'lucide-react';
import { Testimonial, getActiveTestimonials } from '../lib/testimonials';

const TestimonialsCarousel: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);

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
            Watch how MANFORZA transformed the lives of thousands of men across America
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-visible">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-6 py-4"
                >
                  <div className="group relative">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">

                      <div className="relative bg-gray-900 aspect-video">
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="text-white text-sm mb-2 font-semibold">
                              VTurb Video Placeholder
                            </div>
                            <div className="text-gray-400 text-xs">
                              Video ID will be added here
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* User Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex-1 text-center">
                            <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <MapPin className="w-4 h-4" />
                              {testimonial.city}, {testimonial.state}
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-2">
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
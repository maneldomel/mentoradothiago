import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { Testimonial, getActiveTestimonials } from '../lib/testimonials';

const getYouTubeThumbnail = (url: string): string => {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return videoId ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg` : '';
};

const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0` : '';
};

const TestimonialsCarousel: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);

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

  const handleVideoPlay = (testimonialId: string) => {
    setPlayingVideo(testimonialId);
  };

  const handleVideoClose = () => {
    setPlayingVideo(null);
  };

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
    <div className="bg-gray-50 py-4 md:py-6 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6">
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

                    {/* Video Thumbnail */}
                    <div 
                      className="relative mb-4 group cursor-pointer"
                      onClick={() => handleVideoPlay(testimonial.id)}
                    >
                      {playingVideo === testimonial.id ? (
                        <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
                          <iframe
                            src={getYouTubeEmbedUrl(testimonial.youtube_url)}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVideoClose();
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                          <img 
                            src={getYouTubeThumbnail(testimonial.youtube_url)} 
                            alt={`${testimonial.name} testimonial`}
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=225'; }}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-magenta-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-magenta-700">
                              <Play className="w-6 h-6 text-white ml-1" fill="white" />
                            </div>
                          </div>
                        </div>
                      )}
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
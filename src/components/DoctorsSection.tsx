import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, X, Award, MapPin } from 'lucide-react';
import { Doctor, getActiveDoctors } from '../lib/doctors';

const getYouTubeThumbnail = (url: string): string => {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return videoId ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg` : '';
};

const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0` : '';
};

const DoctorsSection: React.FC = () => {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });

  React.useEffect(() => {
    const fetchDoctors = () => {
      try {
        const data = getActiveDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    
    // Listen for doctors updates
    const handleDoctorsUpdate = () => {
      fetchDoctors();
    };
    
    window.addEventListener('doctors-updated', handleDoctorsUpdate);
    
    return () => {
      window.removeEventListener('doctors-updated', handleDoctorsUpdate);
    };
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleVideoPlay = (doctorId: string) => {
    setPlayingVideo(doctorId);
  };

  const handleVideoClose = () => {
    setPlayingVideo(null);
  };

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
    <div className="bg-white py-8 md:py-12 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2 font-inter tracking-tight">
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">MEDICAL EXPERTS</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                  <div className="bg-white rounded-2xl shadow-lg p-6 mx-4 my-8 transform transition-all duration-300 hover:scale-105">
                    {/* Doctor Info Header */}
                    <div className="flex items-center mb-4">
                      <img 
                        src={doctor.avatar_url} 
                        alt={doctor.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 font-inter">{doctor.name}</h3>
                        <p className="text-gray-500 text-sm">{doctor.title}</p>
                      </div>
                    </div>

                    {/* Video Thumbnail */}
                    <div 
                      className="relative mb-4 group cursor-pointer"
                      onClick={() => handleVideoPlay(doctor.id)}
                    >
                      {playingVideo === doctor.id ? (
                        <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
                          <iframe
                            src={getYouTubeEmbedUrl(doctor.youtube_url)}
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
                            src={getYouTubeThumbnail(doctor.youtube_url)} 
                            alt={`${doctor.name} medical opinion`}
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400&h=225'; }}
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

                  {/* Doctor Info Above Video */}
                    <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
                    </p>

                    {/* Medical Badge */}
                    <div className="text-center">
                      <span className="bg-magenta-100 text-magenta-700 px-4 py-2 rounded-full text-xs font-bold">
                        MEDICAL EXPERT
                      </span>
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

export default DoctorsSection;
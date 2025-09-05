import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, X, Award, MapPin, Stethoscope, GraduationCap } from 'lucide-react';
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
    containScroll: 'trimSnaps',
    slidesToScroll: 1
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
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24 relative">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Stethoscope className="w-4 h-4" />
            MEDICAL ENDORSEMENTS
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-inter tracking-tight">
            <span className="block">TRUSTED BY</span>
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">MEDICAL EXPERTS</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leading doctors and researchers from top medical institutions endorse PEAXION
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
                  <div className="group relative">
                    {/* Main Card */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                      
                      {/* Doctor Header */}
                      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <img 
                              src={doctor.avatar_url} 
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Stethoscope className="w-4 h-4 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                            <p className="text-blue-100 text-sm font-medium mb-1">{doctor.title}</p>
                            <p className="text-blue-200 text-xs">{doctor.specialty}</p>
                          </div>
                        </div>
                        
                        {/* Location */}
                        <div className="mt-4 flex items-center gap-2 text-blue-100 text-sm">
                          <MapPin className="w-4 h-4" />
                          {doctor.location}
                        </div>

                        {/* Medical Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold">
                            MEDICAL EXPERT
                          </div>
                        </div>
                      </div>

                      {/* Video Section */}
                      <div className="relative bg-gray-900 aspect-video">
                        {playingVideo === doctor.id ? (
                          <div className="relative w-full h-full">
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
                              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 z-10"
                            >
                              <X className="w-5 h-5 text-white" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            className="relative w-full h-full cursor-pointer group/video"
                            onClick={() => handleVideoPlay(doctor.id)}
                          >
                            <img 
                              src={getYouTubeThumbnail(doctor.youtube_url)} 
                              alt={`${doctor.name} medical opinion`}
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400&h=225'; }}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/video:scale-105"
                            />
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <div className="w-20 h-20 bg-blue-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-blue-700">
                                <Play className="w-8 h-8 text-white ml-1" fill="white" />
                              </div>
                            </div>

                            {/* Medical Opinion Badge */}
                            <div className="absolute top-4 left-4">
                              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <GraduationCap className="w-3 h-3" />
                                MEDICAL OPINION
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Quote */}
                        <div className="relative mb-6">
                          <div className="absolute -top-2 -left-2 text-4xl text-blue-200 font-serif leading-none">"</div>
                          <p className="text-gray-700 leading-relaxed italic pl-6 pr-2 text-sm">
                            {doctor.quote}
                          </p>
                          <div className="absolute -bottom-2 -right-2 text-4xl text-blue-200 font-serif leading-none rotate-180">"</div>
                        </div>

                        {/* Credentials */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-800 font-semibold text-sm">Credentials</span>
                          </div>
                          <p className="text-blue-700 text-xs leading-relaxed">
                            {doctor.credentials}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Floating Medical Icons */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-300 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 border border-blue-100"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6 text-blue-700" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 border border-blue-100"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6 text-blue-700" />
          </button>
        </div>

        {/* Bottom Medical Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">25+</div>
            <div className="text-sm text-gray-600 font-medium">Medical Experts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">89%</div>
            <div className="text-sm text-gray-600 font-medium">Clinical Success</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">FDA</div>
            <div className="text-sm text-gray-600 font-medium">Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSection;
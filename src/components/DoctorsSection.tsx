import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, X, Award, MapPin, Stethoscope } from 'lucide-react';
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
      <div className="bg-gray-50 py-16 md:py-24 relative">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 md:py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-6 font-inter tracking-tight">
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">MEDICAL EXPERTS</span> APPROVE
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leading doctors and researchers share their professional insights on PEAXION
          </p>
        </div>

        {/* Doctors Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                
                {/* Doctor Header */}
                <div className="p-6 pb-4 bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex items-center">
                    <img 
                      src={doctor.avatar_url} 
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-3 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg font-inter">{doctor.name}</h3>
                      <p className="text-blue-600 text-sm font-semibold">{doctor.title}</p>
                      <p className="text-gray-500 text-xs">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  {/* Medical Badge */}
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    <Stethoscope className="w-3 h-3 mr-1" />
                    MEDICAL EXPERT
                  </div>
                </div>

                {/* Video Container */}
                <div className="relative">
                  <div 
                    className="relative aspect-video bg-gray-900 cursor-pointer group/video"
                    onClick={() => handleVideoPlay(doctor.id)}
                  >
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
                          className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 z-10"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <img 
                          src={getYouTubeThumbnail(doctor.youtube_url)} 
                          alt={`${doctor.name} medical opinion`}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400&h=225'; }}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/video:scale-105"
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover/video:bg-opacity-30 transition-all duration-300">
                          <div className="w-16 h-16 bg-blue-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-blue-700">
                            <Play className="w-6 h-6 text-white ml-1" fill="white" />
                          </div>
                        </div>

                        {/* Video Label */}
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                          LIVE
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Doctor Quote & Info */}
                <div className="p-6">
                  <blockquote className="text-gray-700 text-sm leading-relaxed italic mb-4">
                    "{doctor.quote}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-2 text-blue-500" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Award className="w-3 h-3 mr-2 text-blue-500" />
                      {doctor.credentials}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Authority Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-full px-8 py-4 shadow-md border border-gray-100">
            <div className="flex items-center text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Board Certified</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Clinical Research</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center text-gray-600">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Medical Authority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSection;
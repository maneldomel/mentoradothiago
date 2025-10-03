import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, MapPin, Stethoscope } from 'lucide-react';
import { Doctor, getActiveDoctors } from '../lib/doctors';


const DoctorsSection: React.FC = () => {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [loading, setLoading] = React.useState(true);

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


  if (loading) {
    return (
      <div className="bg-white py-16 md:py-24 relative">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 md:py-24 relative overflow-hidden">
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
            Leading doctors and researchers from top medical institutions endorse MANFORZA
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-visible">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-6 py-4"
                >
                  <div className="group relative">
                    <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(59,130,246,0.3)]">

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

                        <div className="mt-4 flex items-center gap-2 text-blue-100 text-sm">
                          <MapPin className="w-4 h-4" />
                          {doctor.location}
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Quote */}
                        <div className="relative mb-6">
                          <div className="absolute -top-2 -left-2 text-4xl text-blue-200 font-serif leading-none">"</div>
                          <p className="text-gray-700 leading-relaxed italic pl-6 pr-2 text-sm">
                            {doctor.quote}
                          </p>
                          <div className="absolute -bottom-2 -right-2 text-4xl text-blue-200 font-serif leading-none rotate-180">"</div>
                        </div>

                      </div>
                    </div>

                    {/* Floating Medical Icons */}
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.4)] z-20 border border-blue-100"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6 text-blue-700" />
          </button>
          
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.4)] z-20 border border-blue-100"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6 text-blue-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSection;
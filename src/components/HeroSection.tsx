import React from 'react';
import { Volume2, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft magenta orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-magenta-300/30 to-magenta-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-bl from-magenta-200/25 to-magenta-300/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-gradient-to-tr from-magenta-400/20 to-magenta-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-tl from-magenta-300/25 to-magenta-400/12 rounded-full blur-3xl"></div>
        
        {/* Additional subtle lights */}
        <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-gradient-to-r from-magenta-200/18 to-magenta-300/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/2 right-10 w-56 h-56 bg-gradient-to-l from-magenta-400/15 to-magenta-200/7 rounded-full blur-2xl"></div>
        
        {/* Extra ambient lights */}
        <div className="absolute top-10 right-1/4 w-32 h-32 bg-gradient-to-br from-magenta-500/20 to-magenta-300/8 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-gradient-to-tl from-magenta-400/18 to-magenta-200/6 rounded-full blur-xl"></div>
      </div>
      
      {/* Header Section */}
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl relative z-10">
        {/* Headline */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-black leading-tight mb-4 px-4 font-inter tracking-tight">
            <span className="block text-gray-800">THE SECRET WAS HIDING IN <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">YOUR KITCHEN!</span></span>
          </h1>
        </div>

        {/* Subline */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            A bizarre <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">coffee-and-salt ritual</span> is giving men rock-hard erections at any age — and leaving <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">women in shock</span>.
          </p>
        </div>

        {/* Video Section */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative">
            {/* Video Container - 9:16 aspect ratio */}
            <div className="w-72 h-[512px] sm:w-80 sm:h-[568px] md:w-96 md:h-[682px] bg-gray-100 border-2 md:border-4 border-fuchsia-200 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl flex items-center justify-center mx-auto">
              <div className="text-center p-4 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <div className="w-0 h-0 border-l-[10px] md:border-l-[12px] border-l-white border-t-[6px] md:border-t-[8px] border-t-transparent border-b-[6px] md:border-b-[8px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-gray-600 font-medium text-sm md:text-base">
                  Embed your VTurb video here
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  9:16 aspect ratio
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Notices */}
        <div className="max-w-sm sm:max-w-md mx-auto space-y-3 md:space-y-4 px-4">
          {/* Sound Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600 text-xs sm:text-sm text-center">
                Make sure your <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">sound is ON</span> for the full experience
              </p>
            </div>
          </div>

          {/* Urgency Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600 text-xs sm:text-sm text-center">
                This video will <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">disappear soon</span> - <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">Watch it now!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
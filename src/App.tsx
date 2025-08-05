import React from 'react';
import { Volume2, Clock } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
        {/* Headline */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-black leading-tight mb-4 px-4 font-inter tracking-tight">
            <span className="block text-gray-800">ANCIENT <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">GINGER SECRET</span></span>
            <span className="block text-gray-800">ENDS <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">IMPOTENCE</span> FOREVER</span>
          </h1>
        </div>

        {/* Subline */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">47,000+ men CURED</span> their impotence with this{' '}
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">ancient kitchen ingredient</span>
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
                Make sure your sound is ON for the full experience
              </p>
            </div>
          </div>

          {/* Urgency Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600 text-xs sm:text-sm text-center">
                This video will disappear soon - Watch it now!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
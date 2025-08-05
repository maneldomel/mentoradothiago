import React from 'react';
import { Volume2, Clock, Calendar, Truck, Lock } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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

      {/* Purchase Section */}
      <div className="bg-white py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            
            {/* 6 Bottle Package - Main Offer */}
            <div className="bg-gradient-to-br from-magenta-700 to-magenta-900 rounded-2xl p-6 text-center mb-8 shadow-xl">
              <h3 className="text-4xl font-bold text-white mb-1 font-inter tracking-wide -mt-2">
                PROAXION
              </h3>
              <p className="text-xl font-medium text-white/90 mb-4 font-inter tracking-wide">
                6 BOTTLE PACKAGE
              </p>
              
              <div className="w-full max-w-md mx-auto mb-2">
                <img 
                  src="https://i.imgur.com/VScX6oJ.png" 
                  alt="Claim Offer Now" 
                  className="w-full h-auto cursor-pointer transition-all duration-200 transform hover:scale-105"
                />
              </div>
              
              <p className="text-2xl font-bold mb-4" style={{color: '#FFD700'}}>
                YOU'RE SAVING $900
              </p>
              
              <p className="text-white/80 text-base font-inter mb-4">
                only $49 per bottle, $294 total
              </p>
              
              {/* Benefits */}
              <div className="flex justify-center items-center space-x-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/90 text-sm font-inter font-medium">180-Day</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/90 text-sm font-inter font-medium">Free Ship</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/90 text-sm font-inter font-medium">Secure</span>
                </div>
              </div>
            </div>
            
            {/* 3 and 1 Bottle Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 3 Bottle Package */}
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
                <div className="mb-4">
                  <img 
                    src="https://i.imgur.com/SnCtQg9.png" 
                    alt="3 Bottles of Proaxion" 
                    className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mx-auto"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text mb-1 font-inter">
                  PROAXION
                </h3>
                <p className="text-lg font-medium text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text mb-4 font-inter">
                  3 BOTTLE PACKAGE
                </p>
                
                <p className="text-lg font-semibold mb-6" style={{color: '#FFD700'}}>
                  YOU'RE SAVING $300
                </p>
                
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold text-base py-3 px-6 rounded-xl mb-3 transition-all duration-200 font-inter">
                  CLAIM OFFER NOW
                </button>
                
                <p className="text-gray-600 text-sm font-inter">
                  only $69 per bottle, $207 total
                </p>
              </div>
              
              {/* 1 Bottle Package */}
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
                <div className="mb-4">
                  <img 
                    src="https://i.imgur.com/RVXt1O7.png" 
                    alt="1 Bottle of Proaxion" 
                    className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mx-auto"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text mb-1 font-inter">
                  PROAXION
                </h3>
                <p className="text-lg font-medium text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text mb-4 font-inter">
                  1 BOTTLE PACKAGE
                </p>
                
                <p className="text-lg font-medium text-gray-500 mb-6 font-inter">
                  STARTER PACKAGE
                </p>
                
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold text-base py-3 px-6 rounded-xl mb-3 transition-all duration-200 font-inter">
                  CLAIM OFFER NOW
                </button>
                
                <p className="text-gray-600 text-sm font-inter">
                  only $99 per bottle, $99 total
                </p>
              </div>
            </div>
            
            {/* Trust Badges */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
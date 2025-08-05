import React from 'react';
import { Volume2, Clock } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
        {/* Headline */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-black text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text leading-tight mb-4 px-4 font-sans tracking-tight">
            <span className="block">ANCIENT GINGER SECRET</span>
            <span className="block">ENDS IMPOTENCE FOREVER</span>
          </h1>
        </div>

        {/* Subline */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            47,000+ men CURED their impotence with this 
            ancient kitchen ingredient
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

        {/* PROAXION Promotional Card */}
        <div className="max-w-lg mx-auto mt-12 px-4">
          <div className="relative bg-gradient-to-br from-purple-900 to-pink-500 rounded-3xl p-8 shadow-2xl border-2 border-pink-300" style={{boxShadow: '0 0 30px rgba(255, 0, 127, 0.3)'}}>
            
            {/* Best Value Tag */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-pink-400 text-purple-900 px-6 py-2 rounded-full font-black text-sm">
                ⭐ BEST VALUE
              </div>
            </div>

            {/* Product Bottles */}
            <div className="flex justify-center items-center mb-6 mt-4">
              <div className="flex space-x-1">
                {[...Array(6)].map((_, index) => (
                  <div 
                    key={index}
                    className="transform"
                    style={{
                      transform: `rotate(${index % 2 === 0 ? '5deg' : '-5deg'})`,
                      zIndex: 6 - index
                    }}
                  >
                    <img 
                      src="https://i.imgur.com/VScX6oJ.png" 
                      alt="Proaxion Bottle" 
                      className="w-12 h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-black text-white mb-1">PROAXION</h2>
              <h3 className="text-lg font-bold text-white">6 BOTTLE PACKAGE</h3>
            </div>

            {/* Savings */}
            <div className="text-center mb-6">
              <div className="text-2xl font-black text-yellow-400 mb-2">
                YOU'RE SAVING $900
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-4">
              <button 
                className="w-full bg-pink-500 hover:bg-pink-600 text-black font-black py-4 px-8 rounded-2xl transition-all text-lg shadow-lg transform hover:scale-105"
                style={{boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'}}
              >
                CLAIM OFFER NOW
              </button>
            </div>

            {/* Price Info */}
            <div className="text-center mb-6">
              <p className="text-white text-sm">
                only $49 per bottle, $294 total
              </p>
            </div>

            {/* Guarantee Seals */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-purple-800 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>180-Day</span>
              </div>
              <div className="bg-purple-800 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                </svg>
                <span>Free Ship</span>
              </div>
              <div className="bg-purple-800 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <span>Secure</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="text-center">
              <div className="flex justify-center items-center space-x-3 opacity-80">
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-red-600">MC</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-orange-600">DISC</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-800">AMEX</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">PayPal</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
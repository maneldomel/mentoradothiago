import React from 'react';
import { Star, Shield, Truck, CreditCard } from 'lucide-react';

const PurchaseSection: React.FC = () => {
  const handlePurchaseClick = (packageType: string) => {
    // Placeholder for purchase logic
    console.log(`Purchase clicked: ${packageType}`);
    // You can add your checkout URL here
    window.open('https://checkout.example.com', '_blank');
  };

  return (
    <div className="bg-gray-50 py-8 md:py-12 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* PRODUTO 1: 6 BOTTLE PACKAGE - BEST VALUE */}
        <div 
          id="six-bottle-package" 
          data-purchase-section="true"
          className="w-full mb-6 sm:mb-8 relative animate-fadeInUp animation-delay-800"
        >
          {/* BEST VALUE Tag */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-magenta-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-black shadow-lg border-2 border-white/40 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 text-magenta-600 fill-current" />
                <span className="tracking-wide">BEST VALUE</span>
              </div>
            </div>
          </div>

          {/* Container com glow azul */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-magenta-400 via-magenta-500 to-magenta-600 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-magenta-600/95 to-magenta-800/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 pt-8 sm:pt-10 border-2 border-white/30 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"></div>
              
              {/* Product Image */}
              <div className="flex justify-center mb-3 px-2">
                <img 
                  src="https://i.imgur.com/SjS0wl1.png" 
                  alt="PEAXION 6 Bottle Pack"
                  className="w-full h-auto object-contain drop-shadow-2xl max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-72"
                />
              </div>

              {/* Product Name */}
              <div className="text-center mb-4 sm:mb-5">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none px-2">
                  BLUEDROPS
                </h3>
                <p className="text-white/80 text-base sm:text-lg md:text-xl font-bold tracking-wide -mt-1">
                  6 BOTTLE PACKAGE
                </p>
              </div>

              {/* Savings */}
              <div className="text-center mb-2">
                <p className="text-yellow-400 font-bold text-lg sm:text-xl tracking-wide">
                  YOU'RE SAVING $900
                </p>
              </div>

              {/* CTA Button */}
              <div className="relative mb-2">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-xl blur opacity-75 animate-pulse"></div>
                <button 
                  onClick={() => handlePurchaseClick('6-bottle')}
                  className="relative w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 sm:py-5 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-lg sm:text-xl border-2 border-white/40 backdrop-blur-sm overflow-hidden purchase-button-main checkout-button"
                >
                  <div className="absolute inset-0 rounded-xl border border-white/30 pointer-events-none"></div>
                  <span className="relative z-10">CLAIM OFFER NOW</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Price info */}
              <div className="text-center mb-3">
                <p className="text-white/70 text-sm sm:text-base font-medium">
                  only $49 per bottle, $294 total
                </p>
              </div>

              {/* Benefits */}
              <div className="flex justify-center items-center gap-0.5 sm:gap-1 mb-2 px-1">
                <div className="bg-gradient-to-r from-magenta-500/30 to-magenta-600/30 backdrop-blur-sm rounded-md px-1 sm:px-1.5 py-1 sm:py-1.5 border border-magenta-300/40 flex-1">
                  <div className="flex items-center justify-center gap-0.5 text-xs text-white">
                    <Shield className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-center font-semibold text-xs">180-Day</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-magenta-500/30 to-magenta-600/30 backdrop-blur-sm rounded-md px-1 sm:px-1.5 py-1 sm:py-1.5 border border-magenta-300/40 flex-1">
                  <div className="flex items-center justify-center gap-0.5 text-xs text-white">
                    <Truck className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-center font-semibold text-xs">Free Ship</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-magenta-500/30 to-magenta-600/30 backdrop-blur-sm rounded-md px-1 sm:px-1.5 py-1 sm:py-1.5 border border-magenta-300/40 flex-1">
                  <div className="flex items-center justify-center gap-0.5 text-xs text-white">
                    <CreditCard className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-center font-semibold text-xs">Secure</span>
                  </div>
                </div>
              </div>

              {/* Box branco com imagem */}
              <div>
                <div className="bg-white rounded-md p-1 shadow-sm">
                  <img 
                    src="https://i.imgur.com/1in1oo5.png" 
                    alt="Product Benefits"
                    className="w-full h-auto object-contain max-h-12 sm:max-h-14"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
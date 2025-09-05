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
        {/* PRODUTO 1: 6 BOTTLE PACKAGE - REDESIGNED */}
        <div 
          id="six-bottle-package" 
          data-purchase-section="true"
          className="w-full mb-6 sm:mb-8 relative"
        >
          {/* Main Container - Card Style */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            
            {/* BEST VALUE Ribbon */}
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-8 py-2 transform rotate-12 translate-x-4 -translate-y-2 shadow-lg">
                <div className="flex items-center gap-2 -rotate-12">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-black text-sm tracking-wide">BEST VALUE</span>
                </div>
              </div>
            </div>

            {/* Header Section */}
            <div className="bg-gradient-to-r from-magenta-600 to-magenta-700 px-6 py-4 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                PEAXION
              </h3>
              <p className="text-magenta-100 font-semibold text-sm sm:text-base">
                6 BOTTLE PACKAGE
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 p-6">
              
              {/* Left Column - Product Image */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  {/* Glow effect behind image */}
                  <div className="absolute inset-0 bg-magenta-200 rounded-full blur-3xl opacity-30 scale-110"></div>
                  <img 
                    src="https://i.imgur.com/SjS0wl1.png" 
                    alt="PEAXION 6 Bottle Pack"
                    className="relative w-full h-auto object-contain max-w-xs drop-shadow-xl"
                  />
                </div>
                
                {/* Savings Badge */}
                <div className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full shadow-lg">
                  <p className="font-black text-lg">
                    SAVE $900
                  </p>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="flex flex-col justify-center space-y-4">
                
                {/* Price Section */}
                <div className="text-center md:text-left">
                  <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                    <span className="text-3xl sm:text-4xl font-black text-gray-800">$49</span>
                    <span className="text-gray-600 font-medium">per bottle</span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    Total: <span className="text-magenta-600 font-bold">$294</span>
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <Shield className="w-6 h-6 text-magenta-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">180-Day</p>
                    <p className="text-xs text-gray-500">Guarantee</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <Truck className="w-6 h-6 text-magenta-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Free</p>
                    <p className="text-xs text-gray-500">Shipping</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <CreditCard className="w-6 h-6 text-magenta-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Secure</p>
                    <p className="text-xs text-gray-500">Payment</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => handlePurchaseClick('6-bottle')}
                  className="w-full bg-gradient-to-r from-magenta-600 to-magenta-700 hover:from-magenta-700 hover:to-magenta-800 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-lg purchase-button-main checkout-button pulse-button"
                >
                  CLAIM OFFER NOW
                </button>
              </div>
            </div>

            {/* Bottom Benefits Bar */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <img 
                  src="https://i.imgur.com/1in1oo5.png" 
                  alt="Product Benefits"
                  className="w-full h-auto object-contain max-h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
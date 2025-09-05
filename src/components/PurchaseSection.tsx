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
        {/* PRODUTO 1: 6 BOTTLE PACKAGE */}
        <div 
          id="six-bottle-package" 
          data-purchase-section="true"
          className="w-full mb-6 sm:mb-8"
        >
          {/* Container Principal */}
          <div className="relative bg-gradient-to-br from-magenta-600/95 to-magenta-800/95 rounded-2xl shadow-2xl overflow-hidden border-4 border-magenta-300/40">
            {/* Glow effect atrás do container */}
            <div className="absolute inset-0 bg-gradient-to-br from-magenta-400 to-magenta-600 blur-3xl opacity-25 scale-110"></div>
            
            {/* Badge BEST VALUE */}
            <div className="absolute -top-2 -right-2 z-20">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-magenta-600 px-4 py-2 rounded-full shadow-xl border-2 border-white transform rotate-12">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-black text-xs">BEST VALUE</span>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="relative z-10 p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                  PEAXION
                </h3>
                <p className="text-magenta-100 font-bold text-lg">
                  6 BOTTLE PACKAGE
                </p>
              </div>

              {/* Imagem do Produto */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-magenta-400 rounded-full blur-2xl opacity-30 scale-110"></div>
                  <img 
                    src="https://i.imgur.com/SjS0wl1.png" 
                    alt="PEAXION - 6 Bottle Pack" 
                    className="relative w-64 md:w-80 h-auto object-contain mx-auto drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Preço e Economia */}
              <div className="text-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-black text-white">$49</span>
                    <span className="text-magenta-100 font-medium text-lg">per bottle</span>
                  </div>
                  <p className="text-magenta-100 font-medium text-lg">
                    Total: <span className="text-yellow-400 font-black text-xl">$294</span>
                  </p>
                </div>
                
                <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full shadow-lg">
                  <p className="font-black text-lg">
                    SAVE $900
                  </p>
                </div>
              </div>

              {/* Benefícios */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/30">
                  <Shield className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">180-Day</p>
                  <p className="text-xs text-magenta-100">Guarantee</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/30">
                  <Truck className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">Free</p>
                  <p className="text-xs text-magenta-100">Shipping</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/30">
                  <CreditCard className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">Secure</p>
                  <p className="text-xs text-magenta-100">Payment</p>
                </div>
              </div>

              {/* Botão CTA */}
              <div className="text-center">
                <button 
                  onClick={() => handlePurchaseClick('6-bottle')}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-magenta-800 font-black py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl text-xl purchase-button-main checkout-button pulse-button"
                >
                  CLAIM OFFER NOW
                </button>
              </div>
            </div>

            {/* Rodapé com benefícios */}
            <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20 p-4">
              <img 
                src="https://i.imgur.com/1in1oo5.png" 
                alt="Product Benefits"
                className="w-full h-auto object-contain max-h-12 opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
import React from 'react';
import { Calendar, Truck, Lock } from 'lucide-react';

const PurchaseSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-8 md:py-12 relative">
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
            
           <div className="w-full max-w-md mx-auto mb-2 relative">
             {/* Purple/Magenta glow effect behind product image */}
             <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/60 to-magenta-600/60 rounded-xl blur-2xl scale-125 -z-10"></div>
              <img 
                src="https://i.imgur.com/VScX6oJ.png" 
                alt="Claim Offer Now" 
                className="w-full h-auto cursor-pointer transition-all duration-200 transform hover:scale-105"
              />
            </div>
            
            <p className="text-2xl font-bold mb-4" style={{color: '#FFD700'}}>
              YOU'RE SAVING $900
            </p>
            
            <p className="text-white/80 text-base font-inter mb-2">
              only $49 per bottle, $294 total
            </p>
            
            <div className="mb-6"></div>
            
           <div className="relative mb-4">
             <button 
               className="w-full text-black font-bold text-xl py-4 px-8 rounded-xl font-inter transition-transform duration-200 ease-in-out hover:scale-105 border-none cursor-pointer pulse-button"
               style={{
                 background: 'linear-gradient(to bottom, #ffd700, #ffb700)',
                 boxShadow: '0 0 10px 2px #ffd700, 0 0 20px 4px #ffcc00'
               }}
             >
               CLAIM OFFER NOW
             </button>
           </div>
            
            <div className="mb-8"></div>
            
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
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            
            {/* 3 Bottle Package */}
           <div className="bg-gradient-to-br from-magenta-400 to-magenta-500 rounded-xl p-4 text-center shadow-lg">
             <div className="mb-2">
                <img 
                  src="https://i.imgur.com/SnCtQg9.png" 
                  alt="3 Bottles of Proaxion" 
                 className="w-24 h-24 md:w-20 md:h-20 object-contain mx-auto"
                />
              </div>
              
             <h3 className="text-base md:text-lg font-bold text-white mb-1 font-inter tracking-wide">
                PROAXION
              </h3>
             <p className="text-xs font-medium text-white/90 mb-1 font-inter tracking-wide">
                3 BOTTLE PACKAGE
              </p>
              
             <p className="text-sm font-bold mb-1" style={{color: '#FFD700'}}>
                YOU'RE SAVING $300
              </p>
              
             <p className="text-white/80 text-xs font-inter mb-2">only $66 per bottle, $198 total</p>
              
             <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-xs py-2 px-2 rounded-lg mb-2 transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-yellow-300 font-inter">BUY NOW</button>
             
             {/* Benefits */}
             <div className="flex justify-center items-center space-x-4">
               <div className="flex flex-col items-center">
                 <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mb-1">
                   <Calendar className="w-3 h-3 text-white" />
                 </div>
                 <span className="text-white/90 text-xs font-inter font-medium">180-Day</span>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mb-1">
                   <Truck className="w-3 h-3 text-white" />
                 </div>
                 <span className="text-white/90 text-xs font-inter font-medium">Free Ship</span>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mb-1">
                   <Lock className="w-3 h-3 text-white" />
                 </div>
                 <span className="text-white/90 text-xs font-inter font-medium">Secure</span>
               </div>
             </div>
            </div>
            
            {/* 1 Bottle Package */}
           <div className="bg-gradient-to-br from-magenta-300 to-magenta-400 rounded-xl p-4 text-center shadow-lg">
             <div className="mb-2">
                <img 
                  src="https://i.imgur.com/RVXt1O7.png" 
                  alt="1 Bottle of Proaxion" 
                 className="w-24 h-24 md:w-20 md:h-20 object-contain mx-auto"
                />
              </div>
              
             <h3 className="text-lg md:text-xl font-bold text-white mb-1 font-inter tracking-wide">
                PROAXION
              </h3>
             <p className="text-xs font-medium text-white/90 mb-1 font-inter tracking-wide">
                1 BOTTLE PACKAGE
              </p>
              
             <p className="text-sm font-bold mb-1" style={{color: '#FFD700'}}>
                STARTER PACKAGE
              </p>
              
             <p className="text-white/80 text-xs font-inter mb-2">only $79 per bottle + $9.99 shipping</p>
              
             <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-xs py-2 px-2 rounded-lg mb-2 transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-yellow-300 font-inter">BUY NOW</button>
             
             {/* Benefits */}
             <div className="flex justify-center items-center space-x-2">
               <div className="flex flex-col items-center">
                 <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mb-1">
                   <Calendar className="w-2.5 h-2.5 text-white" />
                 </div>
                 <span className="text-white/90 text-xs font-inter font-medium">180-Day</span>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mb-1">
                   <Truck className="w-2.5 h-2.5 text-white" />
                 </div>
                 <span className="text-white/90 text-xs font-inter font-medium">$9.99 Ship</span>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mb-1">
                   <Lock className="w-2.5 h-2.5 text-white" />
                 </div>
                 <span className="text-white/90 text-xs font-inter font-medium">Secure</span>
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
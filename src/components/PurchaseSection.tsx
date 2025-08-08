import React from 'react';
import { Calendar, Truck, Lock, X, AlertTriangle } from 'lucide-react';

const PurchaseSection: React.FC = () => {
  const [showUpsellModal, setShowUpsellModal] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState<'3-bottle' | '1-bottle' | null>(null);

  const handlePackageClick = (packageType: '6-bottle' | '3-bottle' | '1-bottle') => {
    if (packageType === '6-bottle') {
      // Direct purchase for 6-bottle package
      // TODO: Add 6-bottle purchase link here
      console.log('Proceeding with 6-bottle purchase');
    } else {
      // Show upsell modal for other packages
      setSelectedPackage(packageType);
      setShowUpsellModal(true);
    }
  };

  const handleAcceptDiscount = () => {
    // TODO: Add 6-bottle purchase link here
    console.log('User accepted the discount - redirecting to 6-bottle purchase');
    setShowUpsellModal(false);
    setSelectedPackage(null);
  };

  const handleContinueWithOriginal = () => {
    // TODO: Add purchase links for 3-bottle and 1-bottle packages
    console.log(`Proceeding with ${selectedPackage} purchase`);
    setShowUpsellModal(false);
    setSelectedPackage(null);
  };

  const closeModal = () => {
    setShowUpsellModal(false);
    setSelectedPackage(null);
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (showUpsellModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showUpsellModal]);

  return (
    <>
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
                 onClick={() => handlePackageClick('6-bottle')}
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
                
               <button 
                 onClick={() => handlePackageClick('3-bottle')}
                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-xs py-2 px-2 rounded-lg mb-2 transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-yellow-300 font-inter"
               >
                 BUY NOW
               </button>
               
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
                
               <button 
                 onClick={() => handlePackageClick('1-bottle')}
                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-xs py-2 px-2 rounded-lg mb-2 transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-yellow-300 font-inter"
               >
                 BUY NOW
               </button>
               
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

      {/* Upsell Modal */}
      {showUpsellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-pulse">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Warning Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Wait! Don't Miss Out!
              </h3>
              <p className="text-gray-600">
                You're about to leave money on the table
              </p>
            </div>

            {/* Savings Comparison */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 mb-6 border-l-4 border-red-500">
              <div className="text-center">
                <p className="text-red-800 font-bold text-lg mb-2">
                  {selectedPackage === '3-bottle' 
                    ? "You're missing out on $600 in savings!" 
                    : "You're missing out on $821 in savings!"
                  }
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Your Choice:</p>
                    <p className="font-bold text-red-600">
                      {selectedPackage === '3-bottle' ? '$198 (3 bottles)' : '$88.99 (1 bottle)'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Best Deal:</p>
                    <p className="font-bold text-green-600">$294 (6 bottles)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits of 6-bottle package */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Why the 6-bottle package is the smart choice:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Maximum savings:</strong> Save $900 compared to retail</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Best results:</strong> 6 months for complete transformation</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Free shipping:</strong> No extra costs</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span><strong>Stock guarantee:</strong> Never run out during your journey</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAcceptDiscount}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                YES! Give Me The Best Deal - Save $900
              </button>
              
              <button
                onClick={handleContinueWithOriginal}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200"
              >
                No thanks, I'll stick with the {selectedPackage === '3-bottle' ? '3-bottle' : '1-bottle'} package
              </button>
            </div>

            {/* Trust Elements */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Lock className="w-3 h-3 mr-1" />
                  Secure Checkout
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  180-Day Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseSection;
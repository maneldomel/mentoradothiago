import React from 'react';
import { Calendar, Truck, Lock, X, AlertTriangle, Clock, Lightbulb } from 'lucide-react';

const PurchaseSection: React.FC = () => {
  const [showUpsellModal, setShowUpsellModal] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState<'3-bottle' | '1-bottle' | null>(null);
  const [countdown, setCountdown] = React.useState(10);

  // Countdown timer effect
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showUpsellModal && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showUpsellModal && countdown === 0) {
      // Auto redirect to original selection
      handleContinueWithOriginal();
    }
    return () => clearTimeout(timer);
  }, [showUpsellModal, countdown]);
  const handlePackageClick = (packageType: '6-bottle' | '3-bottle' | '1-bottle') => {
    if (packageType === '6-bottle') {
      // Direct purchase for 6-bottle package
      // TODO: Add 6-bottle purchase link here
      console.log('Proceeding with 6-bottle purchase');
    } else {
      // Show upsell modal for other packages
      setSelectedPackage(packageType);
      setShowUpsellModal(true);
      setCountdown(10); // Reset countdown
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
    setCountdown(10);
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
            
            {/* Main Offer Image */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <img 
                  src="https://i.imgur.com/LIj594X.png" 
                  alt="Claim Offer Now" 
                  className="w-full max-w-6xl mx-auto h-auto"
                />
              </div>
              
              {/* Button Overlapping Image - Higher Position */}
              <div className="-mt-8 flex justify-center relative">
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-20 sm:w-72 sm:h-24 md:w-80 md:h-28 bg-yellow-400 rounded-full blur-xl opacity-25 animate-pulse"></div>
                
                <img 
                  src="https://i.imgur.com/BvHFk1Y.png" 
                  alt="Order Now Button" 
                  onClick={() => handlePackageClick('6-bottle')}
                  className="cursor-pointer transition-all duration-200 transform hover:scale-105 max-w-xs sm:max-w-sm md:max-w-md relative z-10 pulse-scale"
                />
              </div>
            </div>
            
            {/* 3 and 1 Bottle Packages */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              
              {/* 3 Bottle Package */}
              <div className="text-center">
                <img 
                  src="https://i.imgur.com/o4npbwG.png" 
                  alt="3 Bottles of Proaxion" 
                  onClick={() => handlePackageClick('3-bottle')}
                  className="w-full h-auto cursor-pointer transition-all duration-200 transform hover:scale-105"
                />
              </div>
              
              {/* 1 Bottle Package */}
              <div className="text-center">
                <img 
                  src="https://i.imgur.com/96CnY12.png" 
                  alt="1 Bottle of Proaxion" 
                  onClick={() => handlePackageClick('1-bottle')}
                  className="w-full h-auto cursor-pointer transition-all duration-200 transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upsell Modal */}
      {showUpsellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
            {/* Purple Header with Countdown */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">
                      This offer expires in <span className="text-pink-300">{countdown} seconds</span>
                    </div>
                    <div className="text-purple-200 text-xs">
                      If no action is taken, you'll be redirected to your original selection
                    </div>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="w-6 h-6 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            {/* Main Content */}
            <div className="px-6 py-8">
              {/* Warning Icon */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                
                {/* Main Headline */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  Wait! You're Leaving ${selectedPackage === '3-bottle' ? '102' : '205'} Behind…
                </h3>
                
                {/* Highlight Box */}
                <div className="bg-blue-700 border border-yellow-400 rounded-lg p-4 mb-4">
                  <p className="text-yellow-400 font-bold text-lg">
                    Choose the 6 Bottle Pack now and save an extra ${selectedPackage === '3-bottle' ? '$102' : '$205'}!
                  </p>
                </div>
                
                {/* Supporting Text */}
                <p className="text-white text-sm leading-relaxed mb-6">
                  It's the most popular choice for long-term results — and it includes free shipping + a 180-day guarantee.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAcceptDiscount}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
                >
                  GET ${selectedPackage === '3-bottle' ? '$102' : '$205'} EXTRA DISCOUNT
                </button>
                
                <button
                  onClick={handleContinueWithOriginal}
                  className="w-full bg-blue-600 border border-blue-400 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Refuse Offer
                </button>
              </div>

              {/* Footer */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span>No action needed - we'll redirect you automatically</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseSection;
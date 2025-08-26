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
            <div className="text-center mb-8 relative">
              <div className="relative inline-block">
                <img 
                  src="https://i.imgur.com/onmlM47.png" 
                  alt="Claim Offer Now" 
                  onClick={() => handlePackageClick('6-bottle')}
                  className="w-full max-w-6xl mx-auto h-auto cursor-pointer transition-all duration-200 transform hover:scale-105"
                />
                
                {/* Overlaid Button */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <a 
                    href="https://SEU-LINK-DE-CHECKOUT.com" 
                    target="_blank" 
                    rel="noopener"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(180deg, #FFD400 0%, #FFB800 100%)',
                      padding: '16px 24px',
                      borderRadius: '18px',
                      boxShadow: '0 0 25px rgba(255, 212, 0, 0.8)',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontWeight: '900',
                      fontSize: '20px',
                      color: '#9A00C8',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      maxWidth: '90%'
                    }}
                  >
                    CLICK HERE TO CLAIM <span style={{ color: '#3D003D' }}>THIS</span> OFFER
                    <br />
                    <span style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      marginTop: '4px',
                      color: '#B300D0',
                      textTransform: 'uppercase'
                    }}>
                      YOU HAVE 180-DAY MONEY GUARANTEE – NO QUESTIONS ASKED
                    </span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Second Claim Offer Button - Below Image */}
            <div className="text-center mb-8">
              <a 
                href="https://SEU-LINK-DE-CHECKOUT.com" 
                target="_blank" 
                rel="noopener"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(180deg, #FFD400 0%, #FFB800 100%)',
                  padding: '22px 40px',
                  borderRadius: '18px',
                  boxShadow: '0 0 25px rgba(255, 212, 0, 0.8)',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: '900',
                  fontSize: '32px',
                  color: '#9A00C8',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                CLICK HERE TO CLAIM <span style={{ color: '#3D003D' }}>THIS</span> OFFER
                <br />
                <span style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  marginTop: '6px',
                  color: '#B300D0',
                  textTransform: 'uppercase'
                }}>
                  YOU HAVE 180-DAY MONEY GUARANTEE – NO QUESTIONS ASKED
                </span>
              </a>
            </div>
                src="https://i.imgur.com/onmlM47.png" 
                alt="Claim Offer Now" 
                onClick={() => handlePackageClick('6-bottle')}
                className="w-full max-w-6xl mx-auto h-auto cursor-pointer transition-all duration-200 transform hover:scale-105"
              />
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
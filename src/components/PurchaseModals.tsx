import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { gtmTrack } from '../lib/gtm';

interface PurchaseModalsProps {
  showUpsellPopup: boolean;
  selectedPackage: '1-bottle' | '3-bottle' | null;
  onCloseUpsellPopup: () => void;
  onUpsellAccept: () => void;
  onUpsellRefuse: () => void;
}

export const PurchaseModals: React.FC<PurchaseModalsProps> = ({
  showUpsellPopup,
  selectedPackage,
  onCloseUpsellPopup,
  onUpsellAccept,
  onUpsellRefuse
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to get URL parameters and pass them to checkout
  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = new URLSearchParams();
    
    // Pass through common UTM parameters
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    utmParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        params.set(param, value);
      }
    });
    
    // Pass through other tracking parameters
    const trackingParams = ['fbclid', 'gclid', 'ttclid', 'ref', 'source'];
    trackingParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        params.set(param, value);
      }
    });
    
    return params.toString();
  };

  // Get upsell savings based on selected package
  const getUpsellSavings = (packageType: '1-bottle' | '3-bottle' | null): number => {
    if (packageType === '1-bottle') {
      return 205; // $294 (6-bottle) - $89 (1-bottle) = $205 savings
    } else if (packageType === '3-bottle') {
      return 96; // $294 (6-bottle) - $198 (3-bottle) = $96 savings
    }
    return 0;
  };

  const upsellSavings = getUpsellSavings(selectedPackage);

  // Auto-redirect after 10 seconds of inactivity
  useEffect(() => {
    if (showUpsellPopup && selectedPackage) {
      console.log('⏰ Starting 10-second timeout for upsell popup');
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set 10-second timeout
      timeoutRef.current = setTimeout(() => {
        console.log('⏰ 10-second timeout reached - auto-redirecting to refuse offer');
        handleAutoRefuse();
      }, 10000); // 10 seconds
    }
    
    // Cleanup timeout when popup closes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [showUpsellPopup, selectedPackage]);

  // Handle auto-refuse (timeout or close button)
  const handleAutoRefuse = () => {
    if (!selectedPackage) return;
    
    // Get the original product URL (what user wanted before upsell)
    const originalUrls = {
      '1-bottle': 'https://payment.peaxion.com/checkout/193698056:1',
      '3-bottle': 'https://payment.peaxion.com/checkout/193700481:1'
    };
    
    const targetUrl = originalUrls[selectedPackage];
    
    if (targetUrl) {
      console.log('🔄 Redirecting to original product URL:', targetUrl);
      
      // Track the purchase click
      const price = selectedPackage === '1-bottle' ? 89 : 198;
      gtmTrack.purchaseClick(selectedPackage, price);
      gtmTrack.funnelStep('upsell_auto_refuse', { 
        original_package: selectedPackage,
        timeout: true
      });
      
      // Track Facebook Pixel
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          content_name: selectedPackage,
          content_category: 'supplement',
          value: price,
          currency: 'USD'
        });
      }
      
      // Add parameters to checkout URL if they exist
      const params = getUrlParams();
      const finalUrl = params ? `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}${params}` : targetUrl;
      
      console.log('🎯 Modal Auto-refuse URL with params:', finalUrl);
      
      // Small delay to ensure tracking is sent
      setTimeout(() => {
        window.open(finalUrl, '_blank');
      }, 150);
    }
    
    // Close popup
    onCloseUpsellPopup();
  };

  // Handle close button click
  const handleCloseClick = () => {
    console.log('❌ User closed upsell popup - redirecting to original product');
    gtmTrack.funnelStep('upsell_popup_closed', { original_package: selectedPackage });
    handleAutoRefuse();
  };

  // Handle accept button click (upgrade to 6-bottle)
  const handleAcceptClick = () => {
    // Clear timeout since user took action
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    console.log('✅ User accepted upsell offer - upgrading to 6-bottle');
    
    // Track upsell acceptance
    gtmTrack.purchaseClick('6-bottle', 294);
    gtmTrack.funnelStep('upsell_accepted', { 
      original_package: selectedPackage,
      upgraded_to: '6-bottle',
      savings: upsellSavings
    });
    
    // Track Facebook Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: '6-bottle',
        content_category: 'supplement',
        value: 294,
        currency: 'USD'
      });
    }
    
    // Redirect to 6-bottle checkout
    const targetUrl = 'https://payment.peaxion.com/checkout/193700534:1';
    const params = getUrlParams();
    const finalUrl = params ? `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}${params}` : targetUrl;
    
    console.log('🎯 Upsell accepted - redirecting to 6-bottle:', finalUrl);
    
    setTimeout(() => {
      window.open(finalUrl, '_blank');
    }, 150);
    
    onUpsellAccept();
  };

  // Handle refuse button click
  const handleRefuseClick = () => {
    // Clear timeout since user took action
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    console.log('❌ User refused upsell offer');
    gtmTrack.funnelStep('upsell_refused', { original_package: selectedPackage });
    handleAutoRefuse();
  };

  return (
    <>
      {/* Upsell Popup Modal */}
      {showUpsellPopup && selectedPackage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-magenta-800/95 to-magenta-900/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 relative border border-magenta-400/20 animate-bounceIn">
            {/* Close button */}
            <button 
              onClick={handleCloseClick}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Upsell content with timeout indicator */}
            <div className="text-center pt-4">
              {/* Timeout indicator */}
              <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                <p className="text-red-300 text-xs font-medium">
                  ⏰ This offer expires in 10 seconds
                </p>
                <p className="text-red-200 text-xs mt-1">
                  If no action is taken, you'll be redirected to your original selection
                </p>
              </div>
              
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-white fill-current" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Wait! You're Leaving ${upsellSavings} Behind...
                </h2>
                
                <div className="text-white/90 text-sm sm:text-base mb-6 leading-relaxed">
                  <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-xl p-4 mb-4 border border-yellow-400/30">
                    <p className="text-yellow-300 font-bold text-base sm:text-lg mb-2">
                      Upgrade to the 6 Bottle Pack now and save an extra ${upsellSavings}!
                    </p>
                  </div>
                  
                  <p>
                    It's the most popular choice for long-term results — and it includes free shipping + a 180-day guarantee.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleAcceptClick}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-lg border-2 border-white/40"
                >
                  YES! UPGRADE & SAVE ${upsellSavings}
                </button>
                
                <button 
                  onClick={handleRefuseClick}
                  className="w-full bg-transparent border border-white/20 text-white/60 hover:text-white/80 hover:border-white/30 font-medium py-2.5 px-6 rounded-xl transition-all duration-300 text-sm"
                >
                  No Thanks, Keep My Original Choice
                </button>
              </div>
              
              {/* Additional info about auto-redirect */}
              <div className="mt-4 text-center">
                <p className="text-white/50 text-xs">
                  💡 No action needed - we'll redirect you automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
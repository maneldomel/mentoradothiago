import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import PurchaseSection from './components/PurchaseSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import DoctorsSection from './components/DoctorsSection';
import NewsSection from './components/NewsSection';
import AdminRoute from './components/AdminRoute';

function HomePage() {
  const [showFullContent, setShowFullContent] = React.useState(false);

  // Effect for showing full content after delay
  React.useEffect(() => {
    // Check if we're in Bolt environment (development)
    const isInBolt = !import.meta.env.PROD;
    
    if (isInBolt) {
      // In Bolt environment, show content immediately
      setShowFullContent(true);
    } else {
      // In production, use the 43min11s delay
      const fullContentTimer = setTimeout(() => {
        setShowFullContent(true);
      }, (40 * 60 + 51) * 1000); // 40 minutes and 51 seconds in milliseconds

      return () => {
        clearTimeout(fullContentTimer);
      };
    }
  }, []);

  // Separate effect for autoscroll after content is shown
  React.useEffect(() => {
    // Only autoscroll in production (when there was actually a delay)
    if (showFullContent && import.meta.env.PROD) {
      // Multiple attempts to ensure element is rendered
      const scrollToSixBottle = () => {
        const sixBottleElement = document.getElementById('six-bottle-package');
        if (sixBottleElement) {
          console.log('Scrolling to six-bottle package');
          sixBottleElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToSixBottle()) {
        // Try after 100ms
        setTimeout(() => {
          if (!scrollToSixBottle()) {
            // Try after 500ms
            setTimeout(() => {
              if (!scrollToSixBottle()) {
                // Final try after 1s
                setTimeout(() => {
                  scrollToSixBottle();
                }, 1000);
              }
            }, 500);
          }
        }, 100);
      }
    }
  }, [showFullContent]);

  return (
    <>
      <div style={{ paddingTop: import.meta.env.PROD ? '0' : '60px' }}>
        {/* Hero Section - Always visible */}
        <HeroSection />
        
        {/* Full content - Only shows after delay */}
        {showFullContent && (
          <>
            <PurchaseSection />
          </>
        )}
      </div>

      {/* Rest of content - Only shows after delay */}
      {showFullContent && (
        <>
          {/* Testimonials Section */}
          <TestimonialsCarousel />

          {/* Doctors Section */}
          <DoctorsSection />

          {/* News Section */}
          <NewsSection />

          {/* 180-Day Guarantee Section */}
          <div className="bg-gradient-to-br from-magenta-50 to-magenta-100 py-8 md:py-16 relative">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              {/* Guarantee Badge */}
              <div className="mb-6 md:mb-8">
                {/* 180 Days Money Back Guarantee Seal */}
                <div className="relative inline-block">
                  {/* Glow effect behind the seal */}
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 scale-110"></div>
                  <img 
                    src="https://i.imgur.com/nHQSpza.png" 
                    alt="180 Days Money Back Guarantee" 
                    className="w-48 md:w-64 mx-auto relative z-10"
                  />
                </div>
              </div>

              {/* Guarantee Text */}
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-4 md:mb-6 font-inter tracking-tight">
                  <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">WE BELIEVE</span> IN OUR PRODUCT
                </h2>
                
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-magenta-100">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    We truly believe in PEAXION's power. That's why we offer a <span className="font-bold text-yellow-600">full 180-day money-back guarantee</span>.
                  </p>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-gray-800 font-semibold text-base mb-1">
                      ✓ Your satisfaction is our priority
                    </p>
                    <p className="text-gray-700 text-sm">
                      No questions asked. Even empty bottles accepted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Masculine Call-to-Action Section */}
          <div className="bg-gray-50 py-8 md:py-12 relative">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 font-inter tracking-tight leading-tight">
                READY TO <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">RECLAIM</span> YOUR MASCULINITY?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                It's time to get back in the game and show what you're made of
              </p>
            </div>
          </div>

          {/* Purchase Section - Repeated */}
          <PurchaseSection />

          {/* Footer */}
          <footer className="bg-gradient-to-br from-magenta-600 to-magenta-800 py-4">
            <div className="container mx-auto px-4 text-center">
              <div className="text-magenta-100 text-sm">
                © 2025 <span className="text-white font-semibold">PEAXION</span>. All rights reserved.
              </div>
            </div>
          </footer>
        </>
      )}
    </>
   );
 }
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

 export default App;
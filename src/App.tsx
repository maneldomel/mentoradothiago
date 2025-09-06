import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import PurchaseSection from './components/PurchaseSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import DoctorsSection from './components/DoctorsSection';
import NewsSection from './components/NewsSection';
import AdminRoute from './components/AdminRoute';

const HomePage: React.FC = () => {
  const [showFullContent, setShowFullContent] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState(43 * 60 + 11); // 43min11s in seconds

  React.useEffect(() => {
    // Timer to show full content after 43min11s
    const fullContentTimer = setTimeout(() => {
      setShowFullContent(true);
    }, (43 * 60 + 11) * 1000); // Convert to milliseconds

    // Countdown timer for display
    const countdownInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(fullContentTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  // Format time remaining for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div style={{ paddingTop: import.meta.env.PROD ? '0' : '60px' }}>
        {/* Hero Section - Always visible */}
        <HeroSection />
        
        {/* Loading message when content is not yet available */}
        {!showFullContent && (
          <div className="bg-gray-50 py-16 md:py-24 relative">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-magenta-500 to-magenta-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 font-inter">
                    <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">
                      CONTEÚDO EXCLUSIVO
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    O restante do conteúdo será liberado em breve...
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-magenta-50 to-magenta-100 rounded-xl p-6 border border-magenta-200">
                  <div className="text-4xl md:text-5xl font-black text-magenta-600 mb-2 font-mono">
                    {formatTime(timeRemaining)}
                  </div>
                  <p className="text-sm text-magenta-700 font-medium">
                    Tempo restante para liberação completa
                  </p>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>⏰ Assista ao vídeo acima enquanto aguarda</p>
                  <p>🎯 Conteúdo exclusivo será liberado automaticamente</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
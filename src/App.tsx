import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import PurchaseSection from './components/PurchaseSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import DoctorsSection from './components/DoctorsSection';
import NewsSection from './components/NewsSection';
import AdminRoute from './components/AdminRoute';
import DevNavigation from './components/DevNavigation';

const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ paddingTop: import.meta.env.PROD ? '0' : '60px' }}>
        <HeroSection />
        <PurchaseSection />
      </div>
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
            <div className="relative inline-block">
              {/* Circular Badge */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex flex-col items-center justify-center shadow-2xl mx-auto relative overflow-hidden">
                {/* Decorative rings */}
                <div className="absolute inset-2 md:inset-3 border-2 md:border-3 border-white border-opacity-40 rounded-full"></div>
                <div className="absolute inset-4 md:inset-6 border border-white border-opacity-60 rounded-full"></div>
                
                {/* Badge Content */}
                <div className="text-center z-10">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">180</div>
                  <div className="text-xs md:text-sm font-bold text-white mb-0.5">DAYS</div>
                  <div className="text-xs font-semibold text-white opacity-90">GUARANTEE</div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute top-2 left-2 md:top-3 md:left-3 w-8 h-8 md:w-12 md:h-12 bg-white opacity-30 rounded-full blur-lg"></div>
              </div>
              
              {/* Decorative elements around badge */}
              <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-yellow-300 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -right-2 md:-right-3 w-2 h-2 md:w-3 md:h-3 bg-magenta-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Guarantee Text */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-4 md:mb-6 font-inter tracking-tight">
              <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">WE BELIEVE</span> IN OUR PRODUCT
            </h2>
            
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-magenta-100">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We truly believe in PROAXION's power. That's why we offer a <span className="font-bold text-yellow-600">full 180-day money-back guarantee</span>.
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

      {/* Purchase Section - Repeated */}
      <PurchaseSection />
    </>
   );
 }
 
function App() {
  return (
    <Router>
      <DevNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

 export default App;
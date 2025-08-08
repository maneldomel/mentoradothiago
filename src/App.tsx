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
      <div className="bg-gradient-to-br from-magenta-50 to-magenta-100 py-16 md:py-24 relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          {/* Guarantee Badge */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Circular Badge */}
              <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex flex-col items-center justify-center shadow-2xl mx-auto relative overflow-hidden">
                {/* Decorative rings */}
                <div className="absolute inset-4 border-4 border-white border-opacity-30 rounded-full"></div>
                <div className="absolute inset-8 border-2 border-white border-opacity-50 rounded-full"></div>
                
                {/* Badge Content */}
                <div className="text-center z-10">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">180</div>
                  <div className="text-lg md:text-xl font-bold text-white mb-1">DAYS</div>
                  <div className="text-sm md:text-base font-semibold text-white opacity-90">GUARANTEE</div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-white opacity-20 rounded-full blur-xl"></div>
              </div>
              
              {/* Decorative elements around badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -right-4 w-4 h-4 bg-magenta-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Guarantee Text */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-6 font-inter tracking-tight">
              <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">WE BELIEVE</span> IN OUR PRODUCT
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-magenta-100">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                We care deeply about your success and truly believe in the power of PROAXION. That's why we're offering you a <span className="font-bold text-green-600">full 180-day money-back guarantee</span>.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                If you don't experience the life-changing results that thousands of men have already achieved, simply return your bottles — even if they're empty — and we'll refund every penny. No questions asked, no hassles.
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
                <p className="text-gray-800 font-semibold text-lg mb-2">
                  ✓ Your satisfaction is our priority
                </p>
                <p className="text-gray-700">
                  We stand behind PROAXION because we've seen the incredible transformations it creates. Your confidence and happiness matter to us.
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
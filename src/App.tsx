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

      {/* Masculine Call-to-Action Section */}
      <div className="bg-gray-50 py-8 md:py-12 relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 font-inter tracking-tight leading-tight">
            PRONTO PRA <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">RECLAMAR</span> SUA MASCULINIDADE?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chegou a hora de voltar ao jogo e mostrar do que você é capaz
          </p>
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
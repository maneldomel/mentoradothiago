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
            {/* 180 DAYS – MONEY BACK GUARANTEE badge */}
            <div className="inline-block">
              <svg viewBox="0 0 512 512" className="w-48 h-48 md:w-64 md:h-64 mx-auto" xmlns="http://www.w3.org/2000/svg" aria-label="Money Back Guarantee Badge">
                {/* ====== DATA TO EDIT ====== */}
                <defs>
                  {/* Cores do dourado */}
                  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fde08d"/>
                    <stop offset="40%" stopColor="#f6c65b"/>
                    <stop offset="70%" stopColor="#d39a33"/>
                    <stop offset="100%" stopColor="#a87527"/>
                  </linearGradient>
                  <linearGradient id="gold2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e7b650"/>
                    <stop offset="100%" stopColor="#b47b27"/>
                  </linearGradient>
                  <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.35"/>
                  </filter>
                  {/* Curva inferior para o texto GUARANTEE */}
                  <path id="bottomArc" d="M128,340 A 160 160 0 0 0 384 340"/>
                </defs>

                {/* Borda serrilhada (efeito selo) */}
                <g filter="url(#softShadow)">
                  <g id="ruffle" transform="translate(256 256)">
                    {/* 48 pontas */}
                    <g fill="url(#gold)">
                      {/* gera as "serrilhas" rotacionando um losango 48 vezes */}
                      {/* tamanho/ângulo ajustados para parecer selo */}
                      <polygon id="tooth" points="0,-238 18,-210 0,-182 -18,-210"/>
                      <use href="#tooth" transform="rotate(7.5)"/>
                      <use href="#tooth" transform="rotate(15)"/>
                      <use href="#tooth" transform="rotate(22.5)"/>
                      <use href="#tooth" transform="rotate(30)"/>
                      <use href="#tooth" transform="rotate(37.5)"/>
                      <use href="#tooth" transform="rotate(45)"/>
                      <use href="#tooth" transform="rotate(52.5)"/>
                      <use href="#tooth" transform="rotate(60)"/>
                      <use href="#tooth" transform="rotate(67.5)"/>
                      <use href="#tooth" transform="rotate(75)"/>
                      <use href="#tooth" transform="rotate(82.5)"/>
                      <use href="#tooth" transform="rotate(90)"/>
                      <use href="#tooth" transform="rotate(97.5)"/>
                      <use href="#tooth" transform="rotate(105)"/>
                      <use href="#tooth" transform="rotate(112.5)"/>
                      <use href="#tooth" transform="rotate(120)"/>
                      <use href="#tooth" transform="rotate(127.5)"/>
                      <use href="#tooth" transform="rotate(135)"/>
                      <use href="#tooth" transform="rotate(142.5)"/>
                      <use href="#tooth" transform="rotate(150)"/>
                      <use href="#tooth" transform="rotate(157.5)"/>
                      <use href="#tooth" transform="rotate(165)"/>
                      <use href="#tooth" transform="rotate(172.5)"/>
                      <use href="#tooth" transform="rotate(180)"/>
                      <use href="#tooth" transform="rotate(187.5)"/>
                      <use href="#tooth" transform="rotate(195)"/>
                      <use href="#tooth" transform="rotate(202.5)"/>
                      <use href="#tooth" transform="rotate(210)"/>
                      <use href="#tooth" transform="rotate(217.5)"/>
                      <use href="#tooth" transform="rotate(225)"/>
                      <use href="#tooth" transform="rotate(232.5)"/>
                      <use href="#tooth" transform="rotate(240)"/>
                      <use href="#tooth" transform="rotate(247.5)"/>
                      <use href="#tooth" transform="rotate(255)"/>
                      <use href="#tooth" transform="rotate(262.5)"/>
                      <use href="#tooth" transform="rotate(270)"/>
                      <use href="#tooth" transform="rotate(277.5)"/>
                      <use href="#tooth" transform="rotate(285)"/>
                      <use href="#tooth" transform="rotate(292.5)"/>
                      <use href="#tooth" transform="rotate(300)"/>
                      <use href="#tooth" transform="rotate(307.5)"/>
                      <use href="#tooth" transform="rotate(315)"/>
                      <use href="#tooth" transform="rotate(322.5)"/>
                      <use href="#tooth" transform="rotate(330)"/>
                      <use href="#tooth" transform="rotate(337.5)"/>
                      <use href="#tooth" transform="rotate(345)"/>
                      <use href="#tooth" transform="rotate(352.5)"/>
                    </g>
                  </g>

                  {/* Anel dourado */}
                  <circle cx="256" cy="256" r="200" fill="url(#gold)"/>
                  {/* Anel escuro interno para profundidade */}
                  <circle cx="256" cy="256" r="184" fill="#0d0d0d"/>
                  {/* Anel fino dourado */}
                  <circle cx="256" cy="256" r="170" fill="none" stroke="url(#gold2)" strokeWidth="14"/>

                  {/* Faixa (ribbon) central */}
                  <rect x="56" y="224" width="400" height="72" rx="10" fill="url(#gold)" stroke="#572d00" strokeOpacity=".25"/>
                  <text x="256" y="272" fontFamily="Impact, Arial Black, Helvetica, sans-serif"
                        fontSize="52" textAnchor="middle" fill="#000" letterSpacing="2">MONEY BACK</text>

                  {/* Centro preto para "180 DAYS" */}
                  <circle cx="256" cy="188" r="110" fill="#000"/>

                  {/* 180 */}
                  <text x="256" y="178" textAnchor="middle"
                        fontFamily="Impact, Arial Black, Helvetica, sans-serif"
                        fontSize="72" fill="white" letterSpacing="2">180</text>
                  {/* DAYS */}
                  <text x="256" y="218" textAnchor="middle"
                        fontFamily="Impact, Arial Black, Helvetica, sans-serif"
                        fontSize="46" fill="white" letterSpacing="3">DAYS</text>

                  {/* GUARANTEE curvo */}
                  <text fontFamily="Impact, Arial Black, Helvetica, sans-serif" fontSize="28"
                        fill="white" letterSpacing="4">
                    <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">GUARANTEE</textPath>
                  </text>
                </g>
              </svg>
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
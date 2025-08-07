import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import PurchaseSection from './components/PurchaseSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import DoctorsSection from './components/DoctorsSection';
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
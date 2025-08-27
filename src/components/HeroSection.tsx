import React from 'react';
import { Volume2, Clock } from 'lucide-react';
import TestimonialsCarousel from './TestimonialsCarousel';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gray-50 relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft magenta orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-magenta-300/30 to-magenta-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-bl from-magenta-200/25 to-magenta-300/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-gradient-to-tr from-magenta-400/20 to-magenta-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-gradient-to-tl from-magenta-300/25 to-magenta-400/12 rounded-full blur-3xl"></div>
        
        {/* Additional subtle lights */}
        <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-gradient-to-r from-magenta-200/18 to-magenta-300/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/2 right-10 w-56 h-56 bg-gradient-to-l from-magenta-400/15 to-magenta-200/7 rounded-full blur-2xl"></div>
        
        {/* Extra ambient lights */}
        <div className="absolute top-10 right-1/4 w-32 h-32 bg-gradient-to-br from-magenta-500/20 to-magenta-300/8 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-gradient-to-tl from-magenta-400/18 to-magenta-200/6 rounded-full blur-xl"></div>
      </div>
      
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl relative z-10">
        {/* Headline */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-black leading-tight mb-4 px-4 font-inter tracking-tight">
            <span className="block text-gray-800">ANCIENT <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">GINGER SECRET</span></span>
            <span className="block text-gray-800">ENDS <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">IMPOTENCE</span> FOREVER</span>
          </h1>
        </div>

        {/* Subline */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">47,000+ men CURED</span> their impotence with this{' '}
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">ancient kitchen ingredient</span>
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          
          {/* Opening Hook (Fear + Intrigue) */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-4 border-red-500">
            <div className="text-center md:text-left">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                If you've ever felt the <span className="font-bold text-red-600">shame of a soft, lifeless erection</span> when you needed it the most…
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                If you've ever seen the <span className="font-bold text-red-600">disappointment in your partner's eyes</span> as you failed to perform…
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Or if you secretly fear that your <span className="font-bold text-red-600">sex life is OVER for good</span>…
              </p>
              
              <div className="bg-gradient-to-r from-magenta-50 to-magenta-100 rounded-xl p-4 md:p-6 mb-6">
                <p className="text-xl md:text-2xl font-bold text-magenta-700 mb-4">
                  👉 Then what you're about to read could change your life forever.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Because a team of scientists just rediscovered a <span className="font-bold text-magenta-600">forgotten ancient ginger formula</span> that targets the REAL cause of impotence — and <span className="font-bold text-magenta-600">reverses it in as little as 7 days</span>.
                </p>
              </div>
            </div>
          </div>

          {/* The Enemy (Big Pharma Attack) */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-6 md:p-8 border border-red-200">
            <h2 className="text-2xl md:text-3xl font-black text-red-700 mb-6 text-center">
              Big Pharma doesn't want you to know this.
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p><span className="font-bold text-red-600">Why?</span></p>
              <p>Because every year they make <span className="font-bold text-red-600">billions of dollars</span> selling you blue pills that only mask the problem…</p>
              <p>…while <span className="font-bold text-red-600">destroying your heart, liver, and hormones</span> in the process.</p>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 my-6">
                <p className="font-bold text-red-700 mb-2">They don't want a PERMANENT solution.</p>
                <p className="font-bold text-red-700">They want you hooked for life.</p>
              </div>
              
              <p className="text-xl font-bold text-magenta-600 text-center">
                But <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">PEAXION</span> changes everything.
              </p>
            </div>
          </div>

          {/* The Discovery (Ancient Secret Revealed) */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-6 md:p-8 border border-green-200">
            <h2 className="text-2xl md:text-3xl font-black text-green-700 mb-6 text-center">
              The Ancient Discovery
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>Researchers uncovered that men in <span className="font-bold text-green-600">remote Asian villages had zero cases of erectile dysfunction</span>… even men in their 70s were still <span className="font-bold text-green-600">performing like bulls in their prime</span>.</p>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 my-6">
                <p className="font-bold text-green-700 mb-2">Their secret?</p>
                <p>A potent <span className="font-bold text-green-600">ginger extract</span>, combined with other rare natural compounds, that <span className="font-bold text-green-600">boosts nitric oxide, surges blood flow into your penis, and skyrockets testosterone levels</span>.</p>
              </div>
              
              <p className="text-center">
                This exact formula has now been concentrated into <span className="text-xl font-bold text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">PEAXION</span> — a discreet, liquid drop supplement you take daily.
              </p>
            </div>
          </div>

          {/* Proof (Credibility + Social Proof) */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-6 md:p-8 border border-blue-200">
            <h2 className="text-2xl md:text-3xl font-black text-blue-700 mb-6 text-center">
              Proven Results
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p className="text-center text-xl font-bold text-blue-600 mb-6">
                Already, <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">47,000+ men</span> have restored rock-hard erections with this breakthrough.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <p>Men in their <span className="font-bold text-blue-600">40s now perform like they're 20 again</span>.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <p>Men in their <span className="font-bold text-blue-600">50s report explosive stamina and multiple rounds</span>.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 md:col-span-2">
                  <p>Even men in their <span className="font-bold text-blue-600">60s and 70s are shocking their wives with steel-hard erections</span>.</p>
                </div>
              </div>
              
              <div className="bg-yellow-100 rounded-lg p-4 border border-yellow-400 text-center mt-6">
                <p className="text-xl font-bold text-yellow-700">
                  Clinical testing showed <span className="text-2xl text-yellow-600">92% success rates</span> in reversing impotence permanently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <TestimonialsCarousel />
      
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">

          {/* Benefits (Paint the Dream) */}
          <div className="bg-gradient-to-br from-magenta-50 to-magenta-100 rounded-2xl shadow-xl p-6 md:p-8 border border-magenta-200">
            <h2 className="text-2xl md:text-3xl font-black text-magenta-700 mb-6 text-center">
              With <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">PEAXION</span>, you will:
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">Get rock-hard erections ON DEMAND</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">Last longer than you thought possible</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">Enjoy surging testosterone and unstoppable drive</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">Eliminate the fear of failure — and feel true confidence in the bedroom again</p>
              </div>
            </div>
          </div>

          {/* The Offer (Scarcity + Urgency) */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-yellow-400">
            <h2 className="text-2xl md:text-3xl font-black text-yellow-700 mb-6 text-center">
              Limited Time Exclusive Launch Discount
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed text-center">
              <p>Right now, for a limited time, you can secure <span className="font-bold text-yellow-600">PEAXION at an exclusive launch discount</span>.</p>
              
              <div className="bg-red-100 border border-red-400 rounded-lg p-4">
                <p className="font-bold text-red-700">
                  But supplies are extremely limited — and once they're gone, it could take months before we restock.
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee (Risk Reversal) */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-6 md:p-8 border border-green-200">
            <h2 className="text-2xl md:text-3xl font-black text-green-700 mb-6 text-center">
              100% Risk-Free Guarantee
            </h2>
            
            <div className="text-center space-y-4 text-lg text-gray-700 leading-relaxed">
              <p className="font-bold text-green-600">Try PEAXION completely risk-free.</p>
              <p>If you don't experience <span className="font-bold text-green-600">harder, longer-lasting erections within 30 days</span>, we'll refund every single penny — <span className="font-bold text-green-600">no questions asked</span>.</p>
            </div>
          </div>

        </div>

        {/* Hidden Video Section - Keep for later use */}
        <div className="hidden">
          {/* Video Section */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative">
              {/* Video Container - 9:16 aspect ratio */}
              <div className="w-72 h-[512px] sm:w-80 sm:h-[568px] md:w-96 md:h-[682px] bg-gray-100 border-2 md:border-4 border-fuchsia-200 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl flex items-center justify-center mx-auto">
                <div className="text-center p-4 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <div className="w-0 h-0 border-l-[10px] md:border-l-[12px] border-l-white border-t-[6px] md:border-t-[8px] border-t-transparent border-b-[6px] md:border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-gray-600 font-medium text-sm md:text-base">
                    Embed your VTurb video here
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-2">
                    9:16 aspect ratio
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Notices */}
          <div className="max-w-sm sm:max-w-md mx-auto space-y-3 md:space-y-4 px-4">
            {/* Sound Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-500" />
                <p className="text-gray-600 text-xs sm:text-sm text-center">
                  Make sure your <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">sound is ON</span> for the full experience
                </p>
              </div>
            </div>

            {/* Urgency Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-gray-600 text-xs sm:text-sm text-center">
                  This video will <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">disappear soon</span> - <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text font-bold">Watch it now!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
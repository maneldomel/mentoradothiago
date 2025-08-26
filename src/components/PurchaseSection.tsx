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
            
            {/* 6 Bottle Package - Main Offer */}
            {/* CTA BUNDLE / BOTÃO ESTILO DO EXEMPLO */}
            <div className="cta-bundle mb-8" style={{'--brand':'#a300ff', '--brand-2':'#ff00c3', '--cta':'#ffd400', '--cta-2':'#ffb800', '--ink':'#2a0140'} as React.CSSProperties}>
              {/* FRETE GRÁTIS */}
              <div className="badge shipping" aria-label="Frete grátis">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 7h11v7h-1.2a2.8 2.8 0 0 0-5.6 0H6.8a2.8 2.8 0 0 0-5.6 0H0V9a2 2 0 0 1 2-2zm12 0h3l3 3v4h-2.2a2.8 2.8 0 0 0-5.6 0H15V7zM5.2 17.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zm10 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z"/>
                </svg>
                <span>FREE SHIPPING</span>
              </div>

              {/* ECONOMIA */}
              <div className="badge save">YOU SAVE <b>$900!</b></div>

              {/* FUNDO ROXO */}
              <div className="panel"></div>

              {/* FILEIRA DE PRODUTOS */}
              <div className="products" aria-hidden="true">
                <img src="https://i.imgur.com/RVXt1O7.png" alt="Produto" loading="lazy" />
                <img src="https://i.imgur.com/RVXt1O7.png" alt="" />
                <img src="https://i.imgur.com/RVXt1O7.png" alt="" />
                <img src="https://i.imgur.com/RVXt1O7.png" alt="" />
                <img src="https://i.imgur.com/RVXt1O7.png" alt="" />
                <img src="https://i.imgur.com/RVXt1O7.png" alt="" />
              </div>

              {/* BOTÃO PRINCIPAL */}
              <button 
                className="cta"
                onClick={() => handlePackageClick('6-bottle')}
              >
                <span className="cta-line1">CLICK HERE TO CLAIM <strong>THIS OFFER</strong></span>
                <span className="cta-line2">YOU HAVE 180-DAY MONEY GUARANTEE – NO QUESTIONS ASKED</span>
              </button>

              {/* MÉTODOS DE PAGAMENTO */}
              <div className="payments" aria-label="Métodos de pagamento aceitos">
                <div className="pp">PayPal</div>
                <div className="cards">
                  <span>VISA</span><span>Mastercard</span><span>DISCOVER</span><span>AMERICAN&nbsp;EXPRESS</span>
                </div>
              </div>
            </div>

            <style jsx>{`
              .cta-bundle{
                --radius:28px;
                --shadow:0 14px 30px rgba(0,0,0,.18), 0 8px 16px rgba(0,0,0,.12);
                position:relative; isolation:isolate; max-width:980px; margin:24px auto; padding:28px 18px 90px;
                font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#170320;
              }
              .cta-bundle .panel{
                position:absolute; inset:auto 0 120px 0; height:280px; margin:auto;
                background:linear-gradient(180deg, var(--brand) 0%, var(--brand-2) 100%);
                border-radius:36px; filter:drop-shadow(0 12px 24px rgba(0,0,0,.18));
                z-index:-1;
              }
              .products{display:flex; justify-content:center; gap:18px; margin-top:40px; flex-wrap:wrap}
              .products img{height:260px; width:auto; object-fit:contain; filter:drop-shadow(0 10px 18px rgba(0,0,0,.25))}
              .badge{
                position:absolute; display:flex; align-items:center; gap:10px; top:18px; padding:10px 14px 10px 12px;
                border-radius:999px; font-weight:800; letter-spacing:.3px; color:#6a007f; background:#ffd84d; box-shadow:var(--shadow);
              }
              .badge.shipping{left:18px; color:#6a007f}
              .badge.shipping svg{display:block}
              .badge.save{right:18px; background:#ffd84d; color:#6a007f}
              .badge.save b{color:#6a007f}
              .cta{
                display:block; text-align:center; text-decoration:none; margin:26px auto 0; max-width:780px;
                background:linear-gradient(180deg, var(--cta) 0%, var(--cta-2) 100%);
                border-radius:36px; padding:26px 18px 18px; box-shadow:0 18px 34px rgba(255,184,0,.45);
                color:#5a0080; transition:transform .08s ease, box-shadow .2s ease; outline-offset:3px;
                border: none; cursor: pointer; width: 100%;
              }
              .cta:hover{transform:translateY(-1px); box-shadow:0 22px 40px rgba(255,184,0,.55)}
              .cta:active{transform:translateY(0)}
              .cta-line1{
                display:block; font-weight:900; font-size:clamp(20px, 3.3vw, 40px); line-height:1; letter-spacing:.8px;
                text-transform:uppercase;
              }
              .cta-line1 strong{font-weight:900}
              .cta-line2{
                display:block; margin-top:10px; font-size:clamp(12px, 1.6vw, 16px); letter-spacing:.4px;
                color:#7a008f; text-transform:uppercase
              }
              .payments{display:flex; align-items:center; justify-content:center; gap:18px; margin:18px auto 0; flex-wrap:wrap}
              .payments .pp{
                display:inline-flex; align-items:center; justify-content:center; padding:14px 18px; border-radius:16px;
                background:#fff; color:#0a0a0a; font-weight:800; box-shadow:var(--shadow); min-width:170px;
              }
              .cards{display:inline-flex; gap:10px; flex-wrap:wrap}
              .cards span{
                display:inline-flex; align-items:center; justify-content:center; min-width:120px; padding:12px 14px;
                border-radius:12px; background:#fff; box-shadow:var(--shadow); font-weight:800; color:#222; font-size:14px;
              }
              @media (max-width:760px){
                .cta-bundle{padding-bottom:96px}
                .cta-bundle .panel{height:240px; bottom:140px}
                .products img{height:210px}
                .badge{transform:scale(.92)}
              }
              @media (max-width:520px){
                .products{gap:10px}
                .products img{height:170px}
                .badge{font-size:12px; padding:8px 12px}
                .badge.shipping{left:10px} .badge.save{right:10px}
              }
            `}</style>
            
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
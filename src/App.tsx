import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { X, ExternalLink, Calendar, User } from 'lucide-react';
import HeroSection from './components/HeroSection';
import PurchaseSection from './components/PurchaseSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import DoctorsSection from './components/DoctorsSection';
import AdminRoute from './components/AdminRoute';

// News Modal Component
interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  source: string;
  logoUrl: string;
  date: string;
  author: string;
  content: string;
  sourceUrl: string;
}

const NewsModal: React.FC<NewsModalProps> = ({
  isOpen,
  onClose,
  title,
  source,
  logoUrl,
  date,
  author,
  content,
  sourceUrl
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt={source} className="h-8 w-auto" />
            <div>
              <h3 className="font-bold text-gray-900">{source}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {date}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {author}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Ler artigo completo no {source}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// News Section Component
const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = React.useState<any>(null);

  const newsArticles = [
    {
      id: 1,
      title: "Revolutionary Natural Compound Shows 89% Success Rate in Male Enhancement Studies",
      source: "CNN Health",
      logoUrl: "https://i.imgur.com/8kVQJpL.png",
      date: "December 15, 2024",
      author: "Dr. Sarah Mitchell",
      excerpt: "Groundbreaking research reveals how a simple kitchen ingredient is transforming men's health across America...",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800",
      sourceUrl: "https://cnn.com",
      content: `
        <p>A groundbreaking clinical study published in the Journal of Men's Health has revealed remarkable results for a natural compound that's been hiding in plain sight in most American kitchens.</p>
        
        <p>The 12-month double-blind study, conducted across multiple research centers, followed 847 men aged 35-70 who reported declining vitality and performance issues.</p>
        
        <h3>Unprecedented Results</h3>
        <p>Researchers found that 89% of participants experienced significant improvements within the first 8 weeks of treatment. The compound, which combines specific ratios of natural ingredients, targets the root hormonal causes rather than just symptoms.</p>
        
        <blockquote>"We've never seen results like this with a natural approach," said lead researcher Dr. Michael Harrison from Johns Hopkins. "The mechanism of action is fascinating - it works at the cellular level to restore natural hormone production."</blockquote>
        
        <h3>The Science Behind the Success</h3>
        <p>The breakthrough lies in the synergistic combination of compounds that work together to:</p>
        <ul>
          <li>Increase natural testosterone production by up to 47%</li>
          <li>Improve blood flow and circulation</li>
          <li>Enhance energy and stamina</li>
          <li>Support overall male vitality</li>
        </ul>
        
        <p>What makes this discovery particularly exciting is its safety profile - no adverse effects were reported during the entire study period.</p>
      `
    },
    {
      id: 2,
      title: "Harvard Medical School Validates Ancient 'Coffee Ritual' for Male Performance",
      source: "WebMD",
      logoUrl: "https://i.imgur.com/9kVQJpL.png",
      date: "December 12, 2024",
      author: "Medical Editorial Team",
      excerpt: "Harvard researchers confirm what ancient cultures knew about this powerful morning ritual...",
      image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=800",
      sourceUrl: "https://webmd.com",
      content: `
        <p>Harvard Medical School researchers have published compelling evidence supporting an ancient morning ritual that combines common kitchen ingredients to dramatically improve male performance and vitality.</p>
        
        <p>The peer-reviewed study, published in the New England Journal of Medicine, tracked 1,200 men over 18 months and found remarkable improvements in multiple health markers.</p>
        
        <h3>Ancient Wisdom Meets Modern Science</h3>
        <p>The ritual, which involves a specific combination of coffee and mineral salts consumed in a particular sequence, has been used for centuries in various cultures. However, this is the first time it has been subjected to rigorous scientific scrutiny.</p>
        
        <blockquote>"The results exceeded our expectations," said Dr. Jennifer Walsh, lead researcher at Harvard's Department of Men's Health. "We're seeing improvements not just in performance, but in overall quality of life."</blockquote>
        
        <h3>Key Findings</h3>
        <ul>
          <li>92% of participants reported increased energy levels</li>
          <li>87% experienced improved performance</li>
          <li>94% showed better sleep quality</li>
          <li>89% reported enhanced mood and confidence</li>
        </ul>
        
        <p>The study also revealed that the timing and specific ratios of ingredients are crucial for optimal results. The researchers have now developed a standardized protocol based on their findings.</p>
        
        <h3>Safety and Efficacy</h3>
        <p>Unlike synthetic alternatives, this natural approach showed no negative side effects. In fact, many participants reported additional health benefits including improved cardiovascular markers and better cognitive function.</p>
      `
    },
    {
      id: 3,
      title: "Mayo Clinic Study: Simple Kitchen Ingredients Outperform Leading Prescriptions",
      source: "Mayo Clinic",
      logoUrl: "https://i.imgur.com/8kVQJpL.png",
      date: "December 10, 2024",
      author: "Mayo Clinic Research Team",
      excerpt: "Landmark study shows natural approach delivers superior results with zero side effects...",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
      sourceUrl: "https://mayoclinic.org",
      content: `
        <p>A landmark comparative study conducted by Mayo Clinic has demonstrated that a specific combination of natural kitchen ingredients significantly outperforms leading prescription medications for male enhancement, with zero reported side effects.</p>
        
        <p>The comprehensive 24-month study compared the natural protocol against three leading prescription treatments, involving 2,400 men across 15 medical centers.</p>
        
        <h3>Superior Results, Zero Side Effects</h3>
        <p>The natural approach showed remarkable superiority across all measured parameters:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Metric</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">Natural Protocol</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">Prescription Average</th>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #dee2e6;">Success Rate</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center; color: #28a745; font-weight: bold;">94%</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">67%</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 12px; border: 1px solid #dee2e6;">Side Effects</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center; color: #28a745; font-weight: bold;">0%</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center; color: #dc3545;">43%</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #dee2e6;">Long-term Benefits</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center; color: #28a745; font-weight: bold;">91%</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">34%</td>
          </tr>
        </table>
        
        <blockquote>"These results represent a paradigm shift in how we approach male health," stated Dr. Robert Chen, Director of Men's Health at Mayo Clinic. "The natural protocol not only outperformed synthetic alternatives but did so without any of the concerning side effects."</blockquote>
        
        <h3>The Mechanism of Action</h3>
        <p>Advanced imaging studies revealed that the natural compounds work by:</p>
        <ul>
          <li>Optimizing natural hormone production pathways</li>
          <li>Enhancing cellular energy metabolism</li>
          <li>Improving vascular function and blood flow</li>
          <li>Supporting neurotransmitter balance</li>
        </ul>
        
        <h3>Clinical Implications</h3>
        <p>The study's findings have prompted Mayo Clinic to update their treatment protocols, now recommending the natural approach as first-line therapy for appropriate candidates.</p>
        
        <p>"We're witnessing a return to nature-based medicine, but with the rigor of modern scientific validation," added Dr. Chen. "This represents the best of both worlds."</p>
      `
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              📰 BREAKING NEWS
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-inter tracking-tight">
              <span className="block">MAJOR MEDICAL</span>
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text">BREAKTHROUGH</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Leading medical institutions validate revolutionary natural approach
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedNews(article)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
                      <img src={article.logoUrl} alt={article.source} className="h-4 w-auto" />
                      <span className="text-xs font-bold text-gray-800">{article.source}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                    <span>•</span>
                    <User className="w-3 h-3" />
                    {article.author}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                      Ler mais →
                    </span>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <NewsModal
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
          title={selectedNews.title}
          source={selectedNews.source}
          logoUrl={selectedNews.logoUrl}
          date={selectedNews.date}
          author={selectedNews.author}
          content={selectedNews.content}
          sourceUrl={selectedNews.sourceUrl}
        />
      )}
    </>
  );
};

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
      }, (43 * 60 + 11) * 1000); // 43 minutes and 11 seconds in milliseconds

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
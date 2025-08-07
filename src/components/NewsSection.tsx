import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ExternalLink, X, Loader2, ArrowLeft } from 'lucide-react';

interface NewsArticle {
  id: string;
  site: string;
  siteColor: string;
  siteLogo: string;
  title: string;
  excerpt: string;
  fullContent: string;
  readTime: string;
  imageUrl: string;
  publishDate: string;
  author: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    site: 'HealthLine Weekly',
    siteColor: 'text-green-600',
    siteLogo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=60&h=40',
    title: 'New Supplement PROAXION Stuns Doctors: Erectile Dysfunction Reversed in 21 Days',
    excerpt: 'A revolutionary liquid formula is gaining national attention after users reported dramatic improvements in erectile performance — without relying on prescription pills.',
    fullContent: `A revolutionary liquid formula is gaining national attention after users reported dramatic improvements in erectile performance — without relying on prescription pills.

PROAXION, a natural drop-based supplement, is being hailed as "the next frontier in men's health" by experts. Backed by clinical observations, the formula works by boosting nitric oxide production and enhancing blood flow — naturally restoring erectile function in men over 40.

"We're seeing patients regain confidence and intimacy without side effects," says Dr. Evan Morris, a men's health specialist in Miami. "It's rare to see results this fast without pharmaceutical intervention."

The supplement has gained traction among men who prefer natural alternatives to prescription medications. Clinical observations suggest that the unique liquid formulation allows for faster absorption and more consistent results compared to traditional pill-based supplements.

Dr. Morris notes that patients typically report improvements within the first week of use, with optimal results achieved by day 21. "The liquid delivery system appears to be key," he explains. "It bypasses digestive barriers that can reduce the effectiveness of capsules and tablets."

The growing popularity of PROAXION reflects a broader shift toward natural health solutions, particularly among men seeking to address intimate health concerns without the side effects commonly associated with pharmaceutical options.`,
    readTime: '3 min read',
    imageUrl: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    publishDate: 'January 15, 2025',
    author: 'Dr. Sarah Mitchell'
  },
  {
    id: '2',
    site: 'The New York Post',
    siteColor: 'text-blue-600',
    siteLogo: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=60&h=40',
    title: "'Game-Changer' PROAXION May Outperform Viagra, Say Experts",
    excerpt: 'Forget little blue pills — men across the country are turning to a new over-the-counter liquid called PROAXION, which users say delivers stronger, longer-lasting erections with zero side effects.',
    fullContent: `Forget little blue pills — men across the country are turning to a new over-the-counter liquid called PROAXION, which users say delivers stronger, longer-lasting erections with zero side effects.

Originally developed as a circulatory health tonic, PROAXION quickly gained attention after early users noticed a major shift in bedroom performance.

"I felt the difference after just 3 days," says Rick Halvorson, 58, from Dallas. "This isn't just about sex — it's about feeling like a man again."

Doctors say the natural formulation helps support testosterone levels, improve vascular integrity, and increase libido — all without synthetic chemicals.

The supplement's rise to prominence has been remarkable. What started as word-of-mouth recommendations has evolved into a nationwide phenomenon, with men from all walks of life reporting similar experiences.

Unlike prescription medications that work temporarily, PROAXION appears to address underlying causes of erectile dysfunction. Users report sustained improvements even when not taking the supplement daily.

"The difference is night and day," explains Halvorson. "With pills, you're always planning ahead, worrying about timing and side effects. With PROAXION, it's like my body remembered how to work properly again."

Medical professionals are taking notice. Dr. Sarah Chen, a urologist in Los Angeles, has observed the trend among her patients. "Men are coming in asking about natural alternatives, and many who've tried PROAXION report satisfaction levels we rarely see with conventional treatments."

The supplement's liquid format appears to be a significant advantage, allowing for precise dosing and rapid absorption that users say leads to more predictable results.`,
    readTime: '4 min read',
    imageUrl: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    publishDate: 'January 12, 2025',
    author: 'Michael Rodriguez'
  },
  {
    id: '3',
    site: 'Men\'s Health Today',
    siteColor: 'text-blue-600',
    siteLogo: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=60&h=40',
    title: 'How PROAXION Is Helping Men Reclaim Their Confidence Without Prescription Drugs',
    excerpt: 'Men struggling with performance anxiety or declining stamina are turning to a new natural formula — and it\'s not coming from the pharmacy aisle.',
    fullContent: `Men struggling with performance anxiety or declining stamina are turning to a new natural formula — and it's not coming from the pharmacy aisle.

PROAXION is a fast-acting liquid supplement that works by naturally enhancing circulation, boosting nitric oxide levels, and supporting testosterone.

According to Dr. Daniel Brooks, a contributor to Men's Health, "We're seeing men in their 40s, 50s, even 60s experience firmer, more reliable erections — without the need for daily pills or side effects."

The supplement is now being recommended in lifestyle circles for those seeking a holistic, long-term solution to ED.

Unlike traditional pharmaceutical approaches that often come with unwanted side effects, PROAXION takes a different route. The liquid formulation allows for rapid absorption and begins working within minutes of consumption.

"What sets PROAXION apart is its ability to work with your body's natural processes," explains Dr. Brooks. "Rather than forcing a response, it enhances what should already be happening naturally."

The formula contains a proprietary blend of natural ingredients that have been used for centuries in traditional medicine. These compounds work synergistically to improve blood flow, reduce performance anxiety, and boost overall sexual confidence.

Men who have tried PROAXION report not just improved physical performance, but also increased confidence in intimate situations. Many describe feeling "like themselves again" after years of struggling with performance issues.

The supplement has gained particular popularity among men who want to avoid the scheduling and planning required with prescription medications. With PROAXION, users report feeling ready whenever the moment is right.

Dr. Brooks notes that the psychological benefits are just as important as the physical ones. "When men regain their confidence in the bedroom, it often translates to improved confidence in other areas of their lives as well."

The growing popularity of natural alternatives like PROAXION reflects a broader shift in men's health, with more men seeking solutions that work with their bodies rather than against them.`,
    readTime: '5 min read',
    imageUrl: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    publishDate: 'January 10, 2025',
    author: 'Dr. Daniel Brooks'
  }
];

const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsLoading(false);
    setShowContent(true);
  };

  const handleClose = () => {
    setSelectedArticle(null);
    setIsLoading(false);
    setShowContent(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

  const getWebsiteStyle = (site: string) => {
    switch (site) {
      case 'HealthLine Weekly':
        return {
          bg: 'bg-green-50',
          header: 'bg-green-600',
          accent: 'text-green-600',
          border: 'border-green-200'
        };
      case 'The New York Post':
        return {
          bg: 'bg-blue-50',
          header: 'bg-blue-700',
          accent: 'text-blue-700',
          border: 'border-blue-200'
        };
      case 'Men\'s Health Today':
        return {
          bg: 'bg-blue-50',
          header: 'bg-blue-700',
          accent: 'text-blue-700',
          border: 'border-blue-200'
        };
      default:
        return {
          bg: 'bg-gray-50',
          header: 'bg-gray-700',
          accent: 'text-gray-700',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <>
      <div className="bg-white py-8 md:py-12 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-inter tracking-tight">
              <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-500 bg-clip-text">AS SEEN IN THE NEWS</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Leading publications covering this breakthrough
            </p>
          </div>

          {/* News Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {newsArticles.map((article) => (
                  <div key={article.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                         onClick={() => handleArticleClick(article)}>
                      
                      {/* Logo */}
                      <div className="mb-6">
                        {article.site === 'The New York Post' ? (
                          <img 
                            src="https://i.imgur.com/mhIlnsd.png" 
                            alt="New York Post"
                            className="h-8 w-auto object-contain mx-auto"
                          />
                        ) : article.site === 'HealthLine Weekly' ? (
                          <img 
                            src="https://i.imgur.com/K7v16Vy.png" 
                            alt="HealthLine Weekly"
                            className="h-8 w-auto object-contain mx-auto"
                          />
                        ) : article.site === 'Men\'s Health Today' ? (
                          <img 
                            src="https://i.imgur.com/xtDN6Ts.png" 
                            alt="Men's Health Today"
                            className="h-8 w-auto object-contain mx-auto"
                          />
                        ) : (
                          <span className={`font-bold text-sm ${article.siteColor} block text-center`}>
                            {article.site}
                          </span>
                        )}
                      </div>

                      {/* Excerpt */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
                        {article.excerpt}
                      </p>
                      
                      {/* Read More Button */}
                      <button className="inline-flex items-center px-6 py-2 bg-magenta-600 hover:bg-magenta-700 text-white font-medium rounded-lg transition-colors duration-200 group-hover:scale-105 transform">
                        Read More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-10 border border-gray-200"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-10 border border-gray-200"
              onClick={scrollNext}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Trust Badge */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium text-sm">Trusted by leading publications</span>
            </div>
          </div>
        </div>
      </div>
      {/* Full-Screen Webview Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-white z-50 overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full bg-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mb-4 mx-auto animate-pulse">
                  <div className="w-8 h-8 bg-gray-400 rounded"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-4" />
              <p className="text-gray-600 font-medium mb-2">Loading article...</p>
              <div className="w-64 bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          ) : showContent ? (
            <div className={`h-full overflow-y-auto ${getWebsiteStyle(selectedArticle.site).bg}`}>
              {/* Authentic Website Headers */}
              {selectedArticle.site === 'The New York Post' ? (
                // NY Post Header Image
                <div className="relative">
                  <div className="absolute top-2 left-2 z-50">
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute top-2 right-2 z-50">
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <img 
                    src="https://i.imgur.com/KjAEcL3.jpeg" 
                    alt="New York Post Header"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : selectedArticle.site === 'HealthLine Weekly' ? (
                // HealthLine Weekly Header Image
                <div className="relative">
                  <div className="absolute top-2 left-2 z-50">
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute top-2 right-2 z-50">
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <img 
                    src="https://i.imgur.com/l16fTbC.png" 
                    alt="HealthLine Weekly Header"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                // Generic Header for other sites
               <div className="relative">
                 <div className="absolute top-2 left-2 z-50">
                   <button
                     onClick={handleClose}
                     className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                   >
                     <ArrowLeft className="w-4 h-4 text-white" />
                   </button>
                 </div>
                 <div className="absolute top-2 right-2 z-50">
                   <button
                     onClick={handleClose}
                     className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                   >
                     <X className="w-4 h-4 text-white" />
                   </button>
                   src="https://i.imgur.com/nIdQU15.png" 
                   alt="Men's Health Today Header"
                   className="w-full h-auto object-cover"
                 />
               </div>
              )}
              {/* Simulated Website Content */}
              <div className="max-w-4xl mx-auto p-6">
                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <span>{selectedArticle.publishDate}</span>
                    <span>•</span>
                    <span>By {selectedArticle.author}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    {selectedArticle.title}
                  </h1>
                  
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={selectedArticle.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
                  />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {selectedArticle.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* CTA at bottom of article */}
                <div className="mt-12 text-center">
                  <div className="mb-6">
                    <img 
                      src="https://i.imgur.com/RVXt1O7.png" 
                      alt="Proaxion - 1 Bottle" 
                      className="w-32 h-32 object-contain mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Try <span className="text-magenta-600">PROAXION</span> Today
                    </h3>
                    <p className="text-gray-700 text-lg">
                      Experience the same results mentioned in this article
                    </p>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="inline-flex items-center px-6 py-3 bg-magenta-600 hover:bg-magenta-700 text-white font-medium rounded-lg transition-colors duration-200 text-base"
                  >
                    Get PROAXION Now - $79
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                 </div>
                 
                 <img 
                  <p className="text-sm text-gray-600 mt-3">
                    ✓ 180-Day Money Back Guarantee
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default NewsSection;
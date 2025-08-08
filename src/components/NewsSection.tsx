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
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-hidden">
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
            <div className="h-full overflow-y-auto bg-white relative">
              {/* Sticky Navigation Header */}
              <div className="sticky top-0 bg-gray-100 border-b border-gray-200 px-4 py-3 z-50">
                <div className="flex items-center">
                  <button
                    onClick={handleClose}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                </div>
              </div>

              {/* Authentic Website Headers */}
              {selectedArticle.site === 'The New York Post' ? (
                // NY Post Header Image
                <div className="relative">
                  {/* Navigation Header Above */}
                  <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center">
                      <button
                        onClick={handleClose}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Back</span>
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 z-50">
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  {/* NY Post Realistic Header */}
                  <div className="bg-white border-b border-gray-200">
                    <div className="bg-blue-900 text-white py-2">
                      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-xs">Tuesday, January 15, 2025</div>
                          <div className="text-xs">New York, NY</div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs">
                          <span>Subscribe</span>
                          <span>Sign In</span>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-6xl mx-auto px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="text-2xl font-bold text-blue-900">NEW YORK POST</div>
                          <nav className="hidden md:flex space-x-6 text-sm">
                            <a href="#" className="text-gray-700 hover:text-blue-900">News</a>
                            <a href="#" className="text-gray-700 hover:text-blue-900">Sports</a>
                            <a href="#" className="text-gray-700 hover:text-blue-900">Business</a>
                            <a href="#" className="text-gray-700 hover:text-blue-900">Opinion</a>
                            <a href="#" className="text-gray-700 hover:text-blue-900">Lifestyle</a>
                          </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="text-gray-600">🔍</button>
                          <button className="bg-blue-900 text-white px-4 py-2 rounded text-sm">Subscribe</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedArticle.site === 'HealthLine Weekly' ? (
                // HealthLine Weekly Header Image
                <div className="relative">
                  {/* HealthLine Header Image */}
                  <img 
                    src="https://i.imgur.com/l16fTbC.png" 
                    alt="HealthLine Weekly Header"
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                // Men's Health Today Header Image
                <div className="relative">
                  <img 
                    src="https://i.imgur.com/xtDN6Ts.png" 
                    alt="Men's Health Today Header"
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Article Content Container */}
              <div className="max-w-4xl mx-auto px-6 py-8 bg-white">
                {/* Breadcrumb Navigation */}
                <div className="text-sm text-gray-500 mb-4">
                  <span>Home</span> <span className="mx-2">›</span> 
                  <span>Health</span> <span className="mx-2">›</span> 
                  <span className="text-gray-700">Men's Health</span>
                </div>

                {/* Article Meta */}
                <div className="border-l-4 border-magenta-500 pl-4 mb-6">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Health News</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>By {selectedArticle.author}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedArticle.publishDate}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  {selectedArticle.title}
                </h1>

                {/* Social Share Buttons */}
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Share:</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Facebook</button>
                  <button className="bg-blue-400 text-white px-3 py-1 rounded text-xs">Twitter</button>
                  <button className="bg-blue-700 text-white px-3 py-1 rounded text-xs">LinkedIn</button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">WhatsApp</button>
                </div>
                
                <img 
                  src={selectedArticle.id === '1' 
                    ? 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800&h=400'
                    : selectedArticle.id === '2'
                    ? 'https://images.pexels.com/photos/8844895/pexels-photo-8844895.jpeg?auto=compress&cs=tinysrgb&w=800&h=400'
                    : 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800&h=400'
                  }
                  alt={selectedArticle.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
                />

                {/* Image Caption */}
                <div className="text-sm text-gray-500 italic mb-8 -mt-4">
                  Medical professionals are taking notice of this breakthrough supplement. Photo: Getty Images
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {selectedArticle.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-800 leading-relaxed mb-6 text-lg font-serif">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Article Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-3">Tags:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">Men's Health</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">Supplements</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">Natural Health</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">PROAXION</span>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=80&h=80" 
                      alt={selectedArticle.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">About {selectedArticle.author}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedArticle.author} is a health journalist with over 10 years of experience covering breakthrough medical research and wellness trends. She specializes in men's health and natural supplements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Related Articles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex space-x-4">
                      <img 
                        src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=120&h=80" 
                        alt="Related article"
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">5 Natural Ways to Boost Energy</h4>
                        <p className="text-gray-600 text-xs">Discover science-backed methods...</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <img 
                        src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=120&h=80" 
                        alt="Related article"
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">The Science of Male Vitality</h4>
                        <p className="text-gray-600 text-xs">Understanding hormonal health...</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA at bottom of article */}
                <div className="mt-12 text-center">
                  <div className="bg-gradient-to-r from-magenta-50 to-magenta-100 rounded-2xl p-8 mb-6">
                    <div className="text-sm text-magenta-600 font-semibold mb-2">SPONSORED CONTENT</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Try the Supplement Featured in This Article
                    </h3>
                    <p className="text-gray-700 text-lg mb-6">
                      Experience the same breakthrough results mentioned by medical experts
                    </p>
                    <img 
                      src="https://i.imgur.com/RVXt1O7.png" 
                      alt="Proaxion - 1 Bottle" 
                      className="w-32 h-32 object-contain mx-auto mb-6"
                    />
                    <button
                      onClick={scrollToTop}
                      className="bg-magenta-600 hover:bg-magenta-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
                    >
                      Get PROAXION Now - Special Offer
                    </button>
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                      <span>✓ 180-Day Money Back Guarantee</span>
                      <span>✓ Free Shipping</span>
                      <span>✓ Secure Checkout</span>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Reader Comments ({selectedArticle.id === '1' ? '47' : selectedArticle.id === '2' ? '89' : '34'})
                  </h3>
                  <div className="mb-6">
                    {selectedArticle.id === '1' ? (
                      <>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">R</div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Robert Martinez</div>
                              <div className="text-gray-600 text-xs mb-2">3 hours ago</div>
                              <p className="text-gray-700 text-sm">I'm 58 and was skeptical about supplements, but this article changed my mind. The science seems solid.</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">D</div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Dr. Patricia Williams</div>
                              <div className="text-gray-600 text-xs mb-2">5 hours ago</div>
                              <p className="text-gray-700 text-sm">As a healthcare professional, I appreciate seeing natural approaches getting proper research attention.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : selectedArticle.id === '2' ? (
                      <>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">T</div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Tom Richardson</div>
                              <div className="text-gray-600 text-xs mb-2">1 hour ago</div>
                              <p className="text-gray-700 text-sm">Finally, something that doesn't require a prescription! Been dealing with this for years.</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">J</div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">James Cooper</div>
                              <div className="text-gray-600 text-xs mb-2">4 hours ago</div>
                              <p className="text-gray-700 text-sm">My doctor mentioned natural alternatives. This gives me hope there are options beyond pills.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Mark Stevens</div>
                              <div className="text-gray-600 text-xs mb-2">2 hours ago</div>
                              <p className="text-gray-700 text-sm">At 52, I thought my best days were behind me. Articles like this give me confidence to try new approaches.</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Anthony Davis</div>
                              <div className="text-gray-600 text-xs mb-2">6 hours ago</div>
                              <p className="text-gray-700 text-sm">Great to see men's health getting more attention. We need more natural solutions like this.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <button className="text-blue-600 text-sm font-semibold">View all comments →</button>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                  <div className="text-gray-500 text-sm">
                    © 2025 {selectedArticle.site}. All rights reserved. | 
                    <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a> | 
                    <a href="#" className="text-blue-600 hover:underline ml-1">Terms of Service</a>
                  </div>
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
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
    site: 'Science & BioEdge',
    siteColor: 'text-purple-600',
    siteLogo: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=60&h=40',
    title: 'How PROAXION Activates the Body\'s Hidden Erectile Pathways',
    excerpt: 'In a recently published review, researchers explored how PROAXION — a proprietary botanical formula in liquid form — triggers the body\'s own erectile mechanisms, offering a long-term solution to ED.',
    fullContent: `In a recently published review, researchers explored how PROAXION — a proprietary botanical formula in liquid form — triggers the body's own erectile mechanisms, offering a long-term solution to ED.

The formula combines adaptogens, bioflavonoids, and circulation-enhancing compounds to stimulate the endothelial response, reduce inflammation, and optimize oxygen delivery to penile tissue.

According to Dr. Natalie Grant, author of "Endocrine Recovery in Male Sexual Health," "This is not a temporary crutch — PROAXION actually retrains the body to perform as it did in youth."

Scientists believe this could signal a new era of natural, self-regulating treatments for erectile dysfunction.

The research reveals that PROAXION works through multiple pathways simultaneously. The liquid formulation contains bioactive compounds that cross the blood-brain barrier, influencing neural pathways responsible for sexual arousal and response.

"What we're seeing is a restoration of natural function rather than artificial stimulation," explains Dr. Grant. "The body begins to produce adequate nitric oxide on its own, blood vessels regain their elasticity, and hormonal balance is restored."

The study followed 200 men over a 12-week period, with 89% reporting significant improvements in erectile function, stamina, and overall sexual satisfaction. Notably, benefits appeared to compound over time, with the most dramatic improvements occurring after 6-8 weeks of consistent use.

Researchers attribute this delayed peak effect to the supplement's ability to repair cellular damage and restore optimal blood flow patterns. Unlike pharmaceutical interventions that provide immediate but temporary results, PROAXION appears to address root causes of erectile dysfunction.

"We're witnessing a paradigm shift," notes Dr. Grant. "Instead of managing symptoms, we're actually reversing the underlying physiological changes that lead to erectile dysfunction in the first place."

The implications extend beyond sexual health, with participants reporting improved energy levels, better sleep quality, and enhanced overall vitality — suggesting that PROAXION's benefits may be more comprehensive than initially understood.`,
    readTime: '5 min read',
    imageUrl: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    publishDate: 'January 10, 2025',
    author: 'Dr. James Thompson'
  }
];

const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsLoading(true);
    setShowContent(false);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 2500);
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
      case 'Science & BioEdge':
        return {
          bg: 'bg-purple-50',
          header: 'bg-purple-700',
          accent: 'text-purple-700',
          border: 'border-purple-200'
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
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 font-inter tracking-tight">
              <span className="block md:inline">IN THE</span><span className="hidden md:inline"> </span><span className="block md:inline text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">NEWS</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Leading health publications are reporting on this breakthrough formula
            </p>
          </div>

          {/* News Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {newsArticles.map((article) => (
                  <div key={article.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                    <div 
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer mx-4 my-8"
                      onClick={() => handleArticleClick(article)}
                    >
                      {/* Article Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <img 
                              src={article.siteLogo} 
                              alt={article.site}
                              className="w-6 h-4 object-cover rounded"
                            />
                            <span className={`font-bold text-sm ${article.siteColor}`}>
                              {article.site}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-500">{article.publishDate}</span>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                        </div>
                        
                        <h4 className="font-bold text-gray-800 text-lg leading-tight mb-3 line-clamp-2">
                          {article.title}
                        </h4>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">By {article.author}</span>
                          <div className="flex items-center text-magenta-600 hover:text-magenta-700 font-medium text-sm transition-colors">
                            Read Full Article
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-10"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-10"
              onClick={scrollNext}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
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
                // Authentic NY Post Header
                <header className="site-header bg-black text-white relative">
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
                  
                  <div className="site-header__wrapper">
                    <div className="site-header__container px-4 py-2">
                      <div className="site-header__left">
                        <button className="menu-toggle text-white mr-4">
                          <span className="menu-toggle__icon-wrapper">
                            <span className="menu-toggle__icon block w-5 h-0.5 bg-white mb-1"></span>
                            <span className="menu-toggle__icon block w-5 h-0.5 bg-white mb-1"></span>
                            <span className="menu-toggle__icon block w-5 h-0.5 bg-white"></span>
                          </span>
                        </button>
                        
                        <nav className="site-header__nav hidden md:block">
                          <ul className="header-nav flex space-x-6 text-sm">
                            <li><a href="#" className="text-white hover:text-gray-300">US News</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">World News</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">Page Six</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">Sports</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">Business</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">Opinion</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">Entertainment</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">Health</a></li>
                          </ul>
                        </nav>
                      </div>

                      <div className="site-header__logo flex-1 flex justify-center">
                        <svg width="200" height="30" viewBox="0 0 450 67" className="fill-white">
                          <g fill="currentColor">
                            <path d="M187.917 12.81l-8.744 32.081c-3.5 14.2 28.09 14.523 32.353 0l8.744-32.081c3.498-14.09-28.09-14.415-32.353 0zm19.233 3.251l-7 25.578c-1.53 5.527-9.509 5.527-7.979 0l7-25.578c1.534-5.527 9.513-5.527 7.979 0z"></path>
                            <path d="M285.851 3.922l-15.3 17.775 4.916-17.775h-11.914l-13.444 49.205h11.914l6.012-22h.109l4.372 22h12.9l-5.246-27.2h-.219l18.909-22z"></path>
                            <path d="M247.705 28.85c6.449-1.517 7.214-6.394 8.744-12.247 1.967-7.045 4.263-12.789-7-12.789h-22.948l-13.335 49.313h11.914l5.465-19.942h4.044c2.732 0 4.153.325 3.06 4.227l-4.263 15.607v.108h12.788l3.279-12.03c1.859-7.261 3.713-11.055-1.748-12.247zm-4.591-8.562c-1.093 3.793-2.623 4.227-5.356 4.227h-4.919l3.17-11.705h4.919c2.623 0 4.044.325 3.17 3.9.219-.866-.983 3.578-.983 3.578z"></path>
                            <path d="M123.211 28.199l1.2-24.061v-.216h-9.4l-.109.217-11.916 24.06 1.862-24.277H66.921L53.586 53.127h25.9l2.4-8.887H67.904l3.17-11.705h13.991l2.4-8.887H73.479L76.43 12.81h15.739l-3.06 40.318h12.132l12.023-25.361-1.858 25.36h12.132l22.954-49.205h-11.914z"></path>
                            <path d="M52.277 3.922l-7 25.686-2.621-25.686H29.321L15.877 53.127h10.6l7.651-28.071 2.949 28.071h12.355L62.877 3.922z"></path>
                          </g>
                        </svg>
                      </div>

                      <div className="site-header__right">
                        <button className="text-white mr-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                          </svg>
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Log In</button>
                      </div>
                    </div>
                    
                    {/* Sub Navigation */}
                    <div className="site-header__subnav bg-gray-900 border-t border-gray-700">
                      <div className="px-4 py-2">
                        <ul className="flex space-x-6 text-sm">
                          <li><a href="#" className="text-gray-300 hover:text-white">Page Six</a></li>
                          <li><a href="#" className="text-gray-300 hover:text-white">Sports</a></li>
                          <li><a href="#" className="text-gray-300 hover:text-white">Metro</a></li>
                          <li><a href="#" className="text-gray-300 hover:text-white">Opinion</a></li>
                          <li><a href="#" className="text-gray-300 hover:text-white">Podcasts</a></li>
                          <li><a href="#" className="text-gray-300 hover:text-white">Business</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </header>
              ) : (
                // Generic Header for other sites
                <div className={`${getWebsiteStyle(selectedArticle.site).header} text-white p-4 shadow-lg`}>
                  <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleClose}
                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </button>
                      <img 
                        src={selectedArticle.siteLogo} 
                        alt={selectedArticle.site}
                        className="w-8 h-6 object-cover rounded"
                      />
                      <h1 className="text-xl font-bold">{selectedArticle.site}</h1>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
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
                <div className={`mt-12 p-8 ${getWebsiteStyle(selectedArticle.site).bg} ${getWebsiteStyle(selectedArticle.site).border} border-2 rounded-xl text-center`}>
                  <p className="text-gray-700 mb-6 text-lg">
                    Ready to experience the benefits mentioned in this article?
                  </p>
                  <button
                    onClick={scrollToTop}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-magenta-600 to-magenta-700 hover:from-magenta-700 hover:to-magenta-800 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-lg"
                  >
                    Try <span className="text-blue-200 font-black mx-2 text-xl">PROAXION</span> Now
                  </button>
                </div>

                {/* Simulated Related Articles */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className={`text-xl font-bold mb-6 ${getWebsiteStyle(selectedArticle.site).accent}`}>
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {newsArticles.filter(a => a.id !== selectedArticle.id).slice(0, 2).map((article) => (
                      <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-gray-600 text-xs line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                    ))}
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
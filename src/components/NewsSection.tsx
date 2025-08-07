import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Loader2 } from 'lucide-react';

interface NewsArticle {
  id: string;
  site: string;
  siteColor: string;
  title: string;
  excerpt: string;
  fullContent: string;
  readTime: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    site: 'HealthLine Weekly',
    siteColor: 'text-green-600',
    title: 'New Supplement PROAXION Stuns Doctors: Erectile Dysfunction Reversed in 21 Days',
    excerpt: 'A revolutionary liquid formula is gaining national attention after users reported dramatic improvements in erectile performance — without relying on prescription pills.',
    fullContent: `A revolutionary liquid formula is gaining national attention after users reported dramatic improvements in erectile performance — without relying on prescription pills.

PROAXION, a natural drop-based supplement, is being hailed as "the next frontier in men's health" by experts. Backed by clinical observations, the formula works by boosting nitric oxide production and enhancing blood flow — naturally restoring erectile function in men over 40.

"We're seeing patients regain confidence and intimacy without side effects," says Dr. Evan Morris, a men's health specialist in Miami. "It's rare to see results this fast without pharmaceutical intervention."

The supplement has gained traction among men who prefer natural alternatives to prescription medications. Clinical observations suggest that the unique liquid formulation allows for faster absorption and more consistent results compared to traditional pill-based supplements.

Dr. Morris notes that patients typically report improvements within the first week of use, with optimal results achieved by day 21. "The liquid delivery system appears to be key," he explains. "It bypasses digestive barriers that can reduce the effectiveness of capsules and tablets."

The growing popularity of PROAXION reflects a broader shift toward natural health solutions, particularly among men seeking to address intimate health concerns without the side effects commonly associated with pharmaceutical options.`,
    readTime: '3 min read'
  },
  {
    id: '2',
    site: 'The New York Post',
    siteColor: 'text-blue-600',
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
    readTime: '4 min read'
  },
  {
    id: '3',
    site: 'Science & BioEdge',
    siteColor: 'text-purple-600',
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
    readTime: '5 min read'
  }
];

const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsLoading(true);
    setShowContent(false);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 2000);
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

          {/* News Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* Article Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-bold text-lg ${article.siteColor}`}>
                      {article.site}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <h4 className="font-bold text-gray-800 text-lg leading-tight mb-3 line-clamp-3">
                    {article.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <button
                    onClick={() => handleArticleClick(article)}
                    className="inline-flex items-center text-magenta-600 hover:text-magenta-700 font-medium text-sm transition-colors"
                  >
                    Read Full Article
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
                <span className={`font-bold text-lg ${selectedArticle.siteColor}`}>
                  {selectedArticle.site}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-magenta-600 animate-spin mb-4" />
                  <p className="text-gray-600 font-medium">Loading article...</p>
                  <div className="w-64 bg-gray-200 rounded-full h-2 mt-4">
                    <div className="bg-magenta-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              ) : showContent ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">{selectedArticle.readTime}</span>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
                    {selectedArticle.title}
                  </h1>
                  
                  <div className="prose prose-lg max-w-none">
                    {selectedArticle.fullContent.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* CTA at bottom of article */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-gray-700 mb-4">
                      Ready to experience the benefits mentioned in this article?
                    </p>
                    <button
                      onClick={scrollToTop}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-magenta-600 to-magenta-700 hover:from-magenta-700 hover:to-magenta-800 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Try <span className="text-blue-200 font-black mx-1">PROAXION</span> Now
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsSection;
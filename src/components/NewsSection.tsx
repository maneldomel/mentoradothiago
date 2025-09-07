import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { gtmTrack } from '../lib/gtm';

const NewsSection: React.FC = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Harvard Study Reveals: This Kitchen Ingredient Boosts Male Performance by 340%",
      excerpt: "Researchers at Harvard Medical School have discovered that a common kitchen ingredient can dramatically improve male performance when combined with morning coffee...",
      date: "2024-12-15",
      readTime: "3 min read",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Medical Research"
    },
    {
      id: 2,
      title: "Breaking: FDA Approves Natural Alternative That Outperforms Leading ED Medications",
      excerpt: "In a groundbreaking announcement, the FDA has given approval to a natural supplement that clinical trials show is more effective than traditional treatments...",
      date: "2024-12-14",
      readTime: "4 min read",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "FDA News"
    },
    {
      id: 3,
      title: "Doctors Shocked: 89% of Men See Results in Just 7 Days with This Simple Morning Ritual",
      excerpt: "Medical professionals across the country are reporting unprecedented success rates with a simple morning routine that takes less than 2 minutes to complete...",
      date: "2024-12-13",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Clinical Study"
    }
  ];

  const handleArticleClick = (articleIndex: number, articleTitle: string) => {
    // Track news click with GTM
    gtmTrack.newsClick(articleIndex, articleTitle);
    gtmTrack.funnelStep('news_article_clicked', { 
      article_number: articleIndex + 1,
      article_title: articleTitle
    });
    
    console.log(`News article clicked: ${articleIndex + 1} - ${articleTitle}`);
    
    // You can add actual navigation logic here if needed
    // For now, just tracking the click
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-200 via-transparent to-gray-100"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gray-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gray-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <ExternalLink className="w-4 h-4" />
            BREAKING NEWS
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-inter tracking-tight">
            <span className="block">LATEST</span>
            <span className="text-transparent bg-gradient-to-r from-red-600 to-red-400 bg-clip-text">MEDICAL NEWS</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest breakthroughs in men's health research
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsArticles.map((article, idx) => (
            <div 
              key={article.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => handleArticleClick(idx, article.title)}
            >
              {/* Article Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {article.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-semibold text-sm group-hover:text-red-700 transition-colors duration-300">
                    Read Full Article
                  </span>
                  <ExternalLink className="w-4 h-4 text-red-600 group-hover:text-red-700 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Don't Miss Out on the Latest Research
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              These breakthrough discoveries are changing men's lives every day. 
              Join thousands who have already experienced the transformation.
            </p>
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border-l-4 border-red-500">
              <p className="text-red-800 font-semibold text-sm">
                ⚡ Limited Time: Get access to the complete research findings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
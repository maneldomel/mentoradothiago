import React from 'react';
import { ExternalLink, Calendar, TrendingUp, Users, Award, Clock } from 'lucide-react';

const NewsSection: React.FC = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Harvard Study Confirms: Coffee and Salt Trick Restores Male Performance in 89% of Cases",
      source: "Medical News Today",
      date: "2024-12-15",
      excerpt: "Groundbreaking research reveals how a simple coffee and salt trick can dramatically improve male vitality. PEAXION harnesses this ancient method with modern science.",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Medical Research",
      readTime: "3 min read",
      trending: true
    },
    {
      id: 2,
      title: "Men Over 40 Report 'Life-Changing' Results with Coffee and Salt Trick - PEAXION Sales Surge 400%",
      source: "Health & Wellness Report",
      date: "2024-12-12",
      excerpt: "Thousands of men are discovering the power of the coffee and salt trick. PEAXION's revolutionary formula makes this ancient remedy accessible to modern men.",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Consumer Health",
      readTime: "4 min read",
      trending: false
    },
    {
      id: 3,
      title: "Doctors Amazed: Coffee and Salt Trick Shows 94% Success Rate in Clinical Trials",
      source: "Journal of Men's Health",
      date: "2024-12-10",
      excerpt: "Leading urologists are calling PEAXION's coffee and salt trick approach a 'game-changer' for men's health. Clinical data shows unprecedented results.",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Clinical Studies",
      readTime: "5 min read",
      trending: true
    },
    {
      id: 4,
      title: "Breaking: FDA Approves Coffee and Salt Trick Ingredients - PEAXION Leads Market Innovation",
      source: "Pharmaceutical Times",
      date: "2024-12-08",
      excerpt: "Regulatory approval confirms safety and efficacy of the coffee and salt trick methodology. PEAXION emerges as the leading brand in this revolutionary approach.",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Regulatory News",
      readTime: "3 min read",
      trending: false
    },
    {
      id: 5,
      title: "Celebrity Endorsements Pour In: Coffee and Salt Trick Takes Hollywood by Storm",
      source: "Entertainment Health",
      date: "2024-12-05",
      excerpt: "A-list celebrities are crediting the coffee and salt trick for their renewed energy. PEAXION becomes the supplement of choice among Hollywood elite.",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Celebrity News",
      readTime: "2 min read",
      trending: true
    },
    {
      id: 6,
      title: "Wall Street Analysts: Coffee and Salt Trick Market to Reach $2.8 Billion by 2025",
      source: "Financial Health News",
      date: "2024-12-03",
      excerpt: "Investment experts predict massive growth in the coffee and salt trick supplement market. PEAXION positioned as the dominant player in this emerging sector.",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      category: "Market Analysis",
      readTime: "4 min read",
      trending: false
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-magenta-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-magenta-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-magenta-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-magenta-100 text-magenta-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <TrendingUp className="w-4 h-4" />
            BREAKING NEWS
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-inter tracking-tight">
            <span className="block">PEAXION IN THE</span>
            <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">HEADLINES</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Major news outlets are covering the coffee and salt trick revolution
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsArticles.map((article, index) => (
            <div 
              key={article.id} 
              className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Trending Badge */}
              {article.trending && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    TRENDING
                  </div>
                </div>
              )}

              {/* Article Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-magenta-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-magenta-600 transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Source and Read More */}
                <div className="flex items-center justify-between">
                  <div className="text-magenta-600 font-semibold text-sm">
                    {article.source}
                  </div>
                  <button className="inline-flex items-center gap-1 text-magenta-600 hover:text-magenta-700 font-medium text-sm transition-colors duration-200">
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-magenta-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto border border-magenta-100">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-6 h-6 text-magenta-600" />
              <span className="text-magenta-600 font-bold text-sm">MEDIA VERIFIED</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Join the <span className="text-transparent bg-gradient-to-r from-magenta-600 to-magenta-400 bg-clip-text">Coffee and Salt Trick</span> Revolution
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thousands of men are already experiencing the life-changing benefits of PEAXION's revolutionary approach.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>50,000+ satisfied customers</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>94% success rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
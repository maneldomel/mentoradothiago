import React from 'react';
import { ExternalLink, Calendar, Users } from 'lucide-react';

const NewsSection: React.FC = () => {
  // Only keeping the 3 news items that are actually displayed
  const newsItems = [
    {
      id: 1,
      title: "Revolutionary Male Enhancement Breakthrough Shocks Medical Community",
      source: "Medical News Today",
      date: "December 2024",
      excerpt: "New clinical study reveals 94% success rate with natural ingredients",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      url: "#"
    },
    {
      id: 2,
      title: "Ancient Ginger Compound Shows Remarkable Results in Men's Health",
      source: "Harvard Health",
      date: "November 2024",
      excerpt: "Researchers discover powerful effects of traditional remedy on male vitality",
      image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      url: "#"
    },
    {
      id: 3,
      title: "FDA Approves Natural Alternative to Prescription Solutions",
      source: "Reuters Health",
      date: "October 2024",
      excerpt: "Safe, effective formula gains regulatory approval for widespread use",
      image: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      url: "#"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gray-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gray-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Calendar className="w-4 h-4" />
            AS SEEN IN THE NEWS
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-inter tracking-tight">
            <span className="block">MAKING</span>
            <span className="text-transparent bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text">HEADLINES</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Major news outlets are reporting on this breakthrough discovery
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="group relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Source and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {item.source}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center justify-between">
                    <a
                      href={item.url}
                      className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold text-sm transition-colors group/link"
                    >
                      <span>Read Full Article</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-300 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gray-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-4">
            Join thousands of men who have already discovered this breakthrough
          </p>
          <div className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-full text-sm font-bold">
            <Calendar className="w-4 h-4" />
            <span>Featured in 50+ Publications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
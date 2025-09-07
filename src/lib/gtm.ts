// Google Tag Manager tracking utilities
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize dataLayer if not exists
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

// GTM tracking functions
export const gtmTrack = {
  // Page View tracking
  pageView: (pageName: string = 'Home') => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: pageName,
        page_location: window.location.href,
        content_name: 'viewcontent',
        timestamp: new Date().toISOString()
      });
      console.log('GTM: Page view tracked -', pageName);
    }
  },

  // Video Play tracking with real-time duration
  videoPlay: (videoType: 'hero' | 'testimonial' | 'medical', videoIndex?: number, duration?: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      const eventData: any = {
        event: 'video_play',
        video_type: videoType,
        timestamp: new Date().toISOString()
      };

      if (videoIndex !== undefined) {
        eventData.video_index = videoIndex + 1; // 1-based indexing
      }

      if (duration !== undefined) {
        eventData.video_duration = Math.round(duration);
      }

      // Specific event names for different video types
      if (videoType === 'testimonial') {
        eventData.event = 'testimonial_play';
        eventData.testimonial_number = videoIndex !== undefined ? videoIndex + 1 : 1;
      } else if (videoType === 'medical') {
        eventData.event = 'medical_play';
        eventData.medical_number = videoIndex !== undefined ? videoIndex + 1 : 1;
      }

      window.dataLayer.push(eventData);
      console.log('GTM: Video play tracked -', eventData);
    }
  },

  // Video progress tracking (for real-time analysis)
  videoProgress: (videoType: 'hero' | 'testimonial' | 'medical', videoIndex: number, currentTime: number, totalDuration: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      const progressPercent = Math.round((currentTime / totalDuration) * 100);
      
      // Track at 25%, 50%, 75%, 100% milestones
      const milestones = [25, 50, 75, 100];
      const milestone = milestones.find(m => progressPercent >= m && progressPercent < m + 5);
      
      if (milestone) {
        window.dataLayer.push({
          event: 'video_progress',
          video_type: videoType,
          video_index: videoIndex + 1,
          progress_percent: milestone,
          current_time: Math.round(currentTime),
          total_duration: Math.round(totalDuration),
          timestamp: new Date().toISOString()
        });
        console.log(`GTM: Video progress ${milestone}% tracked -`, videoType, videoIndex + 1);
      }
    }
  },

  // News Click tracking
  newsClick: (newsIndex: number, newsTitle: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'news_click',
        news_number: newsIndex + 1,
        news_title: newsTitle,
        timestamp: new Date().toISOString()
      });
      console.log('GTM: News click tracked -', newsIndex + 1, newsTitle);
    }
  },

  // Purchase button click tracking
  purchaseClick: (packageType: '1-bottle' | '3-bottle' | '6-bottle', price: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase_click',
        package_type: packageType,
        package_name: packageType.replace('-', ' ').toUpperCase(),
        price: price,
        currency: 'USD',
        timestamp: new Date().toISOString()
      });
      console.log('GTM: Purchase click tracked -', packageType, price);
    }
  },

  // Custom event for funnel analysis
  funnelStep: (step: string, data?: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'funnel_step',
        funnel_step: step,
        timestamp: new Date().toISOString(),
        ...data
      });
      console.log('GTM: Funnel step tracked -', step);
    }
  },

  // Real-time engagement tracking
  engagement: (action: string, value?: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'engagement',
        engagement_action: action,
        engagement_value: value,
        timestamp: new Date().toISOString()
      });
      console.log('GTM: Engagement tracked -', action, value);
    }
  }
};

// Auto-track page view on load
if (typeof window !== 'undefined') {
  // Track initial page view
  setTimeout(() => {
    gtmTrack.pageView('PEAXION Landing Page');
    gtmTrack.funnelStep('page_load');
  }, 1000);
}
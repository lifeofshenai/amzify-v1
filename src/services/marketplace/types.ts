export interface MarketplaceMetrics {
  sales: {
    daily: number;
    weekly: number;
    monthly: number;
    yearToDate: number;
  };
  performance: {
    conversionRate: number;
    averageOrderValue: number;
    customerSatisfaction: number;
  };
  traffic: {
    visitors: number;
    pageViews: number;
    bounceRate: number;
  };
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    followersGrowth: number;
  };
}

export interface EcommerceMetrics extends MarketplaceMetrics {
  inventory: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
  seo: {
    organicTraffic: number;
    averagePosition: number;
    clickThroughRate: number;
  };
  channels: {
    shopify: {
      orders: number;
      sales: number;
      conversion: number;
    };
    website: {
      orders: number;
      sales: number;
      conversion: number;
    };
  };
}

export interface TikTokMetrics extends MarketplaceMetrics {
  videoPerformance: {
    views: number;
    completionRate: number;
    averageWatchTime: number;
  };
}
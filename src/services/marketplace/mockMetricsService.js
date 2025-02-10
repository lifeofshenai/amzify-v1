export class MockMetricsService {
  async getEcommerceMetrics(brandId){
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      sales: {
        daily: 2800,
        weekly: 18900,
        monthly: 80000,
        yearToDate: 960000
      },
      performance: {
        conversionRate: 3.2,
        averageOrderValue: 85,
        customerSatisfaction: 4.8
      },
      traffic: {
        visitors: 60000,
        pageViews: 195000,
        bounceRate: 30
      },
      engagement: {
        likes: 7300,
        shares: 1300,
        comments: 2180,
        followersGrowth: 23
      },
      inventory: {
        inStock: 2450,
        lowStock: 120,
        outOfStock: 15
      },
      seo: {
        organicTraffic: 18500,
        averagePosition: 3.2,
        clickThroughRate: 4.8
      },
      channels: {
        shopify: {
          orders: 945,
          revenue: 52000,
          conversion: 3.2
        },
        website: {
          orders: 523,
          revenue: 28000,
          conversion: 2.8
        }
      }
    };
  }

  async getTikTokMetrics(brandId) {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return {
      sales: {
        daily: 750,
        weekly: 4800,
        monthly: 21000,
        yearToDate: 252000
      },
      performance: {
        conversionRate: 2.4,
        averageOrderValue: 68,
        customerSatisfaction: 4.5
      },
      traffic: {
        visitors: 85000,
        pageViews: 180000,
        bounceRate: 35
      },
      engagement: {
        likes: 125000,
        shares: 28000,
        comments: 15000,
        followersGrowth: 25
      },
      videoPerformance: {
        views: 450000,
        completionRate: 45,
        averageWatchTime: 15.8
      }
    };
  }
}
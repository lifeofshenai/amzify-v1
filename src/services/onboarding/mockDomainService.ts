export class MockDomainService {
  async checkDomainAvailability(domain: string) {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate domain availability with random results
    const available = Math.random() > 0.3;
    const price = Math.floor(Math.random() * 20) + 10;
    
    return {
      domain,
      available,
      price,
      currency: 'USD'
    };
  }

  async purchaseDomain(domain: string, contactInfo: any) {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      orderId: `order-${Date.now()}`,
      domain,
      createdAt: new Date().toISOString()
    };
  }

  async getDomainDetails(domain: string) {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      domain,
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      locked: true,
      nameServers: ['ns1.example.com', 'ns2.example.com'],
      privacy: true,
      renewAuto: true
    };
  }

  async configureDNS(domain: string, records: Array<{
    type: string;
    name: string;
    data: string;
    priority?: number;
    ttl: number;
  }>) {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  }
}
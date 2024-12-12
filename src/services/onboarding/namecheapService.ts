import axios from 'axios';

export class NamecheapService {
  private baseUrl = 'https://api.namecheap.com/xml.response';
  private apiKey: string;
  private username: string;
  private clientIp: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_NAMECHEAP_API_KEY || '';
    this.username = import.meta.env.VITE_NAMECHEAP_USERNAME || '';
    this.clientIp = '127.0.0.1';
  }

  async checkDomainAvailability(domain: string) {
    try {
      // Mock implementation for browser environment
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Parse domain and TLD
      const [name, ...rest] = domain.toLowerCase().split('.');
      const tld = rest.join('.') || 'com';
      
      // TLD prices and availability rules
      const tldInfo: Record<string, { price: number, popularity: number }> = {
        'com': { price: 12.98, popularity: 0.9 },
        'net': { price: 14.98, popularity: 0.7 },
        'org': { price: 13.98, popularity: 0.6 },
        'io': { price: 39.98, popularity: 0.5 },
        'co': { price: 24.98, popularity: 0.4 },
        'store': { price: 29.98, popularity: 0.3 },
        'shop': { price: 27.98, popularity: 0.3 },
        'online': { price: 19.98, popularity: 0.2 },
        'digital': { price: 22.98, popularity: 0.2 }
      };

      // Domain characteristics
      const characteristics = {
        length: name.length,
        hasNumbers: /\d/.test(name),
        isAllLetters: /^[a-z]+$/.test(name),
        hasHyphens: name.includes('-'),
        isCommonWord: this.isCommonWord(name),
        hasSpecialMeaning: this.hasSpecialMeaning(name),
        tldPopularity: tldInfo[tld]?.popularity || 0.1
      };

      // Availability calculation
      const availabilityScore = this.calculateAvailabilityScore(characteristics);
      const available = availabilityScore > 0.6;

      // Price calculation
      const basePrice = tldInfo[tld]?.price || 12.98;
      const finalPrice = this.calculatePrice(basePrice, characteristics);

      return {
        domain,
        available,
        price: Math.round(finalPrice * 100) / 100,
        currency: 'USD'
      };
    } catch (error) {
      console.error('Failed to check domain availability:', error);
      throw error;
    }
  }

  private calculateAvailabilityScore(chars: {
    length: number;
    hasNumbers: boolean;
    isAllLetters: boolean;
    hasHyphens: boolean;
    isCommonWord: boolean;
    hasSpecialMeaning: boolean;
    tldPopularity: number;
  }): number {
    let score = 1;

    // Length factor
    if (chars.length <= 3) score *= 0.1;
    else if (chars.length <= 4) score *= 0.3;
    else if (chars.length <= 5) score *= 0.5;
    else if (chars.length >= 15) score *= 0.9;

    // Character composition
    if (chars.isAllLetters && chars.length <= 6) score *= 0.4;
    if (chars.hasNumbers) score *= 1.2;
    if (chars.hasHyphens) score *= 1.1;

    // Word meaning
    if (chars.isCommonWord) score *= 0.3;
    if (chars.hasSpecialMeaning) score *= 0.2;

    // TLD popularity
    score *= (1 - chars.tldPopularity * 0.5);

    return Math.min(Math.max(score, 0), 1);
  }

  private calculatePrice(basePrice: number, chars: {
    length: number;
    isAllLetters: boolean;
    hasSpecialMeaning: boolean;
  }): number {
    let price = basePrice;

    // Length premium
    if (chars.length <= 3) price *= 3;
    else if (chars.length <= 4) price *= 2;
    else if (chars.length <= 5) price *= 1.5;

    // Character composition premium
    if (chars.isAllLetters && chars.length <= 6) price *= 1.5;

    // Meaning premium
    if (chars.hasSpecialMeaning) price *= 1.3;

    return price;
  }

  private isCommonWord(domain: string): boolean {
    const commonWords = [
      'shop', 'store', 'buy', 'sell', 'retail', 'market', 'online',
      'web', 'digital', 'tech', 'app', 'mobile', 'cloud', 'data',
      'business', 'company', 'corp', 'inc', 'group', 'global',
      'world', 'net', 'web', 'site', 'host', 'ecommerce', 'commerce',
      'best', 'top', 'my', 'the', 'get', 'pro', 'expert', 'first',
      'smart', 'easy', 'fast', 'new', 'now', 'one', 'all'
    ];
    return commonWords.some(word => domain.includes(word));
  }

  private hasSpecialMeaning(domain: string): boolean {
    const specialWords = [
      'google', 'amazon', 'facebook', 'twitter', 'instagram',
      'microsoft', 'apple', 'netflix', 'uber', 'airbnb',
      'bank', 'insurance', 'crypto', 'bitcoin', 'blockchain',
      'pay', 'cash', 'money', 'loan', 'credit', 'debit',
      'shop', 'mall', 'market', 'store', 'buy', 'sell',
      'health', 'medical', 'doctor', 'legal', 'law', 'gov',
      'edu', 'school', 'university', 'college'
    ];
    return specialWords.some(word => domain.includes(word));
  }

  async purchaseDomain(domain: string, contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }) {
    try {
      // Verify domain is available before purchase
      const { available, price } = await this.checkDomainAvailability(domain);
      
      if (!available) {
        throw new Error('Domain is not available for purchase');
      }

      // Validate contact info
      if (!this.validateContactInfo(contactInfo)) {
        throw new Error('Invalid contact information provided');
      }

      // Mock purchase process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        orderId: `NC-${Date.now()}`,
        domain,
        price,
        createdAt: new Date().toISOString(),
        nameservers: [
          'dns1.namecheaphosting.com',
          'dns2.namecheaphosting.com'
        ],
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      };
    } catch (error) {
      console.error('Failed to purchase domain:', error);
      throw error;
    }
  }

  private validateContactInfo(info: any): boolean {
    return !!(
      info.firstName?.trim() &&
      info.lastName?.trim() &&
      info.email?.includes('@') &&
      info.phone?.trim() &&
      info.organization?.trim() &&
      info.address1?.trim() &&
      info.city?.trim() &&
      info.state?.trim() &&
      info.postalCode?.trim() &&
      info.country?.trim()
    );
  }

  async configureDNS(domain: string, records: Array<{
    type: 'A' | 'CNAME' | 'MX' | 'TXT';
    name: string;
    data: string;
    priority?: number;
    ttl: number;
  }>) {
    try {
      // Validate records
      if (!this.validateDNSRecords(records)) {
        throw new Error('Invalid DNS records provided');
      }

      // Mock DNS configuration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        domain,
        records,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to configure DNS:', error);
      throw error;
    }
  }

  private validateDNSRecords(records: any[]): boolean {
    return records.every(record => 
      record.type &&
      record.name &&
      record.data &&
      record.ttl &&
      ['A', 'CNAME', 'MX', 'TXT'].includes(record.type) &&
      (record.type !== 'MX' || typeof record.priority === 'number')
    );
  }
}
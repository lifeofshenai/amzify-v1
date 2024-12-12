import axios from 'axios';

export class NameGeneratorService {
  async generateNames(description: string, keywords: string[]): Promise<string[]> {
    try {
      // Mock AI name generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate names based on keywords and industry patterns
      const baseWords = [
        'Nova', 'Peak', 'Elite', 'Prime', 'Core', 'Flux', 'Axis', 'Echo',
        'Vital', 'Zen', 'Swift', 'Pure', 'Smart', 'Clear', 'Bold', 'Rise'
      ];
      
      const suffixes = [
        'Co', 'Inc', 'Labs', 'Group', 'Hub', 'Pro', 'Tech', 'Solutions',
        'Brands', 'Global', 'Direct', 'Plus', 'Link', 'Works', 'Mind', 'Box'
      ];

      const industryTerms = keywords.map(k => k.toLowerCase());
      
      const names: string[] = [];
      
      // Generate compound names
      for (let i = 0; i < 3; i++) {
        const base = baseWords[Math.floor(Math.random() * baseWords.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        names.push(`${base}${suffix}`);
      }
      
      // Generate industry-specific names
      for (let i = 0; i < 3; i++) {
        const term = industryTerms[Math.floor(Math.random() * industryTerms.length)];
        const base = baseWords[Math.floor(Math.random() * baseWords.length)];
        names.push(`${base}${term.charAt(0).toUpperCase() + term.slice(1)}`);
      }
      
      // Generate combined names
      for (let i = 0; i < 3; i++) {
        const term = industryTerms[Math.floor(Math.random() * industryTerms.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        names.push(`${term.charAt(0).toUpperCase() + term.slice(1)}${suffix}`);
      }

      return [...new Set(names)].slice(0, 6);
    } catch (error) {
      console.error('Failed to generate names:', error);
      throw error;
    }
  }

  async checkAvailability(name: string): Promise<{
    available: boolean;
    similar: string[];
  }> {
    try {
      // Mock availability check
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate availability based on name characteristics
      const isCommonWord = /^(the|my|our|your|we|they|it|this|that|these|those)$/i.test(name);
      const isTooShort = name.length < 4;
      const hasSpecialChars = /[^a-zA-Z0-9]/.test(name);
      
      const available = !isCommonWord && !isTooShort && !hasSpecialChars;
      
      // Generate similar names if not available
      const similar = !available ? [
        `${name}Co`,
        `${name}Group`,
        `${name}Global`,
        `My${name}`,
        `The${name}`
      ] : [];
      
      return {
        available,
        similar: similar.slice(0, 3)
      };
    } catch (error) {
      console.error('Failed to check name availability:', error);
      throw error;
    }
  }
}
export interface VendorDetails {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  countryOfIncorporation?: 'US' | 'ZA';
  ein?: string; // For US
  companyNumber?: string; // For South Africa
  taxNumber?: string; // Optional for South Africa
  vatNumber?: string; // Optional for South Africa
  currency: string;
  logo?: {
    url: string;
    colors: {
      primary: string;
      secondary: string;
    };
  };
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

export interface DomainStatus {
  domain: string;
  available: boolean;
  price?: number;
}

export interface EmailSetupStatus {
  provider: 'google' | 'custom';
  email?: string;
  configured: boolean;
}
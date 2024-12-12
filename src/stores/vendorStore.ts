import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VendorIntegrations {
  amazon?: {
    connected: boolean;
    sellerId: string;
    marketplaceId: string;
    lastSync: Date | null;
  };
  shopify?: {
    connected: boolean;
    shopUrl: string;
    lastSync: Date | null;
  };
  tiktok?: {
    connected: boolean;
    shopId: string;
    lastSync: Date | null;
  };
}

interface VendorState {
  isOnboarded: boolean;
  integrations: VendorIntegrations;
  domainStatus: {
    domain: string;
    available: boolean;
    price?: number;
  } | null;
  shopifySetupStatus: {
    step: 'domain' | 'theme' | 'products' | 'payment' | 'complete';
    progress: number;
  } | null;
  setIntegration: (platform: keyof VendorIntegrations, data: any) => void;
  setOnboarded: (status: boolean) => void;
  setDomainStatus: (status: VendorState['domainStatus']) => void;
  setShopifySetupStatus: (status: VendorState['shopifySetupStatus']) => void;
}

export const useVendorStore = create<VendorState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      integrations: {},
      domainStatus: null,
      shopifySetupStatus: null,
      setIntegration: (platform, data) => set((state) => ({
        integrations: {
          ...state.integrations,
          [platform]: { ...data, lastSync: new Date() }
        }
      })),
      setOnboarded: (status) => set({ isOnboarded: status }),
      setDomainStatus: (status) => set({ domainStatus: status }),
      setShopifySetupStatus: (status) => set({ shopifySetupStatus: status })
    }),
    {
      name: 'vendor-store'
    }
  )
);
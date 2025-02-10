import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useVendorStore = create(
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
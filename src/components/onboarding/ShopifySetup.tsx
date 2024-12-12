```typescript
import React, { useState } from 'react';
import { ShopifyService } from '../../services/onboarding/shopifyService';
import { useVendorStore } from '../../stores/vendorStore';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const shopifyService = new ShopifyService();

export default function ShopifySetup() {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const { domainStatus, shopifySetupStatus, setShopifySetupStatus } = useVendorStore();

  const setupShopify = async () => {
    if (!domainStatus?.domain) return;
    
    setIsSettingUp(true);
    try {
      // Step 1: Create Store
      setShopifySetupStatus({ step: 'domain', progress: 25 });
      const store = await shopifyService.createStore('Your Store', domainStatus.domain);
      
      // Step 2: Setup Theme
      setShopifySetupStatus({ step: 'theme', progress: 50 });
      await shopifyService.setupTheme(store.shopUrl, 'dawn');
      
      // Step 3: Setup Payments
      setShopifySetupStatus({ step: 'payment', progress: 75 });
      await shopifyService.setupPayments(store.shopUrl);
      
      // Complete
      setShopifySetupStatus({ step: 'complete', progress: 100 });
      toast.success('Shopify store setup completed!');
    } catch (error) {
      toast.error('Failed to setup Shopify store');
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Setup Your Shopify Store</h2>
        <p className="mt-1 text-sm text-gray-500">
          We'll help you set up your professional e-commerce store with Shopify.
        </p>
      </div>

      {shopifySetupStatus && (
        <div className="space-y-4">
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${shopifySetupStatus.progress}%` }}
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {['Domain Setup', 'Theme Selection', 'Product Import', 'Payment Setup'].map((step, index) => (
              <div
                key={step}
                className={`p-4 rounded-lg border ${
                  shopifySetupStatus.progress >= (index + 1) * 25
                    ? 'border-primary-200 bg-primary-50'
                    : 'border-gray-200'
                }`}
              >
                <p className={`text-sm font-medium ${
                  shopifySetupStatus.progress >= (index + 1) * 25
                    ? 'text-primary-700'
                    : 'text-gray-500'
                }`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={setupShopify}
        disabled={isSettingUp || !domainStatus?.domain}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSettingUp ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Setting up your store...
          </>
        ) : (
          'Start Shopify Setup'
        )}
      </button>
    </div>
  );
}
```
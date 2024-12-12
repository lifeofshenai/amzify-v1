import React, { useState } from 'react';
import { ShopifyService } from '../../services/onboarding/shopifyService';
import { useVendorStore } from '../../stores/vendorStore';
import { Loader2, Store, Palette, Box } from 'lucide-react';
import toast from 'react-hot-toast';

const shopifyService = new ShopifyService();

export default function WebsiteSetup({ onComplete }: { onComplete: () => void }) {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const { domainStatus, shopifySetupStatus, setShopifySetupStatus } = useVendorStore();

  const setupWebsite = async () => {
    setIsSettingUp(true);
    try {
      // Step 1: Create Store
      setShopifySetupStatus({ step: 'domain', progress: 25 });
      const store = await shopifyService.setupNewStore('Your Store', domainStatus?.domain || '');
      
      // Step 2: Setup Theme
      setShopifySetupStatus({ step: 'theme', progress: 50 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Setup Products
      setShopifySetupStatus({ step: 'products', progress: 75 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 4: Setup Payments
      setShopifySetupStatus({ step: 'payment', progress: 100 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShopifySetupStatus({ step: 'complete', progress: 100 });
      toast.success('Website setup completed!');
      onComplete();
    } catch (error) {
      toast.error('Failed to setup website');
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Setup Your Website</h2>
        <p className="mt-1 text-sm text-gray-500">
          We'll help you set up your professional e-commerce website.
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
            {[
              { icon: Store, label: 'Store Setup' },
              { icon: Palette, label: 'Theme Setup' },
              { icon: Box, label: 'Product Setup' },
              { icon: Store, label: 'Payment Setup' }
            ].map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className={`p-4 rounded-lg border ${
                  shopifySetupStatus.progress >= (index + 1) * 25
                    ? 'border-primary-200 bg-primary-50'
                    : 'border-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${
                  shopifySetupStatus.progress >= (index + 1) * 25
                    ? 'text-primary-600'
                    : 'text-gray-400'
                }`} />
                <p className={`text-sm font-medium ${
                  shopifySetupStatus.progress >= (index + 1) * 25
                    ? 'text-primary-700'
                    : 'text-gray-500'
                }`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-6 flex space-x-4">
        <button
          onClick={onComplete}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Skip for now
        </button>
        <button
          onClick={setupWebsite}
          disabled={isSettingUp}
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSettingUp ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Setting up...
            </>
          ) : (
            'Setup Website'
          )}
        </button>
      </div>
    </div>
  );
}
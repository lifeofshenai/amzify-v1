import React, { useState } from 'react';
import { Globe, Check, X, Loader2 } from 'lucide-react';
import { NamecheapService } from '../../services/onboarding/namecheapService';
import { useVendorStore } from '../../stores/vendorStore';
// import { useOnboardingStore } from '../../stores/onboardingStore';
import DomainSearch from './DomainSearch';
import toast from 'react-hot-toast';

export default function DomainSetup({ onComplete }) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [domainOption, setDomainOption] = useState(null);
  const [existingDomain, setExistingDomain] = useState('');
  // const { vendorDetails } = useOnboardingStore();
  const { setDomainStatus } = useVendorStore();
  const domainService = new NamecheapService();

  const handleDomainSelect = async (domain, price) => {
    setIsPurchasing(true);
    try {
      const result = await domainService.purchaseDomain(domain, {
        firstName: vendorDetails?.firstName || '',
        lastName: vendorDetails?.lastName || '',
        email: vendorDetails?.email || '',
        phone: '',
        organization: vendorDetails?.companyName || '',
        address1: vendorDetails?.address?.street || '',
        city: vendorDetails?.address?.city || '',
        state: vendorDetails?.address?.state || '',
        postalCode: vendorDetails?.address?.postalCode || '',
        country: vendorDetails?.countryOfIncorporation || 'US'
      });

      if (result.success) {
        setDomainStatus({
          domain,
          available: false,
          price,
          isNewPurchase: true
        });
        
        toast.success('Domain purchased successfully!');
        onComplete();
      }
    } catch (error) {
      toast.error('Failed to purchase domain');
      console.error('Failed to purchase domain:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleExistingDomain = () => {
    if (!existingDomain) {
      toast.error('Please enter your domain');
      return;
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(existingDomain)) {
      toast.error('Please enter a valid domain');
      return;
    }

    setDomainStatus({
      domain: existingDomain,
      available: false,
      isNewPurchase: false
    });
    
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Set Up Your Domain</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose a domain name for your business or connect an existing one.
        </p>
      </div>

      {!domainOption && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setDomainOption('search')}
            className="p-6 text-left border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
          >
            <h3 className="text-lg font-medium text-gray-900">Purchase New Domain</h3>
            <p className="mt-1 text-sm text-gray-500">
              Search and register a new domain name for your business
            </p>
          </button>

          <button
            onClick={() => setDomainOption('existing')}
            className="p-6 text-left border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
          >
            <h3 className="text-lg font-medium text-gray-900">Use Existing Domain</h3>
            <p className="mt-1 text-sm text-gray-500">
              Connect a domain you already own
            </p>
          </button>
        </div>
      )}

      {domainOption === 'search' && (
        <div className="space-y-6">
          <button
            onClick={() => setDomainOption(null)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            ← Back to options
          </button>
          
          <DomainSearch onDomainSelect={handleDomainSelect} />
        </div>
      )}

      {domainOption === 'existing' && (
        <div className="space-y-6">
          <button
            onClick={() => setDomainOption(null)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            ← Back to options
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Domain Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={existingDomain}
                onChange={(e) => setExistingDomain(e.target.value.toLowerCase())}
                placeholder="e.g., yourdomain.com"
                className="block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent px-4 py-2"
              />
            </div>
          </div>

          <button
            onClick={handleExistingDomain}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Continue with Existing Domain
          </button>
        </div>
      )}

      <div className="pt-6 flex space-x-4">
        <button
          onClick={onComplete}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
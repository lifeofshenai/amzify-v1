import React, { useState, useCallback } from 'react';
import { Search, Globe, Loader2, AlertCircle } from 'lucide-react';
// import { GoDaddyService } from '../../services/onboarding/godaddyService';
import toast from 'react-hot-toast';

export default function DomainSearch({ onDomainSelect, onExistingDomain }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [domainOption, setDomainOption] = useState<'search' | 'existing' | null>(null);
  const [existingDomain, setExistingDomain] = useState('');

  // const domainService = new GoDaddyService();

  const searchDomains = useCallback(async () => {
    // if (!searchTerm || searchTerm.length < 3) {
    //   setResults([]);
    //   return;
    // }

    // setIsSearching(true);
    // try {
    //   const domainBase = searchTerm.toLowerCase().replace(/[^a-z0-9-]/g, '');
    //   const searchDomain = `${domainBase}.com`;
      
    //   // Check exact domain
    //   const exactResult = await domainService.checkDomainAvailability(searchDomain);
    //   const initialResults = [{
    //     domain: searchDomain,
    //     available: exactResult.available,
    //     price: exactResult.price,
    //     type: 'exact' as const
    //   }];

    //   // Generate and check alternative TLDs
    //   const tlds = ['.net', '.org', '.io', '.co', '.store', '.shop'];
    //   const alternativeResults = await Promise.all(
    //     tlds.map(async (tld) => {
    //       try {
    //         const result = await domainService.checkDomainAvailability(`${domainBase}${tld}`);
    //         return {
    //           domain: `${domainBase}${tld}`,
    //           available: result.available,
    //           price: result.price,
    //           type: 'suggestion' as const
    //         };
    //       } catch {
    //         return null;
    //       }
    //     })
    //   );

    //   setResults([
    //     ...initialResults,
    //     ...alternativeResults.filter((r): r is NonNullable<typeof r> => 
    //       r !== null && r.available
    //     )
    //   ]);
    // } catch (error) {
    //   toast.error('Failed to search domains');
    // } finally {
    //   setIsSearching(false);
    // }
  }, [searchTerm]);

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

    onExistingDomain(existingDomain);
  };

  if (!domainOption) {
    return (
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
    );
  }

  if (domainOption === 'existing') {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setDomainOption(null)}
        className="text-sm text-primary-600 hover:text-primary-700"
      >
        ← Back to options
      </button>

      <div className="space-y-4">
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSearchTerm(value);
              if (value.length >= 3) {
                searchDomains();
              }
            }}
            className="w-full pl-10 pr-20 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter domain name (e.g., mystore)"
          />
          <button
            onClick={() => searchTerm.length >= 3 && searchDomains()}
            disabled={searchTerm.length < 3 || isSearching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="text-sm text-gray-500">
          {searchTerm.length > 0 && searchTerm.length < 3 ? (
            <p>Please enter at least 3 characters</p>
          ) : (
            <p>Enter your desired domain name to check availability</p>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.domain}
              className={`p-4 border rounded-lg ${
                result.available
                  ? 'border-green-200 bg-green-50'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className={`w-5 h-5 ${
                    result.available ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <span className="font-medium">{result.domain}</span>
                </div>
                {result.available ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      ${result.price.toFixed(2)}/year
                    </span>
                    <button
                      onClick={() => onDomainSelect(result.domain, result.price)}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                      Select
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-red-600 font-medium">
                    Not Available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTerm.length >= 3 && !isSearching && results.length === 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-700">
              No domains found for "{searchTerm}"
            </p>
            <p className="text-sm text-yellow-600 mt-1">
              Try a different name or check out our suggestions above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
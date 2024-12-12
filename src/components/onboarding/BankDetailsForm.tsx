import React from 'react';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { CreditCard, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BankDetailsForm() {
  const { completeStep, setCurrentStep } = useOnboardingStore();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnectStripe = async () => {
    setIsConnecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      completeStep('bank-details');
      setCurrentStep(2); // Move to domain setup
      toast.success('Bank account connected successfully');
    } catch (error) {
      toast.error('Failed to connect bank account');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Connect Payment Method</h2>
        <p className="mt-1 text-sm text-gray-500">
          Set up your payment method for receiving payouts and processing payments.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary-50 rounded-lg">
            <CreditCard className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Connect with Stripe</h3>
            <p className="text-sm text-gray-500">
              Securely process payments and receive payouts
            </p>
          </div>
        </div>

        <button
          onClick={handleConnectStripe}
          disabled={isConnecting}
          className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Connecting...
            </>
          ) : (
            'Connect Stripe Account'
          )}
        </button>
      </div>

      <div className="pt-6 flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentStep(0)}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}
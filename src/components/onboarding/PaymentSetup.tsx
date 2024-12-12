import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { CreditCard, Loader2, Lock } from 'lucide-react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalButtons } from "@paypal/paypal-js";
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentMethodProps {
  onComplete: () => void;
}

function StripeForm({ onComplete }: PaymentMethodProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Payment provider not initialized');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error('Card element not found');
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      // In a real app, send paymentMethod.id to your server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Payment method connected successfully');
      onComplete();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to connect payment method');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Card Details
          </label>
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
        <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Secure Payment Processing</p>
          <p className="mt-1">
            Your card information is securely encrypted and stored by Stripe.
            We never store your full card details on our servers.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          'Connect Card'
        )}
      </button>
    </form>
  );
}

function PayPalForm({ onComplete }: PaymentMethodProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPalApprove = async () => {
    setIsProcessing(true);
    try {
      // Mock PayPal connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('PayPal account connected successfully');
      onComplete();
    } catch (error) {
      toast.error('Failed to connect PayPal account');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
        <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Connect with PayPal</p>
          <p className="mt-1">
            Link your PayPal account to process payments and receive payouts securely.
          </p>
        </div>
      </div>

      <button
        onClick={handlePayPalApprove}
        disabled={isProcessing}
        className="w-full px-4 py-2 bg-[#0070BA] text-white rounded-lg hover:bg-[#003087] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Connecting...
          </>
        ) : (
          'Connect with PayPal'
        )}
      </button>
    </div>
  );
}

export default function PaymentSetup() {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
  const { completeStep, setCurrentStep } = useOnboardingStore();

  const handleComplete = () => {
    completeStep('payment-setup');
    setCurrentStep(2); // Move to domain setup
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Connect Payment Method</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to process payments and receive payouts.
        </p>
      </div>

      {!paymentMethod && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setPaymentMethod('stripe')}
            className="p-6 text-left border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Credit Card</h3>
                <p className="text-sm text-gray-500">
                  Connect your credit or debit card via Stripe
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('paypal')}
            className="p-6 text-left border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="w-8" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
                <p className="text-sm text-gray-500">
                  Connect your PayPal account
                </p>
              </div>
            </div>
          </button>
        </div>
      )}

      {paymentMethod && (
        <div className="space-y-6">
          <button
            onClick={() => setPaymentMethod(null)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            ← Back to payment options
          </button>

          {paymentMethod === 'stripe' ? (
            <Elements stripe={stripePromise}>
              <StripeForm onComplete={handleComplete} />
            </Elements>
          ) : (
            <PayPalForm onComplete={handleComplete} />
          )}
        </div>
      )}

      <div className="pt-6 flex space-x-4">
        <button
          onClick={() => setCurrentStep(0)}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}
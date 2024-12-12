import React, { useState } from 'react';
import { DollarSign, CreditCard, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface PayoutFormProps {
  balance: number;
  onClose: () => void;
  onSubmit: (amount: number) => Promise<void>;
}

export default function PayoutForm({ balance, onClose, onSubmit }: PayoutFormProps) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payoutAmount = parseFloat(amount);

    if (isNaN(payoutAmount) || payoutAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (payoutAmount > balance) {
      toast.error('Amount exceeds available balance');
      return;
    }

    setIsProcessing(true);
    try {
      await onSubmit(payoutAmount);
      toast.success('Payout initiated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to process payout');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Request Payout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Balance
            </label>
            <div className="text-2xl font-semibold text-gray-900">
              ${balance.toLocaleString()}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter amount"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div className="text-sm text-gray-600">
              Funds will be sent to your connected bank account
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Request Payout'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
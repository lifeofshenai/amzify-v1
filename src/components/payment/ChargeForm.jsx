import React, { useState } from 'react';
import { DollarSign, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ChargeForm({ balance, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chargeAmount = parseFloat(amount);

    if (isNaN(chargeAmount) || chargeAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    try {
      await onSubmit(chargeAmount);
      toast.success('Payment processed successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Pay Outstanding Balance</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outstanding Balance
            </label>
            <div className="text-2xl font-semibold text-red-600">
              -${Math.abs(balance).toLocaleString()}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount
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

          <div className="bg-red-50 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-700">
              <p className="font-medium">Payment Required</p>
              <p className="mt-1">
                Your account has an outstanding balance that needs to be paid to continue using our services.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div className="text-sm text-gray-600">
              Payment will be processed using your connected payment method
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
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Make Payment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
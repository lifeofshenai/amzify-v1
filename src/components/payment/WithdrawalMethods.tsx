import React, { useState } from 'react';
import { WithdrawalMethod } from '../../types/payment';
import { Plus, CreditCard } from 'lucide-react';
import CardLinkForm from './CardLinkForm';

interface WithdrawalMethodsProps {
  methods: WithdrawalMethod[];
  onAddMethod: () => void;
  onRequestPayment: (methodId: string) => void;
}

export default function WithdrawalMethods({ 
  methods, 
  onAddMethod, 
  onRequestPayment 
}: WithdrawalMethodsProps) {
  const [showCardForm, setShowCardForm] = useState(false);

  const handleCardSuccess = () => {
    setShowCardForm(false);
    onAddMethod();
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
          <button
            onClick={() => setShowCardForm(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4 inline-block mr-2" />
            Add Card
          </button>
        </div>
        
        <div className="space-y-4">
          {methods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {method.type === 'card' ? (
                  <CreditCard className="w-8 h-8 text-primary-600" />
                ) : (
                  <img src={method.icon} alt={method.name} className="w-8 h-8" />
                )}
                <div>
                  <span className="font-medium text-gray-900">{method.name}</span>
                  {method.type === 'card' && (
                    <p className="text-sm text-gray-500">
                      {method.last4 && `•••• ${method.last4}`}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRequestPayment(method.id)}
                className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
              >
                Use for Payment
              </button>
            </div>
          ))}

          {methods.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No payment methods added yet
            </div>
          )}
        </div>
      </div>

      {showCardForm && (
        <CardLinkForm
          onClose={() => setShowCardForm(false)}
          onSuccess={handleCardSuccess}
        />
      )}
    </>
  );
}
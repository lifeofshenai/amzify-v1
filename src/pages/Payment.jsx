import React, { useState } from 'react';
import PaymentStats from '../components/payment/PaymentStats';
import WithdrawalMethods from '../components/payment/WithdrawalMethods';

const mockStats = {
  balance: 40689,
  lastWithdrawal: 31040,
  pending: 10293,
  allTimeEarnings: 189000,
  lastWithdrawalDate: '19/06/2024',
  pendingDate: '19/06/2024',
  percentageChange: -4.3
};

const mockMethods = [
  {
    id: '1',
    type: 'paypal',
    name: 'PayPal',
    icon: 'https://www.paypalobjects.com/webstatic/icon/pp258.png'
  },
  {
    id: '2',
    type: 'bank',
    name: 'Local Bank',
    icon: 'https://cdn-icons-png.flaticon.com/512/2830/2830289.png'
  }
];

export default function Payment() {
  const [methods] = useState(mockMethods);

  const handleAddMethod = () => {
    // Implementation for adding new payment method
    console.log('Add new payment method');
  };

  const handleRequestPayment = (methodId) => {
    // Implementation for payment request
    console.log('Request payment for method:', methodId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
      </div>

      <PaymentStats stats={mockStats} />
      
      <WithdrawalMethods
        methods={methods}
        onAddMethod={handleAddMethod}
        onRequestPayment={handleRequestPayment}
      />
    </div>
  );
}
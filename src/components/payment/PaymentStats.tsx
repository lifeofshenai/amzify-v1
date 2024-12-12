import React, { useState } from 'react';
import { PaymentStats as PaymentStatsType } from '../../types/payment';
import { DollarSign, Calendar, Clock } from 'lucide-react';
import PayoutForm from './PayoutForm';
import ChargeForm from './ChargeForm';

interface PaymentStatsProps {
  stats: PaymentStatsType;
}

export default function PaymentStats({ stats }: PaymentStatsProps) {
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [showChargeForm, setShowChargeForm] = useState(false);

  const handlePayout = async (amount: number) => {
    // Implement payout logic
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleCharge = async (amount: number) => {
    // Implement charge logic
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Balance"
          value={stats.balance}
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
          action={stats.balance >= 0 ? {
            label: 'Request Payout',
            onClick: () => setShowPayoutForm(true)
          } : {
            label: 'Pay Balance',
            onClick: () => setShowChargeForm(true),
            variant: 'danger'
          }}
        />
        <StatCard
          title="Last Withdrawal"
          value={stats.lastWithdrawal}
          date={stats.lastWithdrawalDate}
          icon={<Calendar className="w-6 h-6 text-primary-600" />}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          date={stats.pendingDate}
          icon={<Clock className="w-6 h-6 text-primary-600" />}
        />
        <StatCard
          title="All time Earnings"
          value={stats.allTimeEarnings}
          change={stats.percentageChange}
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
      </div>

      {showPayoutForm && (
        <PayoutForm
          balance={stats.balance}
          onClose={() => setShowPayoutForm(false)}
          onSubmit={handlePayout}
        />
      )}

      {showChargeForm && (
        <ChargeForm
          balance={stats.balance}
          onClose={() => setShowChargeForm(false)}
          onSubmit={handleCharge}
        />
      )}
    </>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  date?: string;
  change?: number;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'danger';
  };
}

function StatCard({ title, value, icon, date, change, action }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <div className="p-3 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className={`text-2xl font-semibold ${value < 0 ? 'text-red-600' : ''}`}>
          {value < 0 ? '-' : ''}${Math.abs(value).toLocaleString()}
        </p>
        {date && <p className="text-sm text-gray-500">Date: {date}</p>}
        {change && (
          <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change}% vs last month
          </p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className={`mt-4 w-full px-4 py-2 text-sm font-medium rounded-lg ${
              action.variant === 'danger'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
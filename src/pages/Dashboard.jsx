import React from 'react';
import { TrendingUp, ArrowDown, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown';
import RevenueBreakdown from '../components/dashboard/RevenueBreakdown';
import SalesGraph from '../components/dashboard/SalesGraph';
import { useMetricsStore } from '../stores/metricsStore';

export default function Dashboard() {
  const { revenue, expenses, totalCogs, getTotal } = useMetricsStore();
  const { totalRevenue, totalExpenses, totalCost } = getTotal();

  const stats = [
    {
      label: 'Total Income',
      // value: `$${totalRevenue.toLocaleString()}`,
      value: `$0`,
      icon: TrendingUp,
      trend: '0',
      link: '/accounting'
    },
    {
      label: 'Total Expenses',
      // value: `$${(totalExpenses + totalCost).toLocaleString()}`,
      value: `$0`,
      icon: DollarSign,
      trend: '0',
      link: '/accounting'
    },
    {
      label: 'Total Payout',
      // value: `$${(totalRevenue - totalExpenses - totalCost).toLocaleString()}`,
      value: `$0`,
      icon: ArrowDown,
      trend: '0',
      link: '/payout'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.label} 
            to={stat.link || '#'}
            className={stat.link ? 'block' : 'pointer-events-none'}
          >
            <StatCard {...stat} />
          </Link>
        ))}
      </div>

      <SalesGraph />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link to="/accounting" className="block">
          <RevenueBreakdown revenue={revenue} />
        </Link>
        <Link to="/accounting" className="block">
          <ExpenseBreakdown totalCogs={totalCogs} />
        </Link>
      </div>
    </div>
  );
}
import React from 'react';
import { DollarSign, TrendingUp, FileText, PieChart } from 'lucide-react';
import { useMetricsStore } from '../stores/metricsStore';
import RevenueBreakdown from '../components/dashboard/RevenueBreakdown';
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown';

export default function Accounting() {
  const { revenue, expenses, totalCogs, getTotal } = useMetricsStore();
  const { totalRevenue, totalExpenses, totalCost, grossProfit, netProfit } = getTotal();

  const financialMetrics = {
    revenue: {
      total: 0,
      growth: 0,
      breakdown: 0
    },
    expenses: {
      total: 0,
      breakdown: 0
    },
    profit: {
      gross: 0,
      net: 0,
      margin: ((0 / 0) * 100).toFixed(1)
    },
    taxes: {
      estimated: 0,
      paid: 0
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
            Download Reports
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
            Export to QuickBooks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Income"
          value={0}
          trend={15.3}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Expenses"
          value={0}
          trend={0}
          icon={<FileText className="w-6 h-6" />}
        />
        <MetricCard
          title="Net Profit"
          value={0}
          subtitle={`${0}% margin`}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Estimated Tax"
          value={0}
          subtitle={`$0 paid`}
          icon={<PieChart className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueBreakdown revenue={revenue} />
        <ExpenseBreakdown totalCogs={totalCogs} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, subtitle, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm">{title}</span>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold">${value.toLocaleString()}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        {trend !== undefined && (
          <p className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </p>
        )}
      </div>
    </div>
  );
}
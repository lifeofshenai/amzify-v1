import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  link?: string;
}

export default function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
  const isTrendPositive = trend.startsWith('+');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <h3 className="text-2xl font-semibold mt-1 text-gray-900">{value}</h3>
        </div>
        <div className="p-3 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium ${isTrendPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-gray-600 ml-2">vs last month</span>
      </div>
    </div>
  );
}
import React from 'react';
import { Users, DollarSign, Clock, Calendar } from 'lucide-react';

const payrollData = {
  totalEmployees: 25,
  totalPayroll: 85000,
  averageSalary: 3400,
  nextPayroll: '2024-03-15',
  departments: [
    { name: 'Sales', employees: 8, totalSalary: 32000 },
    { name: 'Marketing', employees: 6, totalSalary: 24000 },
    { name: 'Support', employees: 7, totalSalary: 21000 },
    { name: 'Operations', employees: 4, totalSalary: 8000 }
  ],
  recentPayments: [
    { id: 1, employee: 'John Doe', amount: 3500, date: '2024-02-28', department: 'Sales' },
    { id: 2, employee: 'Jane Smith', amount: 4200, date: '2024-02-28', department: 'Marketing' },
    { id: 3, employee: 'Mike Johnson', amount: 3800, date: '2024-02-28', department: 'Support' }
  ]
};

export default function Payroll() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
            Download Reports
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
            Run Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Employees"
          value={payrollData.totalEmployees}
          icon={<Users className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Payroll"
          value={payrollData.totalPayroll}
          prefix="$"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Average Salary"
          value={payrollData.averageSalary}
          prefix="$"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Next Payroll"
          value={new Date(payrollData.nextPayroll).toLocaleDateString()}
          icon={<Calendar className="w-6 h-6" />}
          isDate
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Department Breakdown</h3>
          <div className="space-y-4">
            {payrollData.departments.map((dept) => (
              <DepartmentRow
                key={dept.name}
                department={dept.name}
                employees={dept.employees}
                totalSalary={dept.totalSalary}
                totalPayroll={payrollData.totalPayroll}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
          <div className="space-y-4">
            {payrollData.recentPayments.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, prefix = '', isDate = false }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm">{title}</span>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold">
          {isDate ? value : `${prefix}${typeof value === 'number' ? value.toLocaleString() : value}`}
        </p>
      </div>
    </div>
  );
}

function DepartmentRow({ department, employees, totalSalary, totalPayroll }) {
  const percentage = (totalSalary / totalPayroll) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium text-gray-900">{department}</span>
          <span className="text-sm text-gray-500 ml-2">({employees} employees)</span>
        </div>
        <span className="text-sm font-medium">${totalSalary.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PaymentRow({ payment }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-gray-900">{payment.employee}</p>
        <p className="text-xs text-gray-500">{payment.department}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">${payment.amount.toLocaleString()}</p>
        <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package2, 
  Store, 
  Megaphone, 
  HeadphonesIcon, 
  Wallet,
  Calculator,
  Video,
  Users,
  LogOut
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { label: 'Products', icon: 'Package2', path: '/products' },
  { label: 'Sales Channels', icon: 'Store', path: '/sales-channels' },
  { label: 'Advertising', icon: 'Megaphone', path: '/advertising' },
  { label: 'Content', icon: 'Video', path: '/content' },
  { label: 'Support', icon: 'HeadphonesIcon', path: '/support' },
  { label: 'Accounting', icon: 'Calculator', path: '/accounting' },
  { label: 'Payroll', icon: 'Users', path: '/payroll' },
  { label: 'Payout', icon: 'Wallet', path: '/payout' },
];

const iconComponents = {
  LayoutDashboard,
  Package2,
  Store,
  Megaphone,
  HeadphonesIcon,
  Wallet,
  Calculator,
  Video,
  Users,
};

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-2xl font-bold font-logo text-primary-500">AMZIFY</h1>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = iconComponents[item.icon];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg w-full">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
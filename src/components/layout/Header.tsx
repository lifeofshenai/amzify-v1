import React from 'react';
import { Bell, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 fixed right-0 top-0 left-64 bg-white border-b border-gray-200 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Welcome back, Vendor</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-primary-50 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-primary-50 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-medium">
              V
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
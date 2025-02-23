import React from 'react';
import { Bell, Moon, Search, Clock } from 'lucide-react';

function TopBar() {
  return (
    <div className="bg-white h-16 px-6 flex items-center justify-between border-b">
      <div className="flex-1 flex items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Moon className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Clock className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
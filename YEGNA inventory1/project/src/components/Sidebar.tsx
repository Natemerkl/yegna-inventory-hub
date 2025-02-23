import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Settings, 
  Users, 
  UserCircle,
  FileText,
  Tags,
  Store
} from 'lucide-react';

function Sidebar() {
  return (
    <div className="bg-[#1a1c23] text-white w-64 flex flex-col">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Store className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold">YEGNA-INVENTORY</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">GENERAL</p>
          <NavLink to="/" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="space-y-1">
          <NavLink to="/products" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <Package className="h-5 w-5" />
            <span>Products</span>
          </NavLink>

          <NavLink to="/warehouse" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <Warehouse className="h-5 w-5" />
            <span>Warehouse</span>
          </NavLink>

          <NavLink to="/orders" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <ShoppingCart className="h-5 w-5" />
            <span>Orders</span>
          </NavLink>
        </div>

        <div className="mt-8">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">USERS</p>
          <div className="space-y-1">
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <UserCircle className="h-5 w-5" />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">OTHER</p>
          <div className="space-y-1">
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <FileText className="h-5 w-5" />
              <span>Invoices</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <Tags className="h-5 w-5" />
              <span>Categories</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
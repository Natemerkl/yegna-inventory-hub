
import React, { useState } from 'react';
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
  Store,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { profile } = useAuth();

  return (
    <div className={`bg-[#1a1c23] text-white ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between">
        <div className={`flex items-center space-x-2 ${isCollapsed ? 'hidden' : ''}`}>
          <Store className="h-8 w-8 text-orange-500 flex-shrink-0" />
          <span className="text-xl font-bold truncate">{profile?.company_name || 'Loading...'}</span>
        </div>
        <Store className={`h-8 w-8 text-orange-500 flex-shrink-0 ${isCollapsed ? 'block' : 'hidden'}`} />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-700 rounded-lg"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-4">
          <p className={`text-gray-400 text-xs uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>GENERAL</p>
          <NavLink to="/" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <LayoutDashboard className="h-5 w-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>
        </div>

        <div className="space-y-1">
          <NavLink to="/products" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <Package className="h-5 w-5" />
            {!isCollapsed && <span>Products</span>}
          </NavLink>

          <NavLink to="/warehouse" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <Warehouse className="h-5 w-5" />
            {!isCollapsed && <span>Warehouse</span>}
          </NavLink>

          <NavLink to="/orders" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
          }>
            <ShoppingCart className="h-5 w-5" />
            {!isCollapsed && <span>Orders</span>}
          </NavLink>
        </div>

        <div className="mt-8">
          <p className={`text-gray-400 text-xs uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>USERS</p>
          <div className="space-y-1">
            <NavLink to="/profile" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
            }>
              <UserCircle className="h-5 w-5" />
              {!isCollapsed && <span>Profile</span>}
            </NavLink>
            <NavLink to="/customers" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
            }>
              <Users className="h-5 w-5" />
              {!isCollapsed && <span>Customers</span>}
            </NavLink>
          </div>
        </div>

        <div className="mt-8">
          <p className={`text-gray-400 text-xs uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>OTHER</p>
          <div className="space-y-1">
            <NavLink to="/invoices" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
            }>
              <FileText className="h-5 w-5" />
              {!isCollapsed && <span>Invoices</span>}
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
            }>
              <Tags className="h-5 w-5" />
              {!isCollapsed && <span>Categories</span>}
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500' : 'hover:bg-gray-700'}`
            }>
              <Settings className="h-5 w-5" />
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;

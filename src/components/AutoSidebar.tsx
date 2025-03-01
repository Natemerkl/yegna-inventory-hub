
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  ChevronRight,
  Menu
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function AutoSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isHovered, setIsHovered] = useState(false);
  const { profile } = useAuth();
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  // Auto-collapse when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const handleMouseEnter = () => {
    if (isCollapsed && !isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsHovered(false);
  };

  const expandedWidth = 'w-64';
  const collapsedWidth = 'w-20';
  const sidebarWidth = isCollapsed && !isHovered ? collapsedWidth : expandedWidth;

  return (
    <div 
      className={`${sidebarWidth} bg-gradient-to-b from-[#1a1c23] to-[#232631] text-white flex flex-col transition-all duration-300 h-screen fixed z-20`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700/50">
        <div className={`flex items-center space-x-2 ${(isCollapsed && !isHovered) ? 'opacity-0 w-0' : 'opacity-100'} transition-all duration-300`}>
          <Store className="h-8 w-8 text-orange-500 flex-shrink-0" />
          <span className="text-xl font-bold truncate text-white">{profile?.company_name || 'YEGNA-INVENTORY'}</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-orange-500/20 rounded-lg text-orange-400 hover:text-orange-300 transition-all duration-200"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed && !isHovered ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="mb-4">
          <p className={`text-gray-400 text-xs uppercase tracking-wider mb-2 ${(isCollapsed && !isHovered) ? 'hidden' : ''}`}>GENERAL</p>
          <NavLink to="/" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
          }>
            <LayoutDashboard className="h-5 w-5" />
            <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Dashboard</span>
          </NavLink>
        </div>

        <div className="space-y-1 mb-6">
          <NavLink to="/products" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
          }>
            <Package className="h-5 w-5" />
            <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Products</span>
          </NavLink>

          <NavLink to="/warehouse" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
          }>
            <Warehouse className="h-5 w-5" />
            <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Warehouse</span>
          </NavLink>

          <NavLink to="/orders" className={({ isActive }) => 
            `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
          }>
            <ShoppingCart className="h-5 w-5" />
            <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Orders</span>
          </NavLink>
        </div>

        <div className="mb-6">
          <p className={`text-gray-400 text-xs uppercase tracking-wider mb-2 ${(isCollapsed && !isHovered) ? 'hidden' : ''}`}>USERS</p>
          <div className="space-y-1">
            <NavLink to="/profile" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
            }>
              <UserCircle className="h-5 w-5" />
              <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Profile</span>
            </NavLink>
            <NavLink to="/customers" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
            }>
              <Users className="h-5 w-5" />
              <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Customers</span>
            </NavLink>
          </div>
        </div>

        <div>
          <p className={`text-gray-400 text-xs uppercase tracking-wider mb-2 ${(isCollapsed && !isHovered) ? 'hidden' : ''}`}>OTHER</p>
          <div className="space-y-1">
            <NavLink to="/invoices" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
            }>
              <FileText className="h-5 w-5" />
              <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Invoices</span>
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
            }>
              <Tags className="h-5 w-5" />
              <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Categories</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => 
              `flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700/50 text-gray-300'} transition-all duration-200`
            }>
              <Settings className="h-5 w-5" />
              <span className={`${(isCollapsed && !isHovered) ? 'hidden' : 'block'} transition-all duration-300`}>Settings</span>
            </NavLink>
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-700/50">
        <div className={`flex items-center space-x-2 ${(isCollapsed && !isHovered) ? 'hidden' : 'flex'}`}>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
            {profile?.company_name ? profile.company_name.charAt(0).toUpperCase() : 'Y'}
          </div>
          <div className="text-sm">
            <div className="font-medium text-white">{profile?.company_name || 'Your Company'}</div>
            <div className="text-gray-400 text-xs">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutoSidebar;

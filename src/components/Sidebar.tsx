import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, ShoppingCart, FileText, User, Settings } from 'lucide-react';
import { User as UserType } from '../App';

interface SidebarProps {
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
    { name: 'My Requests', href: '/requests', icon: FileText },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  if (user.organizationType === 'admin') {
    navigation.push({ name: 'Admin Panel', href: '/admin', icon: Settings });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 z-40 w-64 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:block`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
              onClick={() => onClose()}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="text-xs text-gray-500">
            Logged in as {user.organizationType.replace('_', ' ')}
          </div>
          <div className="text-sm font-medium text-gray-900 truncate">
            {user.organizationName}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
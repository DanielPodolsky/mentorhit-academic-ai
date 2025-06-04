import React, { useState } from 'react';
import { MessageCircle, Settings, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: 'chat' | 'preferences' | 'profile') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageCircle,
      badge: null
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: Settings,
      badge: !user?.hasCompletedQuiz ? 'New' : null
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      badge: null
    }
  ];

  const handleMenuItemClick = (page: 'chat' | 'preferences' | 'profile') => {
    setActivePage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when item is selected
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed position */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-hit-primary text-white p-3 rounded-full shadow-lg hover:bg-hit-primary-hover transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        lg:w-64 lg:relative lg:translate-x-0
        fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw]
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-hit-dark border-r border-hit-dark/40 flex flex-col
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white/80 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-hit-dark/40">
          <div className="flex items-center space-x-3">
            <img
              src="/logo-white-bg.png"
              className='h-9 w-9 rounded-lg flex items-center justify-center shadow-lg'
              alt=""
            />
            <div>
              <h2 className="text-xl font-bold text-white">MentorHIT</h2>
              <p className="text-sm text-white/70">AI Academic Advisor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-lg text-left transition-colors touch-manipulation ${activePage === item.id
                    ? 'bg-hit-secondary text-white shadow-md'
                    : 'text-white/80 hover:bg-hit-dark/60 hover:text-white active:bg-hit-secondary/80'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-6 w-6" />
                    <span className="font-medium text-lg lg:text-base">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-hit-primary text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-hit-dark/40">
          <div className="mb-4 p-4 bg-hit-secondary/20 rounded-lg border border-hit-secondary/30">
            <p className="text-sm font-medium text-white/90 text-right">ממוצע</p>
            <p className="text-3xl lg:text-2xl font-bold text-white text-right">88</p>
            <p className="text-xs text-white/60 text-right">!עבודה מצוינת</p>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-4 text-white/80 hover:bg-hit-dark/60 hover:text-white rounded-lg transition-colors touch-manipulation"
          >
            <LogOut className="h-6 w-6" />
            <span className="font-medium text-lg lg:text-base">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
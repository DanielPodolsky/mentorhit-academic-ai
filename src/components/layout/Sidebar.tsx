
import React from 'react';
import { MessageCircle, Settings, User, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: 'chat' | 'preferences' | 'profile') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { logout, user } = useAuth();

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

  return (
    <div className="w-64 bg-hit-dark border-r border-hit-dark/40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-hit-dark/40">
        <div className="flex items-center space-x-3">
          <img src="/logo-white-bg.png" className='h-9 w-9 rounded-lg flex items-center justify-center shadow-lg' alt="" />
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
                onClick={() => setActivePage(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${activePage === item.id
                  ? 'bg-hit-secondary text-white shadow-md'
                  : 'text-white/80 hover:bg-hit-dark/60 hover:text-white'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
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
        <div className="mb-4 p-3 bg-hit-secondary/20 rounded-lg border border-hit-secondary/30">
          <p className="text-sm font-medium text-white/90">Current GPA</p>
          <p className="text-2xl font-bold text-white">{user?.gpa}</p>
          <p className="text-xs text-white/60">Keep up the great work!</p>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-hit-dark/60 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

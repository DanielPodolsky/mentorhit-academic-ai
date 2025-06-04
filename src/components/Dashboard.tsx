import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import ChatInterface from './chat/ChatInterface';
import PreferencesQuiz from './preferences/PreferencesQuiz';
import UserProfile from './profile/UserProfile';
import { useAuth } from '../context/AuthContext';

type ActivePage = 'chat' | 'preferences' | 'profile';

const Dashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>('chat');
  const { user } = useAuth();

  const renderPage = () => {
    switch (activePage) {
      case 'chat':
        return <ChatInterface />;
      case 'preferences':
        return <PreferencesQuiz />;
      case 'profile':
        return <UserProfile />;
      default:
        return <ChatInterface />;
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'chat':
        return 'Academic Advisor Chat';
      case 'preferences':
        return 'Preferences Setup';
      case 'profile':
        return 'Your Profile';
      default:
        return 'Academic Advisor Chat';
    }
  };

  return (
    <div className="h-screen bg-hit-light flex overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header - Mobile optimized */}
        <header className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Title - Responsive text size */}
              <div className="ml-16 lg:ml-0">
                <h1 className="text-xl lg:text-2xl font-bold text-hit-dark truncate">
                  {getPageTitle()}
                </h1>
                <p className="text-sm lg:text-base text-hit-secondary hidden sm:block">
                  Welcome back, {user?.name}
                </p>
              </div>

              {/* User Avatar - Mobile friendly */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-hit-dark truncate max-w-32">
                    {user?.name}
                  </p>
                  <p className="text-xs lg:text-sm text-hit-secondary">
                    ID: {user?.studentId}
                  </p>
                </div>
                <div className="h-10 w-10 lg:h-12 lg:w-12 bg-hit-primary rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                  {user?.name.includes('noy') ? (
                    <img
                      src="noy.png"
                      alt="Noy's picture"
                      className="h-full w-full object-cover"
                    />
                  ) : user?.name.includes('daniel') ? (
                    <img
                      src="daniel.png"
                      alt="Daniel's picture"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-medium text-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Full height with proper mobile handling */}
        <main className="flex-1 overflow-hidden bg-hit-light">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
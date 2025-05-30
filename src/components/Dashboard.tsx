
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

  return (
    <div className="min-h-screen bg-hit-light flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-hit-dark">
                {activePage === 'chat' && 'Academic Advisor Chat'}
                {activePage === 'preferences' && 'Preferences Setup'}
                {activePage === 'profile' && 'Your Profile'}
              </h1>
              <p className="text-hit-secondary">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-hit-dark">{user?.name}</p>
                <p className="text-sm text-hit-secondary">Student ID: {user?.studentId}</p>
              </div>
              <div className="h-10 w-10 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden bg-hit-light">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

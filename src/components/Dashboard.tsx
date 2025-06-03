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
    < div className="h-screen bg-hit-light flex overflow-hidden" >
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* KEY: Use flex-1 and flex flex-col to create a column layout that takes remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - fixed height */}
        <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
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
              <div className="h-10 w-10 bg-hit-primary rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                {user?.name.includes('noy') ? (
                  <img src="noy.png" alt="Noy's picture" className="h-full w-full object-cover" />
                ) : user?.name.includes('daniel') ? (
                  <img src="daniel.png" alt="Daniel's picture" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-white font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* 
          KEY: Main Content - takes remaining space and enables overflow
          flex-1 makes it take up remaining space after header
          overflow-hidden prevents the main content from growing the parent
        */}
        <main className="flex-1 overflow-hidden bg-hit-light">
          {renderPage()}
        </main>
      </div>
    </div >
  );
};

export default Dashboard;
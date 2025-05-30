
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import Dashboard from '../components/Dashboard';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ChatProvider } from '../context/ChatContext';

const Index = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <MainApp />
      </ChatProvider>
    </AuthProvider>
  );
};

const MainApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginForm />;
};

export default Index;

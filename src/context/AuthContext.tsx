
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  studentId: string;
  currentCourses: string[];
  gpa: number;
  hasCompletedQuiz: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mentorHIT_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!email.endsWith('@hit.ac.il')) {
      throw new Error('Please use your HIT email address (@hit.ac.il)');
    }

    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      studentId: '2024' + Math.floor(Math.random() * 10000),
      currentCourses: ['Advanced Algorithms', 'Machine Learning', 'Software Engineering'],
      gpa: 3.7,
      hasCompletedQuiz: false
    };

    setUser(mockUser);
    localStorage.setItem('mentorHIT_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!email.endsWith('@hit.ac.il')) {
      throw new Error('Please use your HIT email address (@hit.ac.il)');
    }

    const mockUser: User = {
      id: '1',
      email,
      name,
      studentId: '2024' + Math.floor(Math.random() * 10000),
      currentCourses: ['Introduction to Programming', 'Discrete Mathematics', 'Digital Systems'],
      gpa: 3.5,
      hasCompletedQuiz: false
    };

    setUser(mockUser);
    localStorage.setItem('mentorHIT_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mentorHIT_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('mentorHIT_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

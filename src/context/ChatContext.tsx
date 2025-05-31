import React, { createContext, useContext, useState } from 'react';
import { chatAPI } from '@/lib/api';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// ChatProvider component - must be defined before useChat hook
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "שלום! אני MentorHIT\n\nהיועץ האקדמי הדיגיטלי שלך ממכון הטכנולוגי חולון. אני כאן כדי לעזור לך בתכנון קורסים, הכוונה מקצועית והחלטות אקדמיות.\n\nאיך אוכל לעזור לך היום?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);


  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call real AWS API
      const response = await chatAPI.sendMessage({
        message: text,
        userId: user?.id || 'anonymous'
      });


      // For now, since your Lambda returns a simple echo response,
      // we'll use fallback logic until you implement AI responses in Lambda
      let aiResponseText = response.message;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Failed to send message to AWS:', error);

      // Fallback to local response if AWS fails
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to my backend services right now. Please try again in a moment, or contact support if the issue persists.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "שלום! אני MentorHIT\n\nהיועץ האקדמי הדיגיטלי שלך ממכון הטכנולוגי חולון. אני כאן כדי לעזור לך בתכנון קורסים, הכוונה מקצועית והחלטות אקדמיות.\n\nאיך אוכל לעזור לך היום?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const contextValue: ChatContextType = {
    messages,
    isTyping,
    sendMessage,
    clearChat
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook - must be exported after the component
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

// Export types for other components to use
export type { Message, ChatContextType };
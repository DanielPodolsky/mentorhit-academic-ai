import React, { createContext, useContext, useState } from 'react';
import { chatAPI, ConversationMessage } from '@/lib/api';
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
  conversationHistory: ConversationMessage[];
  lastResponseMetadata: any;
  lastJobData: any; // NEW: Add job data
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

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
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [lastResponseMetadata, setLastResponseMetadata] = useState<any>(null);
  const [lastJobData, setLastJobData] = useState<any>(null); // NEW: Store job data

  const sendMessage = async (text: string) => {
    console.log('🚀 sendMessage called with:', text);

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => {
      console.log('📝 Adding user message, current messages:', prev.length);
      return [...prev, userMessage];
    });
    setIsTyping(true);

    try {
      console.log('📡 Calling API...');
      // Call real AWS API with conversation history
      const response = await chatAPI.sendMessage({
        message: text,
        userId: user?.id || 'anonymous',
        history: conversationHistory
      });

      console.log('✅ API Response received:', {
        success: response.success,
        hasJobData: !!response.jobRecommendations,
        messageLength: response.message?.length
      });

      // Update conversation history with Lambda's managed history
      setConversationHistory(response.history);
      setLastResponseMetadata(response);

      // NEW: Extract job data from Lambda response
      let jobData = null;
      if (response.jobRecommendations) {
        console.log('💼 Job data found in response:', response.jobRecommendations);
        jobData = response.jobRecommendations;
        setLastJobData(jobData);
      } else {
        setLastJobData(null);
      }

      // Create AI message with job data attached
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'ai',
        timestamp: new Date()
      };

      console.log('📝 Adding AI message, message ID:', aiMessage.id);

      // Add the message only once
      setMessages(prev => {
        console.log('📝 Adding AI message, current messages:', prev.length);
        return [...prev, aiMessage];
      });

    } catch (error) {
      console.error('❌ Failed to send message to AWS:', error);

      // Fallback to local response if AWS fails
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "אני מתנצל, נתקלתי בבעיה טכנית כרגע. אנא נסה שוב במספר שניות או צור קשר עם התמיכה אם הבעיה נמשכת.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setLastJobData(null); // Clear job data on error
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

    // Clear all state when clearing chat
    setConversationHistory([]);
    setLastResponseMetadata(null);
    setLastJobData(null); // NEW: Clear job data
  };

  const contextValue: ChatContextType = {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    conversationHistory,
    lastResponseMetadata,
    lastJobData // NEW: Expose job data
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

// Export types for other components to use
export type { Message, ChatContextType };
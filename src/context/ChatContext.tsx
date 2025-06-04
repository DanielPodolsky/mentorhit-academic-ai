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
  conversationHistory: ConversationMessage[]; // 🆕 Added conversation history
  lastResponseMetadata: any; // 🆕 Added metadata from Lambda
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
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]); // 🆕 Track conversation history
  const [lastResponseMetadata, setLastResponseMetadata] = useState<any>(null); // 🆕 Track response metadata

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
      // 🆕 Call real AWS API with conversation history
      const response = await chatAPI.sendMessage({
        message: text,
        userId: user?.id || 'anonymous',
        history: conversationHistory // 🆕 Send current conversation history
      });

      console.log('🎯 Lambda response metadata:', {
        aiPlanUsed: response.aiPlanUsed,
        datasetsIncluded: response.datasetsIncluded,
        responseTime: response.responseTime,
        modelUsed: response.modelUsed
      });

      // 🆕 Update conversation history with Lambda's managed history
      setConversationHistory(response.history);
      setLastResponseMetadata(response); // 🆕 Store metadata for debugging

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

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

    // 🆕 Clear conversation history when clearing chat
    setConversationHistory([]);
    setLastResponseMetadata(null);
  };

  const contextValue: ChatContextType = {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    conversationHistory, // 🆕 Expose conversation history
    lastResponseMetadata // 🆕 Expose metadata
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
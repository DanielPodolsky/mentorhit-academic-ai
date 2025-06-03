import React, { createContext, useContext, useState } from 'react';
import { chatAPI } from '@/lib/api';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  // Additional metadata from Lambda response
  metadata?: {
    aiPlanUsed?: any;
    dataSourcesQueried?: string[];
    knowledgeBaseUsed?: boolean;
    modelUsed?: string;
    demoMode?: boolean;
  };
}

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  lastError: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// ChatProvider component - must be defined before useChat hook
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "שלום! אני MentorHIT\n\nהיועץ האקדמי הדיגיטלי שלך ממכון הטכנולוגי חולון. אני כאן כדי לעזור לך בתכנון קורסים, הכוונה מקצועית והחלטות אקדמיות.\n\nאני מופעל על ידי Amazon Bedrock עם Claude 3.5 Sonnet ומחובר לבסיס הידע של HIT עם Titan Embeddings v2.\n\nאיך אוכל לעזור לך היום?",
      sender: 'ai',
      timestamp: new Date(),
      metadata: {
        demoMode: true,
        modelUsed: 'Claude 3.5 Sonnet + Amazon Titan + Knowledge Base'
      }
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setLastError(null);

    try {
      console.log('🤖 Sending message to MentorHIT Lambda...');

      // Call the AWS Lambda function
      const response = await chatAPI.sendMessage({
        message: text,
        userId: user?.id || 'anonymous'
      });

      console.log('✅ Received response from Lambda:', response);

      // Create AI response message with metadata
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'ai',
        timestamp: new Date(response.timestamp),
        metadata: {
          aiPlanUsed: response.aiPlanUsed,
          dataSourcesQueried: response.dataSourcesQueried,
          knowledgeBaseUsed: response.knowledgeBaseUsed,
          modelUsed: response.modelUsed,
          demoMode: response.demoMode
        }
      };

      setMessages(prev => [...prev, aiMessage]);

      // Log impressive demo details for debugging
      if (response.demoMode) {
        console.log('🎯 Demo mode response details:', {
          dataSources: response.dataSourcesQueried,
          knowledgeBase: response.knowledgeBaseUsed,
          model: response.modelUsed,
          aiPlan: response.aiPlanUsed
        });
      }

    } catch (error) {
      console.error('❌ Failed to send message to AWS Lambda:', error);
      setLastError(error instanceof Error ? error.message : 'Unknown error occurred');

      // Create error response message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `מתנצל, אבל נתקלתי בבעיה בחיבור לשרתי AWS. 
        
🔧 **פרטי השגיאה:**
${error instanceof Error ? error.message : 'שגיאה לא ידועה'}

🔄 **מה ניתן לעשות:**
• בדוק את חיבור האינטרנט
• נסה שוב בעוד רגע
• צור קשר עם התמיכה אם הבעיה נמשכת

📞 **תמיכה טכנית:** support@mentorhit.com`,
        sender: 'ai',
        timestamp: new Date(),
        metadata: {
          demoMode: false,
          modelUsed: 'Error Handler'
        }
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "שלום! אני MentorHIT\n\nהיועץ האקדמי הדיגיטלי שלך ממכון הטכנולוגי חולון. אני כאן כדי לעזור לך בתכנון קורסים, הכוונה מקצועית והחלטות אקדמיות.\n\nאני מופעל על ידי Amazon Bedrock עם Claude 3.5 Sonnet ומחובר לבסיס הידע של HIT עם Titan Embeddings v2.\n\nאיך אוכל לעזור לך היום?",
        sender: 'ai',
        timestamp: new Date(),
        metadata: {
          demoMode: true,
          modelUsed: 'Claude 3.5 Sonnet + Amazon Titan + Knowledge Base'
        }
      }
    ]);
    setLastError(null);
  };

  const contextValue: ChatContextType = {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    lastError
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
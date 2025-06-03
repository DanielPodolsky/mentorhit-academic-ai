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
      text: "!MentorHIT שלום, אני\n\nהיועץ האקדמי הדיגיטלי שלך ממכון הטכנולוגי חולון. אני כאן כדי לעזור לך בתכנון קורסים, הכוונה מקצועית והחלטות אקדמיות.\n\nאני מופעל על ידי Amazon Bedrock עם Claude 3.5 Sonnet ומחובר לבסיס הידע של HIT עם Titan Embeddings v2.\n\nאיך אוכל לעזור לך היום?",
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

    let retryCount = 0;
    const maxRetries = 2;

    while (retryCount <= maxRetries) {
      try {
        console.log(`🤖 Sending message to MentorHIT Lambda (attempt ${retryCount + 1}/${maxRetries + 1})...`);

        // Call the AWS Lambda function
        const response = await chatAPI.sendMessage({
          message: text,
          userId: 'daniel-student' // Can change to "noy-student" for Noy.
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
            demoMode: response.demoMode,
            retryCount: retryCount > 0 ? retryCount : undefined
          }
        };

        setMessages(prev => [...prev, aiMessage]);

        // Success - break out of retry loop
        break;

      } catch (error) {
        console.error(`❌ Attempt ${retryCount + 1} failed:`, error);

        retryCount++;

        // If this was the last attempt, handle the error
        if (retryCount > maxRetries) {
          setLastError(error instanceof Error ? error.message : 'Unknown error occurred');

          // Create error response message
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: error instanceof Error && error.name === 'TimeoutError' ?
              `⏱️ **הבקשה לוקחת זמן רב מהרגיל**

AI המתקדם של MentorHIT עובד על מענה מפורט עבורך. זה קורה כאשר:
• מחפש בבסיס הידע של HIT
• מנתח את הביצועים האקדמיים שלך  
• יוצר המלצות מותאמות אישית

🔄 **נסה שוב** - התשובה עשויה להיות מוכנה כעת!

📊 **במקרה זה**: המערכת עדיין עובדת על התשובה שלך ברקע.` :
              `מתנצל, אבל נתקלתי בבעיה בחיבור לשרתי AWS. 
        
🔧 **פרטי השגיאה:**
${error instanceof Error ? error.message : 'שגיאה לא ידועה'}

🔄 **מה ניתן לעשות:**
• נסה שוב - המערכת עובדת לסירוגין
• המתן רגע והמערכת תתייצב
• צור קשר עם התמיכה אם הבעיה נמשכת

📞 **תמיכה טכנית:** support@mentorhit.com`,
            sender: 'ai',
            timestamp: new Date(),
            metadata: {
              demoMode: false,
              modelUsed: 'Error Handler',
              retryCount: retryCount - 1
            }
          };

          setMessages(prev => [...prev, errorMessage]);
          break;
        }

        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s
        console.log(`⏳ Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "!MentorHIT שלום, אני\n\nהיועץ האקדמי הדיגיטלי שלך ממכון הטכנולוגי חולון. אני כאן כדי לעזור לך בתכנון קורסים, הכוונה מקצועית והחלטות אקדמיות.\n\nאני מופעל על ידי Amazon Bedrock עם Claude 3.5 Sonnet ומחובר לבסיס הידע של HIT עם Titan Embeddings v2.\n\nאיך אוכל לעזור לך היום?",
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
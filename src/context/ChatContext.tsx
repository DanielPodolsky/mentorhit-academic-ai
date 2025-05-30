
import React, { createContext, useContext, useState } from 'react';

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

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

const mockResponses = {
  'electives': "Based on your interests in data science, I recommend these HIT electives:\n\n• **Advanced Machine Learning** - Perfect for your career goals\n• **Big Data Analytics** - Highly relevant for data science roles\n• **Statistical Methods** - Essential foundation\n• **Python for Data Science** - Practical skills\n\nThese courses align well with industry demands and will strengthen your profile for data science positions. Would you like specific information about any of these courses?",
  
  'career': "Excellent question! Based on your academic performance in Java and Python, here are some advanced courses I recommend:\n\n• **Advanced Software Engineering** - Build on your programming foundation\n• **System Design & Architecture** - Learn scalable system design\n• **Computer Vision** - Great combination of programming and AI\n• **Mobile App Development** - Expand your programming skills\n\nYour strong performance in programming languages shows you're ready for these challenges. Which area interests you most?",
  
  'cybersecurity': "Great choice! Cybersecurity is a growing field with excellent opportunities. Here's a tailored path for you:\n\n**Core Courses:**\n• **Network Security** - Essential foundation\n• **Ethical Hacking & Penetration Testing** - Hands-on skills\n• **Cryptography** - Mathematical foundations\n• **Digital Forensics** - Investigation techniques\n\n**Industry Connections:**\nHIT has partnerships with Israeli cybersecurity companies like Check Point and CyberArk. Many graduates join these companies or start their own security firms.\n\nWould you like information about internship opportunities in cybersecurity?",
  
  'grades': "I can help you analyze your academic performance and suggest improvements!\n\nTo give you the best recommendations, could you share:\n• Which courses you're finding challenging\n• Your target GPA\n• Specific subjects you want to improve in\n\nBased on your current courses (Advanced Algorithms, Machine Learning, Software Engineering), you're taking a strong technical curriculum. I can suggest study strategies and additional resources for each subject.",
  
  'default': "Thank you for your question! As your AI academic advisor for HIT, I'm here to help with:\n\n• **Course recommendations** based on your interests and career goals\n• **Academic planning** for your degree path\n• **Career guidance** for tech industry roles\n• **Study strategies** for challenging courses\n• **Industry insights** and internship opportunities\n\nWhat specific area would you like guidance on today?"
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MentorHIT, your AI academic advisor for Holon Institute of Technology. I'm here to help you with course planning, career guidance, and academic decisions.\n\nHow can I assist you today?",
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

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    let response = mockResponses.default;
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('elective') || lowerText.includes('data science')) {
      response = mockResponses.electives;
    } else if (lowerText.includes('java') || lowerText.includes('python') || lowerText.includes('grade')) {
      response = mockResponses.career;
    } else if (lowerText.includes('cyber') || lowerText.includes('security')) {
      response = mockResponses.cybersecurity;
    } else if (lowerText.includes('grade') || lowerText.includes('gpa') || lowerText.includes('improve')) {
      response = mockResponses.grades;
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm MentorHIT, your AI academic advisor for Holon Institute of Technology. I'm here to help you with course planning, career guidance, and academic decisions.\n\nHow can I assist you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

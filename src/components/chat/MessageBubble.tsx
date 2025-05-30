
import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageText = (text: string) => {
    // Simple markdown-like formatting
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Handle bullet points
      if (line.trim().startsWith('• ')) {
        const parts = line.split('**');
        if (parts.length >= 3) {
          return (
            <div key={index} className="mb-1">
              • <strong>{parts[1]}</strong>{parts[2]}
            </div>
          );
        }
        return <div key={index} className="mb-1">{line}</div>;
      }
      
      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={index} className={index > 0 ? 'mt-2' : ''}>
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
            )}
          </div>
        );
      }
      
      // Regular line
      return line.trim() ? (
        <div key={index} className={index > 0 ? 'mt-2' : ''}>
          {line}
        </div>
      ) : (
        <div key={index} className="h-2"></div>
      );
    });
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-gray-600' : 'bg-blue-600'
      }`}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Bot className="h-5 w-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-3xl`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <div className="whitespace-pre-wrap">
            {formatMessageText(message.text)}
          </div>
        </div>
        
        <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

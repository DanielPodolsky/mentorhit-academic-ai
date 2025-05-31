
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import SuggestedPrompts from './SuggestedPrompts';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const message = inputValue.trim();
    setInputValue('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="h-full flex flex-col" >
      {/* 
        KEY FIX: Use flex-1 and overflow-hidden to make this area scrollable
        The flex-1 makes it take up remaining space
        overflow-hidden prevents it from growing the parent container
      */}
      <div className="flex-1 overflow-hidden" >
        {/* 
          KEY FIX: This is the actual scrollable area
          h-full ensures it takes the full height of its parent
          overflow-y-auto enables vertical scrolling
        */}
        <div className="h-full overflow-y-auto" >
          <div className="p-6 space-y-6 bg-hit-light min-h-full">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
                  <img src="logo-white.png" className="h-8 w-8 text-white text-sm font-medium" alt="" />
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 max-w-xs border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-hit-secondary ml-2">MentorHIT is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div >
      </div >

      {/* 
        Suggested Prompts - Only show when there's minimal chat history
        This should be inside the scrollable area or positioned absolutely
      */}
      {
        messages.length <= 1 && (
          <div className="px-6 pb-4 bg-hit-light flex-shrink-0">
            <SuggestedPrompts onPromptClick={handleSuggestedPrompt} />
          </div>
        )
      }

      {/* 
        KEY FIX: Input area stays at bottom
        flex-shrink-0 prevents it from being compressed
        border-t and bg-white maintain visual separation
      */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="...שאלו על קורסים, ייעוץ קריירה או תכנון אקדמי"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-hit-primary focus:border-hit-primary transition-colors text-right"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              disabled={isTyping}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-hit-primary text-white p-3 rounded-full hover:bg-hit-primary-hover focus:ring-2 focus:ring-hit-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>

        <p className="text-xs text-hit-secondary mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div >
  );
};

export default ChatInterface;
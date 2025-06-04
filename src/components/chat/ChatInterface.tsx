import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Info } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import SuggestedPrompts from './SuggestedPrompts';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const {
    messages,
    isTyping,
    sendMessage,
    conversationHistory,
    lastResponseMetadata,
    lastJobData
  } = useChat();
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
    const maxHeight = window.innerWidth < 768 ? 100 : 120; // Smaller max height on mobile
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Beautiful Chat Status Header */}
      <div className="bg-gradient-to-r from-hit-light via-white to-hit-light border-b border-hit-primary/10 p-4">
        <div className="flex items-center justify-between">
          {/* Left side - AI Status */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 bg-hit-primary rounded-full flex items-center justify-center shadow-md">
                <img src="/logo-white.png" className="h-7 w-7" alt="MentorHIT" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold text-hit-dark text-sm">MentorHIT מחובר</h3>
              <p className="text-xs text-hit-secondary">היועץ האקדמי הדיגיטלי שלך</p>
            </div>
          </div>

          {/* Center - Conversation Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-hit-primary">{conversationHistory.length}</div>
              <div className="text-xs text-hit-secondary">הודעות</div>
            </div>
            {lastResponseMetadata && (
              <div className="text-center">
                <div className="text-sm font-semibold text-hit-primary">
                  {lastResponseMetadata.responseTime < 1000 ? 'מהיר' : 'רגיל'}
                </div>
                <div className="text-xs text-hit-secondary">זמן תגובה</div>
              </div>
            )}
            {lastJobData && (
              <div className="text-center">
                <div className="text-sm font-semibold text-hit-primary">{lastJobData.totalJobsFound || 0}</div>
                <div className="text-xs text-hit-secondary">משרות נמצאו</div>
              </div>
            )}
          </div>

          {/* Right side - Quick Actions */}
          <div className="flex items-center space-x-2">
            {lastResponseMetadata?.knowledgeBaseUsed && (
              <div className="flex items-center space-x-1 bg-hit-light px-2 py-1 rounded-full">
                <div className="h-2 w-2 bg-hit-primary rounded-full"></div>
                <span className="text-xs text-hit-primary font-medium">מסד ידע</span>
              </div>
            )}
            {lastResponseMetadata?.jobSearchUsed && (
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-700 font-medium">חיפוש משרות</span>
              </div>
            )}
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">פעיל</span>
            </div>
          </div>
        </div>

        {/* Progress indicator for active conversation */}
        {conversationHistory.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-hit-secondary mb-1">
              <span>התקדמות השיחה</span>
              <span>{Math.min(100, (conversationHistory.length / 10) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-hit-primary to-hit-secondary h-1 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (conversationHistory.length / 10) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages Area - Mobile optimized */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-3 lg:p-6 space-y-4 lg:space-y-6 bg-hit-light min-h-full">
            {messages.map((message, index) => {
              const shouldPassJobData = message.sender === 'ai' &&
                index === messages.length - 1 &&
                lastJobData;

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  jobData={shouldPassJobData ? lastJobData : undefined}
                />
              );
            })}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 lg:h-10 lg:w-10 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
                  <img src="logo-white.png" className="h-6 w-6 lg:h-8 lg:w-8" alt="" />
                </div>
                <div className="bg-white rounded-2xl px-3 py-2 lg:px-4 lg:py-3 max-w-xs border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs lg:text-sm text-hit-secondary ml-2">MentorHIT is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Suggested Prompts - Mobile optimized */}
      {messages.length <= 1 && (
        <div className="px-3 lg:px-6 pb-2 lg:pb-4 bg-hit-light flex-shrink-0">
          <SuggestedPrompts onPromptClick={handleSuggestedPrompt} />
        </div>
      )}

      {/* Input Area - Mobile optimized */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-3 lg:p-6 safe-area-inset-bottom">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2 lg:space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="...שאלו על קורסים, ייעוץ קריירה או תכנון אקדמי"
              className="w-full px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-xl lg:rounded-2xl resize-none focus:ring-2 focus:ring-hit-primary focus:border-hit-primary transition-colors text-right"
              style={{
                minHeight: '44px',
                maxHeight: window.innerWidth < 768 ? '100px' : '120px'
              }}
              disabled={isTyping}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-hit-primary text-white p-2.5 lg:p-3 rounded-full hover:bg-hit-primary-hover focus:ring-2 focus:ring-hit-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md touch-manipulation"
          >
            {isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>

        <p className="text-xs text-hit-secondary mt-2 text-center px-2">
          <span className="hidden lg:inline">Press Enter to send, Shift+Enter for new line</span>
          <span className="lg:hidden">Tap send to submit your message</span>
          {conversationHistory.length > 0 && (
            <span className="ml-2 hidden sm:inline">• Conversation: {conversationHistory.length} messages</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
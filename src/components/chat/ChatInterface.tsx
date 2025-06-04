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

  // Helper function to detect Hebrew text
  const containsHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
  };

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
    const value = e.target.value;
    setInputValue(value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';

    // Auto-detect RTL direction
    const hasHebrew = containsHebrew(value);
    textarea.dir = hasHebrew ? 'rtl' : 'ltr';
    textarea.style.textAlign = hasHebrew ? 'right' : 'left';
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Set RTL for Hebrew prompts
      const hasHebrew = containsHebrew(prompt);
      textareaRef.current.dir = hasHebrew ? 'rtl' : 'ltr';
      textareaRef.current.style.textAlign = hasHebrew ? 'right' : 'left';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Debug Info Panel (Optional - for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 border-b p-2">
          <button
            onClick={() => setShowDebugInfo(!showDebugInfo)}
            className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-800"
          >
            <Info className="h-3 w-3" />
            <span>Debug Info ({conversationHistory.length} messages)</span>
          </button>

          {showDebugInfo && lastResponseMetadata && (
            <div className="mt-2 text-xs bg-white p-2 rounded border">
              <div><strong>Model:</strong> {lastResponseMetadata.modelUsed}</div>
              <div><strong>Response Time:</strong> {lastResponseMetadata.responseTime}ms</div>
              <div><strong>Datasets Used:</strong> {Object.entries(lastResponseMetadata.datasetsIncluded)
                .filter(([_, used]) => used)
                .map(([dataset]) => dataset)
                .join(', ') || 'None'}</div>
              <div><strong>Knowledge Base:</strong> {lastResponseMetadata.knowledgeBaseUsed ? 'Yes' : 'No'}</div>
              <div><strong>Job Search:</strong> {lastResponseMetadata.jobSearchUsed ? 'Yes' : 'No'}</div>
              {lastJobData && (
                <div><strong>Jobs Found:</strong> {lastJobData.totalJobsFound || 0}</div>
              )}
              <div><strong>Conversation History:</strong> {conversationHistory.length} messages</div>
            </div>
          )}
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6 space-y-6 bg-hit-light min-h-full">
            {messages.map((message, index) => {
              // For AI messages, check if this is the last message and pass job data
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
                    <span className="text-sm text-hit-secondary ml-2">MentorHIT חושב...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Suggested Prompts - Only show when there's minimal chat history */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4 bg-hit-light flex-shrink-0">
          <SuggestedPrompts onPromptClick={handleSuggestedPrompt} />
        </div>
      )}

      {/* Input Area with RTL Support */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="שאלו על קורסים, ייעוץ קריירה או תכנון אקדמי..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-hit-primary focus:border-hit-primary transition-colors"
              style={{
                minHeight: '48px',
                maxHeight: '120px',
                textAlign: containsHebrew(inputValue) ? 'right' : 'left'
              }}
              dir={containsHebrew(inputValue) ? 'rtl' : 'ltr'}
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

        <p className="text-xs text-hit-secondary mt-2 text-center" dir="rtl">
          לחץ Enter כדי לשלוח, Shift+Enter לשורה חדשה
          {conversationHistory.length > 0 && (
            <span className="ml-2">• שיחה: {conversationHistory.length} הודעות</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;